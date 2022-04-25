import {View, TouchableOpacity, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Box from './box';

const Game = ({navigation, route}) => {
  const [turn, setTurn] = useState(true);
  const [selected] = useState(route.params.letter);
  const [twoPlayer] = useState(route.params.two);
  const [boxValue, setBoxValue] = useState({
    boxValue0: '',
    boxValue1: '',
    boxValue2: '',
    boxValue3: '',
    boxValue4: '',
    boxValue5: '',
    boxValue6: '',
    boxValue7: '',
    boxValue8: '',
  });
  const [winArrayX, setWinArrayX] = useState([]);
  const [winArrayO, setWinArrayO] = useState([]);
  const [textColor, setTextColor] = useState({
    textColor0: 'black',
    textColor1: 'black',
    textColor2: 'black',
    textColor3: 'black',
    textColor4: 'black',
    textColor5: 'black',
    textColor6: 'black',
    textColor7: 'black',
    textColor8: 'black',
  });
  const [bgColor, setBgColor] = useState({
    bgColor0: 'white',
    bgColor1: 'white',
    bgColor2: 'white',
    bgColor3: 'white',
    bgColor4: 'white',
    bgColor5: 'white',
    bgColor6: 'white',
    bgColor7: 'white',
    bgColor8: 'white',
  });
  const [winX, setWinX] = useState(false);
  const [winO, setWinO] = useState(false);

  const [refreshState, setRefreshState] = useState(false);
  const [you, setYou] = useState(0);
  const [computer, setComputer] = useState(0);

  let winChances = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const automateFunction = () => {
    let random;
    winChances.forEach(item => {
      if(random){
        return;
      }
      if (winArrayX.includes(item[0]) && winArrayX.includes(item[1])) {
        if (boxValue['boxValue' + item[2]] === '') {
          random = item[2];
        }
      } else if (winArrayO.includes(item[0]) && winArrayO.includes(item[1])) {
        if (boxValue['boxValue' + item[2]] === '') {
          random = item[2];
        }
      } else if (winArrayO.includes(item[1]) && winArrayO.includes(item[2])) {
        if (boxValue['boxValue' + item[0]] === '') {
          random = item[0];
        }
      } else if (winArrayO.includes(item[0]) && winArrayO.includes(item[2])) {
        if (boxValue['boxValue' + item[1]] === '') {
          random = item[1];
        }
      } else if (winArrayX.includes(item[1]) && winArrayX.includes(item[2])) {
        if (boxValue['boxValue' + item[0]] === '') {
          random = item[0];
        }
      } else if (winArrayX.includes(item[0]) && winArrayX.includes(item[2])) {
        if (boxValue['boxValue' + item[1]] === '') {
          random = item[1];
        }
      }
    });
    if (!random) {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      random = arr[Math.floor(Math.random() * arr.length)];
    }
    let dynamicState = 'boxValue' + random;
    if (boxValue[dynamicState] === '') {
      setBoxValue({...boxValue, [dynamicState]: selected === 'X' ? 'O' : 'X'});
      setWinArrayO([...winArrayO, random]);
      setTurn(true);
    } else {
      if (
        boxValue.boxValue0 === '' ||
        boxValue.boxValue1 === '' ||
        boxValue.boxValue2 === '' ||
        boxValue.boxValue3 === '' ||
        boxValue.boxValue4 === '' ||
        boxValue.boxValue5 === '' ||
        boxValue.boxValue6 === '' ||
        boxValue.boxValue7 === '' ||
        boxValue.boxValue8 === ''
      )
        automateFunction();
    }
  };

  useEffect(() => {
    if (!winX && !winO) {
      let finished;
      winChances.forEach((item, index) => {
        let text0 = 'textColor' + item[0];
        let text1 = 'textColor' + item[1];
        let text2 = 'textColor' + item[2];
        let bg0 = 'bgColor' + item[0];
        let bg1 = 'bgColor' + item[1];
        let bg2 = 'bgColor' + item[2];
        if (
          winArrayX.includes(item[0]) &&
          winArrayX.includes(item[1]) &&
          winArrayX.includes(item[2])
        ) {
          setBgColor({...bgColor, [bg0]: 'red', [bg1]: 'red', [bg2]: 'red'});
          setTextColor({
            ...textColor,
            [text0]: 'yellow',
            [text1]: 'yellow',
            [text2]: 'yellow',
          });
          setWinX(true);
          setYou(prev => prev + 1);
          finished = true;
        } else if (
          winArrayO.includes(item[0]) &&
          winArrayO.includes(item[1]) &&
          winArrayO.includes(item[2])
        ) {
          setBgColor({...bgColor, [bg0]: 'red', [bg1]: 'red', [bg2]: 'red'});
          setTextColor({
            ...textColor,
            [text0]: 'yellow',
            [text1]: 'yellow',
            [text2]: 'yellow',
          });
          setWinO(true);
          setComputer(prev => prev + 1);
          finished = true;
        }
        if (index === winChances.length - 1 && !finished) {
          setRefreshState(prev => !prev);
        }
      });
    }
  }, [turn, winArrayX, winArrayO]);

  useEffect(() => {
    if (!turn && !twoPlayer) {
      automateFunction();
    }
  }, [refreshState]);

  const chanceFunction = (state, number) => {
    if (boxValue[state] === '' && !winX && !winO) {
      if (turn) {
        setBoxValue({...boxValue, [state]: selected});
        setWinArrayX([...winArrayX, number]);
      } else if (twoPlayer) {
        setBoxValue({...boxValue, [state]: selected === 'X' ? 'O' : 'X'});
        setWinArrayO([...winArrayO, number]);
      }
      setTurn(prev => !prev);
    }
  };

  const resetFunction = (score, letter) => {
    setTurn(true);
    setWinArrayX([]);
    setWinArrayO([]);
    setWinO(false);
    setWinX(false);
    setBgColor({
      bgColor0: 'white',
      bgColor1: 'white',
      bgColor2: 'white',
      bgColor3: 'white',
      bgColor4: 'white',
      bgColor5: 'white',
      bgColor6: 'white',
      bgColor7: 'white',
      bgColor8: 'white',
    });
    setTextColor({
      textColor0: 'black',
      textColor1: 'black',
      textColor2: 'black',
      textColor3: 'black',
      textColor4: 'black',
      textColor5: 'black',
      textColor6: 'black',
      textColor7: 'black',
      textColor8: 'black',
    });
    setBoxValue({
      boxValue0: '',
      boxValue1: '',
      boxValue2: '',
      boxValue3: '',
      boxValue4: '',
      boxValue5: '',
      boxValue6: '',
      boxValue7: '',
      boxValue8: '',
    });
    if (score) {
      setYou(0);
      setComputer(0);
    }
    if (letter) {
      setYou(0);
      setComputer(0);
      navigation.popToTop();
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{marginBottom: 20, width: '90%', alignItems: 'center'}}>
        <Text style={{fontSize: 30, color: 'black'}}>Score</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, color: 'black'}}>
            {twoPlayer
              ? route.params.firstPlayer.trim() !== ''
                ? route.params.firstPlayer
                : 'First Player'
              : route.params.firstPlayer.trim() !== ''
              ? route.params.firstPlayer
              : 'You'}{' '}
            : {you}
          </Text>
          <Text style={{fontSize: 20, color: 'black'}}>
            {twoPlayer
              ? route.params.secondPlayer.trim() !== ''
                ? route.params.secondPlayer
                : 'Second Player'
              : 'Computer'}{' '}
            : {computer}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Box
          right
          bottom
          text={textColor.textColor0}
          background={bgColor.bgColor0}
          value={boxValue.boxValue0}
          onPress={() => chanceFunction('boxValue0', 0)}
        />
        <Box
          right
          bottom
          text={textColor.textColor1}
          background={bgColor.bgColor1}
          value={boxValue.boxValue1}
          onPress={() => chanceFunction('boxValue1', 1)}
        />
        <Box
          bottom
          value={boxValue.boxValue2}
          text={textColor.textColor2}
          background={bgColor.bgColor2}
          onPress={() => chanceFunction('boxValue2', 2)}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Box
          right
          bottom
          value={boxValue.boxValue3}
          text={textColor.textColor3}
          background={bgColor.bgColor3}
          onPress={() => chanceFunction('boxValue3', 3)}
        />
        <Box
          right
          bottom
          value={boxValue.boxValue4}
          text={textColor.textColor4}
          background={bgColor.bgColor4}
          onPress={() => chanceFunction('boxValue4', 4)}
        />
        <Box
          bottom
          value={boxValue.boxValue5}
          text={textColor.textColor5}
          background={bgColor.bgColor5}
          onPress={() => chanceFunction('boxValue5', 5)}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Box
          right
          value={boxValue.boxValue6}
          text={textColor.textColor6}
          background={bgColor.bgColor6}
          onPress={() => chanceFunction('boxValue6', 6)}
        />
        <Box
          right
          value={boxValue.boxValue7}
          text={textColor.textColor7}
          background={bgColor.bgColor7}
          onPress={() => chanceFunction('boxValue7', 7)}
        />
        <Box
          value={boxValue.boxValue8}
          text={textColor.textColor8}
          background={bgColor.bgColor8}
          onPress={() => chanceFunction('boxValue8', 8)}
        />
      </View>
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
          onPress={() => resetFunction()}>
          <Text style={{fontSize: 20, color: 'white'}}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            backgroundColor: 'black',
            borderRadius: 10,
          }}
          onPress={() => resetFunction(true)}>
          <Text style={{fontSize: 20, color: 'white'}}>Reset Score</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            backgroundColor: 'black',
            borderRadius: 10,
          }}
          onPress={() => resetFunction(true, true)}>
          <Text style={{fontSize: 20, color: 'white'}}>Reset Full Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Game;
