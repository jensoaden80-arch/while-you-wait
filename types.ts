
export type UserData = {
  name: string;
  email: string;
};

export type Archetype = {
  id: string;
  name: string;
  code: string;
  essence: string;
  destination: string;
  destinationDescription: string;
  imageUrl: string;
  bumpInto: string;
};

export type QuestionOption = {
  label: 'A' | 'B';
  text: string;
  code: string;
};

export type Question = {
  id: number;
  category: string;
  question: string;
  imageUrl: string;
  options: {
    A: QuestionOption;
    B: QuestionOption;
  };
};

export type QuizResult = {
  answers: Record<number, 'A' | 'B'>;
  code: string;
  archetype: Archetype;
};
