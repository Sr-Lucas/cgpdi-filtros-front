import { AxiosInstance } from "axios";
import { Filter, IFilter } from "./generic/filter";
import { ApplyFilterParams, ApplyFilterResponse } from "./types/apply-filter";

export class birAmpliation extends Filter implements IFilter {
  public scaleFactor: number = 2;

  constructor(api: AxiosInstance) {
    super(api);
  }

  public async apply({ filename }: ApplyFilterParams): Promise<ApplyFilterResponse> {
    return this.applyFilter('/amplify_bilinear', { filename, scale_factor: this.scaleFactor });
  }
}