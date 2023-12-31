import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Animated,
  useWindowDimensions,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  MENU_BACKGROUND_COLOR,
  TAB_BACKGROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  TITLE_COLOR,
} from "./Variables";
import { useRoute } from "@react-navigation/native";
import {MakeAnimation} from "./Helpers"

const Menu = ({ animation, menuData }) => {
  const { height } = useWindowDimensions();

  const MenuStyles = {
    opacity: animation.interpolate({
      inputRange: [0, 0.9, 1],
      outputRange: [0, 0, 1],
    }),
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-height, 0],
        }),
      },
    ],
  };

  return (
    <>
    <TouchableWithoutFeedback onPress={() => MakeAnimation(animation,0,1100)}>
      <Animated.View
        style={{
          width: 100,
          aspectRatio: 1,
          backgroundColor: "rgba(0,0,0,.1)",
          position: "absolute",
          zIndex: 99999,
          right: 0,
          borderRadius:100,
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20],
              }),
            },
          ],
        }}
      />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.menuContainer,
          { backgroundColor: MENU_BACKGROUND_COLOR },
          MenuStyles,
        ]}
      >
        <FlatList
          estimatedItemSize={100}
          data={menuData}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <TouchableNativeFeedback
                onPress={() => {
                  MakeAnimation(animation,0,1100); item.onPress() 
                }}
                background={TouchableNativeFeedback.Ripple(
                  TAB_PRESS_ACTIVE_WHITE_COLOR,
                  false
                )}
              >
                <View style={styles.menuItem}>
                  <Text style={{ color: TITLE_COLOR, fontSize: 17 }}>
                    {item.text}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            );
          }}
        />
      </Animated.View>
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    width: 250,
    zIndex: 2222222,
    right: 10,
    top:10,
  },
  menuItem: {
    width: "120%",
    padding: 15,
  },
});
