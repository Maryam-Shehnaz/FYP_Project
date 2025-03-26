import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ResultItem } from './ResultItem';
import { styles } from '../styles/styles';
import { colors } from '../utils/colors';

interface ResultModalProps {
  visible: boolean;
  onClose: () => void;
  ocrResult: any;
}

export const ResultModal = ({ visible, onClose, ocrResult }: ResultModalProps) => (
  <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Prescription Details</Text>
      <ScrollView style={styles.modalContent}>
        {ocrResult &&
          Object.entries(ocrResult.structuredData).map(([key, value]) => (
            <ResultItem key={key} label={key} value={value} />
          ))}
      </ScrollView>

      {/* Styled Close Button */}
      <TouchableOpacity style={modalButtonStyles.closeButton} onPress={onClose}>
        <Text style={modalButtonStyles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

// New styles for the Close button
const modalButtonStyles = StyleSheet.create({
  closeButton: {
    backgroundColor: colors.primary, // Same as other buttons
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
