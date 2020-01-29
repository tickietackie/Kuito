import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    PanResponder
} from 'react-native';

export default function Drag() {
    const dropZoneValues = React.useRef(null);

    const [bgColor,
        setBgColor] = React.useState('#2c3e50');
    const [bgColorRight,
        setBgColorRight] = React.useState('#2c3e50');
    const [circleColor,
        setCircleColor] = React.useState('#1abc9c');
    const [shadow,
        setShadow] = React.useState({});

    const pan = React.useRef(new Animated.ValueXY({x: 0, y: 0}));

    const isDropZone = React.useCallback((gesture) => {
        const dz = dropZoneValues.current;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height && gesture.moveX < dz.width;
    }, []);

    const isDropZone2 = React.useCallback((gesture) => {
        const dz = dropZoneValues.current;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height && gesture.moveX > dz.width;
    }, []);

    const onMove = React.useCallback((_, gesture) => {
        //console.log(gesture);
        if (isDropZone(gesture)) {
            setBgColor('red');
            setBgColorRight('#2c3e50');
        } else if (isDropZone2(gesture)) {
            setBgColorRight('blue');
            setBgColor('#2c3e50');
        } else {
            setBgColorRight('#2c3e50');
            setBgColor('#2c3e50');
        }

    }, [isDropZone, isDropZone2]);

    const setDropZoneValuesLeft = React.useCallback((event) => {
        dropZoneValues.current = event.nativeEvent.layout;
    });

    const setDropZoneValuesRight = React.useCallback((event) => {
        dropZoneValues.current = event.nativeEvent.layout;
    });

    const panResponder = React.useMemo(() => PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (evt, gestureState) => {
            pan
                .current
                .setOffset({x: pan.current.x._value, y: pan.current.y._value});
            pan
                .current
                .setValue({x: 0, y: 0});

            console.log("start");
            setBgColorRight('#2c3e50');
            setBgColor('#2c3e50');
            setShadow({
                shadowOpacity: 0.75,
                shadowRadius: 5,
                shadowColor: "white",
                shadowColor: '#000',
                shadowOffset: {
                    width: 1,
                    height: 2
                },
                elevation: 2
            })
        },

        // The most recent move distance is gestureState.move{X,Y} The accumulated
        // gesture distance since becoming responder is gestureState.d{x,y}
        onPanResponderMove: Animated.event([
            null, {
                dx: pan.current.x,
                dy: pan.current.y
            }
        ], {listener: onMove}),
        // The user has released all touches while this view is the responder. This
        // typically means a gesture has succeeded
        onPanResponderRelease: (e, gesture) => {
            setCircleColor('#1abc9c')
            setShadow({})
            if (isDropZone(gesture)) {
                setBgColor('red');
            } else if (isDropZone2(gesture)) {
                setBgColorRight('blue');
            } else {
                setBgColorRight('#2c3e50');
                setBgColor('#2c3e50');
            }
            if (!isDropZone(gesture) && !isDropZone2(gesture)) {
                setBgColor('#2c3e50');

                Animated
                    .spring(pan.current, {
                    toValue: {
                        x: 0 - pan.current.x._offset,
                        y: 0 - pan.current.y._offset
                    }
                })
                    .start(() => {
                        pan
                            .current
                            .setValue({x: 0, y: 0})
                        pan
                            .current
                            .setOffset({x: 0, y: 0})
                    }); //After animation set value to 0

            } else {
                pan
                    .current
                    .flattenOffset()
            }
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture should be
            pan
                .current
                .flattenOffset();
        }
    }), []);

    return (
        <View style={styles.mainContainer}>
            <View
                onLayout={setDropZoneValuesLeft}
                style={[
                styles.dropZone, {
                    backgroundColor: bgColor,
                    borderRightWidth: 1
                }
            ]}>

                <Text style={styles.text}>Drop me there!</Text>
            </View>
            <View
                onLayout={setDropZoneValuesRight}
                style={[
                styles.dropZone, {
                    backgroundColor: bgColorRight,
                    borderLeftWidth: 1
                }
            ]}>

                <Text style={styles.text}>Drop me here!</Text>
            </View>
            <View style={[styles.draggableContainer]}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                    pan
                        .current
                        .getLayout(),
                    styles.circle, {
                        backgroundColor: circleColor
                    },
                    shadow
                ]}>
                    <Text style={styles.text}>Drag me!</Text>
                </Animated.View>
            </View>
        </View>
    );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row"
    },
    dropZone: {
        backgroundColor: '#2c3e50',
        justifyContent: "center",
        flex: 1,
        height: 300,
        borderColor: "white"
    },
    text: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        color: '#fff'
    },
    draggableContainer: {
        position: 'absolute',
        top: Window.height / 2 - CIRCLE_RADIUS,
        left: Window.width / 2 - CIRCLE_RADIUS
    },
    circle: {
        backgroundColor: '#1abc9c',
        width: 2 *CIRCLE_RADIUS,
        height: 2 *CIRCLE_RADIUS,
        borderRadius: CIRCLE_RADIUS
    }
});