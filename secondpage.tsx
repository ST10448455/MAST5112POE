import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MenuItem } from './App';
import { useNavigation } from '@react-navigation/native';

interface Props {
  menuItems: MenuItem[];
}

const HomeScreen: React.FC<Props> = ({ menuItems }) => {
  const navigation = useNavigation();

  const calculateAveragePrice = (course: string) => {
    const filteredItems = menuItems.filter(item => item.course === course);
    const totalPrice = filteredItems.reduce((acc, item) => acc + item.price, 0);
    return filteredItems.length ? (totalPrice / filteredItems.length).toFixed(2) : '0.00';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Average Menu Prices</Text>
      <View style={styles.averagePriceContainer}>
        <Text style={styles.averagePriceText}>Starters: R{calculateAveragePrice('Starters')}</Text>
        <Text style={styles.averagePriceText}>Mains: R{calculateAveragePrice('Mains')}</Text>
        <Text style={styles.averagePriceText}>Desserts: R{calculateAveragePrice('Desserts')}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Manage Menu')}>
          <Text style={styles.buttonText}>Manage Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Guest Menu', { course: 'Starters' })}>
          <Text style={styles.buttonText}>View Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Guest Menu', { course: 'Mains' })}>
          <Text style={styles.buttonText}>View Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Guest Menu', { course: 'Desserts' })}>
          <Text style={styles.buttonText}>View Desserts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  averagePriceContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  averagePriceText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#808080', // Gray color for buttons
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%', // Adjust width as needed
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontSize: 18,
  },
});

export default HomeScreen;
