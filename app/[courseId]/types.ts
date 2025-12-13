// First, let's create types.ts in the app/lesson directory to hold our types
export type Challenge = {
  id: string;
  lessonId: string;
  type: string;
  question: string;
  completed: boolean;
  challengeOptions: ChallengeOption[];
};

export type ChallengeOption = {
  id: string;
  challengeId: string;
  text: string;
  correct: boolean;
};

export type Subscription = {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodStart?: string;
  stripeCurrentPeriodEnd?: string;
  isActive: boolean;
};
