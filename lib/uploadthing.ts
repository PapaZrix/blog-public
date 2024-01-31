import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { OurFileRouter } from '../server/uploadthing';

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();

import { generateComponents } from '@uploadthing/react';

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
