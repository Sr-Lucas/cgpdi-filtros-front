import { AxiosInstance } from "axios";
import { Filter, IFilter } from "./generic/filter";
import { ApplyFilterParams, ApplyFilterResponse } from "./types/apply-filter";

export class nnrAmpliation extends Filter implements IFilter {
  constructor(api: AxiosInstance) {
    super(api);
  }

  public async apply({ filename }: ApplyFilterParams): Promise<ApplyFilterResponse> {
    return this.applyFilter('/nnr-ampliation', { filename });
  }
}