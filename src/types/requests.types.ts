export type RequestsProps = {
  endpoint: string;
  onSuccess?: (data: any) => void;
  onError?: () => void;
  successMessage?: string;
  errorMessage?: string;
};

export type ByIdRequestProps = { _id: number };

export type RequestsBaseReturn<T> = {
  data: T;
  isLoading: boolean;
  error?: Error;
};

export type GetRequestProps = {
  isPaused?: boolean;
};
export type RequestPagination = {
  pageNumber: number;
  pageSize: number;
};
export type CreateRequestProps<T> = RequestsProps & {
  formData: T;
};

export type CancelRequestProps<T> = RequestsProps & {
  formData: T;
};

export type UpdateByIdProps<T> = RequestsProps & {
  formData: T;
  _id: number;
};

export type IdRequestProps = RequestsProps & {
  _id: number;
};

export type RemoveByIdProps = RequestsProps & {
  _id: number;
  secondaryId?: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type DirectResponse<T> = T[];
