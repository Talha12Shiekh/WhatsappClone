import { Animated, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useRef } from 'react'
import { ANSWER_BACKGROUND_COLOR, MESSAGE_BACKGROUND_COLOR, TAB_PRESS_ACTIVE_WHITE_COLOR } from './WhatsappMainScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react';

const EmojiButton = ({ children, onPress,animation, ...rest }) => {
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
                    <Animated.Text style={[styles.emoji,{transform:[{scale:animation}]}]}>{children}</Animated.Text>
                </Animated.View>
            </TouchableNativeFeedback>
        </View>
    )
}

const ReactEmojiModal = ({ emojiModalPositon, containerAnimation,checkSelection }) => {

    const { x, y, opacity } = emojiModalPositon

    const Emojis = [{ emoji: "👍", animation: new Animated.Value(0) }, { emoji: "❤", animation: new Animated.Value(0) }, { emoji: "😂", animation: new Animated.Value(0) }, { emoji: "😮", animation: new Animated.Value(0) }, { emoji: "😥", animation: new Animated.Value(0) }, { emoji: "🙏", animation: new Animated.Value(0) }];

    if(checkSelection){
       Emojis.map(({animation},index) => {
            Animated.sequence([
                Animated.timing(animation,{
                    toValue:1,
                    duration:index * 200,
                    useNativeDriver:true
                })
            ]).start()
       })
    }

    return (
        <Animated.View style={[styles.emojiContainer, {
            opacity, top: y, left: x,
            transform:[{scaleX:containerAnimation}]
        }]}>
            {
                Emojis.map(({emoji,animation}) => {
                    return <EmojiButton onPress={() => { }} animation={animation} key={emoji}>{emoji}</EmojiButton>
                })
            }
            <TouchableNativeFeedback>
                <View style={[styles.emojiButtonStyles, { backgroundColor: TAB_PRESS_ACTIVE_WHITE_COLOR }]}>
                    <Text style={styles.plus}>+</Text>
                </View>
            </TouchableNativeFeedback>
        </Animated.View>
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