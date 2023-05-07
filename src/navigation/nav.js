/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesList from '../screens/MoviesList';
import MoviesDetails from '../screens/MoviesDetails';
import Login from '../screens/Login';
import {TEXTCONST} from '../utils/Constant';

const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef();

const ProtectedRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={TEXTCONST.Movies}
        component={MoviesList}
        options={{
          title: TEXTCONST.Movies,
        }}
      />
      <Stack.Screen
        name={TEXTCONST.MoviesDetails}
        component={MoviesDetails}
        options={{
          title: TEXTCONST.MoviesDetails,
        }}
      />
    </Stack.Navigator>
  );
};

const RootApp = ({isLoggedIn}) => {
  const CreateRootNavigator = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {isLoggedIn.length ? (
            <>
              <Stack.Screen
                name={TEXTCONST.Home}
                component={ProtectedRoutes}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={TEXTCONST.Home}
                component={ProtectedRoutes}
                options={{headerShown: false}}
              />
              <Stack.Screen name={TEXTCONST.Login} component={Login} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  return <CreateRootNavigator />;
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.movies.isLoggedIn,
  };
};

export default connect(mapStateToProps)(RootApp);
