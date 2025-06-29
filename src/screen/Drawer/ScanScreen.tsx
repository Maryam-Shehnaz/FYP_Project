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
      let imageUri = response.assets[0].uri; 
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
      {/* Header with title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prescription Scanner</Text>
        <Text style={styles.headerSubtitle}>Digitize your prescriptions instantly</Text>
      </View>
      
      {/* Illustration when no image is selected */}
      {!selectedImage && (
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Text style={styles.illustrationIcon}>📋</Text>
          </View>
          <Text style={styles.illustrationText}>Scan your medical prescription</Text>
          <Text style={styles.instructionText}>
            Take a clear photo of your prescription or upload from your gallery
          </Text>
        </View>
      )}

      {selectedImage && (
        <View style={styles.selectedImageContainer}>
          <Text style={styles.imageLabel}>Prescription Image</Text>
          <Image source={{ uri: selectedImage }} style={styles.image} resizeMode="contain" />
        </View>
      )}

      <View style={styles.actionSection}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={buttonStyles.primaryButton} onPress={openImagePicker}>
            <Text style={styles.buttonIcon}>📁</Text>
            <Text style={buttonStyles.primaryButtonText}>Choose from Device</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={buttonStyles.primaryButton} onPress={handleCameraLaunch}>
            <Text style={styles.buttonIcon}>📷</Text>
            <Text style={buttonStyles.primaryButtonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>

        {isProcessing && (
          <View style={styles.processingContainer}>
            <View style={styles.loadingIndicator} />
            <Text style={styles.processingText}>Processing prescription...</Text>
          </View>
        )}

        {ocrResult && !isProcessing && (
          <View style={[styles.buttonContainer, styles.resultButtonContainer]}>
            <TouchableOpacity style={buttonStyles.primaryButton} onPress={() => setShowResult(true)}>
              <Text style={styles.buttonIcon}>📋</Text>
              <Text style={buttonStyles.primaryButtonText}>See Results</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom tips section */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tips for best results:</Text>
        <Text style={styles.tipText}>• Make sure prescription is well-lit</Text>
        <Text style={styles.tipText}>• Keep the prescription flat</Text>
        <Text style={styles.tipText}>• Include all text clearly in frame</Text>
      </View>

      <ResultModal 
  visible={showResult} 
  onClose={() => {
    setShowResult(false); 
    setSelectedImage(null); 
    setOcrResult(null);
  }} 
  ocrResult={ocrResult} 
/>

    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  illustrationIcon: {
    fontSize: 50,
  },
  illustrationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  actionSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 8,
    width: '80%',
  },
  resultButtonContainer: {
    marginTop: 8,
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  loadingIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    borderTopColor: 'transparent',
    marginRight: 10,
  },
  processingText: {
    color: colors.primary,
    fontWeight: '500',
  },
  tipsContainer: {
    width: '100%',
    backgroundColor: `${colors.primary}15`,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  tipsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.primary,
  },
  tipText: {
    color: '#555',
    fontSize: 13,
    marginBottom: 3,
  },
});

const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});