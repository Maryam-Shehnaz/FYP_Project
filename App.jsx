import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import DashboardScreen from './src/screen/DashboardScreen'; 
import OnboardingScreen from './src/screen/OnboardingScreen';
import ForgotPasswordScreen from './src/screen/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={'HOME'} component={OnboardingScreen} />
        <Stack.Screen name={'LOGIN'} component={LoginScreen} />
        <Stack.Screen name={'SIGNUP'} component={SignupScreen} />
        <Stack.Screen name="DASHBOARD" component={DashboardScreen} />
        <Stack.Screen name="FORGOTPASSWORD" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;