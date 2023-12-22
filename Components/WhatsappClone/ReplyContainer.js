import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback ,Animated} from "react-native"
import { ACTIVE_TAB_GREEN_COLOR, CHAT_BACKROUND_COLOR, CHAT_DATA_STATUS_COLOR, GREEN_MESSAGE_CLICKED_BACKGROUND, TAB_PRESS_ACTIVE_WHITE_COLOR, TITLE_COLOR } from "./Variables";
import { ACTIONS } from "./MessagesReducer";

const ReplyContainer = React.forwardRef(function ReplyContainer({ repliedMessage, replieduser, index, messages, dispatch }, ref) {
    let backgroundColor = index % 2 == 0 ? GREEN_MESSAGE_CLICKED_BACKGROUND : CHAT_BACKROUND_COLOR;

    let replyTextColor = index % 2 == 0 ? TITLE_COLOR : CHAT_DATA_STATUS_COLOR

    let repliedUser = repliedMessage.status % 2 !== 0 ? replieduser : "You";

    let replyLimit = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate doloremque deserunt culpa voluptatem libero consequatur veniam, ad voluptas";

    function handleHightLightMessage(msg) {
        const repliedIndex = messages.findIndex(message => message.message == msg);
        ref?.current?.scrollToIndex({ animated: true, index: repliedIndex });

        dispatch({ type: ACTIONS.UPDATE_BACKGROUND_COLOR, payload: { index: repliedIndex, color: "#00800094" } })

        setTimeout(() => {
            dispatch({ type: ACTIONS.UPDATE_BACKGROUND_COLOR, payload: { index: repliedIndex, color: "transparent" } })
        }, 500)
    }

    let replyMessage = repliedMessage.message.length > replyLimit.length ? repliedMessage.message.slice(0, replyLimit.length) + " ..." : repliedMessage.message;


    return (
        <TouchableNativeFeedback onPress={() => handleHightLightMessage(repliedMessage.message)} background={TouchableNativeFeedback.Ripple(TAB_PRESS_ACTIVE_WHITE_COLOR, false)}>
            <View style={[styles.replyContainer, { backgroundColor }]}>
                <View style={styles.sideline} />
                <View>
                    <Text style={{ color: ACTIVE_TAB_GREEN_COLOR, marginTop: 5 }}>{repliedUser}</Text>
                    <Text style={[styles.messageReplied, { color: replyTextColor }]}>{replyMessage}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
})

const styles = StyleSheet.create({
    replyContainer: {
        backgroundColor: "red",
        flexDirection: 'row',
        // backgroundColor: repliedMessage CHAT_BACKROUND_COLOR ,
        // padding:10,
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 0,
        paddingRight: 10,
        // paddingVertical:10
    },
    sideline: {
        width: 5,
        backgroundColor: ACTIVE_TAB_GREEN_COLOR,
        marginRight: 10,
        height: "100%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    messageReplied: { marginTop: 5, marginBottom: 5 }
})

export default ReplyContainer