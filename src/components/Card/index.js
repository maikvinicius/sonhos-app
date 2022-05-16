import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import {
  Card as CardStyle
} from 'react-native-paper';

const Card = ({ titulo, descricao }) => {
  return (
    <View>
      <CardStyle>
        <CardStyle.Title
          title={titulo}
          subtitle={descricao} />
      </CardStyle>
    </View>
  );
}

export default Card;