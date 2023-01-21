export type DataType = {
  [key: string]: string | number | boolean | number[] | Element;
};

export type UrlObj = {
  [key: string]: string;
};

export type EngineResp = {
  velocity: number;
  distance: number;
};

export enum Errors {
  Error400 = 'Bad Request',
  Error404 = 'Not Found',
  Error429 = 'Too Many Requests',
  Error500 = 'Internal Server Error',
}

export type PageLimit<T> = {
  data: T[];
  total: number;
};
