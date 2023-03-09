/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';
interface Props {
  onPress: () => void;
  text: string;
  textStyle?: TextStyle
}
const Button = React.memo(({onPress, text, textStyle }: Props) => {
  const buttonStyles = [styles.button];
  const valueStyles = [styles.text];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={[valueStyles, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
});

const screen = Dimensions.get('window');
export const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    height: Math.floor(buttonWidth),
    width: Math.floor(buttonWidth ),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor:'gainsboro',
  },
  text: {
    color: 'dodgerblue',
    fontSize: 24,
  },

});

export default Button;
