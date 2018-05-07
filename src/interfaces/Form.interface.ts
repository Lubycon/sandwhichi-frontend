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

export interface FormComponent {
    validate: Function;
}
