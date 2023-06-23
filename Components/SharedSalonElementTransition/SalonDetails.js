import { Animated, Easing, Image, StyleSheet, Text, TouchableNativeFeedback, View, useWindowDimensions } from 'react-native'
import React, {  useRef } from 'react'
import { SharedElement } from 'react-navigation-shared-element';
import Arrow from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/AntDesign";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Balls } from './SalonData';

const ListComponent = ({ heading, lists,subackAnimation}) => {
    const { height } = useWindowDimensions();

    const bottomTextTranslateStyles = {
        transform:[
            {
                translateY:subackAnimation.interpolate({
                    inputRange:[0,1],
                    outputRange:[height,40]
                })
            }
        ]
    }

    return <Animated.View style={[styles.listContainer, bottomTextTranslateStyles]}>
        <View>
            <Text style={styles.heading}>{heading}</Text>
            {
                lists.map((list, index) => {
                    return <View style={[styles.list, {
                        margin: 3
                    }]} key={index}>
                        <View style={styles.bullet}></View>
                        <Text>{list}</Text>
                    </View>
                })
            }
        </View>
    </Animated.View>
}

const SalonDetails = ({ route, navigation }) => {
    const bottomSheetAnimation = useRef(new Animated.Value(0)).current;
    const bottomTextAnimation = useRef(new Animated.Value(0)).current;
    const focused = useIsFocused();

    useFocusEffect(
        React.useCallback(() => {
            Balls.forEach(ball => ball.animation.setValue(0));
            item.subcats.forEach(subact => subact.animation.setValue(0))
            Animated.timing(bottomSheetAnimation, {
                toValue: 1, duration: 800,
                useNativeDriver:true
            }).start(({ finished }) => {
                if (finished) {

                    Balls.forEach((ball, i) => {
                        Animated.sequence([
                            Animated.delay(i * 100),
                            Animated.timing(ball.animation, {
                                toValue: 1,
                                duration: 300,
                                useNativeDriver: true
                            })
                        ]).start(() => {
                            item.subcats.forEach((subact,index) => {
                                Animated.sequence([
                                    Animated.delay(index * 200),
                                    Animated.timing(subact.animation, {
                                        toValue: 1,
                                        duration: 400,
                                        easing:Easing.linear,
                                        useNativeDriver: true
                                    })
                                ]).start()
                            })
                        })
                    })
                }

            })
        }, [navigation])
    );



    const { width, height } = useWindowDimensions()
    const { item } = route.params;
    const insets = useSafeAreaInsets();
    const bottomSheetStyles = {
        transform: [
            {
                translateY: bottomSheetAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, -10]
                })
            }
        ]
    }
    return (
        <View style={[styles.container, {
            backgroundColor: item.background,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
        }]}>
            <TouchableNativeFeedback onPress={() => navigation.goBack()} background={TouchableNativeFeedback.SelectableBackgroundBorderless(30)}>
                <View style={styles.arrowContainer}>
                    <Arrow name="arrowleft" size={28} style={styles.arrow} />
                </View>
            </TouchableNativeFeedback>

            <View style={[styles.imgAndTextContainer, { width }]}>
                <View>
                    <Text style={styles.text}>{item.title}</Text>
                </View>
                <View>
                    <SharedElement id={`item.${item.key}.photo`}>
                        <Image source={item.image} resizeMode='contain' style={styles.img} />
                    </SharedElement>
                </View>
            </View>

            <Animated.View style={[styles.bottomSheet, bottomSheetStyles]}>
                <View style={[styles.ballsContainer, { marginLeft: width / 10 }]}>
                    {Balls.map((ball) => {
                        return <Animated.View style={[styles.ball, {
                            backgroundColor: ball.bacgkround,
                            transform: [{ scale: focused ? ball.animation : 0 }]
                        }]}
                            key={ball.name}
                        >
                            <Icon name={ball.name} size={28} color={"white"} />
                        </Animated.View>
                    })}
                </View>
                {
                    item.subcats.map((suback, index) => {
                        return <ListComponent heading={suback.heading} lists={suback.lists} key={`${suback.heading}and${index}`} bottomTextAnimation={bottomTextAnimation} subackAnimation={suback.animation}/>
                    })
                }
            </Animated.View>
        </View>
    )
}

export default SalonDetails

const styles = StyleSheet.create({
    text: {
        position: "absolute",
        top: 200,
        fontWeight: "bold",
        fontSize: 25,
        left: 10
    },
    img: {
        position: "absolute",
        width: "45%",
        right: 0,
        top: -100
    },
    container: {
        flex: 1,
        backgroundColor: "red"
    },
    arrowContainer: {
        width: 50,
        position: "relative",
        left: 15,
        top: 10,
        aspectRatio: 1,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomSheet: {
        height: "70%",
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    imgAndTextContainer: {
        height: "30%",
    },
    listContainer: {
        marginLeft: 20,
    },
    heading: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
    },
    list: {
        flexDirection: "row",
        alignItems: "center",
    },
    bullet: {
        width: 10, aspectRatio: 1,
        backgroundColor: "gold",
        marginRight: 10,
        borderRadius: 50
    },
    ballsContainer: {
        width: "80%",
        height: "15%",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    ball: {
        width: 70, aspectRatio: 1, backgroundColor: "yellow", borderRadius: 50, justifyContent: "center", alignItems: "center"
    }
})