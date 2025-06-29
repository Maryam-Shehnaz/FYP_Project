import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';

const ChatbotScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [typing, setTyping] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    try {
      socketRef.current = io('http://192.168.1.102:8756');

      socketRef.current.on('connect', () => {
        setConnectionStatus('Connected');
      });

      socketRef.current.on('bot_response', (data) => {
        setTyping(false);
        setMessages((prev) => [...prev, { sender: 'bot', text: data }]);
      });

      socketRef.current.on('connect_error', (error) => {
        setConnectionStatus('Disconnected');
      });

      socketRef.current.on('disconnect', () => {
        setConnectionStatus('Disconnected');
      });

      setTimeout(() => {
        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit('echo', 'Send Welcome greeting');
        }
      }, 1000);

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    } catch (error) {
      setConnectionStatus('Disconnected');
    }
  }, []);

  const sendMessage = () => {
    if (input.trim() && socketRef.current && socketRef.current.connected) {
      setMessages((prev) => [...prev, { sender: 'user', text: input }]);
      socketRef.current.emit('echo', input);
      setInput('');
      setTyping(true);
    }
  };

  const handleClose = () => {
    navigation.navigate('Dashboard'); 
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderText}>MedAssist</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.connectionStatus, connectionStatus === 'Connected' ? styles.connected : styles.disconnected]}>
        {connectionStatus}
      </Text>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={message.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            {message.sender === 'bot' && (
              <View style={styles.botContent}>
                <View style={styles.botIcon}>
                  <Text style={styles.botIconText}>M</Text>
                </View>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            )}
            {message.sender === 'user' && (
              <Text style={styles.messageText}>{message.text}</Text>
            )}
          </View>
        ))}
        {typing && <Text style={styles.typingIndicator}>Typing...</Text>}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatHeader: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  chatHeaderText: {
    color: '#318F93',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  closeButtonText: {
    color: '#318F93',
    fontSize: 18,
  },
  connectionStatus: {
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
  },
  connected: {
    color: 'green',
  },
  disconnected: {
    color: 'red',
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 18,
    padding: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#318F93',
    color: 'white',
    marginBottom: 10,
    borderRadius: 18,
    padding: 10,
    maxWidth: '80%',
  },
  botContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  botIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#318F93',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  botIconText: {
    color: '#318F93',
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 14,
    flexShrink: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  messageInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#318F93',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 18,
    marginBottom: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default ChatbotScreen;
