import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Camera from "react-native-vector-icons/Feather";
import Search from "react-native-vector-icons/Fontisto";
import {
  RippleButton,
  showToast,
  MakeAnimation
} from "./Helpers";
import { AntDesign, MaterialIcons, MaterialCommunityIcons, FontAwesome5, Octicons, Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import {
  TAB_BACKGROUND_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  TITLE_COLOR,
  CHAT_DATA_STATUS_COLOR,
  BADGE_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR
} from "./Variables";
import Menu from "./Menu";
import {
  useNavigation,
} from "@react-navigation/native";
import { useArchivedContext, useCallsChatsContext, useCallsContext, useChatsContext, useCallsFilterChatsContext, useFilterChatsContext } from "../../App";
import SelectedCallNavbar from "./SelectedCallNavbar";

const WhatsAppNavbar = ({
  opensearchBar,
  setopensearchBar,
  handleChatsMaking,
  currentTabIndex,
  setactiveRoute,
  activeRoute,
}) => {
  // *! DATA OF THE BADGES IN THE NAVBAR

  const { callChats, setcallChats, storeCallChats } = useCallsChatsContext()

  const { chats, setchats } = useChatsContext();

  const { calls, setcalls } = useCallsContext();

  const { setarchived } = useArchivedContext();

  const { callFilterChats, setcallFilterChats } = useCallsFilterChatsContext();

  const { FileredChats, setFileredChats } = useFilterChatsContext();

  const selected = chats.some((chat) => chat.selected);

  const badgesData = [
    { badgeText: "Unread", badgeIcons: "mark-chat-unread", size: 22, key: 1 },
    { badgeText: "Photos", badgeIcons: "photo", size: 22, key: 2 },
    { badgeText: "Videos", badgeIcons: "videocam", size: 22, key: 3 },
    { badgeText: "Links", badgeIcons: "insert-link", size: 22, key: 4 },
    { badgeText: "GIFs", badgeIcons: "gif", size: 27, key: 5 },
    { badgeText: "Audio", badgeIcons: "audiotrack", size: 21, key: 6 },
    { badgeText: "Documents", badgeIcons: "contact-page", size: 20, key: 7 },
    { badgeText: "Polls", badgeIcons: "poll", size: 20, key: 8 },
  ];

  const navigation = useNavigation();

  let screens = ["Community", "Chats", "Status", "Calls"];

  useEffect(() => {
    setactiveRoute(screens[currentTabIndex]);
  }, [currentTabIndex])


  const SelectChatMenuAnimation = useRef(new Animated.Value(0)).current;

  const selectedNavbarAnimation = useRef(new Animated.Value(0)).current;

  const searchNavbarAnimation = useRef(new Animated.Value(0)).current;

  const [showBadges, setShowBadges] = useState(true);

  const MenuAnimation = useRef(new Animated.Value(0)).current;

  const inputRef = useRef(null);

  const [value, setValue] = useState("");

  const [MenuData, setMenuData] = useState();

  const [readed, setreaded] = useState(false);

  const [isAllselected, setisAllselected] = useState(false);

  // *! DATA OF THE MENU OF THE CHAT WHEN WE SELECT IT

  const SelectedChatMenuData = [
    { text: "Add chat shortcut", onPress: () => { }, key: 1 },
    { text: "View contact", onPress: () => { }, key: 2 },
    {
      text: `Mark as ${readed ? "read" : "Unread"}`,
      onPress: () => {
        let newChats = [...chats];
        const readedChats = newChats.map((chat) => {
          if (chat.selected) {
            setreaded(!readed);
            return {
              ...chat,
              readed: !chat.readed,
              selected: false
            };
          }
          return chat;
        });
        setchats(readedChats);
      },
      key: 3,
    },
    !isAllselected
      ? {
        text: "Select all",
        onPress: () => {
          const newChats = [...chats];
          const selectedAllChats = newChats.map((chat) => {
            setisAllselected(true);
            if (chat) {
              return {
                ...chat,
                selected: true,
              };
            }
          });
          setchats(selectedAllChats);
        },
        key: 4,
      }
      : {
        text: "UnSelect all",
        onPress: () => {
          const newChats = [...chats];
          const selectedAllChats = newChats.map((chat) => {
            setisAllselected(false);
            if (chat) {
              return {
                ...chat,
                selected: false,
              };
            }
          });
          setchats(selectedAllChats);
        },
        key: 5,
      },
  ];

  // *! FUNCTION TO NAVIGATE TO PROFILE

  function navigateToProfile() {
    navigation.navigate("Profile", { handleChatsMaking });
  }




  function getSelectedChat() {
    const selectedChat = chats?.filter(chat => chat.selected);
    return selectedChat[selectedChat.length - 1] || null;
  }


  // *! USE EFFECT FOR SELECTINNG THE CHAT AND MAKING THE NAVBAR OPENING ANIMATION

  if (selected) {
    MakeAnimation(selectedNavbarAnimation, 1, 300);
  } else {
    MakeAnimation(selectedNavbarAnimation, 0, 300);
  }

  // *! USE EFFECT FOR OPENING THE SEARCH BAR

  if (opensearchBar) {
    MakeAnimation(searchNavbarAnimation, 1, 300)
  } else {
    MakeAnimation(searchNavbarAnimation, 0, 300)
  }

  const handleOpenSearchBar = () => {
    setopensearchBar(!opensearchBar);
    inputRef.current.focus();
  };

  const searchNavbarInterpolation = searchNavbarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [410, 0],
  });

  const searchNavbarStyles = {
    transform: [{ translateX: searchNavbarInterpolation }],
  };

  // *! FUNCTION TO PIN THE CHAT

  const handlePinChat = useCallback(() => {
    let newchats = [...chats];
    let pinnedchats = newchats.filter((chat) => chat.pinned);
    if (pinnedchats.length < 3) {
      const selectedChats = newchats.map((chat) => {
        if (chat.selected) {
          return {
            ...chat,
            pinned: !chat.pinned,
            selected: false
          };
        }
        return chat;
      });

      const pinnedChats = selectedChats.filter((chat) => chat.pinned);
      const unpinnedChats = selectedChats.filter((chat) => !chat.pinned);

      const newSelectedChats = [...pinnedChats, ...unpinnedChats];

      setchats(newSelectedChats);
      setFileredChats(newSelectedChats);

      showToast("Pinned chat");
    } else {
      showToast("You can not pin more than 3 chats");
    }
  }, [setchats, chats, setFileredChats]);

  // *! FUNCTON TO MUTE THE CHAT

  const handleMuteChat = useCallback(() => {
    let newchats = [...chats];
    const selectedChats = newchats.map((chat) => {
      if (chat.selected) {
        return {
          ...chat,
          muted: !chat.muted,
          selected: false
        };
      }
      return chat;
    });
    setchats(selectedChats);
    setFileredChats(selectedChats);
    showToast("Chat muted");
  }, [chats, setchats, setFileredChats]);

  // *! FUNCTION TO ARCHIVE THE CHAT

  const hanldeArchieveChat = useCallback(() => {
    let newchats = [...chats];
    const archievedChats = newchats.filter((chat) => chat.selected);
    const unSelectChatsArchived = archievedChats.map((chat) => {
      if (chat.selected) {
        return { ...chat, selected: false };
      }
      return chat;
    });

    setarchived((prevArchived) => [...prevArchived, ...unSelectChatsArchived]);

    const deletedChats = newchats.filter((chat) => {
      if (chat.selected) {
        return;
      }
      return chat;
    });
    setchats(deletedChats);
    setFileredChats(deletedChats);
    showToast(
      `${unSelectChatsArchived.length} chat${unSelectChatsArchived.length > 1 ? "s" : ""
      } Archieved`
    );
  }, [chats, setchats, setFileredChats]);

  // *! FUNCTION TO FILTER THE CHAT

  const handleFilterChats = useCallback(
    (vlue, route) => {
      setValue(vlue);
      if (route == "Chats") {
        if (vlue == "") {
          setchats(FileredChats);
        } else {
          const FilteredItems = chats.filter((chat) => {
            return chat.name.toLowerCase().includes(vlue.toLowerCase());
          });

          if (FilteredItems.length > 0) {
            setchats(FilteredItems);
          } else {
            setchats(FileredChats);
          }
        }
      } else if (route == "Calls") {
        if (vlue == "") {
          setcalls(callFilterChats)
        } else {
          const FilteredCallItems = calls.filter((call) => {
            return call.name.toLowerCase().includes(vlue.toLowerCase());
          });

          if (FilteredCallItems.length > 0) {
            setcalls(FilteredCallItems);
          } else {
            setcalls(callFilterChats);
          }
        }
      }
    },
    [setchats, chats, calls, callFilterChats, FileredChats]
  );

  // *! FUNCTION TO GET THE SELECTED CHAT NUMBER

  const selectedChats = chats.filter((chat) => {
    if (chat.selected) {
      return chat;
    }
  });

  const [selectedChatForNavbar, setselectedChatForNavbar] = useState(null);

  useEffect(() => {
    setselectedChatForNavbar(selectedChats[selectedChats.length - 1]);
  }, [selectedChats])


  // *! FUNCTION TO DELETE THE CHAT

  const handleDeleteChat = useCallback(() => {
    let newchats = [...chats];
    let callNewChats = [...callChats];
    let newCalls = [...calls];

    const deletedChats = newchats.filter((chat) => {
      if (chat.selected) {
        return;
      }
      return chat;
    });

    const deletedChatNames = deletedChats.map((chat) => chat.name);

    const callUpdatedChats = callNewChats.filter((chat) => {
      return deletedChatNames.includes(chat.name);
    });

    const callsDeletedChats = newCalls.map(call => {
      if (!deletedChatNames.includes(call.name)) {
        return {
          ...call,
          name: call.number,
        }
      }
      return call;
    })


    Alert.alert(
      `Delete ${selectedChats.length > 1 ? selectedChats.length : "this"} Chat${selectedChats.length > 1 ? "s" : ""
      } ?`,
      "Messages will only be removed from this device and your devices on the newer versions of the Whatsapp",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setchats(deletedChats);
            setFileredChats(deletedChats);
            setcallChats(callUpdatedChats);
            setcalls(callsDeletedChats)
            storeCallChats();
            showToast("Chat deleted");
          },
        },
      ],
      { cancelable: true }
    );

  }, [chats, setchats, setFileredChats, callChats, calls]);


  // *! FUNCTION TO CHANGE THE DATA OF THE MENU

  useEffect(() => {
    if (activeRoute == "Community") {
      const UpDatedData = [{
        text: "Settings", onPress: () => {
          navigation.navigate("Settings", { handleChatsMaking })
        }, key: 10
      }];
      setMenuData(UpDatedData);
    } else {
      const UpDatedData = [
        {
          text: "New Group",
          onPress: () => {
            navigateToProfile();
          },
          key: 1,
        },
        {
          text: "New Broadcast",
          onPress: () => {
            navigateToProfile();
          },
          key: 2,
        },
        {
          text: "Linked devices",
          onPress: () => {
            navigation.navigate("LinkedDevices");
          },
          key: 3,
        },
        { text: "Starred Messages", onPress: () => { }, key: 4 },
        {
          text: "Settings", onPress: () => {
            navigation.navigate("Settings", { handleChatsMaking })
          }, key: 5
        },
      ];
      setMenuData(UpDatedData);
    }
  }, [activeRoute]);


  const selectedCallNavbarAnimation = useRef(new Animated.Value(0)).current;


  const selectedCalls = calls.filter(cll => cll.selected);

  const isCallSelected = calls.some(cll => cll.selected);



  if (isCallSelected) {
    MakeAnimation(selectedCallNavbarAnimation, 1, 300)
  } else {
    MakeAnimation(selectedCallNavbarAnimation, 0, 300)
  }

  useEffect(() => {
    if (activeRoute == "Chats") {
      setShowBadges(true)
    } else {
      setShowBadges(false)
    }
  }, [activeRoute])



  const handleCallDelete = () => {
    const newCalls = [...calls];
    const deletedCalls = newCalls.filter(cll => !cll.selected);
    setcalls(deletedCalls);
    setcallFilterChats(deletedCalls);
  }


  return (
    <>
      <StatusBar backgroundColor={TAB_BACKGROUND_COLOR} />

      <SelectedCallNavbar
        selectedCallNavbarAnimation={selectedCallNavbarAnimation}
        selectedCalls={selectedCalls}
        handleCallDelete={handleCallDelete}
      />

      <Animated.View
        style={[
          styles.searchNavbarContainer,
          { backgroundColor: TAB_BACKGROUND_COLOR, height: showBadges ? 210 : 60, overflow: "hidden" },
          searchNavbarStyles,
        ]}
      >
        <View style={[styles.input_and_arrow_container]}>
          <RippleButton onPress={() => setopensearchBar(false)}>
            <AntDesign
              name="arrowleft"
              size={26}
              color={CHAT_DATA_STATUS_COLOR}
            />
          </RippleButton>
          <TextInput
            style={styles.Searchinput}
            placeholder="Search..."
            placeholderTextColor={CHAT_DATA_STATUS_COLOR}
            value={value}
            onChangeText={(vlue) => handleFilterChats(vlue, activeRoute)}
            ref={inputRef}
          />
        </View>
        <View style={[styles.badgesContainer]}>
          {badgesData.map((badge) => {
            return (
              <View
                key={badge.key}
                style={[
                  styles.badge,
                  { backgroundColor: BADGE_BACKGROUND_COLOR, height: 35 },
                ]}
              >
                <View style={styles.badgeIcon}>
                  <MaterialIcons
                    name={badge.badgeIcons}
                    size={badge.size}
                    color={CHAT_DATA_STATUS_COLOR}
                  />
                </View>
                <View style={styles.badgeText}>
                  <Text style={{ color: TITLE_COLOR }}>{badge.badgeText}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Animated.View>


      <Menu
        animation={SelectChatMenuAnimation}
        menuData={SelectedChatMenuData}
      />
      <Animated.View
        style={[
          styles.selectedChatNavbar,
          {
            backgroundColor: CHAT_BACKROUND_COLOR,
            transform: [{ scaleX: selectedNavbarAnimation }],
          },
        ]}
      >
        <View style={styles.chatsCountContainer}>
          <RippleButton
            onPress={() => MakeAnimation(selectedNavbarAnimation, 0, 300)}
          >
            <AntDesign name="arrowleft" size={24} color={TITLE_COLOR} />
          </RippleButton>
          <Text style={{ fontSize: 20, marginLeft: 15, color: TITLE_COLOR }}>
            {selectedChats.length}
          </Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <RippleButton onPress={handlePinChat}>
            {(selectedChatForNavbar !== null && selectedChatForNavbar?.pinned) ? <MaterialCommunityIcons name="pin-off" size={24} color={TITLE_COLOR} /> : <AntDesign name="pushpin" size={21} color={TITLE_COLOR} />}
          </RippleButton>
          <RippleButton onPress={handleDeleteChat}>
            <MaterialIcons name="delete" size={21} color={TITLE_COLOR} />
          </RippleButton>
          <RippleButton onPress={handleMuteChat}>
            {(selectedChatForNavbar !== null && selectedChatForNavbar?.muted) ? <Octicons name="unmute" size={24} color={TITLE_COLOR} /> : <FontAwesome5 name="volume-mute" size={21} color={TITLE_COLOR} />}
          </RippleButton>
          <RippleButton onPress={hanldeArchieveChat}>
            <Ionicons name="archive-outline" size={21} color={TITLE_COLOR} />
          </RippleButton>
          <RippleButton onPress={() => MakeAnimation(SelectChatMenuAnimation, 1, 1500)}>
            <SimpleLineIcons
              name="options-vertical"
              color={TITLE_COLOR}
              size={18}
            />
          </RippleButton>
        </View>
      </Animated.View>

      <Menu animation={MenuAnimation} menuData={MenuData} />
      <View
        style={[
          styles.navbarContainer,
          { backgroundColor: CHAT_BACKROUND_COLOR },
        ]}
      >
        <View style={styles.textContainer}>
          <Text
            style={[styles.whatsappText, { color: INACTIVE_TAB_WHITE_COLOR }]}
          >
            FrontsApp
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <RippleButton onPress={() => navigation.navigate("Camera")}>
            <Camera name="camera" color={INACTIVE_TAB_WHITE_COLOR} size={18} />
          </RippleButton>
          {activeRoute == "Community" || activeRoute == "Chats" ? null : (
            <RippleButton onPress={handleOpenSearchBar}>
              <Search
                name="search"
                color={INACTIVE_TAB_WHITE_COLOR}
                size={18}
              />
            </RippleButton>
          )}
          <RippleButton onPress={() => MakeAnimation(MenuAnimation, 1, 1100)}>
            <SimpleLineIcons
              name="options-vertical"
              color={INACTIVE_TAB_WHITE_COLOR}
              size={18}
            />
          </RippleButton>
        </View>
      </View>
      <View style={styles.newSearchInputContainer}>
        <Image style={styles.metaAIIconStyle} source={require("./Images/MetaAI.png")} />
        <TextInput placeholder="Ask Meta AI or Search" placeholderTextColor={CHAT_DATA_STATUS_COLOR} style={styles.newSearchInput} />
      </View>
    </>
  );
};

export default WhatsAppNavbar;

const styles = StyleSheet.create({
  navbarContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  whatsappText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
  },
  Searchinput: {
    padding: 10,
    flex: 1,
    paddingLeft: 10,
    borderWidth: 0,
    height: 50,
    fontSize: 17,
    marginLeft: 10,
    color: "white",
  },
  badgesContainer: {
    flex: 1,
    marginHorizontal: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  searchNavbarContainer: {
    height: 210,
    width: "100%",
    position: "absolute",
    zIndex: 55555,
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  input_and_arrow_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  badge: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
  },
  selectedChatNavbar: {
    width: "100%",
    height: "8%",
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
  badgeIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  badgeText: {
    flex: 2
  },
  newSearchInput: {
    width: "90%",
    backgroundColor: TAB_BACKGROUND_COLOR,
    padding: 12,
    borderRadius: 50,
    color: CHAT_DATA_STATUS_COLOR,
    fontSize: 18,
    paddingLeft: 55
  },
  newSearchInputContainer: {
    backgroundColor: CHAT_BACKROUND_COLOR, justifyContent: "center", alignItems: "center",
    position: "relative"
  },
  metaAIIconStyle: {
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 9999999999999,
    left: 23
  }
});
