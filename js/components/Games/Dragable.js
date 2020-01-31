import React, {useState, useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    PanResponder
} from 'react-native';

export default function Dragable(props) {

    const [circleColor,
        setCircleColor] = React.useState('#1abc9c');
    const [shadow,
        setShadow] = React.useState({});

    const pan = React.useRef(new Animated.ValueXY({x: props.posXFactor, y: props.posYFactor}));

    const isDropZone = React.useCallback((gesture) => {
        const dz = props.dropZoneValues.current;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height && gesture.moveX < dz.width;
    }, []);

    const isDropZone2 = React.useCallback((gesture) => {
        const dz = props.dropZoneValues.current;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height && gesture.moveX > dz.width;
    }, []);

    const onMove = React.useCallback((_, gesture) => {
        //console.log(gesture);
        if (isDropZone(gesture)) {
            // Color('red'); setBgColorRight('#2c3e50'); props.setDropZone({item:1, text:
            // props.text})
        } else if (isDropZone2(gesture)) {
            //setBgColorRight('blue'); setBgColor('#2c3e50'); !("key" in obj)

        } else {}

    }, [isDropZone, isDropZone2]);

    const panResponder = React.useMemo(() => PanResponder.create({
        // Ask to be the responder: onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (evt, gestureState) => {
            pan
                .current
                .setOffset({x: pan.current.x._value, y: pan.current.y._value});
            pan
                .current
                .setValue({x: props.posXFactor, y: props.posYFactor});

            //setBgColorRight('#2c3e50'); setBgColor('#2c3e50');
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
            pan 
                .current
                .flattenOffset()        //flatten offset so the next drag starts at the position the item was released

            setShadow({})

            if (isDropZone(gesture)) {
                let dropZoneData = props.dropZone
                let text = props.text
                dropZoneData[text] = {
                    set: 1
                }

                props.setDropZone()
                props.setDropZone(dropZoneData)

                dropZoneData = props.dropZone2
                dropZoneData[text] = {
                    set: 0
                }
                props.setDropZone2()
                props.setDropZone2(dropZoneData)
                //console.log("dropzone1")
            } else if (isDropZone2(gesture)) {
                //setBgColorRight('blue'); setBgColor('#2c3e50');
                let dropZoneData = props.dropZone
                let text = props.text
                dropZoneData[text] = {
                    set: 0
                }
                props.setDropZone()
                props.setDropZone(dropZoneData)

                dropZoneData = props.dropZone2
                dropZoneData[text] = {
                    set: 1
                }
                props.setDropZone2()
                props.setDropZone2(dropZoneData)
            } else {
                //Resets if no item is in dropzone
                let dropZoneData = props.dropZone
                let text = props.text
                dropZoneData[text] = {
                    set: 0
                }
                props.setDropZone()
                props.setDropZone(dropZoneData)

                dropZoneData = props.dropZone2
                dropZoneData[text] = {
                    set: 0
                }
                props.setDropZone2()
                props.setDropZone2(dropZoneData)
                //console.log("nodropzone")
            }
            props.CheckShowNext()

            

        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture should be
            console.log("terminated")
        }
    }), []);

    /*const randPos = {
        top: pan.current.y._value === 0 ? props.posYFactor: pan.current.y,
        left: pan.current.x._value=== 0 ? props.posXFactor: pan.current.x
    }*/

    const randPos = {
        top: props.posYFactor,
        left: props.posXFactor
    }

    // if (pan.current.y._value === 0 && pan.current.x._value === 0)
    // {pan.current.setValue({x: props.posXFactor,y: props.posYFactor})}

    return (
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
                <Text style={styles.text}>{props.text}</Text>
            </Animated.View>
        </View>
    );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: '#fff'
    },
    draggableContainer: {
        position: 'absolute',
        top: 0,
        //left: Window.width / 2 - 2 * CIRCLE_RADIUS top: 0,
        left: 0
    },
    circle: {
        backgroundColor: '#1abc9c',
        width: 4 *CIRCLE_RADIUS,
        height: 1.5 *CIRCLE_RADIUS,
        borderRadius: CIRCLE_RADIUS,
        justifyContent: "center"
    }
});