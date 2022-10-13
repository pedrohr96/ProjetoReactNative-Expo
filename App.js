import { React, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Switch } from "@react-native-material/core";
import { RadioButton, TextInput } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Axios from 'axios';

import Ipet from './img/ipet.png'
import Logo from './img/logo.png'
import Calendar from './img/calendar.png'
import Pets from './img/pets.png'
import User from './img/user.png'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="MeusPets" component={MeusPets} />
        <Stack.Screen name="Consulta" component={Consulta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DivNPets({ npets }) {
  const pets = [];
  const [especie, setEspecie] = useState('');
  if (npets > 2) {
    npets = 2;
  }
  for (let i = 0; i < npets; i++) {
    pets.push(
      <View key={i} style={styles.section}>
        <Text>Pet {i + 1}</Text>
        <TextInput style={styles.input} label="Nome" />
        <TextInput style={styles.input} label="Idade" keyboardType='numeric' />

        <Text style={styles.btnText4}>Espécie</Text>
        <View style={styles.row}>
          <RadioButton value="canino" status={especie === 'canino' ? 'checked' : 'unchecked'}
            onPress={() => (setEspecie('canino'))} />
          <Text style={styles.btnText4}>
            Canino
          </Text>
        </View>
        <View style={styles.row}>
          <RadioButton value="felino" status={especie === 'felino' ? 'checked' : 'unchecked'}
            onPress={() => (setEspecie('felino'))} />
          <Text style={styles.btnText4}>
            Felino
          </Text>
        </View>
        <View style={styles.row}>
          <RadioButton value="outro" status={especie === 'outro' ? 'checked' : 'unchecked'}
            onPress={() => (setEspecie('outro'))} />
          <Text style={styles.btnText4}>
            Outro
          </Text>
        </View>
        {especie === 'outro' ? <TextInput style={styles.input} label="Qual?" /> : ''}
      </View>
    );
  }
  return pets;
}

function DivErro({ npets }) {
  const erro = [];
  if (npets > 2) {
    erro.push(
      <Text style={styles.erro}>Máximo 2 pets no plano grátis.</Text>
    );
  }
  return erro;
}

function DivVets({ especie }) {
  const vets = [];
  if (especie === 'canino') {
    vets.push(
      <View key={'canino'}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image style={styles.vets} source={User} />
          <View style={styles.boxVets}>
            <Text>Dr. Felipe Gonçalves</Text>
            <Text>CRMV: 123456789</Text>
            <Text>★★★★★</Text>
            <Text>R$150,00</Text>
          </View>
          <View style={styles.boxEspecialista}>
            <Text style={styles.txtEspecialista}>ESPECIALISTA</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image style={styles.vets} source={User} />
          <View style={styles.boxVets}>
            <Text>Dra. Leila Pereira</Text>
            <Text>CRMV: 444555666</Text>
            <Text>★★★★★</Text>
            <Text>R$80,00</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image style={styles.vets} source={User} />
          <View style={styles.boxVets}>
            <Text>Dr. Júlio Oliveira</Text>
            <Text>CRMV: 999888777</Text>
            <Text>★★★★</Text>
            <Text>R$60,00</Text>
          </View>
        </View>
      </View>
    );
  } else if (especie === 'felino') {
    vets.push(
      <View key={'felino'}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image style={styles.vets} source={User} />
          <View style={styles.boxVets}>
            <Text>Dra. Julieta Silva</Text>
            <Text>CRMV: 987654321</Text>
            <Text>★★★★★</Text>
            <Text>R$100,00</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image style={styles.vets} source={User} />
          <View style={styles.boxVets}>
            <Text>Dr. Lucas Oliveira</Text>
            <Text>CRMV: 987654321</Text>
            <Text>★★★★</Text>
            <Text>R$80,00</Text>
          </View>
        </View>
      </View>
    );
  } else if (especie === 'outro') {
    vets.push(
      <View key={'outro'}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image style={styles.vets} source={User} />
          <View style={styles.boxVets}>
            <Text>Dr. Amanda Cunha</Text>
            <Text>CRMV: 111222333</Text>
            <Text>★★★★★</Text>
            <Text>R$200,00</Text>
          </View>
          <View style={styles.boxEspecialista}>
            <Text style={styles.txtEspecialista}>ESPECIALISTA</Text>
          </View>
        </View>
      </View>
    );
  }
  return vets;
}

function Login({ navigation }) {
  return (
    <View style={styles.containerAllCenter}>
      <Image style={styles.logoLogin} source={Logo} />
      <Image style={styles.logoIpetLogin} source={Ipet} />
      <View style={{ width: '48%' }}>
        <TextInput style={styles.input} label="Login" />
        <TextInput style={styles.input} label="Senha" secureTextEntry={true} />
      </View>
      <View style={{ paddingVertical: 10 }}></View>
      <View>
        <TouchableOpacity style={styles.btnType1} onPress={() => navigation.navigate('MeusPets')}>
          <Text style={styles.btnText1}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btnText2}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.btnText5}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function Cadastro({ navigation }) {
  const [npets, setNpets] = useState();
  const [accept, setAccept] = useState(false);
  const [genero, setGenero] = useState('');
  const [date, setDate] = useState(new Date(946700000000));
  const [cep, setCep] = useState('');
  const [jsonCep, setJsonCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const buscarCep = () => {
    Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        setJsonCep({ item: response.data })
      })
      .catch(error => {
        return console.log(error);
      })
  };

  return (
    <View style={styles.containerCadastro}>
      <View style={styles.rowLogo}>
        <Image style={styles.logo} source={Logo} />
        <Image style={styles.logoIpet} source={Ipet} />
      </View>
      <ScrollView>
        <TextInput style={styles.input} label="Nome" />
        <TextInput style={styles.input} label="Sobrenome" />
        <View style={{ borderBottomWidth: 1, borderColor: '#949494', paddingBottom: 5 }}>
          <Text style={styles.btnText4}>Gênero</Text>
          <View style={styles.row}>
            <RadioButton value="masc" status={genero === 'masc' ? 'checked' : 'unchecked'}
              onPress={() => (setGenero('masc'))} />
            <Text style={styles.btnText4}>
              Masculino
            </Text>
          </View>
          <View style={styles.row}>
            <RadioButton value="fem" status={genero === 'fem' ? 'checked' : 'unchecked'}
              onPress={() => (setGenero('fem'))} />
            <Text style={styles.btnText4}>
              Feminino
            </Text>
          </View>
          <View style={styles.row}>
            <RadioButton value="outro" status={genero === 'outro' ? 'checked' : 'unchecked'}
              onPress={() => (setGenero('outro'))} />
            <Text style={styles.btnText4}>
              Outro
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={showDatepicker} style={{ borderColor: '#949494', borderBottomWidth: 1, height: 60, paddingTop: 5 }}>
          <Text style={{ height: 40, fontSize: 16, }}>
            <Image style={styles.calendar} source={Calendar} />
            <Text>Nascimento</Text>
          </Text>
        </TouchableOpacity >

        <TextInput
          style={styles.input} label="CEP" keyboardType='numeric'
          onChangeText={(x) => setCep(x)}
          onBlur={buscarCep()}
          leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
          value={cep} id="cep" name="cep" />

        <TextInput
          style={styles.input} label="Endereço" keyboardType='numeric'
          onChange={(x) => setEndereco(x)}
          leftIcon={{ type: 'font-awesome', name: 'map-signs' }}
          value={cep.length === 8 ? (jsonCep?.item?.logradouro + ', ' + jsonCep?.item?.bairro + ', ' + jsonCep?.item?.localidade + ' - ' + jsonCep?.item?.uf) : ' '} id="bairro" name="bairro" />
        
        <TextInput style={styles.input} label="Número" keyboardType="numeric" />
        <TextInput style={styles.input} label="Complemento" />


        <View style={styles.section}>
          <DivErro npets={npets} />
          <TextInput style={styles.input} label="N° Pets" keyboardType='numeric' value={npets} onChangeText={x => setNpets(x)} />
          <DivNPets npets={npets} />
        </View>
        <View style={styles.section}>
          <TextInput style={styles.input} label="E-mail" keyboardType="email-address" />
          <TextInput style={styles.input} label="Senha" secureTextEntry={true} />
          <TextInput style={styles.input} label="Confirmar senha" secureTextEntry={true} />
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Switch
              value={accept}
              onValueChange={setAccept}
            />
            <Text style={{ marginLeft: 10, marginTop: 13, }}>
              Eu aceito os termos de uso e responsabilidade.
            </Text>
          </View>
          <View style={styles.section}>
            <TouchableOpacity style={styles.btnType1} onPress={() => navigation.navigate('MeusPets')}>
              <Text style={styles.btnText1}>Criar conta</Text>
            </TouchableOpacity>
            <View style={{ paddingVertical: 20 }}></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function MeusPets({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Image style={styles.logo} source={Logo} />
          <Image style={styles.logoIpet} source={Ipet} />
        </View>
        <View style={{ padding: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText4}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerAllCenter}>
        <ScrollView>
          <Text style={styles.btnText3}>
            Meus Pets
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
            <View style={styles.boxPets}>
              <Image style={styles.meusPets} source={Pets} />
              <Text>Ronaldo</Text>
            </View>
            <View style={styles.boxPets}>
              <Image style={styles.meusPets} source={Pets} />
              <Text>Pelé</Text>
            </View>
          </View>
          <View>
            <View style={{ paddingVertical: '20%' }}></View>
            <TouchableOpacity style={styles.btnType1} onPress={() => navigation.navigate('Consulta')}>
              <Text style={styles.btnText1}>CONSULTAR VETERINÁRIOS</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function Consulta({ navigation }) {
  const [especie, setEspecie] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Image style={styles.logo} source={Logo} />
          <Image style={styles.logoIpet} source={Ipet} />
        </View>
        <View style={{ padding: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText4}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerAllCenter}>
        <ScrollView>
          <Text style={styles.btnText3}>
            Filtrar
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 30, alignSelf: 'center', }}>
            <RadioButton value="canino" status={especie === 'canino' ? 'checked' : 'unchecked'}
              onPress={() => (setEspecie('canino'))} />
            <Text style={styles.btnText4}>
              Canino
            </Text>
            <RadioButton value="felino" status={especie === 'felino' ? 'checked' : 'unchecked'}
              onPress={() => (setEspecie('felino'))} />
            <Text style={styles.btnText4}>
              Felino
            </Text>
            <RadioButton value="outro" status={especie === 'outro' ? 'checked' : 'unchecked'}
              onPress={() => (setEspecie('outro'))} />
            <Text style={styles.btnText4}>
              Outro
            </Text>
          </View>
          {especie === 'canino' ? <DivVets especie={especie}></DivVets> : <Text></Text>}
          {especie === 'felino' ? <DivVets especie={especie}></DivVets> : <Text></Text>}
          {especie === 'outro' ? <DivVets especie={especie}></DivVets> : <Text></Text>}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAllCenter: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCadastro: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  section: {
    marginTop: 30,
  },
  logoIpetLogin: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  logoLogin: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  logoIpet: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginLeft: 10,
    marginTop: 2,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  meusPets: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  vets: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  rowLogo: {
    flexDirection: "row",
    marginTop: 8,
    width: '100%',
    justifyContent: 'center',
  },
  row: {
    flexDirection: "row",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  input: {
    backgroundColor: 'white'
  },
  erro: {
    color: 'red',
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  calendar: {
    width: 30,
    height: 30,
  },
  boxPets: {
    width: 60,
    alignItems: 'center',
  },
  boxVets: {
    marginLeft: 20
  },
  boxEspecialista: {
    marginHorizontal: 12,
    backgroundColor: '#74DBEF',
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 3,
    fontSize: 3,
  },
  txtEspecialista: {
    color: 'white',
    fontSize: 12,
  },

  btnType1: {
    backgroundColor: '#74DBEF',
    textAlign: 'center',
    borderRadius: 4,
    paddingHorizontal: 78,
    paddingVertical: 7,
  },
  btnType2: {
    textAlign: 'center'
  },
  btnText1: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnText2: {
    marginTop: 5,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  btnText3: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    marginTop: 20,
    textAlign: 'center',
  },
  btnText4: {
    fontSize: 16,
    marginTop: 7,
  },
  btnText5: {
    fontWeight: 'bold',
    fontSize: 22,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 10
  },
});
