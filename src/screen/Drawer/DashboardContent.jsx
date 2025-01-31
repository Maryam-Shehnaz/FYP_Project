// // src/screen/Drawer/DashboardContent.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const DashboardContent = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Welcome</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

// export default DashboardContent;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const features = [
    {
      title: 'Scan Prescription',
      description:
        'Convert handwritten prescriptions to digital format instantly',
      icon: '🔍',
      route: 'Scan',
    },
    {
      title: 'View History',
      description: 'Access all your previous prescriptions securely',
      icon: '📋',
      route: 'History',
    },
    {
      title: 'Medicine Information',
      description: 'Get detailed info about your medications',
      icon: '💊',
      route: 'MedicineInfo',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={{
          uri: 'https://media.istockphoto.com/id/1190193669/photo/doctor-filling-out-a-prescription.jpg?s=612x612&w=0&k=20&c=DUtf8Yt9fl--E-KQdRQjwrRdRHmoev-mSUPd8tdGrRM=',
        }}
        style={styles.backgroundImage}
        resizeMode="cover">
        <ScrollView style={styles.contentContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.appName}>MediScan</Text>
            <Text style={styles.tagline}>
              Your Digital Prescription Assistant
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={() => navigation.navigate(feature.route)}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#226062',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
    opacity: 0.9,
  },
  featuresContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  featureDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
});

export default HomeScreen;
