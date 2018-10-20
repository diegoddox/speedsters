import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import Title from './Title';

export default (props) => (
  <View style={styles.blogListHolder}>
    <View styles={styles.blogContainer}>
      <Title>{props.title}</Title>
      <Image
        style={styles.image}
        source={{uri: props.picture}}
        resizeMode="cover"
      />
      <View style={styles.bottomHolder}>
        <Text
          style={styles.postText}
          numberOfLines={2}
        >
          {props.text}
        </Text>
      </View>
    </View>
  </View>
);