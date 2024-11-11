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
