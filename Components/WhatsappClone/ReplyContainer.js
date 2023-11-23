import React from "react";
import { View, Text } from "react-native"

const ReplyContainer = React.forwardRef(function ReplyContainer({ repliedMessage ,stylesofReply}, ref) {
    return (
        <View style={{ backgroundColor: "red",...stylesofReply}} ref={ref}>
            <Text>{repliedMessage}</Text>
        </View>
    )
})

export default ReplyContainer