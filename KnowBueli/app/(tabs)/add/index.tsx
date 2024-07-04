import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

const Add = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [average, setAverage] = useState('');
  const [room, setRoom] = useState('')

  const addStudent = () => {
    const data = JSON.stringify({
      "collection": "students",
      "database": "db",
      "dataSource": "BueliCluster",
      "document": {
        "name": name,
        "surname": surname,
        "birthdate": birthdate,
        "average": average,
        "room": room
      }
    });

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'kbfvnYJw7Oi4IFDss0owdGsPPMRXFmAJ6ih7iRMm1NGLye5gZH2FNHVLZt2qO8g9',
      },
      body: data
    };

    fetch('https://eu-central-1.aws.data.mongodb-api.com/app/data-rdttqvv/endpoint/data/v1/action/insertOne', config)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        Alert.alert('Erfolg', 'Schüler erfolgreich hinzugefügt');
        setName('');
        setSurname('');
        setBirthdate('');
        setAverage('');
        setRoom('');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Fehler', 'Fehler beim Hinzufügen des Schülers');
      });
  };

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.input}
        placeholder='Name'
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder='Nachname'
        onChangeText={setSurname}
        value={surname}
      />
      <TextInput
        style={styles.input}
        placeholder='Geburtsdatum'
        onChangeText={setBirthdate}
        value={birthdate}
      />
      <TextInput
        style={styles.input}
        placeholder='Notendurchschnitt'
        onChangeText={setAverage}
        value={average}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Klasse'
        onChangeText={setRoom}
        value={room}
      />
      <Button title='hinzufügen' onPress={addStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 50,
    width: 250,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    backgroundColor: 'white'
  }
});

export default Add;
