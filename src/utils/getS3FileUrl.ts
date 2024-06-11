import { envs } from '../common/constants/envs';

export const getS3FileUrl = (key: string) => {
  return `https://${envs.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${envs.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${key}`;
};
