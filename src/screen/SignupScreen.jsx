import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {colors} from '../utils/colors';
import {fonts} from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  // hooks
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Handle go back
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Handle login navigation
  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };

  // Validate password
  const validatePassword = (pwd) => {
    // Clear previous error
    setPasswordError('');

    // Check if password is empty
    if (!pwd) {
      setPasswordError('Password is required');
      return false;
    }

    // Initialize error conditions
    const errors = [];

    // Check password length
    if (pwd.length < 8) {
      errors.push('must be at least 8 characters long');
    }
    
    // Check for at least one number
    if (!/\d/.test(pwd)) {
      errors.push('should contain a number');
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      errors.push('a special character');
    }
    
    // If there are any errors, set comprehensive error message
    if (errors.length > 0) {
      setPasswordError(`Password ${errors.join(' and ')}`);
      return false;
    }
    
    // If all checks pass
    return true;
  };

  // Save user details to AsyncStorage
  const saveUserDetails = async userDetails => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
      console.log('User details saved:', userDetails);
    } catch (error) {
      console.error('Error saving user details:', error);
      Alert.alert('Error saving user details.');
    }
  };

  // Handle signup form submission
  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert('All fields are required');
      return;
    }

    // Email validation using regex (for general email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.1.102:3000/auth/signup',
        {
          username,
          email,
          password,
        },
      );
      console.log('API Response:', response);

      if (response.status === 201) {
        Alert.alert('Signup successful!');

        // Save user details locally
        saveUserDetails({username, email});

        // Navigate to login screen after successful signup
        navigation.navigate('LOGIN');
      }
    } catch (error) {
      console.error('Error during signup:', error);

      // Check if the error response status is 409 (email already registered)
      if (error.response && error.response.status === 409) {
        Alert.alert('This email is already registered. Please login.');
      } else {
        Alert.alert('Error during signup. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={'arrow-back-outline'}
          color={colors.primary}
          size={25}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name={'person-outline'}
            size={30}
            color={colors.secondary}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Name"
            placeholderTextColor={colors.secondary}
            value={username}
            onChangeText={setUsername}
          />
        </View>

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

        <View 
          style={[
            styles.inputContainer, 
            passwordError ? styles.errorInputContainer : {}
          ]}
        >
          <SimpleLineIcons name={'lock'} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntery}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}
          />
          <TouchableOpacity onPress={() => setSecureEntery(prev => !prev)}>
            <Ionicons
              name={secureEntery ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {/* Sign up Button */}
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleSignup}>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

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
      footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        gap: 5,
      },
      accountText: {
        color: colors.primary,
        fontFamily: fonts.Regular,
      },
      signupText: {
        color: colors.primary,
        fontFamily: fonts.Bold,
      },
    
  errorInputContainer: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: fonts.Regular,
  },
});
