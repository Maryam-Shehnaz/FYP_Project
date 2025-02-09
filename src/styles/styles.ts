import {StyleSheet} from 'react-native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

export const styles = StyleSheet.create({
  // Existing styles
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
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    marginBottom: 20,
  },
  resultItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonGroup: {
    width: '80%',
    gap: 10,
    marginVertical: 10,
  },
  loader: {
    marginTop: 10,
  },
});

// Separate styles for the medicine details modal
export const detailStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: '80%',
  },
  medicineContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary, // Search button ka color
    borderRadius: 10, // Search button ki tarah rounded corners
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
