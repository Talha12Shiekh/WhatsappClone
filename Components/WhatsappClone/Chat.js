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
import { FormattedDate, FormattedTime, FormattedDateParts } from "react-intl";
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
} from "./Variables";
import {
  ModelComponent,
  PopupIconsRippleButton,
  showToast,
} from "./Helpers";

const Chat = (item) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalphoto, setmodalphoto] = useState("");
  const [modalName, setmodalName] = useState("");

  const [lastMessage, setLastMessage] = useState({
    message: "",
    time: "",
  });

  useEffect(() => {
    if (item.messages && item.messages.length > 0) {
      setLastMessage({
        indexOfMessage: item.messages.length - 1,
        message: item.messages[item.messages.length - 1].message,
        time: item.messages[item.messages.length - 1].time,
        status: item.messages[item.messages.length - 1].messageStatus,
      });
    }
  }, [item.messages]);

  const { RightPlaceRenderThing, LeftPlaceRenderThing } = item;

  function generateAboutLimit() {
    if (!item.pinned && !item.muted && !item.readed) {
      return "Lorem ipsum dolor sit amet fdaskljfads";
    } else {
      return "Lorem ipsum dolor sit am";
    }
  }

  function handleOpenDpModel(photo, name) {
    setModalVisible(true);
    setmodalphoto(photo);
    setmodalName(name);
  }

  function initDescription() {
    if (item.type == "call") {
      return (
        <View style={{ flexDirection: "row", marginTop: -2, marginLeft: -5 }}>
          <View>{generateRandomArrow(item.arrowColor)}</View>
          <View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: CHAT_DATA_STATUS_COLOR,
                  marginLeft: 12,
                  fontSize: 14,
                  fontWeight: "normal",
                }}
              >
                <FormattedDateParts
                  value={new Date(item.time)}
                  year="numeric"
                  month="long"
                  day="2-digit"
                >
                  {(parts) => (
                    <>
                      <Text>{parts[2].value}</Text>
                      {parts[1].value}
                      <Text>{parts[0].value}</Text>
                    </>
                  )}
                </FormattedDateParts>
                {" , "}<FormattedTime value={new Date(item.time)} />
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      if (!item.blocked) {

        if (item.messages?.length == 0) {
          return (
            <Text style={[styles.info, { color: CHAT_DATA_STATUS_COLOR }]}>
              {item.about?.length > generateAboutLimit().length
                  ? item.about.slice(0, generateAboutLimit().length - 1) + "..."
                  : item.about}
            </Text>
          );
        } else {
          return (

            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              {lastMessage.indexOfMessage % 2 == 0 && (
                <View>
                  <Text style={[styles.info, { color: CHAT_DATA_STATUS_COLOR }]}>
                    {generateSendTick(lastMessage.status, CHAT_DATA_STATUS_COLOR)}
                  </Text>
                </View>
              )}
              <View>
                <Text style={[styles.info, { color: CHAT_DATA_STATUS_COLOR }]}>
                  {lastMessage.message.length > generateAboutLimit().length
                    ? lastMessage.message.slice(
                      0,
                      generateAboutLimit().length - 1
                    ) + "..."
                    : lastMessage.message}
                </Text>
              </View>
            </View>
          );
        }

      }else {
        return  <Text style={[styles.info, { color: CHAT_DATA_STATUS_COLOR }]}>
          You blocked this contact
        </Text>
      }

    }
  }

  function initTitle() {
    if (item.type == "call") {
      return (
        <Text
        numberOfLines={1}
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
    if (item.messages?.length == 0) {
      return (
        <Text style={[styles.time, { color: CHAT_DATA_STATUS_COLOR }]}>
          <FormattedDate value={new Date(item.time)} />
        </Text>
      );
    } else {
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
          <View
            style={[
              styles.chatTextContainer,
              { alignItems: "center", marginTop: 5 },
            ]}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.titleContainer}>{initTitle()}</View>
              <View style={styles.timeContainer}>
                {item.NotshowChatMakingDate && initTime()}
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 10, flexDirection: "row" }}>
              <View style={{ flex: 3, justifyContent: "flex-start" }}>
                {initDescription()}
              </View>
              {(item.pinned || item.muted || item.readed) && (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 10,
                  }}
                >
                  <RightPlaceRenderThing />
                </View>
              )}
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
    paddingHorizontal: 20,
    // justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    paddingVertical: 15,
  },
  chatsContainer: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginLeft: 20,
    // alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
  },
  time: {
    fontWeight: "500",
    fontSize: 12,
  },
  chatTextContainer: {
    flex: 1,
    marginLeft: 20,
  },
  titleContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  timeContainer: {
    flex: 2,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
