export type SignInFormValues = {
  email: string;
  password: string;
};

export type SignInFieldError = {
  field: string;
  message: string;
};

export type SignInSuccessResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type SignInErrorResponse = {
  error: string;
  issues?: SignInFieldError[];
};
