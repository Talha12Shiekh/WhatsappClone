import { Animated, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useRef } from 'react'
import { ANSWER_BACKGROUND_COLOR, MESSAGE_BACKGROUND_COLOR, TAB_PRESS_ACTIVE_WHITE_COLOR } from './WhatsappMainScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmojiButton = ({ children, onPress, ...rest }) => {
    const EmojiScaleAnimation = useRef(new Animated.Value(1)).current;

    const finishAnimation = () => {
        return Animated.timing(EmojiScaleAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const scaleEmoji = () => {
        return Animated.timing(EmojiScaleAnimation, {
            toValue: 1.3,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            finishAnimation()
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
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(TAB_PRESS_ACTIVE_WHITE_COLOR, true, 50)} onPress={() => {
                onPress(), scaleEmoji()
            }
            }>
                <Animated.View style={EmojiScaleStyles} {...rest}>
                    <Text style={styles.emoji}>{children}</Text>
                </Animated.View>
            </TouchableNativeFeedback>
        </View>
    )
}

const ReactEmojiModal = ({ emojiModalPositon }) => {

    const { x, y, opacity } = emojiModalPositon

    const Emojis = ["👍", "❤", "😂", "😮", "😥", "🙏"];

    return (
        <View style={[styles.emojiContainer, {
            opacity, transform: [
                {
                    translateX: x
                },
                {
                    translateX: y
                }
            ]
        }]}>
            {
                Emojis.map(emoji => {
                    return <EmojiButton onPress={() => { }} key={emoji}>{emoji}</EmojiButton>
                })
            }
            <TouchableOpacity>
                <View style={[styles.emojiButtonStyles, { backgroundColor: TAB_PRESS_ACTIVE_WHITE_COLOR }]}>
                    <Text style={styles.plus}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
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