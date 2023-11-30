import { createRef } from "react";
import { Animated, StyleSheet } from "react-native";
import {
  GREEN_MESSAGE_CLICKED_BACKGROUND,
  MESSAGE_BACKGROUND_COLOR,
  ANSWER_BACKGROUND_COLOR,
} from "./Variables";

export const ACTIONS = {
  SEND_MESSAGES: "handleSendMessages",
  SELECT_MESSAGES: "handleSelection",
  DE_SELECT_MESSAGES: "handleDeSelection",
  DELETE_MESSAGES: "handleDelete",
  DELETE_FOR_EVERYONE: "handledeleteforeveryone",
  STARRE_MESSAGES: "handleStareMessages",
  COPY_TO_CLIPBOARD: "handleCopyToClipboard",
  UPDATE_MESSAGE_STATUS_TO_DOUBLE:"handleUpdateMessageStatusToDouble",
  UPDATE_MESSAGE_STATUS_TO_TRIPLE:"handleUpdateMessageStatusToTriple",
  UPDATE_REACTIONS:"handleReactionsUpdate",
  UPDATE_BACKGROUND_COLOR :"handleUpdateBackgroundColor"
};


export const MessagesReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SEND_MESSAGES: {
      return [...state, payload.messagesObject];
    }
    case ACTIONS.SELECT_MESSAGES: {
      let newMessages = [...state];
      return newMessages.map((msg) => {
        if (msg.key == payload.key) {
          return {
            ...msg,
            selected: true,
          };
        }
        return msg;
      });
    }
    case ACTIONS.DE_SELECT_MESSAGES: {
      let newMessages = [...state];
      return newMessages.map((msg) => {
        if (msg.key == payload.key) {
          if (msg.selected) {
            return {
              ...msg,
              selected: false,
            };
          }
        }
        return msg;
      });
    }
    case ACTIONS.DELETE_MESSAGES: {
      return state.filter((msgs) => !msgs.selected);
    }
    case ACTIONS.DELETE_FOR_EVERYONE: {
      return state.map((msg) => {
        if (msg.selected) {
          return {
            ...msg,
            deleteForEveryone: true,
            selected: false,
            starred:false,
            reactions:[]
          };
        }
        return msg;
      });
    }
    case ACTIONS.STARRE_MESSAGES: {      
      return state.map((msg) => {
        if (msg.selected) {
          return {
            ...msg,
            starred: !msg.starred,
            selected: false,
          };
        }
        return msg;
      });
    }
    case ACTIONS.COPY_TO_CLIPBOARD: {
      return state.map((msg) => {
        if (msg.selected) {
          return {
            ...msg,
            selected: false,
          };
        }
        return msg;
      });
    }
    case ACTIONS.UPDATE_MESSAGE_STATUS_TO_DOUBLE:{
      return state.map(msg => {
        if(msg.key == payload.key){
          return {
            ...msg,
            messageStatus:"double",
            readedTime:payload.readedTime,
          }
        }
        return msg;
      })
    }
    case ACTIONS.UPDATE_MESSAGE_STATUS_TO_TRIPLE:{
      return state.map(msg => {
        if(msg.key == payload.key){
          return {
            ...msg,
            messageStatus:"triple",
            delivered:payload.delivered
          }
        }
        return msg;
      })
    }
    case ACTIONS.UPDATE_REACTIONS:{
      return payload.reactedMessages
    }
    case ACTIONS.UPDATE_BACKGROUND_COLOR:{
      return state.map((item,i) => {
        if(i == payload.index){
          return {
            ...item,
            backgroundColor:payload.color
          }
        }
        return item;
      })
    }
    default: {
      return state;
    }
  }
  
};

const styles = StyleSheet.create({
  message: {
    padding: 7,
    borderRadius: 10,
    marginBottom: 5,
  },
  green_selected_background: {
    backgroundColor: GREEN_MESSAGE_CLICKED_BACKGROUND,
  },
  grey_selected_background: {
    backgroundColor: "black",
  },
  message_background_color: {
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
  },
  answer_background_color: {
    backgroundColor: ANSWER_BACKGROUND_COLOR,
  },
  messageCorner: {
    width: 15,
    height: 15,
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
    position: "absolute",
    zIndex: -1,
    right: 12,
    borderBottomLeftRadius: 100,
    top: 0,
    transform: [{ rotate: "270deg" }],
  },
  answermessageCorner: {
    width: 15,
    height: 15,
    backgroundColor: ANSWER_BACKGROUND_COLOR,
    position: "absolute",
    zIndex: -1,
    left: 12,
    borderBottomLeftRadius: 100,
    top: 0,
  },
});
