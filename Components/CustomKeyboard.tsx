/* eslint-disable prettier/prettier */
import React, {  useState } from 'react';
import {Animated,  Image,  StyleSheet,  TouchableOpacity, View } from 'react-native';
import Button, { buttonWidth }  from './Button';
import down from '../down-arrow.png';
import up from '../up-arrow.png';

export interface IButtonBase{
  type: IButtonTypes,
  value: string
}
export enum IOperatorTypes {
  plus = '+',
  subtraction = '-',
  multiplication = '*',
  division  = '/',
  percent_division  = '%',
}

export enum IButtonTypes {
  operator = 'operatr',
  number = 'number',
  clear = 'clear',
  caculate = 'caculate',
  delete = 'delete',
  percent_division = 'percent_division'
}



type Props = {
  onNumberPress: (value : string) => void,
  onCaculatePress: (value : string) => void,
  onOperatorPress: (value : string) => void,
  onClearPress: () => void
};

const buttons:Array<IButtonBase> = [
{
  type: IButtonTypes.clear,
  value: 'C',
},
{
  type: IButtonTypes.operator,
  value: IOperatorTypes.percent_division,
},
{
  type: IButtonTypes.delete,
  value: 'Delete',
},
{
  type: IButtonTypes.operator,
  value:  IOperatorTypes.plus,
},
{
  type: IButtonTypes.number,
  value:  '1',
},
{
  type: IButtonTypes.number,
  value:  '2',
},
{
  type: IButtonTypes.number,
  value:  '3',
},
{
  type: IButtonTypes.operator,
  value:  IOperatorTypes.subtraction,
},
{
  type: IButtonTypes.number,
  value:  '4',
},
{
  type: IButtonTypes.number,
  value:  '5',
},
{
  type: IButtonTypes.number,
  value:  '6',
},
{
  type: IButtonTypes.operator,
  value:  IOperatorTypes.multiplication,
},
{
  type: IButtonTypes.number,
  value:  '7',
},
{
  type: IButtonTypes.number,
  value:  '8',
},
{
  type: IButtonTypes.number,
  value:  '9',
},
{
  type: IButtonTypes.operator,
  value:  IOperatorTypes.division,
},
{
  type: IButtonTypes.number,
  value:  '><',
},
{
  type: IButtonTypes.number,
  value:  '0',
},
{
  type: IButtonTypes.number,
  value:  '.',
},
{
  type: IButtonTypes.caculate,
  value:  '=',
},
];

const CustomKeyBoard = ({onNumberPress, onOperatorPress , onCaculatePress, onClearPress}: Props) => {
 const _renderItem = ({item}:{item:IButtonBase}) => {
    if (item.type === IButtonTypes.number){
      return <Button textStyle={styles.blackText} text={item.value} onPress={() => onNumberPress(item.value)} />;
    }
    if (item.type === IButtonTypes.operator){
      return <Button text={item.value} onPress={() => onOperatorPress(item.value)} />;
    }
    if (item.type === IButtonTypes.caculate){
      return <Button text={item.value} onPress={() => onCaculatePress(item.value)} />;
    }

     if (item.type === IButtonTypes.clear){
      return <Button text={item.value} onPress={() => onClearPress()} />;
    }

    return <Button text={item.value} onPress={() => {}} />;
  };

  const [isFlatListHidden, setIsFlatListHidden] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));

  const onHideKeyboard = () => {
  if (isFlatListHidden) {
    setIsFlatListHidden(false);
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  } else {
    setIsFlatListHidden(true);
    Animated.timing(animationValue, {
      toValue: buttonWidth * 5,
      duration: 500,
      useNativeDriver: true,
    }).start();
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onHideKeyboard}>
        <Animated.View style={[styles.buttonWrapper,{ transform: [{ translateY: animationValue }] }]}>
            <Image source={isFlatListHidden ? up : down} style={[styles.button]} />
        </Animated.View></TouchableOpacity>
     <Animated.FlatList
      style={[styles.keyboard, { transform: [{ translateY: animationValue }] }]}
      numColumns={4}
      data={buttons}
      renderItem={_renderItem}
      />
    </View>
  );
};


const styles = StyleSheet.create({
 container:{
   flex: 1,
   justifyContent:'flex-end',
 },
 keyboard:{
  position:'absolute',
  bottom: 0,
 },
 blackText:{
  color:'black',
 },
 button: {
  width: 15,
  height: 15,
  tintColor:'gray',
},
buttonWrapper:{
  position:'absolute',
  bottom: buttonWidth * 5,
  width: '100%',
  alignItems:'center',
  paddingVertical:5,
},
});
export default CustomKeyBoard;
