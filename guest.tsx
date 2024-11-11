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