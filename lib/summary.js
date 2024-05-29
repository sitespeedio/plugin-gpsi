import get from 'lodash.get';

export function repackageSummary(psiResult) {
  // The current structure of the result from PSI
  const result = {
    originLoadingExperience: {
      FIRST_CONTENTFUL_PAINT_MS: {
        percentile: get(
          psiResult,
          'originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile',
          0
        ),
        fast: get(
          psiResult,
          'originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[1].proportion',
          0
        ),
        slow: get(
          psiResult,
          'originLoadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions[2].proportion',
          0
        )
      },
      CUMULATIVE_LAYOUT_SHIFT_SCORE: {
        percentile: get(
          psiResult,
          'originLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile',
          0
        ),
        fast: get(
          psiResult,
          'originLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'originLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[1].proportion',
          0
        ),
        slow: get(
          psiResult,
          'originLoadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.distributions[2].proportion',
          0
        )
      },
      LARGEST_CONTENTFUL_PAINT_MS: {
        percentile: get(
          psiResult,
          'originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile',
          0
        ),
        fast: get(
          psiResult,
          'originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[0].proportion',
          0
        ),
        moderate: get(
          psiResult,
          'originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[1].proportion',
          0
        ),
        slow: get(
          psiResult,
          'originLoadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.distributions[2].proportion',
          0
        )
      }
    }
  };

  if (psiResult.originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS) {
    result.originLoadingExperience.FIRST_INPUT_DELAY_MS = {
      percentile: get(
        psiResult,
        'originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile',
        0
      ),
      fast: get(
        psiResult,
        'originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS.distributions[0].proportion',
        0
      ),
      moderate: get(
        psiResult,
        'originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS.distributions[1].proportion',
        0
      ),
      slow: get(
        psiResult,
        'originLoadingExperience.metrics.FIRST_INPUT_DELAY_MS.distributions[2].proportion',
        0
      )
    };
  }

  if (psiResult.originLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT) {
    result.originLoadingExperience.INTERACTION_TO_NEXT_PAINT = {
      percentile: get(
        psiResult,
        'originLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.percentile',
        0
      ),
      fast: get(
        psiResult,
        'originLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.distributions[0].proportion',
        0
      ),
      moderate: get(
        psiResult,
        'originLoadingExperience.metrics.INTERACTION_TO_NEXT_PAIN.distributions[1].proportion',
        0
      ),
      slow: get(
        psiResult,
        'originLoadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.distributions[2].proportion',
        0
      )
    };
  }

  if (
    psiResult.originLoadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE
  ) {
    result.originLoadingExperience.EXPERIMENTAL_TIME_TO_FIRST_BYTE = {
      percentile: get(
        psiResult,
        'originLoadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile',
        0
      ),
      fast: get(
        psiResult,
        'originLoadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[0].proportion',
        0
      ),
      moderate: get(
        psiResult,
        'originLoadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[1].proportion',
        0
      ),
      slow: get(
        psiResult,
        'originLoadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.distributions[2].proportion',
        0
      )
    };
  }

  return result;
}
