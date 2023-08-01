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
} from "react-native";
import { RippleButton } from "./RippleButton";
import {
  AntDesign,
  SimpleLineIcons,
  Ionicons,
} from "react-native-vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
import {
  TAB_BACKGROUND_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  TITLE_COLOR,
  BADGE_BACKGROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  MESSAGE_BACKGROUND_COLOR,
  EMOJI_BACKGROUND_COLOR
} from "./WhatsappMainScreen";

const MessagesScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const ICONS_SIZE = 22;

  const MessagesRippleButton = ({ children,onPress,...rest }) => {
    return (
        <View style={{ padding: 10, borderRadius: 100}} {...rest}>
      <TouchableNativeFeedback
      onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          TAB_PRESS_ACTIVE_WHITE_COLOR,
          true,
          500
        )}
      >
        <View style={{justifyContent:"center",alignItems:"center"}}>
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
              {/* <Menu
                animation={archiveChatMenuAnimation}
                menuData={ArchivedMenuData}
              /> */}
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  flexDirection: "row",
                  gap: -5,
                  top: 5,
                }}
              >
                <RippleButton>
                  <FontAwesome5 name="video" size={20} color={TITLE_COLOR} />
                </RippleButton>
                <RippleButton>
                  <MaterialIcons name="call" size={22} color={TITLE_COLOR} />
                </RippleButton>
                <RippleButton
                //   onPress={() => Animated.timing(archiveChatMenuAnimation,{
                //     toValue:1,
                //     duration:1000,
                //     useNativeDriver:true
                //   }).start()
                // }
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
      <View style={{ flex: 12 }}>
        <Text>Messages</Text>
      </View>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
      >
        <View style={styles.inputContainer}>
          <View style={styles.emoji}>
            <MessagesRippleButton>
            <Fontisto name="smiley" size={24} color={EMOJI_BACKGROUND_COLOR} />
          </MessagesRippleButton>
          </View>
          <TextInput
            placeholderTextColor={EMOJI_BACKGROUND_COLOR}
            placeholder="Messages"
            style={styles.input}
            multiline
          />
          <View style={styles.camera_and_clip}>
          <MessagesRippleButton>
            <Entypo
              name="attachment"
              size={24}
              color={EMOJI_BACKGROUND_COLOR}
            />
            </MessagesRippleButton>
            <MessagesRippleButton>
            <Feather name="camera" size={24} color={EMOJI_BACKGROUND_COLOR} />
            </MessagesRippleButton>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.sendButton}>
            <MaterialIcons
              name="keyboard-voice"
              size={25}
              color={TITLE_COLOR}
            />
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
    backgroundColor: "red",
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
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
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
    position:"absolute"
    ,left:0,
    alignSelf:"center",
    zIndex:999999
  },
  input: {
    flex: 5,
    color: TITLE_COLOR,
    fontSize: 18,
    paddingLeft: 50,
    paddingRight:100
  },
  camera_and_clip: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
    // backgroundColor:"red",
    gap: 10,
    position:"absolute",
    right:0,
    top:2
  },
});

export default MessagesScreen;
