import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FAQScreen = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: 'What is this application and how does it work?',
      answer:
        'The application allows you to scan and digitize handwritten medical prescriptions, converting them into clear, readable text. It also provides detailed information about your medications and securely stores your prescription history.',
    },
    {
      id: 2,
      question: 'How does the prescription scanning feature work?',
      answer:
        'The application uses AI-based Optical Character Recognition (OCR) technology to extract text from handwritten prescriptions and convert it into a digital format.',
    },
    {
      id: 3,
      question:
        'Will the app suggest alternative medicines if the prescribed one is unavailable?',
      answer:
        'Yes, the app can suggest alternatives with similar compositions in case a prescribed medication is unavailable.',
    },
    {
      id: 4,
      question: 'Can I store multiple prescriptions in the app?',
      answer:
        'Yes, you can securely store all your prescriptions and access them anytime, even if the physical document is lost.',
    },
    {
      id: 5,
      question: "Is the app available offline?",
      answer: "Basic features like viewing your stored prescriptions work offline, but scanning new prescriptions and accessing detailed medication information requires an internet connection."
    }
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>FAQs</Text>
        {faqs.map(faq => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => setExpanded(expanded === faq.id ? null : faq.id)}>
              <Text style={styles.question}>{faq.question}</Text>
              <Ionicons
                name={expanded === faq.id ? 'remove-circle' : 'add-circle'}
                size={24}
                color="#318F93"
              />
            </TouchableOpacity>
            {expanded === faq.id && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
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
    zIndex: 10,
    padding: 10,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 50, 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    width: '90%',
    marginTop: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  answer: {
    marginTop: 5,
    fontSize: 16,
    color: 'gray',
  },
});

export default FAQScreen;

