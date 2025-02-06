import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import OnboardingScreen from '../screen/OnboardingScreen';
import BottomTabNavigator from '../components/BottomTabNavigator';

// Drawer Navigator
const Drawer = createDrawerNavigator();

// Function to Check User Details
// const checkUserDetails = async () => {
//   try {
//     const userDetails = await AsyncStorage.getItem('userDetails');
//     if (userDetails) {
//       console.log('User details found:', JSON.parse(userDetails));
//     } else {
//       console.log('No user details saved in AsyncStorage.');
//     }
//   } catch (error) {
//     console.error('Error retrieving user details:', error);
//   }
// };

// Custom Header Component
const CustomHeader = ({title}) => {
  const navigation = useNavigation();

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
const CustomDrawerContent = ({navigation}) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const storedDetails = await AsyncStorage.getItem('userDetails');
        if (storedDetails) {
          const parsedDetails = JSON.parse(storedDetails);
          setUserDetails(parsedDetails);
        }
      } catch (error) {
        console.error('Error retrieving user details:', error);
      }
    };

    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
      navigation.navigate('Onboarding');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.drawerContainer}>
      {userDetails ? (
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/user-profile.png')}
            style={styles.userImage}
          />
          {/* <Text style={styles.userName}>{userDetails.username}</Text> */}
          <Text style={styles.userName}>
            {userDetails.username
              .split(' ') // Split the full name into words
              .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
              .join(' ')}{' '}
            {/* Join words back into a single string */}
          </Text>

          <Text style={styles.userEmail}>{userDetails.email}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user details...</Text>
      )}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Dashboard Screen with Drawer
const DashboardScreen = ({navigation}) => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: true}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={BottomTabNavigator}
        options={{
          header: () => <CustomHeader title="" />,
        }}
      />
      <Drawer.Screen
        name="Onboarding"
        component={OnboardingScreen} // Directly use OnboardingScreen from the path
        options={{
          drawerItemStyle: {display: 'none'}, // Hide the Onboarding screen in the drawer
          headerShown: false,
        }} // Hide header when navigating to OnboardingScreen
      />
    </Drawer.Navigator>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#318F93',
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  logoutButton: {
    backgroundColor: '#318F93',
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
