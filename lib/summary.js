export function repackageSummary(psiResult) {
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
          psiResult.originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
            .percentile,
        fast:
          psiResult.originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
            .distributions[0].proportion,
        moderate:
          psiResult.originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
            .distributions[1].proportion,
        slow:
          psiResult.originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS
            .distributions[2].proportion
      }
    }
  };

  if (psiResult.originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS) {
    result.originLoadingExperience.FIRST_INPUT_DELAY_MS = {
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
    };
  }

  if (
    psiResult.originLoadingExperience.metrics
      .EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT
  ) {
    result.originLoadingExperience.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT = {
      percentile:
        psiResult.originLoadingExperience.metrics
          .EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT.percentile,
      fast:
        psiResult.originLoadingExperience.metrics
          .EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT.distributions[0].proportion,
      moderate:
        psiResult.originLoadingExperience.metrics
          .EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT.distributions[1].proportion,
      slow:
        psiResult.originLoadingExperience.metrics
          .EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT.distributions[2].proportion
    };
  }

  if (
    psiResult.originLoadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE
  ) {
    result.originLoadingExperience.EXPERIMENTAL_TIME_TO_FIRST_BYTE = {
      percentile:
        psiResult.originLoadingExperience.metrics
          .EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile,
      fast:
        psiResult.originLoadingExperience.metrics
          .EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[0].proportion,
      moderate:
        psiResult.originLoadingExperience.metrics
          .EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[1].proportion,
      slow:
        psiResult.originLoadingExperience.metrics
          .EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[2].proportion
    };
  }

  return result;
}
