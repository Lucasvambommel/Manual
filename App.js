import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import {Video} from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const problemsDatabase = {
  "Célula 1": {
    "MADAG": {
      "Problema A1": { image: require('./Assets/Problems/problemaA1.png') },
      "Problema A2": { image: require('./Assets/Problems/problemaA2.png') }},
    "CER 400": ["Problema B1", "Problema B2"],
    "DUBUIT 1": ["Problema B1", "Problema B2"],
    "DUBUIT 2": ["Problema B1", "Problema B2"],
    "ISIMAT": ["Problema B1", "Problema B2"],
  },
  "Célula 2": {
    "BREYER 1": ["Problema C1", "Problema C2"],
    "BREYER 2": ["Problema C1", "Problema C2"],
    "POLYTYPE 1": ["Problema C1", "Problema C2"],
    "POLYTYPE 2": ["Problema C1", "Problema C2"],
    "PTH 40": ["Problema C1", "Problema C2"],
    "PTH 80": ["Problema C1", "Problema C2"],
  },
  "Célula 3": {
    "BREYER": ["Problema C1", "Problema C2"],
    "POLYTYPE": ["Problema C1", "Problema C2"],
    "PTH": ["Problema C1", "Problema C2"],
    "RHM": ["Problema C1", "Problema C2"],
    "TEXA": ["Problema C1", "Problema C2"],
  },
  "Célula 4": {
    "BREYER": ["Problema C1", "Problema C2"],
    "POLYTYPE": ["Problema C1", "Problema C2"],
    "PTH": ["Problema C1", "Problema C2"],
    "RHM": ["Problema C1", "Problema C2"],
    "TEXA": ["Problema C1", "Problema C2"],
  },
  "Célula 5": {
    "BREYER": ["Problema C1", "Problema C2"],
    "POLYTYPE": ["Problema C1", "Problema C2"],
    "PTH": ["Problema C1", "Problema C2"],
    "RHM": ["Problema C1", "Problema C2"],
    "TEXA": ["Problema C1", "Problema C2"],
  },
  "Célula 6": {
    "BREYER": ["Problema C1", "Problema C2"],
    "POLYTYPE": ["Problema C1", "Problema C2"],
    "PTH": ["Problema C1", "Problema C2"],
    "RHM": ["Problema C1", "Problema C2"],
    "TEXA": ["Problema C1", "Problema C2"],
  },
  "Célula 8": {
    "DXL": {
      "Cor fora da cartela e mancha": { 
        image: require('./Assets/Problems/mancha1.jpeg'),
        description: "1° - Verificar se a cor não está no tom que deveria"+"\n"+"2° - Teste de linha",
        solution: "1° - Verificar se a cor não está no tom que deveria"+"\n"+"2° - Teste de linha",
        video: require('./Assets/Videos/Problema.mp4')},
      "Delâminação, aderência e flexibilidade do filme": { image: require('./Assets/Problems/problemaA2.png') },
      "Emenda aberta": { image: require('./Assets/Problems/problemaA2.png') },
      "Emenda da luva": { image: require('./Assets/Problems/problemaA2.png') },
      "Emenda do filme (Rotoflex) e filme rasgado": { image: require('./Assets/Problems/problemaA2.png') },
      "Emenda retraida": { image: require('./Assets/Problems/problemaA2.png') },
      "Excesso de filme do tubo": { image: require('./Assets/Problems/problemaA2.png') },
      "Filme amassado (Flexografia)": { image: require('./Assets/Problems/problemaA2.png') },
      "Ondulação da luva": { image: require('./Assets/Problems/problemaA2.png') },
      "Marcas na luva": { image: require('./Assets/Problems/problemaA2.png') },
      "Rebarba": { image: require('./Assets/Problems/problemaA2.png') },
      "Risco na luva": { image: require('./Assets/Problems/problemaA2.png') },
      "Sujidade/Contaminação": { image: require('./Assets/Problems/problemaA2.png') },
      "Tubo sextavado": { image: require('./Assets/Problems/problemaA2.png') },
      "Variação do verniz": { image: require('./Assets/Problems/problemaA2.png') }
    },
    "PTH": ["Problema C1", "Problema C2"],
    "TCX": ["Problema C1", "Problema C2"],
    "TEXA": ["Problema C1", "Problema C2"],
  },
  "Célula 9": {
    "FLEXO": ["Problema C1", "Problema C2"],
  },
  "Célula 10": {
    "DXL": ["Problema C1", "Problema C2"],
    "PTH": ["Problema C1", "Problema C2"],
    "TCX": ["Problema C1", "Problema C2"],
    "TEXA": ["Problema C1", "Problema C2"],
  },
  // ... adicione mais conforme necessário
};

const HomeScreen = ({ navigation }) => {
  const [selectedCell, setSelectedCell] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCell}
        onValueChange={(itemValue) => {
          setSelectedCell(itemValue);
          setSelectedMachine('');
          setSelectedProblem('');
        }}
      >
        <Picker.Item label="Selecione uma Célula" value="" />
        {Object.keys(problemsDatabase).map(cell => (
          <Picker.Item key={cell} label={cell} value={cell} />
        ))}
      </Picker>

      {selectedCell && (
        <Picker
          selectedValue={selectedMachine}
          onValueChange={(itemValue) => {
            setSelectedMachine(itemValue);
            setSelectedProblem('');
          }}
        >
          <Picker.Item label="Selecione uma Máquina" value="" />
          {Object.keys(problemsDatabase[selectedCell]).map(machine => (
            <Picker.Item key={machine} label={machine} value={machine} />
          ))}
        </Picker>
      )}

      {selectedMachine && (
        <Picker
          selectedValue={selectedProblem}
          onValueChange={(itemValue) => setSelectedProblem(itemValue)}
        >
          <Picker.Item label="Selecione um Problema" value="" />
          {Object.keys(problemsDatabase[selectedCell][selectedMachine]).map(problem => (
            <Picker.Item key={problem} label={problem} value={problem} />
          ))}
        </Picker>
      )}

      {selectedProblem && (
        <View style={{ padding: 10 }}>
        <Text>{problemsDatabase[selectedCell][selectedMachine][selectedProblem].description}</Text>
        <Image 
            source={problemsDatabase[selectedCell][selectedMachine][selectedProblem].image} 
            style={{ width: '100%', height: 200, resizeMode: 'contain' }} 
        />
        </View>
      )}

      {selectedProblem && (
        <Button 
          title={`Ver Solução de ${selectedProblem}`} 
          onPress={() => navigation.navigate('Solution', { 
            problemName: selectedProblem,
            problemSolution: problemsDatabase[selectedCell][selectedMachine][selectedProblem].solution,
            problemVideo: problemsDatabase[selectedCell][selectedMachine][selectedProblem].video
          })} 
        />
      )}
    </View>
  );
}

const SolutionScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.problemName}:</Text>
      <Text>{route.params.problemSolution}</Text>
      <Image source={route.params.problemImage} 
        style={{ width: '100%', height: 20, resizeMode: 'contain' }} 
        />
      <Video 
        source={route.params.problemVideo} 
        style={{ width: '100%', height: 300 }}
        useNativeControls
        resizeMode="contain"
      />
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Seleção' }} />
        <Stack.Screen name="Solution" component={SolutionScreen} options={{ title: 'Solução do Problema' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});

export default App;