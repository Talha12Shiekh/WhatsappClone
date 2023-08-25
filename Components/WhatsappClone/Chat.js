import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  Modal,
  ToastAndroid,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FormattedDate, FormattedTime } from "react-intl";
import {
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  CHAT_HEIGHT,
  CHAT_SELECTION_BACKGROUND,
  INACTIVE_TAB_WHITE_COLOR,
  TAB_BACKGROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  TITLE_COLOR,
  generateRandomArrow,
  generateSendTick,
  months,
} from "./WhatsappMainScreen";
import {
  ModelComponent,
  PopupIconsRippleButton,
  showToast,
} from "./RippleButton";

const Chat = (item) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalphoto, setmodalphoto] = useState("");
  const [modalName, setmodalName] = useState("");

  const [lastMessage, setLastMessage] = useState({
    message:"",
    time:""
  });


  useEffect(() => {
    if (item.messages && item.messages.length > 0) {
      setLastMessage({
        indexOfMessage:item.messages.length - 1, 
        message:item.messages[item.messages.length - 1].message,
        time:item.messages[item.messages.length - 1].time,
        status:item.messages[item.messages.length - 1].messageStatus,
      });
    }
  }, [item.messages]);

  const { RightPlaceRenderThing, LeftPlaceRenderThing } = item;
  let aboutlimit = item.NotshowChatMakingDate
  ? "Lorem ipsum dolor sit amet"
  : "Lorem ipsum dolor sit amet talha call";

  function handleOpenDpModel(photo, name) {
    setModalVisible(true);
    setmodalphoto(photo);
    setmodalName(name);
  }

  function initDescription() {
    if (item.type == "call") {
      const { date, month, hour, minutes, am_pm } = item;
      return (
        <View style={{ flexDirection: "row" }}>
          <View style={{ transform: [{ translateY: 5 }] }}>
            {generateRandomArrow(item.arrowColor)}
          </View>
          <View>
            <Text
              style={{
                color: CHAT_DATA_STATUS_COLOR,
                marginTop: 5,
                marginLeft: 15,
                fontSize: 15,
                fontWeight: "normal",
              }}
            >
              {date} {months[month]} , {hour}:{minutes} {am_pm.toLowerCase()}
            </Text>
          </View>
        </View>
      );
    } else {
      if (item.messages?.length == 0) {
        return (
          <Text style={[styles.info, { color: CHAT_DATA_STATUS_COLOR }]}>
            {!item.blocked
              ? item.about?.length > aboutlimit.length
                ? item.about.slice(0, aboutlimit.length - 1) + "..."
                : item.about
              : "You blocked this contact"}
          </Text>
        );
      } else {
        return (
          <Text style={[styles.info, { color: CHAT_DATA_STATUS_COLOR }]}>
           {lastMessage.indexOfMessage % 2 == 0 && generateSendTick(lastMessage.status,CHAT_DATA_STATUS_COLOR)} {lastMessage.message.length > aboutlimit.length
              ? lastMessage.message.slice(0, aboutlimit.length - 1) + "..."
              : lastMessage.message}
          </Text>
        );
      }
    }
  }

  function initTitle() {
    if (item.type == "call") {
      return (
        <Text
          style={[
            styles.title,
            {
              color: TITLE_COLOR,
              fontWeight: "normal",
              fontSize: 18,
            },
          ]}
        >
          {item.name?.length > 18 ? item.name.slice(0, 19) : item.name}{" "}
          {item?.count > 0 ? `(${item.count})` : null}
        </Text>
      );
    } else {
      return (
        <Text
          style={[
            styles.title,
            {
              color: TITLE_COLOR,
              fontWeight: "bold",
            },
          ]}
        >
          {item.name?.length > 18 ? item.name.slice(0, 19) : item.name}
        </Text>
      );
    }
  }

  function initTime() {
    if(item.messages?.length == 0){
      return (
        <Text style={[styles.time, { color: CHAT_DATA_STATUS_COLOR }]}>
          <FormattedDate value={new Date(item.time)} />
        </Text>
      );
    }else{
      return (
        <Text style={[styles.time, { color: CHAT_DATA_STATUS_COLOR }]}>
          <FormattedTime value={new Date(lastMessage.time)} />
        </Text>
      );
    }
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModelComponent
          name={modalName}
          photo={modalphoto}
          item={item}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </Modal>
      <TouchableNativeFeedback
        onPress={item.onPress}
        onLongPress={item.onLongPress}
        background={TouchableNativeFeedback.Ripple(
          TAB_PRESS_ACTIVE_WHITE_COLOR,
          false
        )}
      >
        <View
          style={[
            styles.chat,
            {
              backgroundColor: item.selected
                ? CHAT_SELECTION_BACKGROUND
                : CHAT_BACKROUND_COLOR,
              height: CHAT_HEIGHT,
            },
          ]}
        >
          <LeftPlaceRenderThing handleOpenDpModel={handleOpenDpModel} />
          <View>
            <View style={[styles.textContainer, { flex: 1 }]}>
              <View style={{ width: "60%" }}>{initTitle()}</View>
              <View style={{ width: "32%" }}>
                {item.NotshowChatMakingDate && initTime()}
              </View>
            </View>
            <View style={[styles.textContainer]}>
              <View
                style={{
                  width: item.NotshowChatMakingDate ? "70%" : "80%",
                  marginBottom: -5,
                }}
              >
                {initDescription()}
              </View>
              <RightPlaceRenderThing />
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chat: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  chatsContainer: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  time: {
    fontWeight: "500",
    fontSize: 12,
  },
});
