import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);  // For new password field in the popup
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);  // For confirm password field in the popup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);  // For modal visibility

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please fill in both email and password.');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    try {
      // Send request to the backend for login authentication
      const response = await axios.post('http://192.168.1.104:3000/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Save user details to AsyncStorage
      await AsyncStorage.setItem('userDetails', JSON.stringify(response.data));
      console.log('Fetched User Details:', response.data); // Ensure the user data is correct


        Alert.alert('Login successful!');
        navigation.navigate('DASHBOARD'); // Navigate to Dashboard on successful login
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Invalid email or password. Please try again.');
    }
  };

  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  const handleForgotPassword = () => {
    setShowModal(true); // Show the modal when "Forgot Password?" is clicked
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      // Make an API request to change the password
      const response = await axios.post('http://192.168.1.104:3000/auth/change-password', {
        email,
        newPassword, 
      });

      if (response.status === 200) {
        Alert.alert('Password changed successfully!');
        setShowModal(false);  // Close the modal after changing the password
      }
    } catch (error) {
      console.error('Error during password change:', error);
      Alert.alert('Failed to change password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>

      {/* form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={'mail-outline'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={'lock'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntery}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntery((prev) => !prev)} style={styles.eyeButton}>
            <Ionicons
              name={secureEntery ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* continue with google */}
        {/* <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require('../assets/google-logo.png')}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity> */}


        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password Modal */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new password"
                secureTextEntry={secureNewPassword}
                onChangeText={setNewPassword}
                value={newPassword}
              />
              <TouchableOpacity
                onPress={() => setSecureNewPassword(!secureNewPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={secureNewPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.modalInput}
                placeholder="Confirm new password"
                secureTextEntry={secureConfirmPassword}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
              <TouchableOpacity
                onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={secureConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.changePasswordText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  
  // googleButtonContainer: {
  //   backgroundColor: colors.white,
  //   borderRadius: 100,
  //   flexDirection: 'row',
  //   padding: 12,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginVertical: 10,
  //   borderWidth: 1,
  //   borderColor: colors.primary,
  // },
  // googleImage: {
  //   width: 20,
  //   height: 20,
  //   marginRight: 10,
  // },
  // googleText: {
  //   color: colors.primary,
  //   fontSize: 16,
  //   fontFamily: fonts.SemiBold,
  // },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  accountText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  signupText: {
    fontSize: 14,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: colors.primary,
  },
  changePasswordButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 100,
    marginVertical: 10,
  },
  changePasswordText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.SemiBold,
  },
  cancelButton: {
    backgroundColor: colors.gray,
    paddingVertical: 10,
    borderRadius: 100,
  },
  cancelText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.SemiBold,
  },
});

export default LoginScreen;
