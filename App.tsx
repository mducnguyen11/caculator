/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomKeyBoard from './Components/CustomKeyboard';
import MoreIcon from './more.png';

function App(): JSX.Element {
  const [preInput, setPreInput] = React.useState('');
  const [currentInput, setCurrent] = React.useState('');
  const [operator, setOperator] = React.useState('');
  const [caculated, setCaculated] = React.useState(false);

  const onNumberPress = useCallback(
    (value: string) => {
      if (caculated) {
        setPreInput(pre => pre + ' = ' + currentInput);
        setCurrent(value);
        setCaculated(false);
      } else {
        setCurrent(pre => pre + value);
      }
    },
    [caculated, currentInput],
  );

  const onOperatorPress = useCallback(
    (value: string) => {
      setPreInput(currentInput);
      setCurrent('');
      setOperator(value);
      if (caculated) {
        setCaculated(false);
      }
    },
    [currentInput, caculated],
  );

  const onCaculatePress = useCallback(() => {
    if (!operator) {
      return;
    }
    const p = Number(preInput);
    const x = Number(currentInput);
    const text = `${p} ${operator} ${x}`;
    switch (operator) {
      case '+':
        setPreInput(text);
        setCurrent((p + x).toString());
        break;

      case '-':
        setPreInput(text);
        setCurrent((p - x).toString());
        break;

      case '*':
        setPreInput(text);
        setCurrent((p * x).toString());
        break;
      case '/':
        setPreInput(text);
        setCurrent(parseFloat((p / x).toFixed(5)).toString());
        break;

      default:
        break;
    }
    setOperator('');
    setCaculated(true);
  }, [operator, preInput, currentInput]);

  const onClearPress = useCallback(() => {
    setCurrent('');
    setOperator('');
    setPreInput('');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text>RAD</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.moreIcon} source={MoreIcon} />
          </TouchableOpacity>
        </View>
        <TextInput
          editable={false}
          style={styles.PreInput}
          value={operator ? `${preInput} ${operator} ` : preInput}
        />
        <TextInput
          editable={false}
          style={styles.currentInput}
          value={currentInput}
        />
        <CustomKeyBoard
          onCaculatePress={onCaculatePress}
          onOperatorPress={onOperatorPress}
          onNumberPress={onNumberPress}
          onClearPress={onClearPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  moreIcon: {
    width: 15,
    height: 15,
  },
  PreInput: {
    fontSize: 20,
    textAlign: 'right',
    padding: 0,
    color: 'black',
  },
  currentInput: {
    fontSize: 50,
    textAlign: 'right',
    padding: 0,
    color: 'black',
  },
});

export default App;
