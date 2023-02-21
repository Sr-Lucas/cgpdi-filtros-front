import { AxiosInstance, AxiosResponse } from "axios";
import { UploadImageParams } from "../types/upload-image";

type ResponseType = {
  data: {
    filename: string;
  }
  status: number;
}

export class UploadImage {
  constructor(private readonly api: AxiosInstance) {}

  public async single({ image }: UploadImageParams): Promise<string> {
    const formData = new FormData();
    formData.append('file', image, image.name);

    const response = await this.api.post<any, AxiosResponse<ResponseType>>("/upload_file", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.status === 200) {
      return response.data.data.filename;
    }

    throw new Error("Error uploading image");
  }
}