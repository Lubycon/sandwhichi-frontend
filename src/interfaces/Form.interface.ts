export type EmailHost = {
    name: string;
    id: string;
    host: string;
    isDirectInput: boolean;
};

export type SignupContent = {
    id: number;
    contents: string;
    author: string;
    thumbnail: string;
};

export type SignupTerms = {
    privacyPolicy: boolean;
    terms: boolean;
    sendEmail: boolean;
};

export type Answer = {
    question: string;
    answer: string;
};

export type Question = {
    value: number;
    text: string;
}

export interface FormComponent {
    validate: Function;
}
