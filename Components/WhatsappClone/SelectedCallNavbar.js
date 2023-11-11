import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ClosenavbarAnimation, RippleButton } from "./Helpers";
import { TAB_BACKGROUND_COLOR, TITLE_COLOR } from "./Variables";
import { AntDesign,MaterialIcons } from "@expo/vector-icons";

const SelectedCallNavbar = ({selectedCallNavbarAnimation,selectedCalls,handleCallDelete}) => {
  return (
    <Animated.View
      style={[
        styles.selectedCallNavbar,
        {
          backgroundColor: TAB_BACKGROUND_COLOR,
          transform: [{ scaleX: selectedCallNavbarAnimation }],
        },
      ]}
    >
      <View style={styles.chatsCountContainer}>
        <RippleButton
          onPress={() => ClosenavbarAnimation(selectedCallNavbarAnimation)}
        >
          <AntDesign name="arrowleft" size={24} color={TITLE_COLOR} />
        </RippleButton>
        <Text style={{ fontSize: 20, marginLeft: 15, color: TITLE_COLOR }}>
          {selectedCalls.length}
        </Text>
      </View>
      <View
        style={[
          styles.iconContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <RippleButton onPress={handleCallDelete}>
          <MaterialIcons name="delete" size={21} color={TITLE_COLOR} />
        </RippleButton>
      </View>
    </Animated.View>
  );
};

export default SelectedCallNavbar;

const styles = StyleSheet.create({
    selectedCallNavbar: {
        width: "100%",
        height: "8%",
        backgroundColor: "red",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        top: 0,
        zIndex: 1111,
      },
      chatsCountContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      iconContainer: {
        flexDirection: "row",
        gap: 2,
      },
});
