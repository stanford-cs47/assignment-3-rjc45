/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, TouchableOpacity, Linking } from 'react-native'
import { material, robotoWeights } from 'react-native-typography' //consider using this!
import { Metrics, Colors } from '../Themes'

export default class News extends Component {
  static defaultProps = { articles: [] }

  static propTypes = {
    article: PropTypes.array
  }

  //you can change the props above to whatever you want/need.

  render () {
    const {articles} = this.props;

    return (
      <View style={styles.container}>
        <FlatList 
            data={articles}
            renderItem={({ item }) => (
                <View style={[styles.article]}>
                  <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <Text style={[styles.header]}>{item.title}</Text>
                  <Text style={[styles.snippet]}>{item.snippet}</Text>
                  <Text style={[styles.byline]}>{item.byline}</Text>
                  <Text style={[styles.date]}>{item.date}</Text>
                  </TouchableOpacity>
                </View>
            )}
            keyExtractor={item => item.title}
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    
  },
  article: {
    margin: 22,
  },
  header: {
    fontSize: 24,
  },
  snippet: {
    fontSize: 12,
  },
  byline: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
  },
});
