import psi from 'psi';

export async function analyzeUrl(url, log, options) {
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
    'best-practices',
    'performance'
  ];

  return psi(url, args);
}
