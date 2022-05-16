import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';

import {
  Appbar,
  TextInput,
  Button
} from 'react-native-paper';

import { addDream } from '../../services/dream'

const NewDreamScreen = ({ navigation }) => {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);

  const newDream = async () => {
    if (title != null && description != null) {
      setLoading(true);
      await addDream(title, description)
        .then(response => {
          setTitle();
          setDescription();
          setLoading(false);
          Alert.alert('Atenção', 'Cadastrado com sucesso.');
          navigation.goBack();
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('Atenção', error)
        });
    } else {
      Alert.alert('Atenção', 'É necessário digitar o título e a descrição.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Novo Sonho" />
      </Appbar.Header>
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Título"
          value={title}
          onChangeText={text => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Descrição"
          value={description}
          onChangeText={text => setDescription(text)}
          style={styles.textArea}
          multiline
        />
        <Button
          color="#333"
          mode="contained"
          loading={loading}
          onPress={() => newDream()}>
          Cadastrar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    gap: 20,
    padding: 20
  },
  appBar: {
    backgroundColor: '#333'
  },
  safeArea: {
    width: '100%',
    height: '100%'
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    marginBottom: 10,
    height: 200
  }
});

export default NewDreamScreen;