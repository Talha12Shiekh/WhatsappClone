import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { ImageBackground } from "react-native";
import {
  BADGE_BACKGROUND_COLOR,
  BLUE_TICK_BACKGROUND,
  CHAT_BACKROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  CHAT_SELECTION_BACKGROUND,
  GREEN_MESSAGE_CLICKED_BACKGROUND,
  MESSAGE_BACKGROUND_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
  generateSendTick,
} from "./WhatsappMainScreen";
import {
  FontAwesome5,
  Ionicons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

const MessagesInfo = ({ route }) => {
  const { InfoMessages, item } = route.params;

  const messageLenght = "Gzjzgidgkskfhdhahflhflhjgjljjjjl";

  let ColumnOrRow =
    InfoMessages.message.length > messageLenght.length ? "column" : "row";

  const messageRef = useRef(null);

  const messageCornerRef = useRef(null);

  let Messagestyles = [styles.message];

  let MessageCornerStyles = [styles.messageCorner];

  const handleSelectMessage = () => {
    Messagestyles.push(styles.messageClickedBackground);
    MessageCornerStyles.push(styles.messageClickedBackground);
    messageRef.current.setNativeProps({
      style: Messagestyles,
    });
    messageCornerRef.current.setNativeProps({
      style: MessageCornerStyles,
    });
  };
  const handleDeSelectMessage = () => {
    Messagestyles.push(styles.messageBackground);
    MessageCornerStyles.push(styles.messageBackground);
    messageRef.current.setNativeProps({
      style: Messagestyles,
    });
    messageCornerRef.current.setNativeProps({
      style: MessageCornerStyles,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{ marginTop: 70, marginRight: 30, paddingHorizontal: 10 }}>
          <Pressable
            onPressIn={handleSelectMessage}
            onPressOut={handleDeSelectMessage}
          >
            <View style={[styles.messagesContainer, { alignSelf: "flex-end" }]}>
              <View style={[styles.messageCorner]} ref={messageCornerRef} />
              <View ref={messageRef} style={[styles.message]}>
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
                        {/* {InfoMessages.hours}:{InfoMessages.minutes}{" "}
                        {InfoMessages.am_pm.toLowerCase()}{" "} */}
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
          </Pressable>
        </View>
        <View style={styles.bottomSheet}>
          <View style={styles.messageInfoContainer}>
            <View style={styles.singleInfoMessage}>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  <Ionicons
                    name="checkmark-done"
                    size={18}
                    color={BLUE_TICK_BACKGROUND}
                  />{" "}
                </Text>

                <Text style={{ color: TITLE_COLOR, fontSize: 17 }}>Read</Text>
              </View>

              <Text style={{ color: CHAT_DATA_STATUS_COLOR,marginTop:2,fontSize:17 }}>
                8 July, 10:45 pm
              </Text>
            </View>
            <View style={styles.centerLine} />
            <View>
            <View style={styles.singleInfoMessage}>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  <Ionicons
                    name="checkmark-done"
                    size={17}
                    color={CHAT_DATA_STATUS_COLOR}
                  />{" "}
                </Text>

                <Text style={{ color: TITLE_COLOR, fontSize: 17 }}>Delivered</Text>
              </View>

              <Text style={{ color: CHAT_DATA_STATUS_COLOR,marginTop:2,fontSize:17 }}>
                8 July, 10:45 pm
              </Text>
            </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessagesInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:CHAT_SELECTION_BACKGROUND
  },
  message: {
    padding: 7,
    borderRadius: 10,
    marginBottom: 5,
    transform: [{ translateX: 20 }],
    flexDirection: "row",
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
  },
  messagesContainer: {
    maxWidth: "80%",
  },
  messageCorner: {
    width: 15,
    height: 15,
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
    position: "absolute",
    zIndex: -1,
    right: -25,
    borderBottomLeftRadius: 100,
    top: 0,
    transform: [{ rotate: "270deg" }],
  },
  messageClickedBackground: {
    backgroundColor: GREEN_MESSAGE_CLICKED_BACKGROUND,
  },
  messageBackground: {
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: CHAT_BACKROUND_COLOR,
    marginTop: 20,
  },
  messageInfoContainer: {
    width: "90%",
    height: 160,
    backgroundColor: CHAT_SELECTION_BACKGROUND,
    margin: 20,
  },
  singleInfoMessage: {
    padding: 12,
  },
  centerLine: {
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: CHAT_DATA_STATUS_COLOR,
    marginTop: 5,
  }
});
