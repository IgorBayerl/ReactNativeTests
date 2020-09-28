import React , {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './styles'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  sequence,
} from 'react-native-reanimated';


export default function PosSplash() {

  const titlePosition = useSharedValue(0);
  const namePosition = useSharedValue(0)

  function animationTitleUp(){
    titlePosition.value = withTiming(-20, { 
      duration: 1000 ,
      // easing: Easing.cubic,
    
    });
  }

  function animationNameDown(){
    namePosition.value = withTiming(20, { 
      duration: 1000 ,
      // easing: Easing.cubic,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      animationTitleUp()
      animationNameDown()
    }, 1000);
    
  }, []);
     
  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titlePosition.value }],
    };
  });
  const nameStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: namePosition.value }],
      opacity: interpolate(
        namePosition.value,
        [10, 20],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, titleStyle]}>
        Reanimated V2
      </Animated.Text>
      <Animated.Text style={[styles.title, nameStyle]}>
        teste
      </Animated.Text>
      <StatusBar style="auto" />
    </View>
  );
}

