import React, { useState } from "react";
import { View } from "react-native";
import { Modal, StyleSheet } from "react-native";
import EmojiModal from 'react-native-emoji-modal';

const ModalScreen = ({modalVisible,setModalVisible,setemojis}) => {
  return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <EmojiModal columns={4} emojiSize={60} onEmojiSelected={(emoji) => {
            setModalVisible(false)
            const emojiObject = {key:Date.now().toString(),emoji:emoji};
            setemojis((emjis) => [...emjis,emojiObject]);
        }} />
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "rgba(0,0,0,.5)",
    alignItems: "center",
    flex:1,
    justifyContent:"center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalScreen;
