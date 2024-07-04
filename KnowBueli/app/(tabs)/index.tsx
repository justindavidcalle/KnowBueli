import { Image, StyleSheet, Platform, Button, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/add');
  };

  return (
    <View style={styles.container}>
      <Text>KNOWBÜELI</Text>
      <View>
      </View>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Person hinzufügen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
});
