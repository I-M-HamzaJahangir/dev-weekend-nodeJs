export interface Author {
  _id: string;
  username: string;
  name: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: Author;
  coverImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalDocuments: number;
  totalPages: number;
}

export interface BlogListResponse {
  success: boolean;
  data: Blog[];
  pagination: Pagination;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
}

export interface FieldError {
  field: string;
  message?: string;
  msg?: string;
}

export class ApiError extends Error {
  status: number;
  fieldErrors: FieldError[];

  constructor(message: string, status: number, fieldErrors: FieldError[] = []) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}
