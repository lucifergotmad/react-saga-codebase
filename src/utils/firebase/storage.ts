import { storage } from '@/config/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from 'firebase/storage';

type TResponse = {
  data?: string;
  message: string;
};

export const uploadImage = async (
  file: Blob | ArrayBuffer,
  fileName: string,
): Promise<TResponse> => {
  try {
    const imageRef = ref(storage, `${fileName}`);
    const uploadImage = await uploadBytes(imageRef, file);

    const newMetadata = {
      cacheControl: 'public,max-age=2629800000',
      contentType: uploadImage.metadata.contentType,
    };

    await updateMetadata(imageRef, newMetadata);

    const publicImageUrl = await getDownloadURL(imageRef);
    return { data: publicImageUrl, message: 'Success!' };
  } catch (error) {
    throw new Error('Error uploading image!');
  }
};

export const deleteImage = async (fileName: string): Promise<TResponse> => {
  try {
    const imageRef = ref(storage, `${fileName}`);
    await deleteObject(imageRef);
    return { message: 'Success!' };
  } catch (error) {
    throw new Error('Error deleting image!');
  }
};
