/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {topHeadlineRequest} from '../store/action';
import MoviesCard from '../components/MoviesCard';
import {TEXTCONST} from '../utils/Constant';
import AsyncStorage from '@react-native-community/async-storage';

const END_POINT = [
  {
    title: 'upcoming',
    id: 1,
  },
  {title: 'top_rated', id: 2},
  {title: 'popular', id: 3},
];

const MoviesList = ({moviesModel, dispatch, navigation, route}) => {
  const [page, setPage] = useState(1);
  const [endPoint, setEndPoint] = useState('');

  useEffect(() => {
    requestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const requestAPI = title => {
    dispatch(
      topHeadlineRequest({
        page: page,
        endPoint: title ? title : 'top_rated',
      }),
    );
  };

  const Item = ({title}) => (
    <TouchableOpacity style={styles.item} onPress={() => requestAPI(title)}>
      <Text style={{fontSize: 20, color: 'green', padding: 10}}>{title}</Text>
    </TouchableOpacity>
  );

  const fetchMoreData = () => {
    if (moviesModel.data.length === 10 * page) {
      let page_Current = page + 1;
      setPage(page_Current);
    }
  };

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>{TEXTCONST.No_Data_at_the_moment}</Text>
      <Button onPress={() => requestAPI()} title={TEXTCONST.Refresh} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {moviesModel.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View>
            <FlatList
              data={END_POINT}
              renderItem={({item}) => <Item title={item.title} />}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
          <FlatList
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{flexGrow: 1}}
            data={moviesModel.data}
            renderItem={({item}) => (
              <MoviesCard navigation={navigation} movies={item} />
            )}
            ListEmptyComponent={renderEmpty}
            onEndReachedThreshold={0.4}
            onEndReached={fetchMoreData}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    moviesModel: state.movies,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'lightgrey',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
});

export default connect(mapStateToProps)(MoviesList);
