/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
import { useReducer, createContext } from 'react';

import { reducer, initialState } from './mainReducer';

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  return <AppContext.Provider value={useReducer(reducer, initialState)}>{children}</AppContext.Provider>;
}

export default AppContext;
