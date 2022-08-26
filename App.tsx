import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import Block from './src/components/block';
import Xcomponent from './src/components/x';
import Ycomponent from './src/components/y';

export default function App() {
  const [whoNow, setWhoNow] = useState('x');
  const [win, setWin] = useState('');
  const [jogo, setJogo] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const WINN_COMBINATIONS = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  ];
  const handleToogle = (lin: number, col: number) => {
    let newArr = jogo;
    newArr[lin][col] = whoNow;
    setJogo(newArr);
    setWhoNow(whoNow === 'x' ? 'y' : 'x');
  };

  const checkMark = (lin: number, col: number) => {
    const markActualy = jogo[lin][col];
    switch (markActualy) {
      case 'x':
        return (
          <Block position={{ lin, col }}>
            <Xcomponent />
          </Block>
        );
      case 'y':
        return (
          <Block position={{ lin, col }}>
            <Ycomponent />
          </Block>
        );
      default:
        return (
          <TouchableOpacity onPress={() => handleToogle(lin, col)}>
            <Block position={{ lin, col }}>
              <Text></Text>
            </Block>
          </TouchableOpacity>
        );
    }
  };

  const handleNewGame = () => {
    setJogo([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWin('');
  };

  useEffect(() => {
    WINN_COMBINATIONS.forEach((combination) => {
      const jogada = combination.map((p) => {
        return jogo[p[0]][p[1]];
      });

      const result = jogada.every((v) => {
        return v === jogada[0];
      });

      if (jogada[0]) {
        if (result) setWin(jogada[0]);
      }
    });
  }, [whoNow]);

  return (
    <TailwindProvider>
      <View className='flex-1 justify-center items-center'>
        <View className='justify-center items-center'>
          <View className='flex-row w-full px-14'>
            {checkMark(0, 0)}
            {checkMark(0, 1)}
            {checkMark(0, 2)}
          </View>
          <View className='flex-row w-full px-14'>
            {checkMark(1, 0)}
            {checkMark(1, 1)}
            {checkMark(1, 2)}
          </View>
          <View className='flex-row w-full px-14'>
            {checkMark(2, 0)}
            {checkMark(2, 1)}
            {checkMark(2, 2)}
          </View>
          <View className='h-48 flex justify-center items-center align-middle'>
            {win && (
              <>
                <Text className='text-emerald-600 font-bold text-5xl'>
                  Ganhador!!!
                </Text>
                <View className='pt-12'>
                  {win === 'x' ? <Xcomponent /> : <Ycomponent />}
                </View>
              </>
            )}
          </View>
        </View>
        <View className='pt-10'>
          <Button
            className='bg-slate-400'
            title='Novo jogo'
            onPress={handleNewGame}
          />
        </View>
      </View>
    </TailwindProvider>
  );
}
