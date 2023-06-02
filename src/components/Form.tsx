import React, {useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {MaskedTextInput} from 'react-native-mask-text';
import {printToFileAsync} from 'expo-print';
import * as Print from 'expo-print';
import {shareAsync} from 'expo-sharing';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';
import 'moment/locale/pt-br';

const Wrapper = styled.View`
  background-color: #3e3e3f;
  width: 100%;
  height: 100%;
`;

const HeaderText = styled.Text`
  color: white;
  margin-top: 10px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const InputTitle = styled.Text`
  padding: 0;
  margin: 0;
  color: white;
  top: 10px;
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

const ContainerButtons = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  margin: auto;
  text-align: center;
  justify-content: center;
  width: 100%;
`;

const ButtonText = styled.Text<{backgroundColor?: string}>`
  color: black;
  background-color: ${(props: {backgroundColor: any}) =>
    props.backgroundColor || Colors};
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  width: auto;
  margin: 20px auto;
  font-size: 20px;
`;

const Form: React.FC = () => {
  const [cidade, setCidade] = useState('');
  const [data, setData] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [valor, setValor] = useState('');
  const [cep, setCep] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [atividade, setAtividade] = useState('');
  const inputValor = useRef<typeof MaskedInput | null>(null);

  const clearForm = () => {
    setCidade('');
    setData('');
    setEstabelecimento('');
    setEndereco('');
    setCep('');
    setCnpj('');
    setValor('');
    setAtividade('');
    inputValor.current.setNativeProps({text: '0.00'});
  };

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  const print = async () => {
    await Print.printAsync({
      html: html,
    });
  };

  const html = `
  <html>
    <body>
    <br><br><br>
    <h1 style="text-align:center; font-size:50px; margin:0; ">Recibo<h1>
    <h1 style="text-align:center; font-size:40px; margin:0;">
    ${cidade ? `${cidade}.` : ``}${
    data ? ` ${moment(data, 'DD/MM/YYYY').format('LL')}.` : ``
  }</h1>
    <br><br>
      <p style="width:80%; font-size:30px; margin:auto; line-height: 1.5;">
      Recebi do(a)
      ${estabelecimento ? ` ${estabelecimento},` : ''}
      ${endereco ? `endereço ${endereco},` : ''}
      ${cep ? `CEP ${cep},` : ''}
      ${cnpj ? `CNPJ ${cnpj},` : ''}
      ${valor ? `o valor de R$${valor}` : ''}
      ${atividade ? `referente a ${atividade}` : ''}.</p>
      <br><br><br><br><br><br>
      <div style="width:90% ; display:flex; flex-direction: column; position:fixed; bottom:0%; left:50%; transform: translate(-50%, 0)">
        <p style="width:80%; font-size:30px; text-align:center; margin:auto; line-height: 1.5;">Eletricista</p>
        <p style="width:80%; font-size:30px; text-align:center; margin:auto; line-height: 1.5;">Eduardo Schunk Martins</p>
        <p style="width:80%; font-size:30px; text-align:center; margin:auto; line-height: 1.5;">CPF 034.364.577-79</p>
        <br><br><br>
        <div style="border-bottom: 1px solid">
          <span></span>
        </div>
      </div>
    </body>
  </html>
`;

  return (
    <Wrapper>
      <HeaderText>Recibo-PDF</HeaderText>
      <Container>
        <KeyboardAwareScrollView>
          <InputTitle>Cidade</InputTitle>
          <Input value={cidade} onChangeText={setCidade} />

          <InputTitle>Data</InputTitle>
          <MaskedInput
            value={data}
            onChangeText={setData}
            keyboardType="numeric"
            mask="99/99/9999"
          />

          <InputTitle>Estabelecimento</InputTitle>
          <Input value={estabelecimento} onChangeText={setEstabelecimento} />

          <InputTitle>Endereço</InputTitle>
          <Input value={endereco} onChangeText={setEndereco} />

          <InputTitle>CEP</InputTitle>
          <MaskedInput
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            mask="99999-999"
          />

          <InputTitle>CNPJ</InputTitle>
          <MaskedInput
            value={cnpj}
            onChangeText={setCnpj}
            keyboardType="numeric"
            mask="99.999.999/9999-99"
          />

          <InputTitle>Valor R$</InputTitle>
          <MaskedInput
            ref={inputValor}
            type="currency"
            options={{
              prefix: '',
              decimalSeparator: ',',
              groupSeparator: '.',
              precision: 2,
            }}
            onChangeText={setValor}
            keyboardType="numeric"
          />

          <InputTitle>Atividade</InputTitle>
          <Input value={atividade} onChangeText={setAtividade} />

          <ContainerButtons>
            <TouchableOpacity onPress={generatePdf}>
              <ButtonText backgroundColor="yellow">Compartilhar PDF</ButtonText>
            </TouchableOpacity>

            <TouchableOpacity onPress={print}>
              <ButtonText backgroundColor="green">Baixar PDF</ButtonText>
            </TouchableOpacity>

            <TouchableOpacity onPress={clearForm}>
              <ButtonText backgroundColor="#f02e3c">
                Limpar Formulário
              </ButtonText>
            </TouchableOpacity>
          </ContainerButtons>
        </KeyboardAwareScrollView>
      </Container>
    </Wrapper>
  );
};

export default Form;
