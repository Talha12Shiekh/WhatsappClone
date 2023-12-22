import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { ACTIVE_TAB_GREEN_COLOR, CHAT_DATA_STATUS_COLOR, CUSTOM_MODAL_BACKGROUND, MESSAGE_BACKGROUND_COLOR, TITLE_COLOR } from './Variables'
import { TouchableOpacity } from 'react-native'

const CustomModal = ({visible,setvisible,AdditionalContent,showMoreContent = true,title,description,secondBtnText,handleCancelPressed,handleSucess,firstbtntext = "Cancel"}) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
            setvisible(p => !p);
            }}

        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.infoText}>{description}</Text>
                    {showMoreContent && <AdditionalContent />}
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity onPress={() => {handleCancelPressed();setvisible(p => !p)}}>
                            <Text style={styles.btnText}>{firstbtntext}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {handleSucess();setvisible(p => !p)}}>
                            <Text style={styles.btnText}>{secondBtnText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView:{
        backgroundColor:CUSTOM_MODAL_BACKGROUND,
        padding:20,
        borderRadius:15,
        maxWidth:350,
        paddingTop:8
    },
    title:{
        color:TITLE_COLOR,fontSize:25,
        marginVertical:15,
    },
    infoText:{
        color:CHAT_DATA_STATUS_COLOR
    },
    btnsContainer:{
        flexDirection:"row",
        gap:20,
        alignSelf:"flex-end",
        marginTop:20
    },
    btnText:{
        color:ACTIVE_TAB_GREEN_COLOR
    }
})