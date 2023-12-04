import {
  View,
  Text,
  Animated,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ScrollView,
  Share,
  Alert
} from "react-native";
import { Dialog, CheckBox, Icon } from '@rneui/themed';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback, useMemo, useEffect,
  useReducer,
  useRef,
  useState
} from "react";
import {
  RippleButton,
  showToast,
  MakeAnimation
} from "./Helpers";

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
  TITLE_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  ANSWER_BACKGROUND_COLOR,
  EMOJI_BACKGROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  MESSAGE_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
} from "./Variables";
import Menu from "./Menu";
import { MessagesReducer, ACTIONS } from "./MessagesReducer";
import SingleMessage from "./SingleMessage";
import { useChatsContext } from "../../App";
import DeleteModal from "./DeleteModal";
import MessageModal from "./MessageModal";
import MessageInput1 from "./MessageInput1";
import ReactEmojiModal from "./ReactEmojiModal";
import SingleMessagesScreenNavigationBar from "./SingleMessagesScreenNavigationBar";
import SingleReaction from "./SingleReaction";
import {BlockModal, LoadingModal, MuteNotificationsDialog} from "./MessagesDialogs";


const MessagesScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const user = item.name

  const { chats, setchats } = useChatsContext();

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


  const [showloadingDialog, setshowloadingDialog] = useState(false);

  if (messagesSelected) {
    MakeAnimation(messagesNavbarAnimation, 1, 300);
  } else {
    MakeAnimation(messagesNavbarAnimation, 0, 300);
  }


  const [value, setvalue] = useState("");

  const [paddingRight, setpaddingRight] = useState(100);

  const ClipandCameraAnimation = useRef(new Animated.Value(0)).current;

  const sendButtonAnimation = useRef(new Animated.Value(0)).current;

  const [clickedMessageReactions, setClickedMessageReactions] = useState([]);

  const TotalReactions = clickedMessageReactions.reduce((ac, it) => {
    return ac += it.count;
  }, 0);

  const [isOpen, setIsOpen] = useState(false);






  const [mutedDialogOpen, setmutedDialogOpen] = useState(false);


  const selectedMessage = messages.filter(msg => msg.selected);

  const [selectedStarMessages, setselectedStarMessages] = useState(null);





  useEffect(() => {
    setselectedStarMessages(selectedMessage[selectedMessage.length - 1])
  }, [selectedMessage]);

  const [showingReplyMessage, setshowingReplyMessage] = useState({
    message: "",
    status: ""
  });

  const [openBlockModal,setopenBlockModal] = useState(false);


  useFocusEffect(() => {
    navigation.setOptions({
      header: () => {
        return <SingleMessagesScreenNavigationBar
          dispatch={dispatch}
          item={item}
          messages={messages}
          online={online}
          lastMessageTime={lastMessageTime}
          setmutedDialogOpen={setmutedDialogOpen}
          messagesNavbarAnimation={messagesNavbarAnimation}
          selectedMessages={selectedMessages}
          ReplyContainerAnimation={ReplyContainerAnimation}
          setshowingReplyMessage={setshowingReplyMessage}
          CloseContainer={CloseContainer}
          selectedStarMessages={selectedStarMessages}
          selectedMessageIndices={selectedMessageIndices}
          setModalVisible={setModalVisible}
          setopenBlockModal={setopenBlockModal}
          value={value}
        />
      },
    });
  });

  const { height } = useWindowDimensions()

  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [ShowScrollToBottomButton, setShowScrollToBottomButton] = useState(false)


  const ScrollToBottomButton = () => {
    return (
      <TouchableOpacity onPress={() => {
        MessageContainerRef.current.scrollToEnd({ animated: true })
      }}>
        <View style={{ zIndex: 999999999999999, bottom: 80, right: 20, position: "absolute", width: 35, height: 35, backgroundColor: ANSWER_BACKGROUND_COLOR, borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
          <FontAwesome name="angle-double-down" size={24} color={EMOJI_BACKGROUND_COLOR} />
        </View>
      </TouchableOpacity>
    )
  }

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
    MakeAnimation(EmojiContainerAnimation, 1, 1000)
  }

  const CloseContainer = () => {
    MakeAnimation(EmojiContainerAnimation, 0, 500)
  }

  const [checkSelection, setcheckSelection] = useState(false);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['50%', '51%'], []);

  const InputRef = useRef(null)

  // variables
  const handlePresentModalPress = useCallback((reactions) => {
    bottomSheetRef.current?.present();

    setClickedMessageReactions(reactions)
  }, []);

  const MessageContainerRef = useRef(null);

  function scrollToBottom(e) {
    MessageContainerRef?.current?.scrollToEnd({ animated: true })

    setContentHeight(e.nativeEvent.layout.height)
  }


  return (
    <BottomSheetModalProvider>

     <LoadingModal
     showloadingDialog={showloadingDialog}
     setshowloadingDialog={setshowloadingDialog}
     />

     <BlockModal
          name={item.name}
          setopenBlockModal={setopenBlockModal}
          openBlockModal={openBlockModal}
          dispatch={dispatch}
          item={item}
          setshowloadingDialog={setshowloadingDialog}
     />

      <MuteNotificationsDialog
        mutedDialogOpen={mutedDialogOpen}
        setmutedDialogOpen={setmutedDialogOpen}
      />
      <DeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        showDeleteforeveryone={showDeleteforeveryone}
        selectedMessages={selectedMessages}
        handleShowSelectionInAlert={handleShowSelectionInAlert}
        dispatch={dispatch}
      />

      <ReactEmojiModal
        setIsOpen={setIsOpen}
        CloseContainer={CloseContainer}
        dispatch={dispatch}
        messages={messages}
        checkSelection={checkSelection}
        containerAnimation={EmojiContainerAnimation}
        emojiModalPositon={emojiModalPositon} />

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
                    <SingleReaction
                      reaction={reaction}
                    />
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
            ref={MessageContainerRef}
            data={messages}
            onLayout={scrollToBottom}
            keyExtractor={(item) => item.key}
            onContentSizeChange={(width, height) => setContentHeight(height)}
            onScroll={(e) => {
              setContentVerticalOffset(e.nativeEvent.contentOffset.y);
              setShowScrollToBottomButton(e.nativeEvent.contentOffset.y + height < contentHeight);
            }}
            renderItem={({ item, index }) => {
              const isEven = index % 2 == 0;

              return (

                <SingleMessage
                  key={item.key}
                  item={item}
                  isEven={isEven}
                  index={index}
                  dispatch={dispatch}
                  keyOfMessage={item.key}
                  setemojiModalPositon={setemojiModalPositon}
                  AnimateContainer={AnimateContainer}
                  CloseContainer={CloseContainer}
                  setcheckSelection={setcheckSelection}
                  handlePresentModalPress={handlePresentModalPress}
                  ReplyContainerAnimation={ReplyContainerAnimation}
                  ref={{ InputRef, MessageContainerRef }}
                  setshowingReplyMessage={setshowingReplyMessage}
                  replieduser={user}
                  messages={messages}
                />
              )
            }}
          />
        </View>
        <View>
          <MessageInput1
            messages={messages}
            value={value}
            setvalue={setvalue}
            paddingRight={paddingRight}
            ClipandCameraAnimation={ClipandCameraAnimation}
            setIsOpen={setIsOpen}
            sendButtonAnimation={sendButtonAnimation}
            dispatch={dispatch}
            setMenuVisible={setMenuVisible}
            replyAnimation={replyAnimation}
            setpaddingRight={setpaddingRight}
            replyMessage={showingReplyMessage}
            setshowingReplyMessage={setshowingReplyMessage}
            ReplyContainerAnimation={ReplyContainerAnimation}
            item={item}
            ref={{ inputRef: InputRef, MessageContainerRef: MessageContainerRef }}
          />
        </View>

        {ShowScrollToBottomButton && <ScrollToBottomButton />}
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
