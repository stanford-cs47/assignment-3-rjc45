/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React from 'react';
import { StyleSheet, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'
import { AntDesign } from '@expo/vector-icons';
import { robotoWeights } from 'react-native-typography';

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  componentDidMount() {

    //uncomment this to run an API query!
    this.loadArticles();
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  searchArticles = () => {
    this.loadArticles(this.state.searchText);
  }

  render() {
    const {articles, loading, searchText} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.box1]}>
          <Image
            style={[styles.box1, styles.logo]}
            source={Images.logo}/> 
        </View>
        
        <View style={[styles.box2]}>
          <View style={[styles.searchBar]}>
            <TextInput
              style={[styles.searchBar]}
              placeholder='Search for News'
              onChangeText={searchText => this.setState({searchText})}
              value={searchText}
            />
            <TouchableOpacity
              onPress={this.searchArticles}
            > 
              <AntDesign
                name='search1'
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.box3]}>
          <News articles={articles}/>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    flex: 1,
  },
  logo: {
    width: Metrics.screenWidth,
    resizeMode: 'contain',
  },
  box2: {
    flex: 0.2,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    
  },
  searchBar: {
    marginLeft: 10,
    marginRight: 15,
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box3: {
    flex: 4,
  },
});
