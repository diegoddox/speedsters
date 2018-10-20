import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default (props) => (
  <View style={styles.topHolder}>
    <Text style={styles.blogTitle}>
      {props.children}
    </Text>
  </View>
)