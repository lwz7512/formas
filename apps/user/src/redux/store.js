import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { themeReducer } from './theme/theme-slice';

// Define the state shape
// interface RootState {
//   theme: ThemeState;
// }

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
});

// Persist config with RootState
// :PersistConfig<RootState> from `redux-persist`
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);

// Type for RootState
// export type { RootState };
