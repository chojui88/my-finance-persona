import { categoryInfo, CategoryType } from '@/data/questions';

export interface Answers {
  [questionId: number]: number;
}

export interface CategoryScores {
  emotion: number;
  selfControl: number;
  riskPreference: number;
  decisionMaking: number;
}

export interface ResultType {
  code: string;
  types: {
    emotion: string;
    selfControl: string;
    riskPreference: string;
    decisionMaking: string;
  };
  displayText: string;
}

export const calculateCategoryScores = (answers: Answers): CategoryScores => {
  // Questions 1-3: emotion
  // Questions 4-6: selfControl
  // Questions 7-9: riskPreference
  // Questions 10-12: decisionMaking

  const scores: CategoryScores = {
    emotion: 0,
    selfControl: 0,
    riskPreference: 0,
    decisionMaking: 0,
  };

  // Calculate sum for each category
  for (let i = 1; i <= 12; i++) {
    const value = answers[i] || 3; // Default to neutral if not answered

    if (i <= 3) {
      scores.emotion += value;
    } else if (i <= 6) {
      scores.selfControl += value;
    } else if (i <= 9) {
      scores.riskPreference += value;
    } else {
      scores.decisionMaking += value;
    }
  }

  return scores;
};

export const calculateResult = (answers: Answers): ResultType => {
  const scores = calculateCategoryScores(answers);
  
  // Midpoint is 9 (3 questions * 3 neutral score)
  const midpoint = 9;

  const determineType = (score: number, category: CategoryType) => {
    const info = categoryInfo[category];
    // Lower scores = low type (first), Higher scores = high type (second)
    if (score <= midpoint) {
      return { type: info.low, code: info.lowCode };
    }
    return { type: info.high, code: info.highCode };
  };

  const emotion = determineType(scores.emotion, 'emotion');
  const selfControl = determineType(scores.selfControl, 'selfControl');
  const riskPreference = determineType(scores.riskPreference, 'riskPreference');
  const decisionMaking = determineType(scores.decisionMaking, 'decisionMaking');

  // Build the 4-letter code
  const code = `${emotion.code}${selfControl.code}${riskPreference.code}${decisionMaking.code}`;

  return {
    code,
    types: {
      emotion: emotion.type,
      selfControl: selfControl.type,
      riskPreference: riskPreference.type,
      decisionMaking: decisionMaking.type,
    },
    displayText: `${riskPreference.type} / ${decisionMaking.type} / ${emotion.type} / ${selfControl.type}`,
  };
};
