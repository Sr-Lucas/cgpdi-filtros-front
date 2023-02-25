import { AxiosInstance } from "axios";
import { Filter, IFilter } from "./generic/filter";
import { ApplyFilterParams, ApplyFilterResponse } from "./types/apply-filter";

export class Compression extends Filter implements IFilter {
  public a: number = 0;
  public b: number = 0;

  constructor(api: AxiosInstance) {
    super(api);
  }

  public async apply({ filename }: ApplyFilterParams): Promise<ApplyFilterResponse> {
    return this.applyFilter('/compression', { filename, a: this.a, b: this.b });
  }
}