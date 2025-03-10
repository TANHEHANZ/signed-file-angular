export interface res<T> {
  status: number;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}
