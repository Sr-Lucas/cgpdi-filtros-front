export type ApplyFilterParams = {
  filename: string;
  [key: string]: any;
}

export type ApplyFilterResponse = {
  data: {
    url: string;
  }
}