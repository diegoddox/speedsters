import { createStackNavigator } from 'react-navigation';

import BlogList from './Containers/BlogList';
import BlogView from './Containers/BlogView';

const Blog = createStackNavigator({
  BlogList,
  BlogView,
}, {
  headerMode: 'none',
})

export default createStackNavigator({
  Blog
}, {
  headerMode: 'none',
});