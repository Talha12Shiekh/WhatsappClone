import { Text, View ,TouchableNativeFeedback} from 'react-native'
import React from 'react'

const SingleReaction = ({reaction}) => {
    return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(TAB_PRESS_ACTIVE_WHITE_COLOR, false)}>
            <View style={{ flexDirection: "row", marginBottom: 10, gap: 20, alignItems: "center", paddingHorizontal: 40, paddingVertical: 8 }}>
                <View>
                    <Text style={{ fontSize: 25 }}>{reaction.emoji}</Text>
                </View>
                <View>
                    <Text style={{ color: TITLE_COLOR, fontSize: 20 }}>{reaction.count}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

export default SingleReaction