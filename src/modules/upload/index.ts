import { api } from "@/services/api";

import { UploadImage } from "./upload/upload-image";

export const upload = {
  uploadImage: new UploadImage(api),
};