import type { NextApiRequest, NextApiResponse } from 'next';

import { createUploadthing } from 'uploadthing/next-legacy';

const f = createUploadthing();

const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: 'fakeId' }); // Fake auth function

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async ({ req, res }) => {
      const user = await auth(req, res);

      if (!user) throw new Error('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log('Upload complete for userId:', metadata.userId);
      // console.log('file url', file.url);
      // return { uploadedBy: metadata.userId };
    }),
};

export type OurFileRouter = typeof ourFileRouter;
