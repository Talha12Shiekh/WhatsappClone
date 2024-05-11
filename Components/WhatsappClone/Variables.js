import { FontAwesome5, Ionicons, Feather,MaterialIcons } from "@expo/vector-icons";


export const ACTIVE_TAB_GREEN_COLOR = "#00a884";
export const INACTIVE_TAB_WHITE_COLOR = "#88959e";
export const TAB_BACKGROUND_COLOR = "#1f2c34";
export const TAB_PRESS_ACTIVE_WHITE_COLOR = "#4d565d";
export const CHAT_BACKROUND_COLOR = "#121b22";
export const CHAT_HEIGHT = 90;
export const TITLE_COLOR = "white";
export const CHAT_DATA_STATUS_COLOR = "#75828a";
export const STORAGE_KEY = "items";
export const ARCHIVED_STORAGE_KEY = "archived_items";
export const CHAT_SELECTION_BACKGROUND = "#182329";
export const BADGE_BACKGROUND_COLOR = "#27343d";
export const MENU_BACKGROUND_COLOR = "#233239";
export const CALLS_STORAGE_KEY = "call_items";
export const CALLS_KEY = "call_chats";
export const CALLS_ICONS_COLOR = "#787f87";
export const FILTER_STORAGE_KEY = "filter_items";
export const FILTER_CALLS_STORAGE_KEY = "filter_calls";
export const ANSWER_BACKGROUND_COLOR = "#1f2c34";
export const EMOJI_BACKGROUND_COLOR = "#86949d";
export const MESSAGE_BACKGROUND_COLOR = "#005b49";
export const GREEN_MESSAGE_CLICKED_BACKGROUND = "#024033";
export const MODAL_BACKGROUND_COLOR = "#2a3b45";
export const MODAL_TEXT_COLOR = "#7e8f99";
export const BLUE_TICK_BACKGROUND = "#53bdeb";
export const CUSTOM_MODAL_BACKGROUND = "#3a4950";
export const TAB_BAR_ICON_BACKGROUND_COLOR = "#15ed1524";
const TICK_SIZE = 16
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const generateSendTick = (messageStatus,COLOR = TITLE_COLOR) => {
  if (messageStatus == "single") {
    return <MaterialIcons name="done" size={TICK_SIZE} color={COLOR} />;
  } else if (messageStatus == "double") {
    return <Ionicons name="checkmark-done" size={TICK_SIZE} color={COLOR} />;
  } else {
    return <Ionicons name="checkmark-done" size={TICK_SIZE} color={BLUE_TICK_BACKGROUND} />;
  }
};

export function generateRandomArrow(arrow) {
  if (arrow == "incoming") {
    return (
      <Feather
        name="arrow-down-left"
        size={22}
        color={ACTIVE_TAB_GREEN_COLOR}
      />
    );
  } else if (arrow == "outgoing") {
    return (
      <Feather name="arrow-up-right" size={22} color={ACTIVE_TAB_GREEN_COLOR} />
    );
  } else {
    return <Feather name="arrow-down-left" size={22} color={"red"} />;
  }
}
