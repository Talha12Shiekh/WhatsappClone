import {
  Text,
  View,
  StyleSheet,
  Share,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { CallReusableComponent, showToast } from "./RippleButton";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TITLE_COLOR,
  CHAT_DATA_STATUS_COLOR,
} from "./WhatsappMainScreen";
import { ChatGreenLeftComponent } from "./RippleButton";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import Checkbox from "expo-checkbox";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import CallButton from "./Button";
import { Ionicons } from '@expo/vector-icons';

const CallDetails = ({ route, navigation }) => {
  const { callChats, setcalls, calls } = route.params;

  const [items, setItems] = useState([]);

  useEffect(() => {
    let newChats = [...callChats];
    const updatedDropdownItems = newChats.map((chat) => {
      return {
        value: chat.name,
        label: chat.name,
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
    settext(`https://call.whatsapp.com/${Video ? "video" : "voice"}/${passwordString}`)
  },[Video])

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
      date,
      month,
      year,
      photo: selectedItems ? photoObject?.photo : callChats[0]?.photo,
      video: Video,
      type: "call",
      hour,
      minutes,
      am_pm,
      number: selectedItems ? photoObject?.number : callChats[0]?.number,
      arrowColor: callStatus,
      count: 0,
      selected:false,
      blocked:false
    };

    let callsNames = calls.map((call) => call.name);

    if (callsNames.includes(callObject.name)) {
      let newCalls = [...calls];
      let updatedCalls = newCalls.map((cll) => {
        if (callsNames.includes(cll.name)) { 
          return {
            ...cll,
            count: cll.count + 1,
          };
        }
        return cll;
      });
      setcalls(updatedCalls);
    } else {
      setcalls((prev) => [...prev, callObject]);
    }
    navigation.navigate("Calls");
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select call type</Text>
            <View style={styles.checkboxesContainer}>
              <View style={styles.firstContainer}>
                <View
                  style={[
                    styles.checkboxContainer,
                    {
                      borderColor: Video
                        ? ACTIVE_TAB_GREEN_COLOR
                        : TAB_BACKGROUND_COLOR,
                    },
                  ]}
                >
                  <Checkbox
                    style={styles.checkbox}
                    value={Video}
                    onValueChange={(vlue) => {
                      if (vlue) {
                        setVoice(false);
                        setVideo(true);
                        setTimeout(() => {
                          setModalVisible(!modalVisible);
                        }, 1000);
                      }
                    }}
                    color={Video ? ACTIVE_TAB_GREEN_COLOR : undefined}
                  />
                </View>
                <View style={styles.VideoTextContainer}>
                  <Text style={styles.VideoText}>Video</Text>
                </View>
              </View>
              <View style={[styles.firstContainer, { marginTop: 20 }]}>
                <View
                  style={[
                    styles.checkboxContainer,
                    {
                      borderColor: Voice
                        ? ACTIVE_TAB_GREEN_COLOR
                        : TAB_BACKGROUND_COLOR,
                    },
                  ]}
                >
                  <Checkbox
                    style={[
                      styles.checkbox,
                      {
                        borderColor: Voice
                          ? ACTIVE_TAB_GREEN_COLOR
                          : CHAT_DATA_STATUS_COLOR,
                      },
                    ]}
                    value={Voice}
                    onValueChange={(vlue) => {
                      if (vlue) {
                        setVoice(true);
                        setVideo(false);
                        setTimeout(() => {
                          setModalVisible(!modalVisible);
                        }, 200);
                      }
                    }}
                    color={Voice ? ACTIVE_TAB_GREEN_COLOR : undefined}
                  />
                </View>
                <View style={styles.VideoTextContainer}>
                  <Text style={styles.VideoText}>Voice</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
              {Video ? <Feather name="video" size={23} color={TITLE_COLOR} /> : 
              <Ionicons name="call" size={23} color={TITLE_COLOR} />
              }
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
            setModalVisible((vsble) => !vsble);
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
