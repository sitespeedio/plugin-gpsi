'use strict';

module.exports = {
  repackage(psiResult) {
    // The current structure of the result from PSI
    const result = {
      originLoadingExperience: {
        FIRST_CONTENTFUL_PAINT_MS: {
          percentile:
            psiResult.originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
              .percentile,
          fast:
            psiResult.originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
              .distributions[0].proportion,
          moderate:
            psiResult.originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
              .distributions[1].proportion,
          slow:
            psiResult.originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS
              .distributions[2].proportion
        },
        FIRST_INPUT_DELAY_MS: {
          percentile:
            psiResult.originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS
              .percentile,
          fast:
            psiResult.originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS
              .distributions[0].proportion,
          moderate:
            psiResult.originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS
              .distributions[1].proportion,
          slow:
            psiResult.originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS
              .distributions[2].proportion
        },
        CUMULATIVE_LAYOUT_SHIFT_SCORE: {
          percentile:
            psiResult.originLoadingExperience.metrics
              .CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile,
          fast:
            psiResult.originLoadingExperience.metrics
              .CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[0].proportion,
          moderate:
            psiResult.originLoadingExperience.metrics
              .CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[1].proportion,
          slow:
            psiResult.originLoadingExperience.metrics
              .CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[2].proportion
        },
        LARGEST_CONTENTFUL_PAINT_MS: {
          percentile:
            psiResult.originLoadingExperience.metrics
              .LARGEST_CONTENTFUL_PAINT_MS.percentile,
          fast:
            psiResult.originLoadingExperience.metrics
              .LARGEST_CONTENTFUL_PAINT_MS.distributions[0].proportion,
          moderate:
            psiResult.originLoadingExperience.metrics
              .LARGEST_CONTENTFUL_PAINT_MS.distributions[1].proportion,
          slow:
            psiResult.originLoadingExperience.metrics
              .LARGEST_CONTENTFUL_PAINT_MS.distributions[2].proportion
        }
      }
    };

    return result;
  }
};
