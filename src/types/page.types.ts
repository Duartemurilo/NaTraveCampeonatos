export type BreadCrumb = {
  title: string;
  href: string;
};

export type Pagination = {
  next: () => void;
  previous: () => void;
  pageNumber: number;
  pageSize: number;
  extend: (limit: number) => void;
  changePage: (pageNumber: number) => void;
};

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
