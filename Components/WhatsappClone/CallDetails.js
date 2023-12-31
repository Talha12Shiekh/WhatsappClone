import {
  Text,
  View,
  StyleSheet,
  Share,
  Modal,
} from "react-native";
import { CallReusableComponent, showToast,Button as CallButton } from "./Helpers";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TITLE_COLOR,
  CHAT_DATA_STATUS_COLOR,
} from "./Variables";
import { ChatGreenLeftComponent } from "./Helpers";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import Checkbox from "expo-checkbox";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {Button} from "./Helpers";
import { Ionicons } from "@expo/vector-icons";
import { useCallsChatsContext, useCallsContext, useChatsContext,useCallsFilterChatsContext } from "../../App";
import CallTypeModal from "./CallTypeModal";

const CallDetails = ({ route, navigation }) => {
  const {setRepatedDates} = route.params;

  const {chats} = useChatsContext();

  const {callChats} = useCallsChatsContext();

  const { setcalls, calls} = useCallsContext();

  const {setcallFilterChats} = useCallsFilterChatsContext()

  const [items, setItems] = useState([]);

  let chatsNames = chats.map(chat => chat.name)

  useEffect(() => {
    let newChats = [...callChats];
    let newArr = newChats.filter(call => chatsNames.includes(call.name));
    const updatedDropdownItems = newArr.map((chat) => {
      return {
        value: chat.name,
        label: chat.name,
        key: Date.now().toString(),
      };
    });
    setItems(updatedDropdownItems);
  }, [callChats]);

  const [open, setOpen] = useState(false);

  const [selectedItems, setselectedItems] = useState(null);

  const [value, setValue] = useState(callChats[0]?.value);

  const [modalVisible, setModalVisible] = useState(false);

  const [Video, setVideo] = useState(true);

  const [Voice, setVoice] = useState(false);

  const time = new Date();

  const date = time.getDate();

  const month = time.getMonth();

  const year = time.getFullYear();

  const timeofcall = new Date();
  const hour =
    timeofcall.getHours() > 12
      ? timeofcall.getHours() - 12
      : timeofcall.getHours();
  const minutes =
    timeofcall.getMinutes() > 9
      ? timeofcall.getMinutes()
      : "0" + timeofcall.getMinutes();
  const am_pm = timeofcall.getHours() >= 12 ? "PM" : "AM";

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

  const [arrowRandom, setarrowRandom] = useState(0);

  const [callStatus, setCallStatus] = useState("incoming");

  useEffect(() => {
    setarrowRandom(Math.floor(Math.random() * 3));
  }, []);

  useEffect(() => {
    if (arrowRandom == 0) {
      setCallStatus("incoming");
    } else if (arrowRandom == 1) {
      setCallStatus("outgoing");
    } else {
      setCallStatus("missed");
    }
  }, [arrowRandom]);

  const [text, settext] = useState(
    `https://call.whatsapp.com/video/${passwordString}`
  );

  useEffect(() => {
    settext(
      `https://call.whatsapp.com/${Video ? "video" : "voice"}/${passwordString}`
    );
  }, [Video]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Use this link to join my WhatsApp video call : ${text}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMakeCall = () => {
    let photoObject = callChats.find((chat) => chat.name == selectedItems);
    const callObject = {
      name: selectedItems ? selectedItems : callChats[0]?.value,
      about: selectedItems ? photoObject?.about : callChats[0]?.about,
      key: Date.now().toString(),
      photo: selectedItems ? photoObject?.photo : callChats[0]?.photo,
      video: Video,
      type: "call",
      number: selectedItems ? photoObject?.number : callChats[0]?.number,
      arrowColor: callStatus,
      count: 0,
      selected: false,
      blocked: false,
      pinned:true,
      messages:[],
      time:Date.now()
    };

    let callsNames = calls.map((call) => call.name);

    if (callsNames.includes(callObject.name)) {
      let newCalls = [...calls];
      let findedCall = newCalls.find((call) => call.name == callObject.name);
      setRepatedDates((prev) => [
        ...prev,
        {
          key:Date.now().toString(),
          video:Video,
          type: "call",
          hour,
          minutes,
          am_pm,
          arrowColor: findedCall.arrowColor,
          count: 0,
        },
      ]);
      if (findedCall) {
        findedCall.count += 1;
        setcalls([...calls]);
      }
    } else {
      setcalls((prev) => [...prev, callObject]);
      setcallFilterChats((prev) => [...prev, callObject]);
    }
    navigation.navigate("Calls");
  };

  const [visibleTypeModal,setvisibleTypeModal] = useState(false);

  return (
    <View style={styles.container}>
      <CallTypeModal visibleTypeModal={visibleTypeModal} setvisibleTypeModal={setvisibleTypeModal} setVoice={setVoice}
      setVideo={setVideo}
      />
      <View style={styles.topContentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Anyone with WhatsApp can use this link to join this call. Only share
            it with people you trust.
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginBottom: 10 }}>
            <ChatGreenLeftComponent>
              {Video ? (
                <Feather name="video" size={23} color={TITLE_COLOR} />
              ) : (
                <Ionicons name="call" size={23} color={TITLE_COLOR} />
              )}
            </ChatGreenLeftComponent>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ marginLeft: 15 }}>
                <Text style={{ color: "lightblue", fontSize: 15 }}>{text}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.dropDowntext}>To :</Text>
          <View style={{ zIndex: 999999999999 }}>
            <DropDownPicker
              open={open}
              items={items}
              setOpen={setOpen}
              setItems={setItems}
              theme="DARK"
              value={value}
              setValue={setValue}
              zIndex={5000}
              searchable={true}
              zIndexInverse={3000}
              listMode="MODAL"
              max={10}
              onSelectItem={(item) => {
                setselectedItems(item.value);
              }}
              labelStyle={{
                fontSize: 25,
                color: TITLE_COLOR,
                margin: 10,
              }}
              textStyle={{ fontSize: 20 }}
            />
          </View>
        </View>
      </View>
      <View style={[styles.bottomContentContainer, { zIndex: -1 }]}>
        <CallReusableComponent
          Children={() => {
            return (
              <Feather name="video" size={23} color={CHAT_DATA_STATUS_COLOR} />
            );
          }}
          text={"Call Type"}
          onPress={() => {
            setvisibleTypeModal((vsble) => !vsble);
          }}
        />
        <CallReusableComponent
          Children={() => {
            return (
              <MaterialIcons
                name="content-copy"
                size={23}
                color={CHAT_DATA_STATUS_COLOR}
              />
            );
          }}
          text={"Copy Link"}
          onPress={() => {
            copyToClipboard();
            showToast("Text Copied to Clipboard");
          }}
        />
        <CallReusableComponent
          Children={() => {
            return (
              <Entypo name="share" size={24} color={CHAT_DATA_STATUS_COLOR} />
            );
          }}
          text={"Share link"}
          onPress={() => {
            onShare();
          }}
        />
      </View>
      <View style={[styles.buttonContainer]}>
        <CallButton
          color={ACTIVE_TAB_GREEN_COLOR}
          onPress={handleMakeCall}
          width="80%"
        >
          <Text style={{ color: TITLE_COLOR, fontSize: 15 }}>Create Call</Text>
        </CallButton>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.4)",
    zIndex: -1,
  },
  modalView: {
    backgroundColor: TAB_BACKGROUND_COLOR,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: "20%",
    zIndex: 99999999999999,
  },
  modalText: {
    color: TITLE_COLOR,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  firstContainer: {
    marginTop: 20,
  },
  checkbox: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 2,
  },
  checkboxContainer: {
    width: 30,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: ACTIVE_TAB_GREEN_COLOR,
  },
  firstContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  VideoTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  VideoText: {
    color: TITLE_COLOR,
    fontWeight: "400",
    fontSize: 20,
  },
  firstCheckboxesContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
  },
});

export default CallDetails;
