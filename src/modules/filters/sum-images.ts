import { AxiosInstance } from "axios";
import { Filter, IFilter } from "./generic/filter";
import { ApplyFilterResponse } from "./types/apply-filter";

export class sumImages extends Filter implements IFilter {
  public filename1: string = '';
  public filename2: string = '';

  constructor(api: AxiosInstance) {
    super(api);
  }

  public async apply(): Promise<ApplyFilterResponse> {
    const response = await this.api.post('sum-images', {
      filename1: this.filename1,
      filename2: this.filename2,
    });
    
    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Error applying filter");
  }
}