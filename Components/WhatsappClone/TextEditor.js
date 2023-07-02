import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
  } from 'react-native';
  import React from 'react';
  import { Feather } from '@expo/vector-icons';
  import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
  import MovableView from './MovableView';
  import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ACTIVE_TAB_GREEN_COLOR } from './WhatsappMainScreen';
  
  export default function TextEditor({modalVisible,setModalVisible}) {
    const [background, setbackground] = React.useState(false);
  
    const [alignment, setalignment] = React.useState('center');
  
    const [Iconalignment, setIconalignment] = React.useState('align-center');
  
    const [value, setvalue] = React.useState('');
  
    const [values, setvalues] = React.useState([]);
  
    const [backgrounds, setbackgrounds] = React.useState([]);
  
    const [alignments, setalignments] = React.useState([]);
  
    const [isedited, setisedited] = React.useState(false);
  
    const [editedIndex,seteditedIndex] = React.useState(null);
  
    const handleAlignment = () => {
      if (alignment == 'center') {
        setalignment('flex-start');
        setIconalignment('align-left');
      } else if (alignment == 'flex-start') {
        setalignment('flex-end');
        setIconalignment('align-right');
      } else if (alignment == 'flex-end') {
        setalignment('center');
        setIconalignment('align-center');
      }
    };
  
    let [fontsLoaded] = useFonts({
      Roboto_400Regular,
    });
  
    if (!fontsLoaded) {
      return null;
    }
  
    const backgroundStyles = {
      backgroundColor: !background ? 'transparent' : 'white',
      borderColor: 'white',
      borderWidth: 1,
    };
  
    const alignStyles = {
      alignItems: alignment,
    };
  
    const handleSubmitText = () => {
      setModalVisible(false);
      if(!isedited){
        setvalues((prevValue) => [...prevValue, value]);
      }else{
        values[editedIndex] = value;
        backgrounds[editedIndex] = background;
        alignments[editedIndex] = alignment
        setisedited(false);
        seteditedIndex(null);
        setvalues(values);
        setbackgrounds(backgrounds);
        setalignments(alignments)
      }
      setvalue('');
      setbackgrounds((prevValue) => [...prevValue, background]);
      setalignments((prev) => [...prev, alignment]);
      setalignment('center');
      setbackground(false);
    };
  
    return (
      <GestureHandlerRootView style={styles.container}>
        <MovableView
          values={values}
          backgrounds={backgrounds}
          alignments={alignments}
          setModalVisible={setModalVisible}
          setvalue={setvalue}
          setisedited={setisedited}
          seteditedIndex={seteditedIndex}
        />
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={[styles.modalContainer,{backgroundColor:ACTIVE_TAB_GREEN_COLOR}]}>
            <View style={styles.topIconsContainer}>
              <View style={styles.DoneButtonContainer}>
                <TouchableOpacity onPress={handleSubmitText}>
                  <View style={styles.donButton}>
                    <Text style={styles.doneText}>Done</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={handleAlignment}>
                  <View>
                    <Feather name={Iconalignment} size={30} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setbackground((bg) => !bg)}>
                  <View
                    style={[styles.txtBackgroundIconContainer, backgroundStyles]}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: !background ? 'white' : 'black',
                      }}>
                      A
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.txtInputContainer, alignStyles]}>
              <TextInput
                multiline
                value={value}
                onChangeText={(vlue) => setvalue(vlue)}
                style={[
                  styles.txtInput,
                  {
                    backgroundColor: !background ? 'transparent' : 'white',
                    color: !background ? 'white' : 'black',
                  },
                ]}
                placeholder="Add text"
                placeholderTextColor={!background ? 'white' : 'black'}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <View>
              <Text style={styles.text}>Open</Text>
            </View>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"red",
      position:"absolute",
      zIndex:9999999
    },
    btnContainer: {
      position: 'absolute',
      zIndex: 9999,
      width: 100,
      height: 50,
      padding: 10,
      borderRadius: 50,
      marginTop: '50%',
      marginLeft: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 25,
    },
    modalContainer: {
      flex: 1,
    },
    txtBackgroundIconContainer: {
      width: 25,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    topIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
      alignItems: 'center',
      margin: 10,
    },
    iconsContainer: {
      flexDirection: 'row',
      flex: 0.5,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    DoneButtonContainer: {
      paddingLeft: 5,
    },
    donButton: {
      width: 70,
      padding: 7,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    doneText: {
      color: 'white',
    },
    txtInputContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    txtInput: {
      fontSize: 20,
      padding: 10,
      borderRadius: 10,
      fontFamily: 'Roboto_400Regular',
    },
  });
  