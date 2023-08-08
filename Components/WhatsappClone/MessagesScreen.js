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
} from "react-native";
import { RippleButton } from "./RippleButton";
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
} from "./WhatsappMainScreen";
import { useRef, useState } from "react";
import Menu from "./Menu";
import { TouchableWithoutFeedback } from "react-native";
import { FlatList } from "react-native";

const MessagesScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const ICONS_SIZE = 22;

  const [currentItem, setCurrentItem] = useState({
    ...item,
  });

  const [messages, setmessages] = useState([]);

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

  const [value, setvalue] = useState("");

  const [paddingRight, setpaddingRight] = useState(100);

  const ClipandCameraAnimation = useRef(new Animated.Value(0)).current;

  const sendButtonAnimation = useRef(new Animated.Value(0)).current;

  const [isOpen, setIsOpen] = useState(false);

  const [MenuOpen, setMenuOpen] = useState(false);

  const messagesMenuAnimation = useRef(new Animated.Value(0)).current;

  const MenuAnimation = useRef(new Animated.Value(0)).current;

  const handleSendMessages = () => {
    if (value == "") return;

    let messagesObject = {
      message: value,
      key: Date.now(),
      time: Date.now(),
    };
    setmessages((prev) => [...prev, messagesObject]);
    setvalue("");
  };

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

  const handleChangeText = (vlue) => {
    setvalue(vlue);

    if (vlue !== "") {
      AnimatedFunction(ClipandCameraAnimation, 50, 300);
      AnimatedFunction(sendButtonAnimation, 1, 300);
      setpaddingRight(50);
    } else {
      AnimatedFunction(ClipandCameraAnimation, 0, 300);
      AnimatedFunction(sendButtonAnimation, 0, 300);
      setpaddingRight(100);
    }
  };

  const AnimateMenu = () => {
    const toValue = MenuOpen ? 0 : 1;
    return Animated.timing(MenuAnimation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setMenuOpen((opn) => !opn);
      }
    });
  };

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
                      source={{ uri: item.photo }}
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
                    {item.name}
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
                  transform: [{ scaleX: 0 }],
                  zIndex: 222222,
                  position: "absolute",
                },
              ]}
            >
              <View style={styles.chatsCountContainer}>
                <RippleButton>
                  <AntDesign name="arrowleft" size={24} color={TITLE_COLOR} />
                </RippleButton>
                <Text
                  style={{ fontSize: 20, marginLeft: 15, color: TITLE_COLOR }}
                >
                  1
                </Text>
              </View>
              <View
                style={[
                  styles.iconContainer,
                  { justifyContent: "center", alignItems: "center", gap: -5 },
                ]}
              >
                <RippleButton onPress={() => {}}>
                  <Ionicons
                    name="md-arrow-undo-sharp"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton onPress={() => {}}>
                  <FontAwesome
                    name="star"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton onPress={() => {}}>
                  <Feather name="info" size={ICONS_SIZE} color={TITLE_COLOR} />
                </RippleButton>
                <RippleButton onPress={() => {}}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton onPress={() => {}}>
                  <MaterialIcons
                    name="content-copy"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton>
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

  return (
    <ImageBackground
      resizeMode="cover"
      source={{ uri: item.photo }}
      style={{ flex: 1 }}
    >
      {/* <TouchableWithoutFeedback onPress={() => setMenuOpen(true)}>
        <Animated.View
          style={[
            styles.messagesMenu,
            {
              zIndex: 222222222222222,
              width: 50,
              height: 50,
              right: 0,
              backgroundColor: "rgba(0,0,0,.1)",
              transform: [
                {
                  scale: MenuAnimation.interpolate({
                    inputRange:[0,1],
                    outputRange:[0,30]
                  })
                },
              ],
            },
          ]}
        />
      </TouchableWithoutFeedback> */}
      <Animated.View
        style={[
          styles.messagesMenu,
          { transform: [{ scaleY: MenuAnimation }], zIndex: 33333333333 },
        ]}
      >
        <TouchableOpacity>
          <View>
            <View style={[styles.menuButton, { backgroundColor: "#e91de99c" }]}>
              <Ionicons name="document" size={24} color={TITLE_COLOR} />
            </View>
            <Text style={styles.menuText}>Document</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View style={[styles.menuButton, { backgroundColor: "red" }]}>
              <FontAwesome name="camera" size={24} color={TITLE_COLOR} />
            </View>
            <Text style={styles.menuText}>Camera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View style={[styles.menuButton, { backgroundColor: "pink" }]}>
              <Foundation name="photo" size={24} color={TITLE_COLOR} />
            </View>
            <Text style={styles.menuText}>Gallery</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View style={[styles.menuButton, { backgroundColor: "orange" }]}>
              <FontAwesome5 name="headphones" size={24} color={TITLE_COLOR} />
            </View>
            <Text style={styles.menuText}>Audio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View style={[styles.menuButton, { backgroundColor: "green" }]}>
              <Ionicons
                name="md-location-sharp"
                size={24}
                color={TITLE_COLOR}
              />
            </View>
            <Text style={styles.menuText}>Location</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View style={[styles.menuButton, { backgroundColor: "blue" }]}>
              <Feather name="user" size={24} color={TITLE_COLOR} />
            </View>
            <Text style={styles.menuText}>Contact</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <View
              style={[styles.menuButton, { backgroundColor: "lightgreen" }]}
            >
              <MaterialCommunityIcons
                name="poll"
                size={24}
                color={TITLE_COLOR}
              />
            </View>
            <Text style={styles.menuText}>Poll</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <EmojiPicker
        open={isOpen}
        onEmojiSelected={(emojiObject) => {
          setvalue((prev) => prev + emojiObject.emoji);
        }}
        onClose={() => setIsOpen(false)}
      />
      <View style={{ flex: 12, paddingVertical: 20, paddingHorizontal: 10 }}>
        <ScrollView scrollToOverflowEnabled>
          {messages.map((item, index) => {
            const isEven = index % 2 == 0;
            return (
              <TouchableNativeFeedback key={item.key}>
                <View
                  style={[
                    styles.messagesContainer,
                    { alignSelf: isEven ? "flex-end" : "flex-start" },
                  ]}
                >
                  <View style={isEven ? styles.messageCorner : styles.answermessageCorner} />
                  <View
                    style={[
                      styles.message,
                      {
                        transform: [{ translateX: isEven ? -20 : 20 }],
                        flexDirection: "row",
                        backgroundColor: isEven
                          ? "green"
                          : ANSWER_BACKGROUND_COLOR,
                      },
                    ]}
                  >
                    <View>
                      <Text
                        style={{
                          color: TITLE_COLOR,
                          fontSize: 15,
                          marginRight: 10,
                        }}
                      >
                        {item.message}
                      </Text>
                      <View style={{ alignSelf: "flex-end", marginTop: 5 }}>
                        <Text style={{ color: TITLE_COLOR, fontSize: 10 }}>
                          10:10 pm //
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior="height"
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          zIndex: 999999999999999,
        }}
      >
        <View
          style={[
            styles.inputContainer,
            { overflow: "hidden", marginBottom: 10 },
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
              onChangeText={handleChangeText}
            />
          </View>
          <Animated.View
            style={[
              styles.camera_and_clip,
              { transform: [{ translateX: ClipandCameraAnimation }] },
            ]}
          >
            <MessagesRippleButton onPress={AnimateMenu}>
              <Entypo
                name="attachment"
                size={20}
                color={EMOJI_BACKGROUND_COLOR}
              />
            </MessagesRippleButton>
            <MessagesRippleButton onPress={() => navigation.navigate("Camera")}>
              <Feather name="camera" size={20} color={EMOJI_BACKGROUND_COLOR} />
            </MessagesRippleButton>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={handleSendMessages}>
          <View style={styles.sendButton}>
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
      </KeyboardAvoidingView>
    </ImageBackground>
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
    borderRadius: 50,
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
    marginRight: 5,
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
    gap: 20,
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
    backgroundColor: "green",
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
    backgroundColor: "green",
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
});

export default MessagesScreen;