// app/playerView.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePlayerContext } from './PlayerContext';

export default function PlayerView() {
  const { players } = usePlayerContext();
  const [index, setIndex] = useState(0);
  const router = useRouter();

  if (players.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.warning}>Nenhum jogador adicionado.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentPlayer = players[index];

  const nextPlayer = () => {
    if (index + 1 < players.length) {
      setIndex(index + 1);
    } else {
      // Todos os jogadores já foram mostrados
      alert('Fim dos jogadores!');
      router.back(); // volta para o início ou ecrã anterior
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${index + 1}º Player`}</Text>
      {currentPlayer.image && (
        <Image source={{ uri: currentPlayer.image }} style={styles.image} />
      )}
      <Text style={styles.name}>{currentPlayer.name}</Text>
      <TouchableOpacity style={styles.nextButton} onPress={nextPlayer}>
        <Text style={styles.buttonText}>Próximo</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#56e0e0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  backButton: {
    backgroundColor: '#56e0e0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  warning: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
});
