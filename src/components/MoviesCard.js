import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const MoviesCard = ({movies, navigation}) => {
  // eslint-disable-next-line no-shadow
  const checkLogin = async movies => {
    const res = await AsyncStorage.getItem('isLoggedIn');
    // eslint-disable-next-line no-undef
    if (res) {
      navigation.navigate('MoviesDetails', {
        details: movies,
      });
    } else {
      // setLogin(false);
      navigation.navigate('Login');
    }
    return res;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => checkLogin(movies)}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movies?.poster_path}`,
        }}
        style={styles.image}
      />
      <View style={{flexDirection: 'column'}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movies?.title}</Text>
          <Text style={styles.title}>Date: {movies?.release_date}</Text>
          <Text style={styles.title}>Rating: {movies?.vote_count}</Text>
        </View>
      </View>
      <View style={styles.mapView}>
        <Text style={{color: 'green', fontWeight: 700}}>
          {movies?.popularity}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: 120,
    height: 70,
    borderRadius: 10,
  },
  imageMap: {
    width: 22,
    height: 30,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexWrap: 'wrap',
    margin: 5,
  },
  mapView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 4,
    marginVertical: 10,
  },
});
export default MoviesCard;
