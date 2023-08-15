import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import {
  MESSAGE_BACKGROUND_COLOR,
  TITLE_COLOR,
  generateSendTick,
} from "./WhatsappMainScreen";

const MessagesInfo = ({ route }) => {
  const { InfoMessages, item } = route.params;

  const messageLenght = "Gzjzgidgkskfhdhahflhflhjgjljjjjl";

  let ColumnOrRow = InfoMessages.message.length > messageLenght.length ? "column" : "row";
  return (
    <ImageBackground source={{ uri: item.photo }} style={styles.container}>
      <View style={styles.container}>
        <View style={{ marginTop: 70 ,marginRight:30}}>
          <View style={{ alignSelf: "flex-end" }}>
            <View
              ref={InfoMessages.ref}
              style={[
                styles.message,
                {
                  transform: [{ translateX: 20 }],
                  flexDirection: "row",
                  backgroundColor: MESSAGE_BACKGROUND_COLOR
                },
              ]}
            >
              <View
                style={{
                  flexDirection: ColumnOrRow,
                }}
              >
                  <View>
                    <Text
                      style={{
                        color: TITLE_COLOR,
                        fontSize: 15,
                        marginRight: 10,
                      }}
                    >
                      {InfoMessages.message}
                    </Text>
                  </View>
                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 5,
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Text style={{ color: TITLE_COLOR, fontSize: 10 }}>
                      {InfoMessages.hours}:{InfoMessages.minutes} {InfoMessages.am_pm.toLowerCase()}
                    </Text>
                  </View>
                    <View>
                      <Text style={{ color: TITLE_COLOR, fontSize: 10 }}>
                        {generateSendTick(InfoMessages.messageStatus)}
                      </Text>
                    </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default MessagesInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 7,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
  },
  messagesContainer: {
    flex: 1,
    flexWrap: "wrap",
    maxWidth: "80%",
  },
  messageCorner: {
    width: 15,
    height: 15,
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
    position: "absolute",
    zIndex: -1,
    right: 12,
    borderBottomLeftRadius: 100,
    top: 0,
    transform: [{ rotate: "270deg" }],
  },
});
