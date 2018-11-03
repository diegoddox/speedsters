import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import BlogListItem from './BlogListItem';
import Header from '../../Common/Header';
import styles from './styles';
import sperformance from '@speedsters/performance';
import sreact from '@speedsters/react';

class BlogList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: 0,
      data: [],
    };

    this.handleAnotherBinding = this.handleAnotherBinding.bind(this);
    
    sreact.component(this, {
      excludes: {
        handleAnotherBinding: true,
      },
      milliseconds: 50,
    });

    setTimeout(() => {
      sperformance.log(['name', 'value', 'timing']);
    }, 2000);
  }

  componentDidMount() {
    const track = sperformance.start('fetch-posts', 'BlogListFetch');
    fetch('http://10.0.2.2:8282/posts')
      .then(res => res.json())
      .then(resp => {
        track.stop();
        this.setState({ data: resp });
      })
      .catch(() => {
        console.warn('Error while fetching product.');
        track.stop();
      });
  }

  handleSelectPost = (data) => () => {
    this.handleAnotherBinding();

    const track = sperformance.start('for-loop', 'BlogListComponent');

    /**
     * Let's fake a slow click here.
     */
    const longClick = sperformance.start('select-post-onclick', 'BlogListComponent', {
      milliseconds: 50,
    });
    
    let values = [];
    for (let i = 0; i <= (10 * 1000000); i++) { values.push(i); }

    track.stop();
    longClick.stop();

    this.setState({
      ...this.state,
      refresh: this.state.refresh++,
    });

    const ViewName = 'BlogView'
    sperformance.start(`transition-to-${ViewName}`);
    this.props.navigation.navigate(ViewName, { ...data });
  }

  handleAnotherBinding() {}

  _keyExtractor = (item) => item.id;

  render() {
    return (
      <View style={styles.list}>
        <Header>Blog List</Header>
        <FlatList
          data={this.state.data}
          extraData={this.state.data}
          style={styles.list}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => (
            <TouchableOpacity onPress={this.handleSelectPost(item)}>
              <BlogListItem {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default BlogList;