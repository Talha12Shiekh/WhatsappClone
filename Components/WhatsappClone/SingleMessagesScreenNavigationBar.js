import { StyleSheet, Text, View, TouchableNativeFeedback, Image, Animated, Share } from 'react-native'
import React, { useRef } from 'react'
import { ANSWER_BACKGROUND_COLOR, CHAT_BACKROUND_COLOR, MESSAGE_BACKGROUND_COLOR, TAB_BACKGROUND_COLOR, TAB_PRESS_ACTIVE_WHITE_COLOR, TITLE_COLOR } from './Variables';
import { ACTIONS } from './MessagesReducer';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from "expo-clipboard";
import {
    AntDesign,
    SimpleLineIcons,
    Ionicons,
} from "react-native-vector-icons";
import { MakeAnimation, RippleButton, showToast } from './Helpers';
import { FormattedDate, FormattedTime, FormattedDateParts } from "react-intl";
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';
import * as Sharing from 'expo-sharing';
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
import { useChatsContext } from '../../App';
import Menu from './Menu';
import { ClearChatModal, ReportModal } from './MessagesDialogs';
import { useState } from 'react';
import { useEffect } from 'react';

const SingleMessagesScreenNavigationBar = ({ dispatch, setvalue, item, messages, online, lastMessageTime, setmutedDialogOpen, messagesNavbarAnimation, selectedMessages, ReplyContainerAnimation, setshowingReplyMessage, CloseContainer, selectedStarMessages, selectedMessageIndices, setModalVisible, setopenBlockModal, value, setshowloadingDialog }) => {
    let ChatNameLength = "loremipsumdolor";


    const [showReportModal, setshowReportModal] = useState(false)
    const [checkedReport, setCheckedReport] = useState(false)

    const navigation = useNavigation();

    const InfoMessages = messages?.find((msg) => msg.selected);


    const [currentItem, setCurrentItem] = React.useState({
        ...item,
    });


    const { chats, setchats } = useChatsContext()

    const messagesMenuAnimation = useRef(new Animated.Value(0)).current;

    const MoreMenuAnimation = useRef(new Animated.Value(0)).current;

    const reportMenuAnimation = useRef(new Animated.Value(0)).current;

    const isDeletedforEveryOne = selectedMessages?.some((msg) => msg.deleteForEveryone);


    const ReportMenuData = [
        { text: "Report", onPress: () => { }, key: 1 },
    ];

    const [clearChatModal, setclearChatModal] = useState(false);





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


    function handleBlockChats() {
        !item.blocked ? setopenBlockModal(p => !p) : null;

        if (item.blocked) {
            const newChats = chats.map(chat => {
                if (chat.key == item.key) {
                    return {
                        ...chat,
                        blocked: !chat.blocked
                    }
                }
                return chat;
            });
            setchats(newChats);
            showToast(`You ${item.blocked ? "UnBlocked" : "Blocked"} this contact !`)
        }
    }

    const handleSuccess = () => {
        setshowloadingDialog(p => !p);

        const newClearedChats = chats.map(clearChat => {
            if (clearChat.key == item.key) {

                return {
                    ...clearChat,
                    messages: (clearChat.messages.length = 0)
                }
            }
            return clearChat;
        });

        setTimeout(() => {
            setshowloadingDialog(p => !p);
        }, 500);

        setchats(newClearedChats);

        showToast("You cleared this chat");
    }


    function handleReportSuccess(){
        const newReportedChats = chats.map(reportchat => {
            if(reportchat.key == item.key){
                if(checkedReport){
                    return {
                        ...reportchat,
                        blocked: true,
                        messages:(reportchat.messages.length = 0)
                    }
                }else {
                    return reportchat;
                }
            }
            return reportchat;
        });

        setshowloadingDialog(p => !p);

        setchats(newReportedChats);

        setTimeout(() => {
            setshowloadingDialog(p => !p);
        },500);

        checkedReport ? showToast(`Report send and ${item.name} has been blocked`) : showToast("Your Report has been send to Whatsapp ")
    }


    async function handleExportChat(){
        const exportedChats = chats.map(exportchat => {
            if(exportchat.key == item.key){
                return  exportchat.messages.map(msg => ({
                    time:msg.time,
                    message:msg.message,
                    date:item.time,
                    name:item.name,
                    key:Date.now()
                }))
            }
        });

        let exportchatsArray = exportedChats.flat();

        const fileData = exportchatsArray.map(({date,time,name,message}) => {
            let formattedDate = new Date(date);
            let dateString = `${formattedDate.getDate()}/${formattedDate.getMonth()},${formattedDate.getFullYear()}`;
            let formattedTime = new Date(time);
            let timeString = `${formattedTime.getHours()}:${formattedTime.getMinutes()}`
            let AMPM = formattedTime.getHours() >= 12 ? "pm" : "am"; 

            return `${dateString}, ${timeString} ${AMPM} - ${name}: ${message}`
        })

        let fileName = `Whatsapp Chat with ${item.number}.txt`

        const filePath = FileSystem.documentDirectory + fileName;
        
        try {
            await FileSystem.writeAsStringAsync(filePath, fileData.join("\n"), {
                encoding: FileSystem.EncodingType.UTF8,
            });

            await Sharing.shareAsync(filePath);
        } catch (error) {
            console.log(error.message);
        }

    }

    

    const MoreClickedMenudata = [
        { text: "Report", onPress: () => setshowReportModal(p => !p), key: 1 },
        { text: item.blocked ? "UnBlock" : "Block", onPress: () => handleBlockChats(), key: 2 },
        { text: "Clear Chat", onPress: () => setclearChatModal(p => !p), key: 3 },
        { text: "Export chat", onPress: () => handleExportChat(), key: 4 },
        { text: "Add shortcut", onPress: () => { }, key: 5 },
    ]


    const MessagesMenuData = [
        { text: "View contact", onPress: () => { }, key: 1 },
        { text: "Media, links, and docs", onPress: () => { }, key: 2 },
        { text: "Search", onPress: () => { }, key: 3 },
        {
            text: "Mute notifications", onPress: () => {
                setmutedDialogOpen(p => !p)
            }, key: 4
        },
        { text: "Dissappearing messages", onPress: () => { navigation.navigate("DissapearingMessages", { key: item.key }) }, key: 5 },
        { text: "Wallpaper", onPress: () => { }, key: 6 },
        {
            text: "More                                    >",
            onPress: () => { MakeAnimation(messagesMenuAnimation, 0, 1000); MakeAnimation(MoreMenuAnimation, 1, 1000) },
            key: 7,
        },
    ];

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

    const ICONS_SIZE = 22;


    const handleCopyMessages = async () => {
        let selectedMessages = messages.filter((msgs) => msgs.selected);
        let msgs = selectedMessages.map((msg) => msg.message).join(" ");
        await Clipboard.setStringAsync(msgs);
        dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD });
        showToast(`${selectedMessages.length} messages copied`);
    };

   
    return (
        <>
            <ClearChatModal
                clearChatModal={clearChatModal}
                setclearChatModal={setclearChatModal}
                handleClearChat={handleSuccess}
            />
            <ReportModal
                showReportModal={showReportModal}
                setshowReportModal={setshowReportModal}
                setCheckedReport={setCheckedReport}
                checkedReport={checkedReport}
                name={item.name}
                handleSuccess={handleReportSuccess}
            />
            <View
                style={{
                    height: 60,
                    backgroundColor: TAB_BACKGROUND_COLOR,
                    flexDirection: "row",
                    zIndex: -1,
                }}
            >
                <TouchableNativeFeedback
                    onPress={() => {

                        dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD });
                        if (value !== "") {
                            Alert.alert(
                                "Alert",
                                "Do you want to keep writing the message",
                                [
                                    {
                                        text: "Discard",
                                        onPress: () => {
                                            navigation.goBack();
                                            setvalue("")
                                        },
                                        style: "cancel",
                                    },
                                    {
                                        text: "Yes",
                                        onPress: () => {

                                        },
                                    },
                                ],
                                { cancelable: true }
                            );
                        } else {
                            navigation.goBack();
                        }
                    }}
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
                <Menu
                    animation={MoreMenuAnimation}
                    menuData={MoreClickedMenudata}
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
                        onPress={() => { MakeAnimation(messagesNavbarAnimation, 0, 300); dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD }) }}
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
                    {!isDeletedforEveryOne && selectedMessages?.length <= 1 ? (
                        <RippleButton onPress={() => {
                            MakeAnimation(ReplyContainerAnimation, 5, 500);
                            const selectedMessage = messages.findIndex(msg => msg.selected);
                            dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD })
                            setshowingReplyMessage({
                                message: messages[selectedMessage].message,
                                status: selectedMessage
                            })
                        }}>
                            <Ionicons
                                name="md-arrow-undo-sharp"
                                size={ICONS_SIZE}
                                color={TITLE_COLOR}
                            />
                        </RippleButton>
                    ) : null}
                    {!isDeletedforEveryOne && <RippleButton
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
                    </RippleButton>}
                    {(selectedMessages?.length <= 1 && selectedMessageIndices % 2 == 0) && !isDeletedforEveryOne ? (
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
                            CloseContainer();
                        }}
                    >
                        <MaterialCommunityIcons
                            name="delete"
                            size={ICONS_SIZE}
                            color={TITLE_COLOR}
                        />
                    </RippleButton>

                    {!isDeletedforEveryOne && <RippleButton onPress={() => { handleCopyMessages(); CloseContainer(); dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD }) }}>
                        <MaterialIcons
                            name="content-copy"
                            size={ICONS_SIZE}
                            color={TITLE_COLOR}
                        />
                    </RippleButton>}
                    {!isDeletedforEveryOne && <RippleButton onPress={() => { ForwardMessages(); CloseContainer(); dispatch({ type: ACTIONS.COPY_TO_CLIPBOARD }) }}>
                        <Ionicons
                            name="md-arrow-redo-sharp"
                            size={ICONS_SIZE}
                            color={TITLE_COLOR}
                        />
                    </RippleButton>}
                    {selectedMessageIndices % 2 !== 0 && !isDeletedforEveryOne && selectedMessages?.length <= 1 && <RippleButton onPress={() => { MakeAnimation(reportMenuAnimation, 1, 1000); CloseContainer() }}>
                        <SimpleLineIcons
                            name="options-vertical"
                            color={TITLE_COLOR}
                            size={18}
                        />
                    </RippleButton>}
                </View>
            </Animated.View>
        </>
    )
}

export default SingleMessagesScreenNavigationBar

const styles = StyleSheet.create({
    // 
    selectedChatNavbar: {
        width: "100%",
        height: 60,
        position: "absolute",
        zIndex: 2222,
        flexDirection: "row",
        justifyContent: "space-between",
        top: 0,
    },
    // 
    iconContainer: {
        flexDirection: "row",
        gap: 2,
    },
    // 
    chatsCountContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    // 
    messagesImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
});