import { Animated, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { ANSWER_BACKGROUND_COLOR, TAB_PRESS_ACTIVE_WHITE_COLOR } from './Variables';
import { ACTIONS } from './MessagesReducer';
import EmojiPicker from "rn-emoji-keyboard";
import {MakeAnimation} from "./Helpers"

const EmojiButton = ({ children, onPress, animation, ...rest }) => {
    const EmojiScaleAnimation = useRef(new Animated.Value(1)).current;

    const scaleEmoji = () => {
        return Animated.timing(EmojiScaleAnimation, {
            toValue: 1.5,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            MakeAnimation(EmojiScaleAnimation,1,200)
        })
    }


    const EmojiScaleStyles = {
        transform: [
            {
                scale: EmojiScaleAnimation
            }
        ]
    }

    return (
        <View style={styles.emojiButtonStyles}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(TAB_PRESS_ACTIVE_WHITE_COLOR, true, 30)} onPress={() => {
               scaleEmoji(), onPress()
            }
            }>
                <Animated.View style={EmojiScaleStyles} {...rest}>
                    <Animated.Text style={[styles.emoji, { transform: [{ scale: animation }] }]}>{children}</Animated.Text>
                </Animated.View>
            </TouchableNativeFeedback>
        </View>
    )
}

const ReactEmojiModal = ({ emojiModalPositon, containerAnimation, checkSelection, messages, dispatch, CloseContainer }) => {

    const { x, y, opacity } = emojiModalPositon;

    const [open, setisopen] = useState(false)

    const Emojis = [{ emoji: "👍", animation: new Animated.Value(0) }, { emoji: "❤", animation: new Animated.Value(0) }, { emoji: "😂", animation: new Animated.Value(0) }, { emoji: "😮", animation: new Animated.Value(0) }, { emoji: "😥", animation: new Animated.Value(0) }, { emoji: "🙏", animation: new Animated.Value(0) }];

    if (checkSelection) {
        Emojis.map(({ animation }, index) => {
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: index * 100,
                    useNativeDriver: true
                })
            ]).start()
        })
    }
    let emojiMatched = false

    function handleReaction(emoji) {
        let newMessages = [...messages];
        let EmojiObject = { key: Date.now(), emoji, count: 1 }
        const reactedMessages = newMessages.map(msg => {
            if (msg.selected) {
                const updatedReactions = msg.reactions.map(reaction => {
                    if (reaction.emoji == EmojiObject.emoji) {
                        emojiMatched = true
                        return {
                            ...reaction,
                            count: reaction.count + 1
                        }
                    }
                    return reaction
                })

                if (emojiMatched) {
                    return {
                        ...msg,
                        reactions: updatedReactions,
                        selected: false
                    }
                } else {
                    return {
                        ...msg,
                        reactions: [...msg.reactions, EmojiObject],
                        selected: false
                    }
                }
            }
            return msg;
        })
        dispatch({
            type: ACTIONS.UPDATE_REACTIONS, payload: {
                reactedMessages,
            }
        });
        CloseContainer()
    }

    return (
        <>
            <EmojiPicker
                open={open}
                onEmojiSelected={(emojiObject) => {
                    handleReaction(emojiObject.emoji)
                }}
                onClose={() => setisopen(false)}
            />
            <Animated.View style={[styles.emojiContainer, {
                opacity, top: y, left: x,
                transform: [{ scaleX: containerAnimation }]
            }]}>
                {
                    Emojis.map(({ emoji, animation,key }) => {
                        return <EmojiButton key={key} onPress={() => handleReaction(emoji)} animation={animation} >{emoji}</EmojiButton>
                    })
                }
                <TouchableNativeFeedback onPress={() => { ; CloseContainer(); setisopen(p => !p) }}>
                    <View style={[styles.emojiButtonStyles, { backgroundColor: TAB_PRESS_ACTIVE_WHITE_COLOR }]}>
                        <Text style={styles.plus}>+</Text>
                    </View>
                </TouchableNativeFeedback>
            </Animated.View>
        </>
    )
}

export default ReactEmojiModal

const styles = StyleSheet.create({
    emojiContainer: {
        width: "80%",
        height: 50, backgroundColor: ANSWER_BACKGROUND_COLOR,
        borderRadius: 20,
        position: "absolute",
        zIndex: 999999999,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 10
    },
    emoji: {
        fontSize: 25,
    },
    emojiButtonStyles: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    plus: { fontSize: 40, marginTop: -10 }
})