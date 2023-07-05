import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
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

  const scale = useSharedValue(1);

  const AnimatedView = Animated.createAnimatedComponent(View);

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
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

  const onPinch = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = withSpring(event.scale);
    },
  });

  return (
    <PinchGestureHandler
      onGestureEvent={onPinch}
      onHandlerStateChange={onPinch}
    >
      <AnimatedView style={[styles.emojiImage, containerStyle]}>
        <PanGestureHandler onGestureEvent={onDrag}>
          <Animated.View>
            <Text style={styles.emoji}>{emoji}</Text>
          </Animated.View>
        </PanGestureHandler>
      </AnimatedView>
    </PinchGestureHandler>
  );
};

export default EmojiShower;

const styles = StyleSheet.create({
  emojiImage: {
    position: "absolute",
    zIndex: 9999999999,
    top: 320,
    left: 100,
    width:100,
    aspectRatio:1,
    justifyContent:"center",
    alignItems:'center'
  },
  emoji: {
    fontSize: 50,
  }
});
