type CaseSuccess<T> = {
  statusCode: number;
  data: T;
};

type Message = {
  message: string;
};

export type SuccessReturn<T> = CaseSuccess<T>;
export type MessageCase = Message;
