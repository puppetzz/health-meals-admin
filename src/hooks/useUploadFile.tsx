import { v4 as uuid } from 'uuid';
import { createUploadFileSignerUrl } from '../api/files';
import axios from 'axios';
import { getS3FileUrl } from '../utils/getS3FileUrl';

export const useUploadFile = () => {
  return async (file: File) => {
    const key = `${uuid()}-${file.name}`;

    const preSignedUrl = await createUploadFileSignerUrl(key, file.type);

    await axios({
      url: preSignedUrl,
      method: 'PUT',
      data: file,
    });

    return getS3FileUrl(key);
  };
};
