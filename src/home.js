import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';

const Home = ({navigation}) => {
  let backPressed = 0;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  const onBackPress = () => {
    if (backPressed > 0) {
      BackHandler.exitApp();
    } else {
      ToastAndroid.showWithGravity(
        'Press back again to exit',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      backPressed++;
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
      return true;
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{marginBottom: 20}}>
        <Text
          style={{
            fontSize: 40,
            color: 'black',
            fontStyle: 'italic',
            fontWeight: '800',
          }}>
          Tic Tac Toe
        </Text>
        <Text
          style={{
            alignSelf: 'flex-end',
            color: 'black',
            fontSize: 15,
            fontWeight: '600',
          }}>
          -by Aayush
        </Text>
      </View>
      <Text style={{fontSize: 20, color: 'black'}}>Select Mode</Text>
      <View
        style={{
          width: '80%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            backgroundColor: 'black',
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('Name', {letter: 'X'})}>
          <Text style={{fontSize: 20, color: 'white'}}>Single Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            backgroundColor: 'black',
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('Name', {two: true})}>
          <Text style={{fontSize: 20, color: 'white'}}>Two Player</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
