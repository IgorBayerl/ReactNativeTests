import React , {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
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
import { useNavigation } from '@react-navigation/native';
import { bounce } from 'react-native/Libraries/Animated/src/Easing';


export default function Main() {

    const { navigate } = useNavigation()

    const titlePosition = useSharedValue(30);

    function navigateToOtherpage(){
        navigate('PosSplash')
    }

    useEffect(() => {
        titlePosition.value = withTiming(0, { 
            duration: 1000 ,
            easing: Easing.exp,
        });
    }, []);
     
    const titleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: titlePosition.value }],
            opacity: interpolate(
            titlePosition.value,
            [30, 0],
            [0, 1],
            Extrapolate.CLAMP,
            ),
        };
    });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, titleStyle]}>
        Main
      </Animated.Text>
      <RectButton 
        style={styles.button}
        onPress={navigateToOtherpage}
      >
          <Text>
              Click
          </Text>
      </RectButton>
      <RectButton 
        style={styles.button}
      >
          <Text>
              Click
          </Text>
      </RectButton>
      <StatusBar style="auto" />
    </View>
  );
}