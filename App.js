import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, Image, TouchableOpacity } from 'react-native';
import {Video} from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const problemsDatabase = {

  "Célula 8": {
    "DXL": {
      "Cor fora da cartela e mancha": { 
        image: require('./Assets/Problems/mancha1.jpeg'),
        description: [
          "1° - Verificar se a cor não está no tom que deveria","\n","\n",
          "2° - Teste de linha"],
        solution:  [
          "1° - Verificar se a cor não está no tom que deveria",
          "2° - Teste de linha"],
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

  },

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

  const { problemName, problemSolution, problemImage, problemVideo } = route.params;
  const [solutionIsEnabled, setSolutionIsEnabled] = useState(false);

  // Função para lidar com o clique no botão de verificação
  const handleCheckPress = (index) => {
    // Implemente a lógica para lidar com o clique no botão de verificação, se necessário
    console.log(`Check pressed for solution line ${index}`);
    setSolutionIsEnabled(true); // Atualiza o estado para habilitar as linhas de solução
  };

  return (
    <View style={styles.container}>
      <Text>{route.params.problemName}:</Text>
      
      {/* Itere sobre as soluções e renderize um componente SolutionLine para cada uma */}
      {route.params.problemSolution.map((solution, index) => (
        <SolutionLine key={index} text={solution} onPressCheck={() => handleCheckPress(index)} 
        isEnabled={solutionIsEnabled} // Defina a condição adequada aqui
        />
      ))}
      
      <Image source={route.params.problemImage} 
        style={{ width: '100%', height: 20, resizeMode: 'contain' }}
        isEnabled={solutionIsEnabled} // Defina a condição adequada aqui 
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

const SolutionLine = ({ text, onPressCheck }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handlePress = () => {
    setIsEnabled(true); // Habilita o botão quando clicado
    onPressCheck(); // Chama a função de clique do botão
  };

  return (
    <View style={styles.solutionLine}>
      <Text style={styles.solutionText}>{text}</Text>
      <TouchableOpacity 
        style={isEnabled ? styles.enabledButton : styles.disabledButton} 
        onPress={handlePress} 
        disabled={isEnabled} // Desabilita o botão se já estiver habilitado
      >
        <Text style={styles.buttonText}>✔</Text>
      </TouchableOpacity>
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
  },
  solutionLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  solutionText: {
    flex: 1,
    marginRight: 8,
  },
});

export default App;