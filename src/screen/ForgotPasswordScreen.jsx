import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    if (!newPassword || !confirmPassword) {
      Alert.alert('Please enter and confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.105:3000/auth/change-password', {
        email,
        newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Password reset successful!', 'You can now log in with your new password.');
        navigation.navigate('LOGIN');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      Alert.alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={'arrow-back-outline'} color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Reset</Text>
        <Text style={styles.headingText}>Password</Text>
      </View>

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
          <Ionicons name={'lock-closed-outline'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter New Password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <Ionicons
              name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name={'lock-closed-outline'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm New Password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.resetButtonWrapper}
          onPress={handleResetPassword}
        >
          <Text style={styles.resetText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
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
  resetButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  resetText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
});

export default ForgotPasswordScreen;
