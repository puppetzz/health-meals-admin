import { API } from '../common/constants/api';
import axiosClient from '../lib/axiosClient';

export const createUploadFileSignerUrl = async (
  key: string,
  contentType: string
): Promise<string> => {
  const response = await axiosClient<string>({
    url: API.CREATE_UPLOAD_FILE_SIGNER_URL,
    method: 'POST',
    data: {
      key,
      contentType,
    },
  });

  return response.data;
};
