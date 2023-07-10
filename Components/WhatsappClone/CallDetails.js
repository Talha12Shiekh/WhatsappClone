import { Text, View, StyleSheet } from "react-native";
import { CallReusableComponent, NormalChatComponent, showToast } from "./RippleButton";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TITLE_COLOR,
  CHAT_DATA_STATUS_COLOR,
} from "./WhatsappMainScreen";
import { ChatGreenLeftComponent } from "./RippleButton";
import { Feather,MaterialIcons,Entypo  } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";


const CallDetails = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("spain");
  const [items, setItems] = useState([
    { label: "Spain", value: "spain" },
    { label: "Madrid", value: "madrid" },
    { label: "Barcelona", value: "barcelona" },

    { label: "Italy", value: "italy" },
    { label: "Rome", value: "rome" },

    { label: "Finland", value: "finland" },
  ]);

  function generatePassword() {
    let length = 22,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    n = charset.length;
    for (let i = 0; i < length; i++) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  const passwordString = generatePassword();

  const [text,settext] = useState(`https://call.whatsapp.com/video/${passwordString}`);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
  };

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
                <View style={{ marginBottom: 10 }}>
                  <ChatGreenLeftComponent>
                    <Feather name="video" size={23} color={TITLE_COLOR} />
                  </ChatGreenLeftComponent>
                </View>
              );
            }}
            showText={false}
            text={text}
          />
        </View>
        <View>
          <Text style={styles.dropDowntext}>To :</Text>
          <DropDownPicker
            open={open}
            items={items}
            setOpen={setOpen}
            setItems={setItems}
            theme="DARK"
            value={value}
            setValue={setValue}
          />
        </View>
      </View>
      <View style={styles.bottomContentContainer}>
      <CallReusableComponent
          Children={() => {
            return (
              <Feather name="video" size={23} color={CHAT_DATA_STATUS_COLOR} />
            );
          }}
          text={"Call Type"}
          onPress={() => {
            copyToClipboard();
            showToast("Text Copied to Clipboard")
          }}
        />
        <CallReusableComponent
          Children={() => {
            return (
              <MaterialIcons name="content-copy" size={23} color={CHAT_DATA_STATUS_COLOR} />
            );
          }}
          text={"Copy Link"}
          onPress={() => {}}
        />
        <CallReusableComponent
          Children={() => {
            return (
              <Entypo name="share" size={24} color={CHAT_DATA_STATUS_COLOR} />
            );
          }}
          text={"Share link"}
          onPress={() => {}}
        />
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
  dropDowntext: {
    color: TITLE_COLOR,
    marginVertical: 14,
    fontSize: 18,
  },
  bottomContentContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: CHAT_DATA_STATUS_COLOR,
    marginTop: 30,
  },
});

export default CallDetails;
