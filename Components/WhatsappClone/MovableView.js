import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { PanGestureHandler,PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from "react-native-reanimated";

const MovableView = ({
  values,
  backgrounds,
  alignments,
  setModalVisible,
  setvalue,
  setisedited,
  seteditedIndex,
}) => {
  return (
    <>
      {values.map((value, index) => {
        return (
          <TextContainer
            key={index}
            value={value}
            index={index}
            backgrounds={backgrounds}
            alignments={alignments}
            setModalVisible={setModalVisible}
            values={values}
            setvalue={setvalue}
            setisedited={setisedited}
            seteditedIndex={seteditedIndex}
          />
        );
      })}
    </>
  );
};

const TextContainer = ({
  value,
  index,
  backgrounds,
  alignments,
  setModalVisible,
  values,
  setvalue,
  setisedited,
  seteditedIndex,
}) => {
  const positions = [340, 240, 140, 200];
  const Leftpositions = [20, 60, 100, 140];

  const AnimatedView = Animated.createAnimatedComponent(View);

  const translateX = useSharedValue(0);

  const translateY = useSharedValue(0);

  const scale = useSharedValue(1);

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
          scale:scale.value
        }
      ],
    };
  });

  function findClickedView(index) {
    const ClickedView = values.find((_, i) => i == index);
    setvalue(ClickedView);
    setisedited(true);
    seteditedIndex(index);
  }

  const onPinch = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = withSpring(event.scale);
    },
  });

  return (
    <PinchGestureHandler onGestureEvent={onPinch}>
      <AnimatedView
        style={[
          styles.MovableViewContainer,
          containerStyle,
          {
            backgroundColor: !backgrounds[index] ? "transparent" : "white",
            top: positions[index],
            alignSelf: alignments[index],
            left: Leftpositions[index],
          },
        ]}
      >
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            findClickedView(index);
          }}
        >
          <Text
            style={[
              styles.movableText,
              {
                color: !backgrounds[index] ? "white" : "black",
              },
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      </AnimatedView>
    </PanGestureHandler>
    </AnimatedView>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  MovableViewContainer: {
    position: "absolute",
    zIndex: 9999999,
    padding: 10,
    borderRadius: 10,
  },
  movableText: {
    fontSize: 25,
  },
});

export default MovableView;
