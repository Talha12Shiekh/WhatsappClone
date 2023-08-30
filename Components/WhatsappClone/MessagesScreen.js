import {
  View,
  Text,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from "react-native";
import * as Clipboard from "expo-clipboard";

import {
  ClosenavbarAnimation,
  RippleButton,
  navbarAnimation,
  showToast,
} from "./RippleButton";
import {
  AntDesign,
  SimpleLineIcons,
  Ionicons,
} from "react-native-vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import EmojiPicker from "rn-emoji-keyboard";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Entypo,
  Foundation,
} from "@expo/vector-icons";
import {
  TAB_BACKGROUND_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  TITLE_COLOR,
  BADGE_BACKGROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  MENU_BACKGROUND_COLOR,
  ANSWER_BACKGROUND_COLOR,
  EMOJI_BACKGROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  MESSAGE_BACKGROUND_COLOR,
  MODAL_BACKGROUND_COLOR,
  MODAL_TEXT_COLOR,
  generateSendTick,
  CHAT_BACKROUND_COLOR,
} from "./WhatsappMainScreen";
import {
  createRef,
  useDeferredValue,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Menu from "./Menu";
import { MessagesReducer, ACTIONS } from "./MessagesReducer";
import { Modal } from "react-native";
import { Share } from "react-native";
import SingleMessage from "./SingleMessage";
import { useChatsContext } from "../../App";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PURPLE = "#765fee";
const RED = "#fd2e74";
const PINK = "#c861fa";
const ORANGE = "#f96632";
const GREEN = "#1fa755";
const BLUE = "#029ce2";
const LIGHTGREEN = "#01a698";

const MessagesScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const ICONS_SIZE = 22;

  const [currentItem, setCurrentItem] = useState({
    ...item,
  });

  const { chats, setchats } = useChatsContext();

  const [messages, dispatch] = useReducer(MessagesReducer, item.messages);

  useEffect(() => {
    const updatedChats = chats.map((chat) => {
      if (chat.key == item.key) {
        return {
          ...chat,
          messages: messages,
        };
      }
      return chat;
    });
    setchats(updatedChats);
  }, [messages]);

  const [MenuVisible, setMenuVisible] = useState(false);

  const messagesNavbarAnimation = useRef(new Animated.Value(0)).current;

  const messagesSelected = messages?.some((msg) => msg.selected);

  const selectedMessages = messages?.filter((msg) => msg.selected);

  const InfoMessages = messages?.find((msg) => msg.selected);

  const messageLenght = "Gzjzgidgkskfhdhahflhflhjgjljjjjl";

  const replayLength =
    "talha shiekh is always the best in the world Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quod quaerat sunt nostrum temporibus veritatis. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, voluptatum?";

  const starScaleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (messagesSelected) {
      navbarAnimation(messagesNavbarAnimation);
    } else {
      ClosenavbarAnimation(messagesNavbarAnimation);
    }
  }, [messagesSelected]);

  const handleOpenCallScreen = () => {
    setCurrentItem({
      ...item,
      video: true,
    });
    navigation.navigate("CallScreen", { item: currentItem });
  };

  const handleOpenVideoScreen = () => {
    setCurrentItem({
      ...item,
      video: false,
    });
    navigation.navigate("CallScreen", { item: currentItem });
  };

  const handleCopyMessages = async () => {
    let selectedMessages = messages.filter((msgs) => msgs.selected);
    let msgs = selectedMessages.map((msg) => msg.message).join(" ");
    await Clipboard.setStringAsync(msgs);
    dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD });
    showToast(`${selectedMessages.length} messages copied`);
  };

  const [value, setvalue] = useState("");

  const [paddingRight, setpaddingRight] = useState(100);

  const ClipandCameraAnimation = useRef(new Animated.Value(0)).current;

  const sendButtonAnimation = useRef(new Animated.Value(0)).current;

  const [isOpen, setIsOpen] = useState(false);

  const messagesMenuAnimation = useRef(new Animated.Value(0)).current;

  const AnimatedView = Animated.createAnimatedComponent(View);

  const [modalVisible, setModalVisible] = useState(false);

  const defferedValueForAnimation = useDeferredValue(value);

  let ChatNameLength = "loremipsumdolor";

  const MessagesMenuData = [
    { text: "View contact", onPress: () => {}, key: 1 },
    { text: "Media, links, and docs", onPress: () => {}, key: 2 },
    { text: "Search", onPress: () => {}, key: 3 },
    { text: "Mute notifications", onPress: () => {}, key: 4 },
    { text: "Dissappearing messages", onPress: () => {}, key: 5 },
    { text: "Wallpaper", onPress: () => {}, key: 6 },
    {
      text: "More                                    >",
      onPress: () => {},
      key: 7,
    },
  ];

  const AnimatedFunction = (animation, toValue, duration) => {
    return Animated.timing(animation, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (defferedValueForAnimation !== "") {
      AnimatedFunction(ClipandCameraAnimation, 50, 300);
      AnimatedFunction(sendButtonAnimation, 1, 300);
      setpaddingRight(50);
    } else {
      AnimatedFunction(ClipandCameraAnimation, 0, 300);
      AnimatedFunction(sendButtonAnimation, 0, 300);
      setpaddingRight(100);
    }
  }, [defferedValueForAnimation]);

  const MessagesRippleButton = ({ children, onPress, ...rest }) => {
    return (
      <View style={{ padding: 10, borderRadius: 100 }} {...rest}>
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(
            TAB_PRESS_ACTIVE_WHITE_COLOR,
            true,
            500
          )}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {children}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  const ForwardMessages = async () => {
    let selectedMessages = messages.filter((msgs) => msgs.selected);
    let msgs = selectedMessages.map((msg) => msg.message).join(" ");
    try {
      const result = await Share.share({
        message: msgs,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useFocusEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <>
            <View
              style={{
                height: 60,
                backgroundColor: TAB_BACKGROUND_COLOR,
                flexDirection: "row",
                zIndex: -1,
              }}
            >
              <TouchableNativeFeedback
                onPress={() => navigation.goBack()}
                background={TouchableNativeFeedback.Ripple(
                  TAB_PRESS_ACTIVE_WHITE_COLOR,
                  false,
                  300
                )}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 5,
                    marginLeft: 10,
                    height: 40,
                    borderRadius: 100,
                    marginTop: 10,
                  }}
                >
                  <View>
                    <AntDesign name="arrowleft" size={25} color={TITLE_COLOR} />
                  </View>
                  <View>
                    <Image
                      source={
                        item.photo
                          ? { uri: item.photo }
                          : require("./Images/profile.png")
                      }
                      style={styles.messagesImage}
                    />
                  </View>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  TAB_PRESS_ACTIVE_WHITE_COLOR,
                  false,
                  300
                )}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginLeft: 15,
                    width: "40%",
                    // paddingHorizontal:10
                  }}
                >
                  <Text
                    style={{
                      color: TITLE_COLOR,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name.length > ChatNameLength.length
                      ? item.name.slice(0, ChatNameLength.length)
                      : item.name}
                  </Text>
                  <Text style={{ color: TITLE_COLOR, fontSize: 11 }}>
                    last seen today at 3:26 pm
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <Menu
                animation={messagesMenuAnimation}
                menuData={MessagesMenuData}
              />
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  flexDirection: "row",
                  gap: -5,
                  top: 5,
                }}
              >
                <RippleButton onPress={handleOpenCallScreen}>
                  <FontAwesome5 name="video" size={20} color={TITLE_COLOR} />
                </RippleButton>
                <RippleButton onPress={handleOpenVideoScreen}>
                  <MaterialIcons name="call" size={22} color={TITLE_COLOR} />
                </RippleButton>
                <RippleButton
                  onPress={() =>
                    AnimatedFunction(messagesMenuAnimation, 1, 1000)
                  }
                >
                  <SimpleLineIcons
                    name="options-vertical"
                    color={TITLE_COLOR}
                    size={18}
                  />
                </RippleButton>
              </View>
            </View>
            <Animated.View
              style={[
                styles.selectedChatNavbar,
                {
                  backgroundColor: TAB_BACKGROUND_COLOR,
                  transform: [{ scaleX: messagesNavbarAnimation }],
                  zIndex: 222222,
                  position: "absolute",
                },
              ]}
            >
              <View style={styles.chatsCountContainer}>
                <RippleButton
                  onPress={() => ClosenavbarAnimation(messagesNavbarAnimation)}
                >
                  <AntDesign name="arrowleft" size={24} color={TITLE_COLOR} />
                </RippleButton>
                <Text
                  style={{ fontSize: 20, marginLeft: 15, color: TITLE_COLOR }}
                >
                  {selectedMessages?.length}
                </Text>
              </View>
              <View
                style={[
                  styles.iconContainer,
                  { justifyContent: "center", alignItems: "center", gap: -5 },
                ]}
              >
                {selectedMessages?.length <= 1 ? (
                  <RippleButton onPress={() => {}}>
                    <Ionicons
                      name="md-arrow-undo-sharp"
                      size={ICONS_SIZE}
                      color={TITLE_COLOR}
                    />
                  </RippleButton>
                ) : null}
                <RippleButton
                  onPress={() => {
                    makeStarAnimation();
                    dispatch({
                      type: ACTIONS.STARRE_MESSAGES,
                    });
                  }}
                >
                  <FontAwesome
                    name="star"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                {selectedMessages?.length <= 1 ? (
                  <RippleButton
                    onPress={() => {
                      navigation.navigate("MessagesInfo", {
                        InfoMessages,
                      });
                      dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD });
                    }}
                  >
                    <Feather
                      name="info"
                      size={ICONS_SIZE}
                      color={TITLE_COLOR}
                    />
                  </RippleButton>
                ) : null}
                <RippleButton
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton onPress={handleCopyMessages}>
                  <MaterialIcons
                    name="content-copy"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton onPress={ForwardMessages}>
                  <Ionicons
                    name="md-arrow-redo-sharp"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
              </View>
            </Animated.View>
          </>
        );
      },
    });
  });

  function handleShowSelectionInAlert() {
    if (selectedMessages?.length == 1) {
      const indexOFMessage = messages.findIndex((msg) => msg.selected);
      if (indexOFMessage % 2 === 0) {
        return "Delete message ?";
      } else {
        return `Delete message from ${item.name}`;
      }
    }
  }

  const makeStarAnimation = () => {
    return Animated.timing(starScaleAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      starScaleAnimation.setValue(0);
    });
  };

  const selectedMessageIndices = messages
    ?.map((msg, index) => (msg.selected ? index : -1))
    ?.filter((index) => index !== -1);

  let showDeleteforeveryone = selectedMessageIndices?.some(
    (msg) => msg % 2 !== 0
  );

  return (
    <>
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
                  marginTop: 10,
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
      <View style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={MenuVisible}
          onRequestClose={() => setMenuVisible((v) => !v)}
        >
          <TouchableWithoutFeedback onPress={() => setMenuVisible((v) => !v)}>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.1)" }} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.messagesMenu,
              {
                zIndex: 3333333333333,
                transform: [{ translateY: -30 }],
              },
            ]}
          >
            <View style={styles.singleLineOfMenu}>
              <TouchableOpacity>
                <View>
                  <AnimatedView
                    style={[styles.menuButton, { backgroundColor: PURPLE }]}
                  >
                    <Ionicons name="document" size={24} color={TITLE_COLOR} />
                  </AnimatedView>
                  <Text style={styles.menuText}>Document</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <AnimatedView
                    style={[styles.menuButton, { backgroundColor: RED }]}
                  >
                    <FontAwesome name="camera" size={24} color={TITLE_COLOR} />
                  </AnimatedView>
                  <Text style={styles.menuText}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <AnimatedView
                    style={[styles.menuButton, { backgroundColor: PINK }]}
                  >
                    <Foundation name="photo" size={24} color={TITLE_COLOR} />
                  </AnimatedView>
                  <Text style={styles.menuText}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.singleLineOfMenu}>
              <TouchableOpacity>
                <View>
                  <AnimatedView
                    style={[styles.menuButton, { backgroundColor: ORANGE }]}
                  >
                    <FontAwesome5
                      name="headphones"
                      size={24}
                      color={TITLE_COLOR}
                    />
                  </AnimatedView>
                  <Text style={styles.menuText}>Audio</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <AnimatedView
                    style={[styles.menuButton, { backgroundColor: GREEN }]}
                  >
                    <Ionicons
                      name="md-location-sharp"
                      size={24}
                      color={TITLE_COLOR}
                    />
                  </AnimatedView>
                  <Text style={styles.menuText}>Location</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <AnimatedView
                    style={[styles.menuButton, { backgroundColor: BLUE }]}
                  >
                    <Feather name="user" size={24} color={TITLE_COLOR} />
                  </AnimatedView>
                  <Text style={styles.menuText}>Contact</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <View>
                <AnimatedView
                  style={[styles.menuButton, { backgroundColor: LIGHTGREEN }]}
                >
                  <MaterialCommunityIcons
                    name="poll"
                    size={24}
                    color={TITLE_COLOR}
                  />
                </AnimatedView>
                <Text style={styles.menuText}>Poll</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Modal>

        <EmojiPicker
          open={isOpen}
          onEmojiSelected={(emojiObject) => {
            setvalue((prev) => prev + emojiObject.emoji);
          }}
          onClose={() => setIsOpen(false)}
        />
        <View style={{ flex: 10, paddingTop: 20 }}>
          <ScrollView >
            {messages.map((item, index) => {
              const isEven = index % 2 == 0;
              let ColumnOrRow =
                item.message?.length > messageLenght.length ? "column" : "row";
              return (
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <SingleMessage
                    key={item.key}
                    isEven={isEven}
                    index={index}
                    ColumnOrRow={ColumnOrRow}
                    dispatch={dispatch}
                    selected={item.selected}
                    keyOfMessage={item.key}
                    message={item.message}
                    starred={item.starred}
                    deleteForEveryone={item.deleteForEveryone}
                    messageStatus={item.messageStatus}
                    starScaleAnimation={item.starAnimation}
                    time={item.time}
                  />
                </GestureHandlerRootView>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <View style={[styles.replyContainer,{position:"absolute"}]}>
            <View style={styles.replayTopTextContainer}>
              <Text
                style={{ color: MESSAGE_BACKGROUND_COLOR, fontWeight: "bold" }}
              >
                You
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 15, color: EMOJI_BACKGROUND_COLOR }}>
                  &times;
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.replyText}>
              <Text style={{ color: EMOJI_BACKGROUND_COLOR }}>
                Kitni percent ❓ 
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.inputContainer,
              {
                overflow: "hidden",
                marginBottom: 10,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 50,
              },
            ]}
          >
            <View style={[styles.emoji, { alignSelf: "flex-end" }]}>
              <MessagesRippleButton
                onPress={() => {
                  setIsOpen((o) => !o);
                }}
              >
                <Fontisto
                  name="smiley"
                  size={20}
                  color={EMOJI_BACKGROUND_COLOR}
                />
              </MessagesRippleButton>
            </View>
            <View>
              <TextInput
                placeholderTextColor={EMOJI_BACKGROUND_COLOR}
                placeholder="Messages"
                style={[styles.input, { paddingRight: paddingRight }]}
                multiline
                value={value}
                onChangeText={(value) => setvalue(value)}
              />
            </View>
            <Animated.View
              style={[
                styles.camera_and_clip,
                { transform: [{ translateX: ClipandCameraAnimation }] },
              ]}
            >
              <MessagesRippleButton onPress={() => setMenuVisible((v) => !v)}>
                <Entypo
                  name="attachment"
                  size={20}
                  color={EMOJI_BACKGROUND_COLOR}
                />
              </MessagesRippleButton>
              <MessagesRippleButton
                onPress={() => navigation.navigate("Camera")}
              >
                <Feather
                  name="camera"
                  size={20}
                  color={EMOJI_BACKGROUND_COLOR}
                />
              </MessagesRippleButton>
            </Animated.View>
          </View>
          <View style={{ marginLeft: "86%", marginBottom: 5 }}>
            <TouchableOpacity
              onPress={() => {
                let messagesObject = {
                  message: value,
                  key: Date.now().toString(),
                  time: Date.now(),
                  messageStatus: "single",
                  selected: false,
                  deleteForEveryone: false,
                  starred: false,
                  starAnimation: new Animated.Value(0),
                  readedTime: Date.now(),
                  delivered: Date.now(),
                };

                if (value == "") return;

                dispatch({
                  type: ACTIONS.SEND_MESSAGES,
                  payload: {
                    messagesObject,
                  },
                });

                setTimeout(() => {
                  dispatch({
                    type: ACTIONS.UPDATE_MESSAGE_STATUS_TO_DOUBLE,
                    payload: {
                      key: messagesObject.key,
                      readedTime: Date.now(),
                      delivered: Date.now(),
                    },
                  });
                }, 60 * 1000);

                setTimeout(() => {
                  dispatch({
                    type: ACTIONS.UPDATE_MESSAGE_STATUS_TO_TRIPLE,
                    payload: {
                      key: messagesObject.key,
                      readedTime: Date.now(),
                      delivered: Date.now(),
                    },
                  });
                }, 3 * 60 * 1000);

                setvalue("");
              }}
            >
              <View style={[styles.sendButton]}>
                <Animated.View
                  style={{
                    position: "absolute",
                    zIndex: 99999,
                    transform: [
                      {
                        scale: sendButtonAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <MaterialIcons
                    name="keyboard-voice"
                    size={25}
                    color={TITLE_COLOR}
                  />
                </Animated.View>
                <Animated.View
                  style={{
                    position: "absolute",
                    zIndex: -1,
                    transform: [
                      {
                        scale: sendButtonAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      },
                    ],
                  }}
                >
                  <Ionicons name="send" size={24} color={TITLE_COLOR} />
                </Animated.View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  selectedChatNavbar: {
    width: "100%",
    height: 60,
    position: "absolute",
    zIndex: 2222,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 2,
  },
  chatsCountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  messagesImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  inputContainer: {
    flex: 8,
    flexDirection: "row",
    backgroundColor: ANSWER_BACKGROUND_COLOR,
    borderRadius: 100,
    marginHorizontal: 10,
    marginTop: 5,
    height: 45,
  },
  sendButton: {
    // flex:1,
    backgroundColor: ACTIVE_TAB_GREEN_COLOR,
    borderRadius: 100,
    width: 50,
    height: 50,
    // marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 10,
    flex: 1,
    position: "absolute",
    left: 0,
    alignSelf: "center",
    zIndex: 999999,
  },
  input: {
    flex: 5,
    color: TITLE_COLOR,
    fontSize: 18,
    paddingLeft: 50,
  },
  camera_and_clip: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
    gap: 10,
    position: "absolute",
    right: 0,
    top: 2,
    bottom: 0,
  },
  messagesMenu: {
    position: "absolute",
    width: 350,
    height: 320,
    backgroundColor: MENU_BACKGROUND_COLOR,
    bottom: 56,
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 50,
    paddingVertical: 20,
    flexWrap: "wrap",
    alignItems: "center",
    zIndex: 9999999,
  },
  menuButton: {
    width: 60,
    aspectRatio: 1,
    backgroundColor: "green",
    alignSelf: "center",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    textAlign: "center",
    color: CHAT_DATA_STATUS_COLOR,
  },
  message: {
    padding: 7,
    borderRadius: 10,
    marginBottom: 5,
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
  answermessageCorner: {
    width: 15,
    height: 15,
    backgroundColor: ANSWER_BACKGROUND_COLOR,
    position: "absolute",
    zIndex: -1,
    left: 12,
    borderBottomLeftRadius: 100,
    top: 0,
  },
  singleLineOfMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  replyContainer: {
    backgroundColor: CHAT_BACKROUND_COLOR,
    width: "83%",
    marginLeft: 10,
    borderWidth: 7,
    borderColor: ANSWER_BACKGROUND_COLOR,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  replayTopTextContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    borderLeftWidth: 5,
    borderLeftColor: MESSAGE_BACKGROUND_COLOR,
    alignItems: "center",
  },
  replyText: {
    borderLeftWidth: 5,
    borderLeftColor: MESSAGE_BACKGROUND_COLOR,
    padding: 5,
  },
});

export default MessagesScreen;
