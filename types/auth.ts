export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
};

export type TokenData = {
  token: string;
};

export type EmailData = {
  email: string;
};

export type ResetPasswordData = {
  token: string;
  password: string;
};

export type AlertHandlers = {
  setSuccess: (msg: string) => void;
  setError: (msg: string) => void;
};
