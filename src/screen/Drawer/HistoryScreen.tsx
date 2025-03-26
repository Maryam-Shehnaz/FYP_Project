import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Modal
} from 'react-native';
import storageService from '../storageService';
import { colors } from './../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HistoryScreen = () => {
  const [images, setImages] = useState<ImageHistory[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const history = await storageService.getHistory();
    setImages(history);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Image",
      "Are you sure you want to delete this image?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const updatedHistory = await storageService.deleteImage(id);
              setImages(updatedHistory);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete image');
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleView = (imageUri: string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: ImageHistory }) => (
    <View style={styles.itemContainer}>
      <Image 
        source={{ uri: item.imageUri }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleView(item.imageUri)} style={styles.viewButton}>
    <Text style={styles.buttonText}>View</Text>
</TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleDelete(item.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient History</Text>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      {/* Modal for viewing full image */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
        <TouchableOpacity 
   style={styles.modalClose} 
   onPress={() => setModalVisible(false)}
>
   <Text>
     <Ionicons name="close" size={30} color="#fff" />
   </Text>
</TouchableOpacity>

          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center'
  },
  image: {
    width: 150,  // Increase width
    height: 100, // Adjust height proportionally
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 5, // Reduce marginLeft to bring buttons closer
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    alignItems: 'center', // Ensure buttons align vertically
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  viewButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
    minWidth: 70, // Ensures the button has a wider minimum width
    alignItems: 'center', // Centers the text inside the button
},

  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 10,
    borderRadius: 20,
  },
  fullImage: {
    width: '90%',
    height: '80%',
  },
});

export default HistoryScreen;

