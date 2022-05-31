type CaseSuccess<T> = {
  statusCode: number;
  data: T;
};

export type SuccessReturn<T> = CaseSuccess<T>;
