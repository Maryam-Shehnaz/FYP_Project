import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import OnboardingScreen from '../screen/OnboardingScreen';
import BottomTabNavigator from '../components/BottomTabNavigator';
import FAQScreen from '../screen/FAQScreen';
import ProfileScreen from '../screen/ProfileScreen';
import PrivacyPolicy from '../screen/PrivacyPolicy';
import RateUsScreen from '../screen/RateUsScreen';
import ChatbotScreen from '../screen/ChatbotScreen'; 
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const CustomHeader = ({ title }) => {
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

const CustomDrawerContent = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const storedDetails = await AsyncStorage.getItem('userDetails');
        if (storedDetails) {
          setUserDetails(JSON.parse(storedDetails));
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
          <Text style={styles.userName}>{userDetails.username}</Text>
          <Text style={styles.userEmail}>{userDetails.email}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user details...</Text>
      )}

      <View style={{ flex: 1, justifyContent: 'flex-start', paddingVertical: 20 }}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="person-outline" size={20} color="#333" />
          <Text style={styles.navText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.faqButton}
          onPress={() => navigation.navigate('FAQ')}
        >
          <Icon name="help-circle-outline" size={20} color="#333" />
          <Text style={styles.faqText}>FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.faqButton}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Icon name="shield-checkmark-outline" size={20} color="#333" />
          <Text style={styles.faqText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.faqButton}
          onPress={() => navigation.navigate('RateUs')}
        >
          <Icon name="star-outline" size={20} color="#333" />
          <Text style={styles.faqText}>Rate Us</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const DashboardScreen = ({ navigation }) => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={BottomTabNavigator}
        options={{
          header: () => <CustomHeader title="" />,
        }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQScreen}
        options={{ header: () => <CustomHeader title="" /> }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <CustomHeader title="" />,
        }}
      />

      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ header: () => <CustomHeader title="" /> }}
      />
      <Drawer.Screen
        name="RateUs"
        component={RateUsScreen}
        options={{ header: () => <CustomHeader title="" /> }}
      />
      <Drawer.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
      />
      <Drawer.Screen 
        name="Chatbot"
        component={ChatbotScreen}
        options={{ header: () => <CustomHeader title="" /> }}
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
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  navText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  faqText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});