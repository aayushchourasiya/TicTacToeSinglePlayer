import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const Name = ({navigation, route}) => {
  const [firstPlayer, setFirstPlayer] = useState('');
  const [secondPlayer, setSecondPlayer] = useState('');

  const [firstPlayerSelection, setFirstPlayerSelection] = useState(
    route.params.letter || 'X',
  );
  const [secondPlayerSelection, setSecondPlayerSelection] = useState('O');

  const switchFunction = () => {
    if (firstPlayerSelection === 'X') {
      setFirstPlayerSelection('O');
      setSecondPlayerSelection('X');
    } else {
      setFirstPlayerSelection('X');
      setSecondPlayerSelection('O');
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: '600',
          marginBottom: 10,
        }}>
        Enter Your {route.params.two ? 'Names' : 'Name'} here!
      </Text>
      <TextInput
        style={{
          padding: 5,
          borderWidth: 2,
          fontSize: 20,
          width: '80%',
          borderRadius: 10,
          marginBottom: 10,
        }}
        placeholder={
          route.params.two ? 'Enter First Player Name!' : 'Enter Your Name!'
        }
        value={firstPlayer}
        onChangeText={text => setFirstPlayer(text)}
      />
      {route.params.two && (
        <TextInput
          style={{
            padding: 5,
            borderWidth: 2,
            fontSize: 20,
            width: '80%',
            borderRadius: 10,
          }}
          placeholder="Enter Second Player Name!"
          value={secondPlayer}
          onChangeText={text => setSecondPlayer(text)}
        />
      )}

      {route.params.two ? (
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
              {firstPlayer.trim() === '' ? 'First Player' : firstPlayer}:{' '}
              {firstPlayerSelection}
            </Text>
            <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
              {secondPlayer.trim() === '' ? 'Second Player' : secondPlayer}:{' '}
              {secondPlayerSelection}
            </Text>
          </View>
          <TouchableOpacity
            style={{padding: 5, backgroundColor: 'black', borderRadius: 10}}
            onPress={switchFunction}>
            <Text style={{color: 'white'}}>Switch</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
            {firstPlayer.trim() === '' ? 'You' : firstPlayer}:{' '}
            {firstPlayerSelection}
          </Text>
          <TouchableOpacity
            style={{padding: 5, backgroundColor: 'black', borderRadius: 10}}
            onPress={switchFunction}>
            <Text style={{color: 'white'}}>Switch</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={{
          alignItems: 'center',
          width: '80%',
          padding: 10,
          backgroundColor: 'black',
          borderRadius: 10,
        }}
        onPress={() =>
          navigation.navigate('Game', {
            ...route.params,
            letter: firstPlayerSelection,
            firstPlayer: firstPlayer,
            secondPlayer: secondPlayer,
          })
        }>
        <Text style={{fontSize: 20, color: 'white'}}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Name;
