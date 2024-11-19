import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";
import { TextInput } from "react-native-gesture-handler";

export default function DialogPopUp() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button onPress={showDialog} title="åpqwoeased" />
      <Dialog.Container visible={visible}>
        <Dialog.Title style={{ color: "gold" }}>
          Arvioi elokuva 1-10
        </Dialog.Title>
        <View style={styles.inputcon}>
          <TextInput style={styles.input} keyboardType="numeric"></TextInput>
        </View>
        <Dialog.Button label="Peruuta" onPress={handleCancel} />
        <Dialog.Button label="Lisää" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputcon: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderBlockColor: "gold",
  },
  input: {
    textAlign: "center",
    height: 40,
    width: 100,
    padding: 10,
    color: "gold",
    fontSize: 24,
    fontWeight: "bold",
  },
});
