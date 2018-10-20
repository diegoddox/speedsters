import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import NPerformance from '@jsnp/performance';
import NPReact from '@jsnp/react';
import styles from './styles';
import Title from '../BlogList/Title';

class BlogView extends React.Component {
  constructor(props) {
    super(props);
    NPReact.component(this);
  }

  componentDidMount() {
    NPerformance.stop(`transition-to-BlogView`);
  }

  render() {
    const {
      picture,
      title,
      text,
    } = this.props.navigation.state.params;
    return (
      <View style={styles.base}>
        <ScrollView style={styles.base}>
          <Image
            source={{uri: picture}}
            style={styles.image}
            resizeMode="cover"
          />
          <Title>{title}</Title>
          <Text style={styles.description}>{text}</Text>
        </ScrollView>
      </View>
    );
  }
}

export default BlogView;