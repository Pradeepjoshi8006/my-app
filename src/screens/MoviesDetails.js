/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {Icons} from '../utils/ImageConst';
function MoviesDetails({route}) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const PersonItem = ({title}) => (
    <View style={styles.personItem}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${route?.params?.details?.poster_path}`,
        }}
        style={styles.personImage}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${route?.params?.details?.poster_path}`,
        }}
        style={styles.movieImg}
      />

      <View style={{marginHorizontal: 10}}>
        <Text style={styles.movieNmae}>{'The WOUNDER WOMEN'}</Text>
        <Text style={styles.percentage}>
          {route?.params?.details?.popularity}%
        </Text>
        <Text style={styles.overView}>{'OverView'}</Text>
        <Text>{route?.params?.details?.overview}</Text>
        <Text style={styles.genres}>{'Genres'}</Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
          horizontal={true}
        />

        <Text style={styles.genres}>{'Credits'}</Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => <PersonItem title={item.title} />}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 12,
  },
  personItem: {
    marginHorizontal: 16,
  },
  personImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  movieImg: {
    width: 150,
    height: 170,
    alignSelf: 'center',
    marginVertical: 50,
  },
  movieNmae: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
  },
  percentage: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    marginVertical: 10,
    color: 'green',
  },
  overView: {
    fontWeight: '500',
    fontSize: 20,
    color: 'Black',
  },
  genres: {
    fontWeight: '500',
    fontSize: 20,
    marginVertical: 20,
    color: 'Black',
  },
});

export default MoviesDetails;
