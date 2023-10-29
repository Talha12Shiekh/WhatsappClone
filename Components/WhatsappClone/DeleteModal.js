import { Modal, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { ACTIONS } from "./MessagesReducer";
import { ACTIVE_TAB_GREEN_COLOR,MODAL_BACKGROUND_COLOR,MODAL_TEXT_COLOR } from "./WhatsappMainScreen";

const DeleteModal = ({modalVisible,setModalVisible,selectedMessages,handleShowSelectionInAlert,showDeleteforeveryone,dispatch}) => {
  
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: -1,
          }}
        >
          <View
            style={{
              width: "90%",
              height: !showDeleteforeveryone ? 200 : 120,
              backgroundColor: MODAL_BACKGROUND_COLOR,
              zIndex: 999999999,
              padding: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: MODAL_TEXT_COLOR,
                  fontSize: 17,
                  marginLeft: 10,
                }}
              >
                {selectedMessages?.length > 1
                  ? "Delete " + selectedMessages.length + " messages"
                  : handleShowSelectionInAlert()}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                flex: 1,
                justifyContent: "space-around",
                marginTop: !showDeleteforeveryone ? 10 : 30,
                flexDirection: showDeleteforeveryone ? "row" : "column",
                gap: 10,
              }}
            >
              {!showDeleteforeveryone && (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible((v) => !v);
                    dispatch({
                      type: ACTIONS.DELETE_FOR_EVERYONE,
                    });
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: ACTIVE_TAB_GREEN_COLOR,
                      fontWeight: "bold",
                    }}
                  >
                    Delete for everyone
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible((v) => !v);
                  dispatch({
                    type: ACTIONS.DELETE_MESSAGES,
                  });
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    color: ACTIVE_TAB_GREEN_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  Delete for me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible((v) => !v)}>
                <Text
                  style={{
                    textAlign: "right",
                    color: ACTIVE_TAB_GREEN_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteModal;
