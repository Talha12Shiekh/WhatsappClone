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
} from "./WhatsappMainScreen";
import { useRoute } from "@react-navigation/native";

const Menu = ({ animation, menuData }) => {
  const { height } = useWindowDimensions();

  const ResetAnimaton = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1100,
      useNativeDriver: true,
    }).start();
  };

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
    <TouchableWithoutFeedback onPress={ResetAnimaton}>
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
          data={menuData}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <TouchableNativeFeedback
                onPress={() => {
                  item.onPress(), ResetAnimaton();
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
