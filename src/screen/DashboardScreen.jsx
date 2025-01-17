
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LogoutScreen from '../screen/Drawer/LogoutScreen';

// Drawer Navigator
const Drawer = createDrawerNavigator();

// Function to Check User Details
const checkUserDetails = async () => {
  try {
    const userDetails = await AsyncStorage.getItem('userDetails');
    if (userDetails) {
      console.log('User details found:', JSON.parse(userDetails));
    } else {
      console.log('No user details saved in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error retrieving user details:', error);
  }
};

// Custom Header Component
const CustomHeader = ({ title }) => {
  const navigation = useNavigation(); // Use the navigation hook

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

// Custom Drawer Content Component
const CustomDrawerContent = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        // Retrieve the stored user details from AsyncStorage
        const storedDetails = await AsyncStorage.getItem('userDetails');
        console.log('Fetched User Details:', storedDetails); // Log the fetched data
        if (storedDetails) {
          const parsedDetails = JSON.parse(storedDetails); // Parse the JSON data
          console.log('Parsed User Details:', parsedDetails); // Log the parsed data
          setUserDetails(parsedDetails); // Set the user details to the component state
        } else {
          console.log('No user details found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error retrieving user details:', error);
      }
    };

    getUserDetails();
  }, []);
console.log("user Details", userDetails)
  return (
    <View style={styles.drawerContainer}>
      {userDetails ? (
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }} // Replace with dynamic user image if available
            style={styles.userImage}
          />
    
          <Text style={styles.userName}>{userDetails.username}</Text>
          <Text style={styles.userEmail}>{userDetails.email}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user details...</Text>
      )}
    </View>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardText}>Welcome to the Dashboard!</Text>
    </View>
  );
};



// Dashboard Screen with Drawer
const DashboardScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate login and save user details (you would normally call this after a successful login API call)
    // saveUserDetails();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardContent}
        options={{
          header: () => <CustomHeader title="Dashboard" />,
        }}
      />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#6200EE',
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 20,
    color: '#FFF',
  },
  drawerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  userInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dashboardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
