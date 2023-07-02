import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const EmojiShower = ({ emojis }) => {
  return (
    <>
      {emojis.map((emoji) => {
        return <Emoji emoji={emoji.emoji} key={emoji.key} />;
      })}
    </>
  );
};

const Emoji = ({ emoji }) => {
  const translateX = useSharedValue(0);

  const translateY = useSharedValue(0);

  const AnimatedView = Animated.createAnimatedComponent(View);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        }
      ],
    };
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });


  return (
    <PanGestureHandler style={{ flex: 1 }} onGestureEvent={onDrag}>
        <AnimatedView style={[styles.emojiImage, containerStyle]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </AnimatedView>
    </PanGestureHandler>
  );
};

export default EmojiShower;

const styles = StyleSheet.create({
  emojiImage: {
    position: "absolute",
    zIndex: 9999999999,
    top: 320,
    left: 100,
  },
  emoji: {
    fontSize: 50,
  },
});
