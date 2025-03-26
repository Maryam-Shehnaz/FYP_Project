import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import {colors} from './../../utils/colors';

// Medicine type definition
type Medicine = {
  id: number;
  name: string;
  [key: string]: string | number | undefined; // Dynamic properties
};

const CheckMedicineScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // Fetch data from API
  const searchMedicine = async (query: string) => {
    try {
      const response = await fetch(
        `http://10.0.2.2:5000/getMedicine?medicine_name=${query}`,
      );
      const data: Medicine[] = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Medicine Name:</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search medicine"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Search"
          onPress={() => searchMedicine(query)}
          color={colors.primary}
        />
      </View>

      {/* Medicine List */}
      <FlatList
        data={medicines}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          // Extract substitutes
          const substitutes = Object.entries(item)
            .filter(
              ([key, value]) =>
                key.startsWith('substitute') && value !== 'unknown',
            )
            .map(([_, value]) => value);

          // Extract side effects
          const sideEffects = Object.entries(item)
            .filter(
              ([key, value]) =>
                key.startsWith('sideEffect') && value !== 'unknown',
            )
            .map(([_, value]) => value);

          // Extract uses
          const uses = Object.entries(item)
            .filter(
              ([key, value]) => key.startsWith('use') && value !== 'unknown',
            )
            .map(([_, value]) => value);

          return (
            <View style={styles.medicineCard}>
              <Text style={styles.medicineName}>Name: {item.name}</Text>

              {/* Display substitutes */}
              {substitutes.length > 0 && (
                <View>
                  <Text style={styles.sectionTitle}>Substitutes:</Text>
                  {substitutes.map((sub, index) => (
                    <Text key={index} style={styles.listItem}>
                      {index + 1}. {sub}
                    </Text>
                  ))}
                </View>
              )}

              {/* Display side effects */}
              {sideEffects.length > 0 && (
                <View>
                  <Text style={styles.sectionTitle}>Side Effects:</Text>
                  {sideEffects.map((effect, index) => (
                    <Text key={index} style={styles.listItem}>
                      {index + 1}. {effect}
                    </Text>
                  ))}
                </View>
              )}

              {/* Display uses */}
              {uses.length > 0 && (
                <View>
                  <Text style={styles.sectionTitle}>Uses:</Text>
                  {uses.map((use, index) => (
                    <Text key={index} style={styles.listItem}>
                      {index + 1}. {use}
                    </Text>
                  ))}
                </View>
              )}
              <Text style={{ marginTop: 6 }} /> 

              <Text>
                <Text style={styles.detailLabel}>Chemical Class:</Text>{' '}
                {item['Chemical Class']}
              </Text>
              <Text>
                <Text style={styles.detailLabel}>Habit Forming:</Text>{' '}
                {item['Habit Forming']}
              </Text>
              <Text>
                <Text style={styles.detailLabel}>Therapeutic Class:</Text>{' '}
                {item['Therapeutic Class']}
              </Text>
              <Text>
                <Text style={styles.detailLabel}>Action Class:</Text>{' '}
                {item['Action Class']}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },

  medicineCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  medicineName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
  },
  listItem: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  detailText: {
    fontSize: 14,
    color: '#444',
    marginTop: 3,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',

  },
  
});

export default CheckMedicineScreen;
