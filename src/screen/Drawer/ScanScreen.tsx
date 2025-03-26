import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Image, View, Text, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { ResultModal } from '../../components/ResultModal';
import { ocrService } from '../../api/ocrService';
import storageService from '../storageService';
import { colors } from './../../utils/colors';

export const ScanScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<any | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const imageOptions = {
    mediaType: 'photo' as const,
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  const openImagePicker = () => {
    launchImageLibrary(imageOptions, handleResponse);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "This app needs access to your camera",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    // iOS handles permissions through Info.plist
    return true;
  };

  const handleCameraLaunch = async () => {
    const hasPermission = await requestCameraPermission();
    
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Please grant camera permission to use this feature.');
      return;
    }

    launchCamera(imageOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera error: ', response.errorMessage);
        Alert.alert('Error', 'There was an error accessing the camera. Please try again.');
      } else if (response.assets && response.assets.length > 0) {
        let imageUri = response.assets[0].uri;
        if (imageUri) {
          setSelectedImage(imageUri);
          processImage(imageUri);
        }
      }
    });
  };

  const handleResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      let imageUri = response.assets[0].uri; // Corrected
      setSelectedImage(imageUri);
      if (imageUri) {
        processImage(imageUri);
      }
    }
  };

  const processImage = async (imageUri: string) => {
    setIsProcessing(true);
    try {
      const result = await ocrService.processImage(imageUri);
      setOcrResult(result);
      await storageService.saveImage(imageUri);

    } catch (error: any) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} resizeMode="contain" />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={buttonStyles.primaryButton} onPress={openImagePicker}>
          <Text style={buttonStyles.primaryButtonText}>Choose from Device</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={buttonStyles.primaryButton} onPress={handleCameraLaunch}>
          <Text style={buttonStyles.primaryButtonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>

      {isProcessing && <Text style={styles.processingText}>Processing image...</Text>}

      {ocrResult && !isProcessing && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={buttonStyles.primaryButton} onPress={() => setShowResult(true)}>
            <Text style={buttonStyles.primaryButtonText}>See Results</Text>
          </TouchableOpacity>
        </View>
      )}

      <ResultModal visible={showResult} onClose={() => setShowResult(false)} ocrResult={ocrResult} />
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  processingText: {
    marginTop: 10,
    color: 'gray',
    fontStyle: 'italic',
  },
});

const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

