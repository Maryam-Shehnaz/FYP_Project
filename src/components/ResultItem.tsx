// components/ResultItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';

interface ResultItemProps {
  label: string;
  value: any;
}

export const ResultItem = ({ label, value }: ResultItemProps) => (
  <View style={styles.resultItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>
      {Array.isArray(value) ? value.join('\n') : value}
    </Text>
  </View>
);
