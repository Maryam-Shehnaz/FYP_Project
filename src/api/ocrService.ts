// api/ocrService.ts
import axios from 'axios';
import { Platform } from 'react-native';

export const ocrService = {
  processImage: async (imageUri: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'prescription.jpg',
    });

    const serverUrl = Platform.OS === 'android' 
      ? 'http://10.0.2.2:4000/ocr' 
      : 'http://localhost:4000/ocr';

    const response = await axios.post(serverUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      timeout: 30000,
      responseType: 'json',
    });

    return response.data;
  }
};
