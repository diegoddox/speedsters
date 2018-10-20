import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  blogListHolder: {
    width: '100%',
    height: 340,
    backgroundColor: '#f1f1f1'
  },
  blogContainer: {
    flex: 1,
  },
  topHolder: {
    width: '100%',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fdfdfd',
    borderTopWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
  },
  bottomHolder: {
    width: '100%',
    height: 60,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  postText: {
    fontSize: 16,
  }
});