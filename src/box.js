import {Pressable, Text} from 'react-native';
import React from 'react';

const Box = ({left, right, top, bottom, value,onPress,background,text}) => {
  return (
    <Pressable
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        borderLeftWidth: left ? 5 : 0,
        borderRightWidth: right ? 5 : 0,
        borderBottomWidth: bottom ? 5 : 0,
        borderTopWidth: top ? 5 : 0,
        width: 100,
        height: 100,
        alignItems: 'center',
        backgroundColor:background,
      }}
      onPress={onPress}
      >
      <Text style={{fontSize: 50, color: text ? text : 'black', fontWeight: '600'}}>
        {value}
      </Text>
    </Pressable>
  );
};

export default Box;
