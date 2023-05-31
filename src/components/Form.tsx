import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';
import {MaskedTextInput} from 'react-native-mask-text';

const Wrapper = styled.View`
  background-color: #3e3e3f;
  width: 100%;
  height: 100%;
`;

const HeaderText = styled.Text`
  color: white;
  margin-top: 20px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 1px solid #d6ddda;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
  color: white;
  margin-top: 10px;
`;

const MaskedInput = styled(MaskedTextInput)`
  height: 40px;
  border: 1px solid #d6ddda;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
  color: white;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: black;
  background-color: yellow;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  margin: 20px auto;
  font-size: 20px;
`;

const Form: React.FC = () => {
  const [data, setData] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('');
  const [valor, setValor] = useState('');
  const [cep, setCep] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [atividade, setAtividade] = useState('');

  const handleSubmit = () => {
    setData('');
    setEstabelecimento('');
    setValor('');
    setCep('');
    setCnpj('');
    setAtividade('');
  };

  return (
    <Wrapper>
      <HeaderText>Recibo-PDF{'\n'}Preencha os campos abaixo:</HeaderText>
      <Container>
        <MaskedInput
          placeholder="Data"
          value={data}
          onChangeText={setData}
          placeholderTextColor="white"
          keyboardType="numeric"
          mask="99/99/9999"
        />
        <Input
          placeholder="Estabelecimento"
          value={estabelecimento}
          onChangeText={setEstabelecimento}
          placeholderTextColor="white"
        />
        <Input
          placeholder="Valor (R$)"
          value={valor}
          onChangeText={setValor}
          placeholderTextColor="white"
          keyboardType="numeric"
        />
        <MaskedInput
          placeholder="CEP"
          value={cep}
          onChangeText={setCep}
          placeholderTextColor="white"
          keyboardType="numeric"
          mask="99999-999"
        />
        <MaskedInput
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
          placeholderTextColor="white"
          keyboardType="numeric"
          mask="99.999.999/999-99"
        />
        <Input
          placeholder="Atividade"
          value={atividade}
          onChangeText={setAtividade}
          placeholderTextColor="white"
        />

        <TouchableOpacity onPress={handleSubmit}>
          <ButtonText>Enviar</ButtonText>
        </TouchableOpacity>
      </Container>
    </Wrapper>
  );
};

export default Form;
