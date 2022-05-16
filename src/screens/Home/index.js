import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  FlatList
} from 'react-native';

import {
  Appbar,
  Divider,
  FAB,
  ActivityIndicator
} from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import Card from '../../components/Card'
import { getDreams } from '../../services/dream'

const HomeScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(false);
  const [dreams, setDreams] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getDreamsHome = () => {
        if (!loading) {
          setLoading(true)
          getDreams()
            .then(async response => {
              setDreams(response)
              setLoading(false)
            })
            .catch(error => {
              setLoading(false)
              Alert.alert('Atenção', error);
            });
        }
      }
      return getDreamsHome()
    }, [])
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Sonhos" />
      </Appbar.Header>
      <View style={styles.container}>
        {
          loading ? (
            <ActivityIndicator animating={loading} color="#000" />
          ) : (
            <FlatList
              data={dreams}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View>
                  <Card
                    titulo={item.titulo}
                    descricao={item.descricao} />
                  <Divider style={styles.divider} />
                </View>
              )}
            />
          )
        }
      </View>
      <FAB
        style={styles.fab}
        color="#FFF"
        icon="plus"
        onPress={() => navigation.push('NewDream')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#333'
  },
  container: {
    padding: 20,
    paddingBottom: 100
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  fab: {
    backgroundColor: '#333',
    position: 'absolute',
    margin: 26,
    right: 0,
    bottom: 0
  },
  safeArea: {
    width: '100%',
    height: '100%'
  }
});

export default HomeScreen;