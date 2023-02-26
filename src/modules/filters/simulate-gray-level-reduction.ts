import { AxiosInstance } from "axios";
import { Filter, IFilter } from "./generic/filter";
import { ApplyFilterParams, ApplyFilterResponse } from "./types/apply-filter";

export class SimulateGreyLevelReductionFilter extends Filter implements IFilter {
  public n: number = 0;
  constructor(api: AxiosInstance) {
    super(api);
  }

  public async apply({ filename }: ApplyFilterParams): Promise<ApplyFilterResponse> {
    return this.applyFilter('/simulate_grey_level_reduction', { filename, n: this.n });
  }
}