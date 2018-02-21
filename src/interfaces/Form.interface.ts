export interface EmailHost {
    name: string;
    id: string;
    host: string;
    isDirectInput: boolean;
}
export interface SignupContent {
    id: number;
    contents: string;
    author: string;
    thumbnail: string;
}