import get from 'lodash.get';

export function repackagePageSummary(psiResult) {
  // The current structure of the result from PSI
  const result = {
    score: {
      performance: Number(
        Number(
          psiResult.lighthouseResult.categories.performance.score * 100
        ).toFixed(0)
      ),
      seo: Number(
        Number(psiResult.lighthouseResult.categories.seo.score * 100).toFixed(0)
      ),
      accessibility: Number(
        Number(
          psiResult.lighthouseResult.categories.accessibility.score * 100
        ).toFixed(0)
      ),
      'best-practices': Number(
        Number(
          psiResult.lighthouseResult.categories['best-practices'].score * 100
        ).toFixed(0)
      )
    },
    googleWebVitals: {
      firstContentfulPaint: psiResult.lighthouseResult.audits[
        'first-contentful-paint'
      ]
        ? psiResult.lighthouseResult.audits['first-contentful-paint']
            .numericValue
        : 0,
      largestContentfulPaint: psiResult.lighthouseResult.audits[
        'largest-contentful-paint'
      ]
        ? psiResult.lighthouseResult.audits['largest-contentful-paint']
            .numericValue
        : 0,
      totalBlockingTime: psiResult.lighthouseResult.audits[
        'total-blocking-time'
      ]
        ? psiResult.lighthouseResult.audits['total-blocking-time'].numericValue
        : 0,
      cumulativeLayoutShift: psiResult.lighthouseResult.audits[
        'cumulative-layout-shift'
      ]
        ? psiResult.lighthouseResult.audits['cumulative-layout-shift']
            .numericValue
        : 0
    },
    data: psiResult
  };

  if (psiResult.loadingExperience.metrics) {
    result.loadingExperience = {
      FIRST_CONTENTFUL_PAINT_MS: {
        percentile: get(
          psiResult,
          'loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile',
          0
        ),
        fast: get(
          psiResult,
          'loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[1].proportio',
          0
        ),
        slow: get(
          psiResult,
          'loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[2].proportion',
          0
        )
      },
      CUMULATIVE_LAYOUT_SHIFT_SCORE: {
        percentile: get(
          psiResult,
          'loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile',
          0
        ),
        fast: get(
          psiResult,
          'loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[1].proportion',
          0
        ),
        slow: get(
          psiResult,
          'loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[2].proportion',
          0
        )
      },
      LARGEST_CONTENTFUL_PAINT_MS: {
        percentile: get(
          psiResult,
          'loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile',
          0
        ),
        fast: get(
          psiResult,
          'loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[1].proportion',
          0
        ),
        slow: get(
          psiResult,
          'loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[2].proportion',
          0
        )
      }
    };

    // For some URLs GPSI misses out info about FIRST_INPUT_DELAY_MS
    if (psiResult.loadingExperience.metrics.FIRST_INPUT_DELAY_MS) {
      result.loadingExperience.FIRST_INPUT_DELAY_MS = {
        percentile: get(
          psiResult,
          'loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile',
          0
        ),
        fast: get(
          psiResult,
          'loadingExperience.metrics.FIRST_INPUT_DELAY_MS.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'loadingExperience.metrics.FIRST_INPUT_DELAY_MS.distributions[1].proportion',
          0
        ),
        slow: get(
          psiResult,
          'loadingExperience.metrics.FIRST_INPUT_DELAY_MS.distributions[2].proportion',
          0
        )
      };
    }
    if (psiResult.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT) {
      result.loadingExperience.INTERACTION_TO_NEXT_PAINT = {
        percentile: get(
          psiResult,
          'loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.percentile',
          0
        ),
        fast: get(
          psiResult,
          'loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.distributions[1].proportion',
          0
        ),
        slow: get(
          psiResult,
          'loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.distributions[2].proportion',
          0
        )
      };
    }
    if (psiResult.loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE) {
      result.loadingExperience.EXPERIMENTAL_TIME_TO_FIRST_BYTE = {
        percentile: get(
          psiResult,
          'loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile',
          0
        ),
        fast: get(
          psiResult,
          'loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[1].proportion',
          0
        ),
        slow: get(
          psiResult,
          'loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[2].proportion',
          0
        )
      };
    }
  }
  return result;
}
