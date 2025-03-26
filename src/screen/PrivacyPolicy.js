import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Privacy Policy Box */}
      <View style={styles.policyBox}>
        {/* Privacy Icon */}
        <View style={styles.iconContainer}>
          <Icon name="privacy-tip" size={50} color="#fff" />
        </View>

        <Text style={styles.title}>We Protect your Privacy</Text>

        <ScrollView style={styles.content}>
          <Text style={styles.paragraph}>• We collect necessary information for prescription scanning and medication identification.</Text>
          <Text style={styles.paragraph}>• Your data is used solely for processing prescriptions and providing medication information.</Text>
          <Text style={styles.paragraph}>• Information may be shared with third parties for text recognition and medication database services.</Text>
          <Text style={styles.paragraph}>• We prioritize data security through encryption and retain information as needed.</Text>
          <Text style={styles.paragraph}>• You have rights to access, control, and delete your personal information.</Text>
          <Text style={styles.paragraph}>• We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy.</Text>
          <Text style={styles.paragraph}>• Policy updates will be posted; please review periodically.</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
  policyBox: {
    backgroundColor: '#2E8B8B',
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
    paddingBottom: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  content: {
    marginTop: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    marginBottom: 10,
  },
});

export default PrivacyPolicyScreen;
