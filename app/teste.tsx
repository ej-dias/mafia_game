import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const Teste = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBotton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchText}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.secondContainer}></View>
    </View>
  );
};

export default Teste;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3e5c6e",
  },
  secondContainer: {
    padding: 50,
    backgroundColor: "#fcedd3",
    alignItems: "center",
    justifyContent: "center",
  },
  backBotton: {
    marginTop: 10,
    width: 50,
    height: 30,
    marginLeft: 10,
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#3e5c6e",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 35,
  },
  searchBar: {
    position: "absolute",
    zIndex: 1,
    marginTop: 50,
    width: "80%",
    height: 30,
    backgroundColor: "#f5f6f8",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  searchText: {
    marginLeft: 20,
  },
});
