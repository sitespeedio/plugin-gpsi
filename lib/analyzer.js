'use strict';

const psi = require('psi');

module.exports = {
  async analyzeUrl(url, log, options) {
    log.info('Sending url ' + url + ' to test on Page Speed Insights');
    const args = { url };

    if (options.gpsi && options.gpsi.key) {
      args.key = options.gpsi.key;
    } else {
      args.nokey = true;
    }

    args.strategy = 'desktop';

    if (options.mobile) {
      args.strategy = 'mobile';
    }

    args.category = [
      'seo',
      'accessibility',
      'pwa',
      'best-practices',
      'performance'
    ];

    return psi(url, args);
  }
};
