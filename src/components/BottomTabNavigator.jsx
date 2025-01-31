import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your existing screens
import DashboardContent from '../screen/Drawer/DashboardContent'; 
import ScanScreen from '../screen/Drawer/ScanScreen';
import HistoryScreen from '../screen/Drawer/HistoryScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scan') {
            iconName = focused ? 'scan' : 'scan-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#318F93',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardContent} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Scan" 
        component={ScanScreen} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;