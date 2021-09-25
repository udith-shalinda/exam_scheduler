export interface ILoginUser {
    email: string;
    password: string;
}
export interface ISignUpUser {
    username?: string| null;
    email: string;
    password: string;
    provider?: providerTypes
}

export enum providerTypes {
    "google" = "Google",
    "email" = "Email",
  }