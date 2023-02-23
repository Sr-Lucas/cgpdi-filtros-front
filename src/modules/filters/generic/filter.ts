import { AxiosInstance } from "axios";
import { ApplyFilterParams, ApplyFilterResponse } from "../types/apply-filter";

export interface IFilter {
  apply({ filename }: ApplyFilterParams): Promise<ApplyFilterResponse>;
}

export abstract class Filter {
  constructor(protected readonly api: AxiosInstance) {}

  protected async applyFilter(path: string, { filename, ...rest }: ApplyFilterParams): Promise<ApplyFilterResponse> {
    const response = await this.api.post(path, {
      filename,
      ...rest
    });
    
    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Error applying filter");
  }
}