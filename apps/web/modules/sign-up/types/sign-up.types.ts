export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export type SignUpFieldError = {
  field: string;
  message: string;
};

export type SignUpSuccessResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type SignUpErrorResponse = {
  error: string;
  issues?: SignUpFieldError[];
};
