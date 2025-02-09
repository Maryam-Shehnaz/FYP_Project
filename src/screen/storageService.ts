import AsyncStorage from '@react-native-async-storage/async-storage';

export type ImageHistory = {
  id: string;
  imageUri: string;
  timestamp: string;
};

const storageService = {
  async saveImage(imageUri: string) {
    try {
      const history = await this.getHistory();
      const newImage: ImageHistory = {
        id: Date.now().toString(),
        imageUri,
        timestamp: new Date().toISOString(),
      };
      const updatedHistory = [newImage, ...history];
      await AsyncStorage.setItem('image_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving image:', error);
    }
  },

  async getHistory(): Promise<ImageHistory[]> {
    try {
      const history = await AsyncStorage.getItem('image_history');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  },

  async deleteImage(id: string) {
    try {
      const history = await this.getHistory();
      const updatedHistory = history.filter(item => item.id !== id);
      await AsyncStorage.setItem('image_history', JSON.stringify(updatedHistory));
      return updatedHistory;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};

export default storageService;