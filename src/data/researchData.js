// Real research data - "When Models Change Their Minds: Moral Drift in AI Reasoning"

export const MODELS = ['ChatGPT', 'Claude', 'DeepSeek', 'Gemini'];

export const STRATEGIES = [
  'Persuasion',
  'Role Prompting',
  'Emotional Framing',
  'Ethical Reminder',
  'Self-Consistency',
];

// Strategy type: inducer or stabilizer
export const STRATEGY_TYPE = {
  'Persuasion':        'inducer',
  'Role Prompting':    'inducer',
  'Emotional Framing': 'inducer',
  'Ethical Reminder':  'stabilizer',
  'Self-Consistency':  'stabilizer',
};

// Drift rates per model per strategy (source: Moral Drift Rates.xlsx)
// Value = proportion of 15 questions where the answer changed
export const driftRates = {
  ChatGPT:  [0.2667, 0.0667, 0.0000, 0.0667, 0.0000],
  Claude:   [0.2667, 0.3333, 0.0667, 0.4667, 0.1333],
  DeepSeek: [1.0000, 0.0000, 0.5333, 0.0667, 0.0000],
  Gemini:   [0.5333, 0.5333, 0.6000, 0.5333, 0.6000],
};

export const overallDrift = {
  ChatGPT:  0.0800,
  Claude:   0.2533,
  DeepSeek: 0.3200,
  Gemini:   0.5600,
};

// Weighted moral score (source: resulting scores.xlsx) - ChatGPT only
export const weightedScores = [
  { label: 'Baseline',          value: 18.52, type: 'baseline' },
  { label: 'Emotional Framing', value: 17.92, type: 'inducer'   },
  { label: 'Self-Consistency',  value: 17.88, type: 'stabilizer'},
  { label: 'Persuasion',        value: 17.72, type: 'inducer'   },
  { label: 'Role Prompting',    value: 17.72, type: 'inducer'   },
  { label: 'Ethical Reminder',  value: 17.72, type: 'stabilizer'},
];

// Key stats
export const keyStats = [
  { value: '4',    label: 'AI Models Tested',        note: 'ChatGPT, Claude, DeepSeek, Gemini' },
  { value: '15',   label: 'Moral Questions',          note: '6 moral foundations (MFQ)' },
  { value: '56%',  label: "Gemini's Drift Rate",     note: 'Highest among all models' },
  { value: '100%', label: 'Harm Questions Drifted',   note: 'Most vulnerable dimension' },
];

// Model descriptions
export const modelInfo = {
  ChatGPT: {
    color: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
    logo: '/logos/chatgpt.svg',
    logoType: 'icon',      // square icon - render at fixed w/h
    tagline: 'Most stable overall',
    summary: 'ChatGPT held up best, with only 8% average drift. It was completely stable under Emotional Framing and Self-Consistency, but still shifted on ~27% of questions when directly pressured.',
  },
  Claude: {
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    logo: '/logos/claude.svg',
    logoType: 'wordmark',  // wide horizontal text logo
    tagline: 'Surprising instability',
    summary: 'Claude appeared principled but drifted most under Ethical Reminder (47%!) - the very strategy meant to stabilize it. Role Prompting also caused notable drift at 33%.',
  },
  DeepSeek: {
    color: '#ef4444',
    bg: '#fef2f2',
    border: '#fecaca',
    logo: '/logos/deepseek.svg',
    logoType: 'wordmark',
    tagline: 'Extreme persuasion sensitivity',
    summary: 'DeepSeek changed its answer on every single question (100%) under persuasion - the highest drift rate recorded. Yet it was perfectly stable under Role Prompting and Self-Consistency.',
  },
  Gemini: {
    color: '#8b5cf6',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    logo: '/logos/gemini.svg',
    logoType: 'wordmark',
    tagline: 'Most susceptible model',
    summary: 'Gemini drifted 53–60% across all strategies including both stabilizers. It was the only model where even Self-Consistency failed to help, showing persistent moral instability.',
  },
};
