import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Page = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const data = JSON.stringify({
      "collection": "students",
      "database": "db",
      "dataSource": "BueliCluster",
      "filter": { "_id": { "$oid": id } }
    });

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'kbfvnYJw7Oi4IFDss0owdGsPPMRXFmAJ6ih7iRMm1NGLye5gZH2FNHVLZt2qO8g9',
      },
      body: data
    };

    fetch('https://eu-central-1.aws.data.mongodb-api.com/app/data-rdttqvv/endpoint/data/v1/action/findOne', config)
      .then(response => response.json())
      .then(data => {
        setStudent(data.document);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!student) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleTitlePress = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleTitlePress}>
        <Text style={styles.mainTitle}>KNOWBÜELI</Text>
      </Pressable>
      <Text style={styles.title}>{student.name} {student.surname}</Text>
      <Text>Klasse: {student.room}</Text>
      <Text>Geburtsdatum: {student.birthdate}</Text>
      <Text>Notendurchschnitt: {student.average}</Text>
    </View>
  );
};

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
    marginBottom: 20,
  },
});

export default Page;
