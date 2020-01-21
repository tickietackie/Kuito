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
    const pan = React.useRef(new Animated.ValueXY());
    const [bgColor,
        setBgColor] = React.useState('#2c3e50');
    const [bgColorRight,
        setBgColorRight] = React.useState('#2c3e50');
    const [circleColor,
        setCircleColor] = React.useState('#1abc9c');
    const [shadow,
        setShadow] = React.useState({});

    const [dragPos,
        setDragPos] = React.useState({
        x: 0,
        y: 0,
    });

    const [top,
        setTop] = React.useState({
        top: 350});

    console.log(dragPos);

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
        if (isDropZone(gesture)) 
            setBgColor('red');
        else if (isDropZone2(gesture)) {
            setBgColorRight('blue');
        } else 
            setBgColorRight('#2c3e50');
            setBgColor('#2c3e50');
        }
    , [isDropZone]);

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
            // The gesture has started. Show visual feedback so the user knows what is
            // happening! gestureState.d{x,y} will be set to zero now
            console.log("start2");
            console.log(panResponder);
            //gestureState.dx = panResponder.gestureState.moveX;
            //gestureState.dy = panResponder.gestureState.moveX;
            //gestureState.moveY = 0;
            //gestureState.moveX = 0;
            console.log(gestureState)
            console.log("start");
            setBgColorRight('#2c3e50');
            setBgColor('#2c3e50');
            //pan.current.x = dragPos.x; pan.current.y = dragPos.y;

            setCircleColor("blue");
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
            /*setCircleColor('#1abc9c')
            setShadow({})
            if (isDropZone(gesture)) 
                setBgColor('red');
            else if (isDropZone2(gesture)) {
                setBgColorRight('rose');
            } else {
                //setBgColorRight('#2c3e50');
                setBgColor('#2c3e50');
            }
            if (!isDropZone(gesture)) { 
                setBgColor('#2c3e50');
                setDragPos({x: 0, y: 0})
                //setTop({top: top.top + gesture.dy})
                console.log(top)
                console.log("release2")
                console.log(gesture)
                Animated
                    .spring(pan.current, {
                    toValue: {
                        x: 0,
                        y: 0
                    }
                })
                    .start();
            } else {
                //setBgColor('#2c3e50');
                console.log("r1")
                //setTop({top: gesture.y0 + gesture.dy})
                setDragPos({x: gesture.x0 - gesture.moveX, y: gesture.y0 - gesture.moveY})
                console.log("release")
                console.log({x: gesture.x0 - gesture.moveX, y: gesture.y0 - gesture.moveY});
            }*/
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture should be
            // cancelled
            //setDragPos({x: 0, y: 0})
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