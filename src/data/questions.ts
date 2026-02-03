export interface Question {
  id: number;
  category: 'emotion' | 'selfControl' | 'riskPreference' | 'decisionMaking';
  text: string;
}

export const questions: Question[] = [
  // 감정 (불안형 / 무던형)
  {
    id: 1,
    category: 'emotion',
    text: '금융 결정을 내릴 때 손실 가능성 때문에 쉽게 불안해진다.',
  },
  {
    id: 2,
    category: 'emotion',
    text: '돈을 투자하거나 지출할 때 심리적 부담을 많이 느낀다.',
  },
  {
    id: 3,
    category: 'emotion',
    text: '금융과 관련된 선택을 한 뒤에도 결과가 계속 신경 쓰인다.',
  },
  // 자기조절 (충동형 / 계획형)
  {
    id: 4,
    category: 'selfControl',
    text: '소비 결정을 즉흥적으로 내리는 경우가 많다.',
  },
  {
    id: 5,
    category: 'selfControl',
    text: '쇼핑하거나 지출할 때 계획 없이 행동하는 편이다.',
  },
  {
    id: 6,
    category: 'selfControl',
    text: '사전에 정한 예산이나 계획이 있어도 상황에 따라 쉽게 바뀐다.',
  },
  // 위험선호 (공격형 / 안전추구형)
  {
    id: 7,
    category: 'riskPreference',
    text: '높은 수익을 위해 위험한 투자도 감수할 수 있다.',
  },
  {
    id: 8,
    category: 'riskPreference',
    text: '원금 손실보다 잠재적 수익을 더 중시한다.',
  },
  {
    id: 9,
    category: 'riskPreference',
    text: '손실 가능성이 있더라도 수익 기회가 크다면 도전해보고 싶다.',
  },
  // 의사결정 (회피형 / 논리형)
  {
    id: 10,
    category: 'decisionMaking',
    text: '금융 결정을 자주 미루거나 다른 사람의 의견을 먼저 참고한다.',
  },
  {
    id: 11,
    category: 'decisionMaking',
    text: '현재 소비의 즐거움이나 만족을 장기 목표보다 우선시한다.',
  },
  {
    id: 12,
    category: 'decisionMaking',
    text: '스스로 판단하기보다, 이미 검증된 선택을 따르는 편이 마음이 편하다.',
  },
];

export const categoryInfo = {
  emotion: {
    name: '감정',
    low: '불안형',
    high: '무던형',
    lowCode: 'A', // Anxious
    highCode: 'C', // Calm
  },
  selfControl: {
    name: '자기조절',
    low: '충동형',
    high: '계획형',
    lowCode: 'I', // Impulsive
    highCode: 'P', // Planned
  },
  riskPreference: {
    name: '위험선호',
    low: '안전추구형',
    high: '공격형',
    lowCode: 'S', // Safe
    highCode: 'G', // Aggressive
  },
  decisionMaking: {
    name: '의사결정',
    low: '논리형',
    high: '회피형',
    lowCode: 'L', // Logical
    highCode: 'V', // Avoidant
  },
};

export type CategoryType = keyof typeof categoryInfo;
