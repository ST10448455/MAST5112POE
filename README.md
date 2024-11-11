https://github.com/ST10448455/MAST5112POE I did improvements on my POE by adding a new code and making sure that the app is running.I created this app using azure labs and android studio.. I developed this app to allow users to perform specific tasks on a mobile or either desktop device. I did a home screen that displays the average  price of the menu items broken down into the different courses. My application has 5 pages. The home screen displays average price and 4 buttons linking to the other pages. When you click on the Manage Menu button it will display a menu page where a user can add and remove items on the menu, then there is a back button arrow that you can click then it will take you bac to the home page. There is a View starters button, when you click on it it display the guest menu with only the starters menu to see which starters are available then when you done viewing the starters menu you will click on the back arrow to return to the home screen. When you click on the View mains button it will display the main menu items, when you click on the back arrow it will take you back to the home screen. Then lastly you will click on the View desserts buttton, it will display the desserts menu. Those are the improvements l did on my application. Then after l tested it to see if it’s working.
https://youtu.be/n26qAhCiDEg a video link recording showing the app features in action.

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './secondpage';
import ManageMenuScreen from './ManageMenuScreen';
import GuestMenuScreen from './guest';

const Stack = createStackNavigator();

export interface MenuItem {
  id: string;
  name: string;
  course: string;
  price: number;
}

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Bread and butter', course: 'Starters', price: 40.00 },
    { id: '2', name: 'Vegetable soup', course: 'Starters', price: 33.00 },
    { id: '3', name: 'Creamy pasta', course: 'Mains', price: 159.00 },
    { id: '4', name: 'Beef lasagne', course: 'Mains', price: 200.00 },
    { id: '5', name: 'Malva pudding', course: 'Desserts', price: 56.00 },
    { id: '6', name: 'Chocolate Mousse', course: 'Desserts', price: 86.00 },
    { id: '7', name: 'Grilled steak & chips', course: 'Mains', price: 175.00 }, // New item
    { id: '8', name: 'Cheeseburger & chips', course: 'Mains', price: 150.00 }, // New item
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="Manage Menu" options={{ title: 'Manage Menu' }}>
          {(props) => (
            <ManageMenuScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Guest Menu">
          {(props) => <GuestMenuScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 

export default App;

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

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MenuItem } from './App';

interface Props {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const ManageMenuScreen: React.FC<Props> = ({ menuItems = [], setMenuItems }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Starters');

  const addItem = () => {
    if (name && price) {
      const newItem: MenuItem = {
        id: (menuItems.length + 1).toString(),
        name,
        price: parseFloat(price),
        course,
      };
      setMenuItems([...menuItems, newItem]);
      setName('');
      setPrice('');
    } else {
      alert('Please enter a valid name and price.');
    }
  };

  const removeItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Menu Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{`${item.name} - R${item.price.toFixed(2)}`}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#808080', // Gray color for Add Item button
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#808080', // Gray color for Remove button
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontSize: 18,
  },
});

export default ManageMenuScreen;

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MenuItem } from './App';

interface Props {
  menuItems: MenuItem[];
}

const GuestMenuScreen: React.FC<Props> = ({ menuItems = [] }) => {  // Default to empty array
  const route = useRoute<RouteProp<{ params: { course: string } }, 'params'>>();
  const { course } = route.params;

  // Safe filter check to avoid crashes
  const filteredItems = menuItems?.filter((item) => item.course === course) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{course} Menu</Text>
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.text}>{`${item.name} - $${item.price.toFixed(2)}`}</Text>
          )}
        />
      ) : (
        <Text style={styles.text}>No items found for this course.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 8,
  },
});

export default GuestMenuScreen;
