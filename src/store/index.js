import createSagaMiddleware from 'redux-saga';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';

import rootSaga from './sagas';
import {rootReducer} from './reducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export {store};
