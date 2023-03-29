import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SitespeedioPlugin } from '@sitespeed.io/plugin';

import { analyzeUrl } from './analyzer.js';
import { repackagePageSummary } from './pageSummary.js';
import { repackageSummary } from './summary.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const DEFAULT_METRICS_PAGESUMMARY = [
  'score.*',
  'loadingExperience.*',
  'googleWebVitals.*'
];
const DEFAULT_METRICS_SUMMARY = ['originLoadingExperience.*'];

export default class GPSIPlugin extends SitespeedioPlugin {
  constructor(options, context, queue) {
    super({ name: 'gpsi', options, context, queue });
  }
  concurrency = 10;

  open(context, options) {
    this.summaries = {};
    this.options = {
      gpsi: options.gpsi,
      mobile: options.mobile
    };

    // Register which metrics we want to send to data storage
    context.filterRegistry.registerFilterForType(
      DEFAULT_METRICS_PAGESUMMARY,
      'gpsi.pageSummary'
    );

    context.filterRegistry.registerFilterForType(
      DEFAULT_METRICS_SUMMARY,
      'gpsi.summary'
    );

    this.pug = readFileSync(resolve(__dirname, 'pug', 'index.pug'), 'utf8');
  }

  processMessage(message) {
    switch (message.type) {
      case 'sitespeedio.setup': {
        // Tell the HTML plugin that this plugin got a pug of the type
        // pageSummary = it will be shown on the page summary page
        // If you got data that differs per run, the the type will be
        // run.
        super.sendMessage('html.pug', {
          id: 'gpsi',
          name: 'GPSI',
          pug: this.pug,
          type: 'pageSummary'
        });

        super.sendMessage('budget.addMessageType', {
          type: 'gpsi.pageSummary'
        });
        break;
      }

      case 'browsertime.navigationScripts': {
        super.log(
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
        return analyzeUrl(url, super.getLog(), this.options).then(result => {
          super.log('Got ' + url + ' analysed from Google Page Speed Insights');
          super.log(
            'Result from Google Page Speed Insights:%:2j',
            'verbose',
            result
          );
          super.sendMessage(
            // The HTML plugin will pickup every message names *.pageSummary
            // and publish the data under pageInfo.data.*.pageSummary
            // in this case pageInfo.data.gpsi.pageSummary
            'gpsi.pageSummary',
            repackagePageSummary(result.data),
            {
              url,
              group
            }
          );
          // We will just override other pages summary but it should just be the same
          if (
            result.data.originLoadingExperience &&
            result.data.originLoadingExperience.metrics
          ) {
            this.summaries[group] = repackageSummary(result.data);
          }
        });
      }

      case 'sitespeedio.summarize': {
        for (let group of Object.keys(this.summaries)) {
          super.sendMessage('gpsi.summary', this.summaries[group], { group });
        }
      }
    }
  }
}
