// app/index.tsx
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VILLAGE</Text>
      <Image
        source={require('../assets/images/tomate.png')}
        style={styles.tomato}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={() => router.push('/game')}>
        <Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9966ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 65,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: '#555',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  tomato: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#b0c4a7',
    paddingHorizontal: 90,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#2f5d41',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
