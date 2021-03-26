'use strict';

module.exports = {
  repackage(psiResult) {
    // The current structure of the result from PSI
    const result = {
      score: {
        performance: Number(
          Number(
            psiResult.lighthouseResult.categories.performance.score * 100
          ).toFixed(0)
        ),
        seo: Number(
          Number(psiResult.lighthouseResult.categories.seo.score * 100).toFixed(
            0
          )
        ),
        accessibility: Number(
          Number(
            psiResult.lighthouseResult.categories.accessibility.score * 100
          ).toFixed(0)
        ),
        pwa: Number(
          Number(psiResult.lighthouseResult.categories.pwa.score * 100).toFixed(
            0
          )
        ),
        'best-practices': Number(
          Number(
            psiResult.lighthouseResult.categories['best-practices'].score * 100
          ).toFixed(0)
        )
      },
      googleWebVitals: {
        firstContentfulPaint:
          psiResult.lighthouseResult.audits['first-contentful-paint']
            .numericValue,
        largestContentfulPaint:
          psiResult.lighthouseResult.audits['largest-contentful-paint']
            .numericValue,
        totalBlockingTime:
          psiResult.lighthouseResult.audits['total-blocking-time'].numericValue,
        cumulativeLayoutShift:
          psiResult.lighthouseResult.audits['cumulative-layout-shift']
            .numericValue
      },
      data: psiResult
    };

    if (psiResult.loadingExperience.metrics) {
      result.loadingExperience = {
        FIRST_CONTENTFUL_PAINT_MS: {
          percentile:
            psiResult.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
              .percentile,
          fast:
            psiResult.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
              .distributions[0].proportion,
          moderate:
            psiResult.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
              .distributions[1].proportion,
          slow:
            psiResult.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
              .distributions[2].proportion
        },
        FIRST_INPUT_DELAY_MS: {
          percentile:
            psiResult.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile,
          fast:
            psiResult.loadingExperience.metrics.FIRST_INPUT_DELAY_MS
              .distributions[0].proportion,
          moderate:
            psiResult.loadingExperience.metrics.FIRST_INPUT_DELAY_MS
              .distributions[1].proportion,
          slow:
            psiResult.loadingExperience.metrics.FIRST_INPUT_DELAY_MS
              .distributions[2].proportion
        },
        CUMULATIVE_LAYOUT_SHIFT_SCORE: {
          percentile:
            psiResult.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE
              .percentile,
          fast:
            psiResult.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE
              .distributions[0].proportion,
          moderate:
            psiResult.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE
              .distributions[1].proportion,
          slow:
            psiResult.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE
              .distributions[2].proportion
        },
        LARGEST_CONTENTFUL_PAINT_MS: {
          percentile:
            psiResult.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
              .percentile,
          fast:
            psiResult.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
              .distributions[0].proportion,
          moderate:
            psiResult.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
              .distributions[1].proportion,
          slow:
            psiResult.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
              .distributions[2].proportion
        }
      };
    }
    return result;
  }
};
