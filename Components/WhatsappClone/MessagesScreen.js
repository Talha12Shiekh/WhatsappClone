import {
  View,
  Text,
  Animated,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView
} from "react-native";
import {
  STORAGE_KEY,
} from "./Variables"
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from "react";
import {
  RippleButton,
  showToast,
  MakeAnimation
} from "./Helpers";
import {
  AntDesign,
  SimpleLineIcons,
  Ionicons,
} from "react-native-vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import EmojiPicker from "rn-emoji-keyboard";
import { SwipeListView } from 'react-native-swipe-list-view';
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
  TITLE_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  MENU_BACKGROUND_COLOR,
  ANSWER_BACKGROUND_COLOR,
  EMOJI_BACKGROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  MESSAGE_BACKGROUND_COLOR,
  MODAL_BACKGROUND_COLOR,
  MODAL_TEXT_COLOR,
  CHAT_BACKROUND_COLOR,
} from "./Variables";
import {
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
import DeleteModal from "./DeleteModal";
import MessageModal from "./MessageModal";
import MessageInput1 from "./MessageInput1";
import ReactEmojiModal from "./ReactEmojiModal";

const MessagesScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const user = item.name

  const ICONS_SIZE = 22;

  const [currentItem, setCurrentItem] = useState({
    ...item,
  });

  const { chats,setchats } = useChatsContext();

  const [messages, dispatch] = useReducer(MessagesReducer, item.messages);

  const [online, setonline] = useState(false);

  const [lastMessageTime, setLastMessageTime] = useState(new Date(messages[messages.length - 1]?.time))

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

    let currentTime = new Date().getMinutes();
    const lastMessage = messages[messages.length - 1];
    const lastMessageTime = new Date(lastMessage?.time).getMinutes()
    if (lastMessageTime == currentTime) {
      setonline(true);
    } else {
      setonline(false);
      setLastMessageTime(new Date(lastMessage?.time))
    }
  }, [messages]);

  const [MenuVisible, setMenuVisible] = useState(false);

  const messagesNavbarAnimation = useRef(new Animated.Value(0)).current;

  const messagesSelected = messages?.some((msg) => msg.selected);

  const selectedMessages = messages?.filter((msg) => msg.selected);

  const InfoMessages = messages?.find((msg) => msg.selected);

  const messageLenght = "Gzjzgidgkskfhdhahflhflhjgjljjjjl";

    if (messagesSelected) {
      MakeAnimation(messagesNavbarAnimation,1,300);
    } else {
      MakeAnimation(messagesNavbarAnimation,0,300);
    }

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

  const [draggedIndex, setdraggedIndex] = useState(null)

  const sendButtonAnimation = useRef(new Animated.Value(0)).current;

  const [clickedMessageReactions, setClickedMessageReactions] = useState([]);

  const TotalReactions = clickedMessageReactions.reduce((ac, it) => {
    return ac += it.count;
  }, 0);

  const [isOpen, setIsOpen] = useState(false);

  const messagesMenuAnimation = useRef(new Animated.Value(0)).current;

  let ChatNameLength = "loremipsumdolor";

  const MessagesMenuData = [
    { text: "View contact", onPress: () => { }, key: 1 },
    { text: "Media, links, and docs", onPress: () => { }, key: 2 },
    { text: "Search", onPress: () => { }, key: 3 },
    { text: "Mute notifications", onPress: () => { }, key: 4 },
    { text: "Dissappearing messages", onPress: () => { }, key: 5 },
    { text: "Wallpaper", onPress: () => { }, key: 6 },
    {
      text: "More                                    >",
      onPress: () => { },
      key: 7,
    },
  ];

  const ReportMenuData = [
    { text: "Report", onPress: () => { }, key: 1 },
  ];

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

  const selectedMessage = messages.filter(msg => msg.selected);

  const [selectedStarMessages, setselectedStarMessages] = useState(null);

  const reportMenuAnimation = useRef(new Animated.Value(0)).current;




  useEffect(() => {
    setselectedStarMessages(selectedMessage[selectedMessage.length - 1])
  }, [selectedMessage])

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
                  {messages.length !== 0 && <Text style={{ color: TITLE_COLOR, fontSize: 11 }}>
                    {online ? "online" : `last seen today at ${lastMessageTime.getHours() > 12 ? lastMessageTime.getHours() - 12 : lastMessageTime.getHours()}:${lastMessageTime.getMinutes() < 10 ? "0" + lastMessageTime.getMinutes() : lastMessageTime.getMinutes()} ${lastMessageTime.getHours() > 12 ? "pm" : "am"}`}
                  </Text>}
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
                    MakeAnimation(messagesMenuAnimation, 1, 1000)
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
            <Menu
              animation={reportMenuAnimation}
              menuData={ReportMenuData}
            />
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
                  onPress={() => MakeAnimation(messagesNavbarAnimation,0,300)}
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
                  <RippleButton onPress={() => {
                    // const selectedMessage = messages.find(msg => msg.selected);
                    // setdraggedMessage(selectedMessage.message);
                    // AnimateReplyContainer()
                  }}>
                    <Ionicons
                      name="md-arrow-undo-sharp"
                      size={ICONS_SIZE}
                      color={TITLE_COLOR}
                    />
                  </RippleButton>
                ) : null}
                <RippleButton
                  onPress={() => {
                    dispatch({
                      type: ACTIONS.STARRE_MESSAGES,
                    });
                    CloseContainer()
                  }}
                >
                  {(selectedStarMessages !== null && !selectedStarMessages?.starred) ? <FontAwesome
                    name="star"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  /> : <MaterialCommunityIcons name="star-off" size={ICONS_SIZE} color={TITLE_COLOR} />}
                </RippleButton>
                {(selectedMessages?.length <= 1 && selectedMessageIndices % 2 == 0) ? (
                  <RippleButton
                    onPress={() => {
                      navigation.navigate("MessagesInfo", {
                        InfoMessages,
                      });
                      dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD });
                      CloseContainer()
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
                    CloseContainer()
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton onPress={() => { handleCopyMessages(); CloseContainer() }}>
                  <MaterialIcons
                    name="content-copy"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton onPress={() => { ForwardMessages(); CloseContainer() }}>
                  <Ionicons
                    name="md-arrow-redo-sharp"
                    size={ICONS_SIZE}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                {selectedMessageIndices % 2 !== 0 && <RippleButton onPress={() => { MakeAnimation(reportMenuAnimation, 1, 1000); CloseContainer() }}>
                  <SimpleLineIcons
                    name="options-vertical"
                    color={TITLE_COLOR}
                    size={18}
                  />
                </RippleButton>}
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

  const selectedMessageIndices = messages
    ?.map((msg, index) => (msg.selected ? index : -1))
    ?.filter((index) => index !== -1);

  let showDeleteforeveryone = selectedMessageIndices?.some(
    (msg) => msg % 2 !== 0
  );

  const replyAnimation = useRef(new Animated.Value(0)).current;


  // function AnimateReplyContainer(){
  //   return Animated.timing(replyAnimation,{toValue:1,useNativeDriver:true,duration:500}).start()
  // }

  const { width } = useWindowDimensions()

  const [modalVisible, setModalVisible] = useState(false);

  const ReplyContainerAnimation = useRef(new Animated.Value(40)).current;

  const [emojiModalPositon, setemojiModalPositon] = useState({
    x: 0, y: 0, opacity: 0
  });

  const EmojiContainerAnimation = useRef(new Animated.Value(.2)).current;

  const AnimateContainer = () => {
    MakeAnimation(EmojiContainerAnimation,1,1000)
  }

  const CloseContainer = () => {
    MakeAnimation(EmojiContainerAnimation,0,500)
  }


  const [showingReplyMessage,setshowingReplyMessage] = useState({
    message:"",
    status:""
  })
  

  // const replyContainerStyles = {
  //   transform: [
  //     {
  //       translateY: replyAnimation.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: [width, 0],
  //       }),
  //     },
  //   ],
  //   opacity: replyAnimation.interpolate({
  //     inputRange: [0, 0.8, 1],
  //     outputRange: [0, 0, 1],
  //   }),
  // };

  const [checkSelection, setcheckSelection] = useState(false);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['50%', '51%'], []);

  const InputRef = useRef(null)

  // variables
  const handlePresentModalPress = useCallback((reactions) => {
    bottomSheetRef.current?.present();

    setClickedMessageReactions(reactions)
  }, []);

  return (
    <BottomSheetModalProvider>

      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        showDeleteforeveryone={showDeleteforeveryone}
        selectedMessages={selectedMessages}
        handleShowSelectionInAlert={handleShowSelectionInAlert}
        dispatch={dispatch}
      />
      <ReactEmojiModal setIsOpen={setIsOpen} CloseContainer={CloseContainer} dispatch={dispatch} messages={messages} checkSelection={checkSelection} containerAnimation={EmojiContainerAnimation} emojiModalPositon={emojiModalPositon} />
      <View style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
        <MessageModal
          MenuVisible={MenuVisible}
          setMenuVisible={setMenuVisible}
        />

        <EmojiPicker
          open={isOpen}
          onEmojiSelected={(emojiObject) => {
            setvalue((prev) => prev + emojiObject.emoji);
          }}
          onClose={() => setIsOpen(false)}
        />

        <BottomSheetModal
          enablePanDownToClose={true}
          handleIndicatorStyle={{ backgroundColor: CHAT_DATA_STATUS_COLOR }}
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: CHAT_BACKROUND_COLOR }}
          backdropComponent={() => <View style={{ position: "absolute", backgroundColor: "rgba(0,0,0,.5)", ...StyleSheet.absoluteFill }} />}
        >
          <View style={{ height: "100%", width: "100%" }}>
            <Text style={{ color: TITLE_COLOR, fontSize: 25, fontWeight: "500", margin: 15, marginHorizontal: 25 }}>{TotalReactions} reaction{TotalReactions > 1 ? "s" : ""}</Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
              {
                clickedMessageReactions.map(reaction => {
                  return (
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(TAB_PRESS_ACTIVE_WHITE_COLOR, false)}>
                      <View style={{ flexDirection: "row", marginBottom: 10, gap: 20, alignItems: "center", paddingHorizontal: 40, paddingVertical: 8 }}>
                        <View>
                          <Text style={{ fontSize: 25 }}>{reaction.emoji}</Text>
                        </View>
                        <View>
                          <Text style={{ color: TITLE_COLOR, fontSize: 20 }}>{reaction.count}</Text>
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  )
                })
              }
            </ScrollView>
          </View>
        </BottomSheetModal>

        <View style={{
          flex: 10,
          paddingTop: 20,
        }}>
          <FlatList
            data={messages}
            // inverted={messages.length > 10}
            // contentContainerStyle={{ flexDirection:messages.length > 10 ? 'column-reverse':"column"}}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => {
              const isEven = index % 2 == 0;
            
              let ColumnOrRow = item.message?.length > messageLenght.length ? "column" : "row";

              const direction = item.repliedMessage.message == "" ?  "column"  : ColumnOrRow;

              return (
               
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
                    reactions={item.reactions}
                    deleteForEveryone={item.deleteForEveryone}
                    messageStatus={item.messageStatus}
                    time={item.time}
                    setdraggedIndex={setdraggedIndex}
                    setemojiModalPositon={setemojiModalPositon}
                    AnimateContainer={AnimateContainer}
                    CloseContainer={CloseContainer}
                    setcheckSelection={setcheckSelection}
                    handlePresentModalPress={handlePresentModalPress}
                    setClickedMessageReactions={setClickedMessageReactions}
                    // replyMessage={replyMessage}
                    // setreplyMessage={setreplyMessage}
                    SwipeRef={item.swipeRef}
                    ReplyContainerAnimation={ReplyContainerAnimation}
                    ref={InputRef}
                    setshowingReplyMessage={setshowingReplyMessage}
                    repliedMessage={item.repliedMessage}
                    replieduser= {user}
                    direction={item.direction}
                  />
              )
            }}
          />
        </View>
        <View>
          <MessageInput1
            value={value}
            setvalue={setvalue}
            paddingRight={paddingRight}
            ClipandCameraAnimation={ClipandCameraAnimation}
            setIsOpen={setIsOpen}
            sendButtonAnimation={sendButtonAnimation}
            dispatch={dispatch}
            setMenuVisible={setMenuVisible}
            replyAnimation={replyAnimation}
            draggedIndex={draggedIndex}
            setpaddingRight={setpaddingRight}
            replyMessage={showingReplyMessage}
            setshowingReplyMessage={setshowingReplyMessage}
            ReplyContainerAnimation={ReplyContainerAnimation}
            item={item}
            ref={InputRef}
          />
        </View>
      </View>
    </BottomSheetModalProvider >
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

  replyContainer: {
    backgroundColor: CHAT_BACKROUND_COLOR,
    width: "82%",
    marginLeft: 12,
    borderWidth: 10,
    borderColor: ANSWER_BACKGROUND_COLOR,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    bottom: 40,
  },
  replayTopTextContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
  },
  replyText: {
    padding: 5,
    paddingBottom: 15,
  },
  arrowIcon: {
    position: "absolute",
    top: "10%",
  },
  leftBorderGreen: {
    borderLeftWidth: 5,
    borderLeftColor: MESSAGE_BACKGROUND_COLOR,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  replyImageWrapper: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(0,0,0,.5)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: "center"
  }
});

export default MessagesScreen;
