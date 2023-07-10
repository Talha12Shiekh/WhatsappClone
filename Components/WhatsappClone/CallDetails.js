import { Text, View, StyleSheet } from "react-native";
import { NormalChatComponent } from "./RippleButton";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import { ChatGreenLeftComponent } from "./RippleButton";
import { Feather } from "@expo/vector-icons";

const CallDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Anyone with WhatsApp can use this link to join this call. Only share
            it with people you trust.
          </Text>
        </View>
        <View style={styles.callLinkContainer}>
          <NormalChatComponent
            LeftComponent={() => {
              return (
                <View style={{marginBottom:10}}>
                  <ChatGreenLeftComponent>
                    <Feather name="video" size={20} color={TITLE_COLOR} />
                  </ChatGreenLeftComponent>
                </View>
              );
            }}
            showText={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHAT_BACKROUND_COLOR,
  },
  textContainer: {
    marginVertical: 25,
  },
  topContentContainer: {
    width: "90%",
    alignSelf: "center",
  },
  text: {
    color: TITLE_COLOR,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "400",
  },
});

export default CallDetails;
