import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { RadioButton } from 'react-native-paper'; 

function App() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});

  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [operation, setOperation] = useState('+');
  const [total, setTotal] = useState('');

  const [checked, setChecked] = React.useState('first');

  const handleOperationChange = (op) => {
    setOperation(op);
  };

  const calculateTotal = () => {
    let result = 0;
    switch (operation) {
      case '+':
        result = Number(number1) + Number(number2);
        break;
      case '-':
        result = Number(number1) - Number(number2);
        break;
      case '*':
        result = Number(number1) * Number(number2);
        break;
      case '/':
        result = Number(number1) / Number(number2);
        break;
      default:
        break;
    }
    setTotal(result.toString());
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    fetch("http://api.weatherapi.com/v1/forecast.json?key=8ec38dc31cdc418184f134352241403&q=Tallinn&days=3&aqi=no&alerts=no")
      .then(response => response.json())
      .then((result) => {
        setLocation(result.location);
        setWeather(result.forecast.forecastday[1].hour[12]);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text>Weather</Text>
        <Text>{location.name}</Text>
        <Text>{weather.time}</Text>
        <Text>{weather.temp_c}°C</Text>
      </View>
      <View>
        <Text>Kalkulaator</Text>

        <TextInput
          placeholder="Number 1"
          keyboardType="numeric"
          value={number1}
          onChangeText={setNumber1}
        />
        <TextInput
          placeholder="Number 2"
          keyboardType="numeric"
          value={number2}
          onChangeText={setNumber2}
        />
        <View>
          <RadioButton.Android 
          value="liida"
          status={ checked === 'liida' ? 'checked' : 'unchecked' }
          onPress={() => {
            handleOperationChange('+');
          }}>
          </RadioButton.Android>
          <Text>Liida</Text>
        </View>
        <View>
          <RadioButton.Android 
          value="lahuta"
          status={ checked === 'lahuta' ? 'checked' : 'unchecked' }
          onPress={() => {
            handleOperationChange('-');
          }}>
          </RadioButton.Android>
          <Text>Lahuta</Text>
        </View>
        <View>
          <RadioButton.Android 
          value="korruta"
          status={ checked === 'korruta' ? 'checked' : 'unchecked' }
          onPress={() => {
            handleOperationChange('*');
          }}>
          </RadioButton.Android>
          <Text>Korruta</Text>
        </View>
        <View>
          <RadioButton.Android 
          value="jaga"
          status={ checked === 'jaga' ? 'checked' : 'unchecked' }
          onPress={() => {
            handleOperationChange('/');
          }}>
          </RadioButton.Android>
          <Text>Jaga</Text>
        </View>
        <Text>= {total}</Text>
        <Button title="Calculate" onPress={calculateTotal} />
      </View>
    </View>
  );
}

export default App;
