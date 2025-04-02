import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    phone: '',
    dob: '',
    gender: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Function to Load User Data from AsyncStorage on App Start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userProfile');
        if (storedUserData) {
          setUserInfo(JSON.parse(storedUserData)); // Set the retrieved data
        }
      } catch (error) {
        console.log('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      Alert.alert('Error', 'Name, Email, and Phone Number are required.');
      return;
    }

    if (!validateEmail(userInfo.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userInfo)); // Save to AsyncStorage
      setIsEditing(false);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.log('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileContainer}>
        <Text style={styles.label}>Full Name: <Text style={styles.mandatory}>*</Text></Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputEditable]}
          value={userInfo.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Enter your full name"
          editable={isEditing}
        />

        <Text style={styles.label}>Email: <Text style={styles.mandatory}>*</Text></Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputEditable]}
          value={userInfo.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Enter your email"
          keyboardType="email-address"
          editable={isEditing}
        />

        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputEditable]}
          value={userInfo.age}
          onChangeText={(text) => handleChange('age', text)}
          placeholder="Enter your age"
          keyboardType="numeric"
          editable={isEditing}
        />

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputEditable]}
          value={userInfo.address}
          onChangeText={(text) => handleChange('address', text)}
          placeholder="Enter your address"
          editable={isEditing}
        />

        <Text style={styles.label}>Phone Number: <Text style={styles.mandatory}>*</Text></Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputEditable]}
          value={userInfo.phone}
          onChangeText={(text) => handleChange('phone', text)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          editable={isEditing}
        />

        <Text style={styles.label}>Date of Birth:</Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputEditable]}
          value={userInfo.dob}
          onChangeText={(text) => handleChange('dob', text)}
          placeholder="Enter your date of birth"
          editable={isEditing}
        />

        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={[styles.input, isEditing && styles.inputEditable]}
          value={userInfo.gender}
          onChangeText={(text) => handleChange('gender', text)}
          placeholder="Enter your gender"
          editable={isEditing}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.saveButton, { marginRight: 10 }]} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007B7F',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  mandatory: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputEditable: {
    backgroundColor: '#ffffff',
    borderColor: '#007B7F',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007B7F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
