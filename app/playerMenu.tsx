import { AntDesign } from "@expo/vector-icons"; // Para o ícone de busca
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { usePlayerContext } from "./PlayerContext";

import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PlayerMenu() {
  const { players, setPlayers } = usePlayerContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const addPlayer = () => {
    if (newName.trim() === "") return;

    setPlayers([...players, { name: newName, image: newImage }]);
    setNewName("");
    setNewImage(null);
    setModalVisible(false);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const removePlayer = (index: number) => {
    const updated = [...players];
    updated.splice(index, 1);
    setPlayers(updated);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add Player</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <AntDesign
          name="search1"
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
      </View>

      <View style={styles.playersListContainer}>
        <FlatList
          data={filteredPlayers}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              <View style={styles.playerRow}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.circle} />
                ) : (
                  <View style={styles.circle} />
                )}
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.playerName}>{item.name}</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => {
                        openImagePicker().then(() => {
                          const updatedPlayers = [...players];
                          updatedPlayers[index].image = newImage;
                          setPlayers(updatedPlayers);
                        });
                      }}
                    >
                      <Text>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => removePlayer(index)}
                    >
                      <Text>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Nome do jogador"
                value={newName}
                onChangeText={setNewName}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={openImagePicker}
                style={styles.imagePicker}
              >
                <Text>Selecionar imagem</Text>
              </TouchableOpacity>
              {newImage && (
                <Image source={{ uri: newImage }} style={styles.previewImage} />
              )}
              <TouchableOpacity
                onPress={addPlayer}
                style={styles.confirmButton}
              >
                <Text style={styles.nameText}>Adicionar Jogador</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "red", marginTop: 10 }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#cb6ce6",
  },
  playersListContainer: {
    flex: 1,
    backgroundColor: "#8c52ff",
    borderRadius: 10,
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 5,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    width: 70,
    height: 70,
    backgroundColor: "#a4b0be",
    borderRadius: 35,
  },
  playerName: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 0,
    marginLeft: 10,
  },
  actionButton: {
    backgroundColor: "#a4b0be",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  separator: {
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#56e0e0",
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#56e0e0",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  nameText: {
    fontWeight: "bold",
  },
  backButton: {
  backgroundColor: '#56e0e0',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 8,
  alignSelf: 'flex-start',
  marginBottom: 10,
},
backButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

});
