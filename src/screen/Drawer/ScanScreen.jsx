import { View, Text } from 'react-native'
import React from 'react'

const ScanScreen = () => {
  return (
    <View>
      <Text>ScanScreen</Text>
    </View>
  )
}

export default ScanScreen

// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Platform } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker"; // Import correctly

// const ScanScreen = () => {
//   const [image, setImage] = useState(null);

//   // Function to pick an image from gallery
//   const pickImage = async () => {
//     const options = {
//       mediaType: "photo",
//       quality: 1,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         Alert.alert("Image selection cancelled");
//       } else if (response.errorMessage) {
//         Alert.alert("Error", response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         setImage(response.assets[0].uri);
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upload Prescription</Text>

//       <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
//         <Text style={styles.uploadText}>Choose Image</Text>
//       </TouchableOpacity>

//       {image && <Image source={{ uri: image }} style={styles.previewImage} />}

//       <TouchableOpacity style={styles.processButton} onPress={() => Alert.alert("Processing Image...")}>
//         <Text style={styles.processText}>Process Image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ScanScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   uploadButton: {
//     backgroundColor: "#3498db",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   uploadText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   previewImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   processButton: {
//     backgroundColor: "#2ecc71",
//     padding: 12,
//     borderRadius: 8,
//   },
//   processText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });
// screens/ScanScreen.js
