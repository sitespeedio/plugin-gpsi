'use strict';

const fs = require('fs');
const path = require('path');
const analyzer = require('./analyzer');
const pageSummary = require('./pageSummary');
const summary = require('./summary');
const DEFAULT_METRICS_PAGESUMMARY = ['score.*', 'loadingExperience.*', 'googleWebVitals.*'];
const DEFAULT_METRICS_SUMMARY = ['originLoadingExperience.*'];

module.exports = {
  concurrency: 10,
  name() {
    return 'gpsi';
  },
  open(context, options) {
    this.make = context.messageMaker('gpsi').make;
    this.summaries = {};
    this.options = {
      gpsi: options.gpsi,
      mobile: options.mobile
    };

    // Register a logger for this plugin, a unique name so we can filter the log
    this.log = context.intel.getLogger('sitespeedio.plugin.gpsi');

    // Register which metrics we want to send to data storage
    context.filterRegistry.registerFilterForType(
      DEFAULT_METRICS_PAGESUMMARY,
      'gpsi.pageSummary'
    );

    context.filterRegistry.registerFilterForType(
      DEFAULT_METRICS_SUMMARY,
      'gpsi.summary'
    );

    this.pug = fs.readFileSync(
      path.resolve(__dirname, 'pug', 'index.pug'),
      'utf8'
    );
  },
  processMessage(message, queue) {
    const make = this.make;
    const log = this.log;
    switch (message.type) {
      case 'sitespeedio.setup': {
        // Tell the HTML plugin that this plugin got a pug of the type
        // pageSummary = it will be shown on the page summary page
        // If you got data that differs per run, the the type will be
        // run.
        queue.postMessage(
          make('html.pug', {
            id: 'gpsi',
            name: 'GPSI',
            pug: this.pug,
            type: 'pageSummary'
          })
        );

        queue.postMessage(
          make('budget.addMessageType', {
            type: 'gpsi.pageSummary'
          })
        );
        break;
      }

      case 'browsertime.navigationScripts': {
        log.info(
          'GPSI can only be used on URLs and not with scripting/multiple pages at the moment'
        );
        break;
      }

      case 'url': {
        const url = message.url;
        const group = message.group;
        // GPSI do one run per URL (Browsertime/WebPageTest do multiple runs per URL)
        // so we send all the data we get from GPSI out on the queue
        // and then can the HTML plugin collect the data and match it against the pug
        return analyzer.analyzeUrl(url, log, this.options).then(result => {
          log.info('Got ' + url + ' analysed from Google Page Speed Insights');
          log.verbose('Result from Google Page Speed Insights:%:2j', result);
          queue.postMessage(
            // The HTML plugin will pickup every message names *.pageSummary
            // and publish the data under pageInfo.data.*.pageSummary
            // in this case pageInfo.data.gpsi.pageSummary
            make('gpsi.pageSummary', pageSummary.repackage(result.data), {
              url,
              group
            })
          );
          // We will just override other pages summary but it should just be the same
          if (
            result.data.originLoadingExperience &&
            result.data.originLoadingExperience.metrics
          ) {
            this.summaries[group] = summary.repackage(result.data);
          }
        });
      }

      case 'sitespeedio.summarize': {
        for (let group of Object.keys(this.summaries)) {
          queue.postMessage(
            make('gpsi.summary', this.summaries[group], { group })
          );
        }
      }
    }
  }
};
