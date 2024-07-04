import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, Button, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text, FlatList } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = JSON.stringify({
      "collection": "students",
      "database": "db",
      "dataSource": "BueliCluster",
      "filter": { "room": "3I" }
    });

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'kbfvnYJw7Oi4IFDss0owdGsPPMRXFmAJ6ih7iRMm1NGLye5gZH2FNHVLZt2qO8g9',
      },
      body: data
    };

    fetch('https://eu-central-1.aws.data.mongodb-api.com/app/data-rdttqvv/endpoint/data/v1/action/find', config)
      .then(response => response.json())
      .then(data => {
        setStudents(data.documents);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handlePress = () => {
    router.push('/add');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name} {item.surname}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>KNOWBÜELI</Text>
      <Text style={styles.title}>3I</Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Person hinzufügen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
