import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.103:3000/reviews'; 

const RateUsScreen = () => {
  const navigation = useNavigation(); // Navigation hook
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    loadReviews();
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        setLoggedInUser(userDetails);
        console.log('RateUsScreen - User Details Loaded:', userDetails);
      }
    } catch (error) {
      console.error('RateUsScreen - Error loading user details:', error);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('RateUsScreen - Reviews Loaded:', data);
      setReviews(data);
    } catch (error) {
      console.error('RateUsScreen - Error fetching reviews:', error);
      Alert.alert('Error', 'Failed to load reviews. Please check your internet connection.');
    }
  };

  const submitReview = async () => {
    console.log('RateUsScreen - Logged In User:', loggedInUser);
    console.log('RateUsScreen - Logged In User ID Type:', typeof loggedInUser?.id);

    if (!loggedInUser || !loggedInUser.id) {
      Alert.alert('Warning', 'User information is missing. Please login again.');
      return;
    }

    if (rating === 0 || comment.trim() === '') {
      Alert.alert('Warning', 'Please provide a rating and comment.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(loggedInUser.id),
          rating,
          review_text: comment,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Review submitted successfully!');
        setRating(0);
        setComment('');
        loadReviews();
      } else {
        const errorData = await response.json();
        console.error('RateUsScreen - Failed to submit review:', errorData);
        Alert.alert('Error', `Failed to submit review. ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('RateUsScreen - Error submitting review:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please check your network and try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Rate Us</Text>

      <AirbnbRating count={5} defaultRating={rating} size={30} onFinishRating={setRating} />

      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={submitReview}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>User Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewUser}>{item.username}</Text>
            <Text style={styles.reviewText}>{'⭐'.repeat(item.rating)}</Text>
            <Text>{item.review_text}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RateUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#318F93', 
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#318F93',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  noReviews: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
  }
});