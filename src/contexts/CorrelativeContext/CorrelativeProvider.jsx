import { FC, useReducer } from 'react'
import { CorrelativeContext, CorrelativeReducer } from './index';

const Correlative_INITIAL_STATE = {
  idCorrelative: 9,
  // name: '',
}

export const CorrelativeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CorrelativeReducer, Correlative_INITIAL_STATE)

  const setCorrelativeId = (payload) => {
    dispatch({ type: '[Correlative] - Set Id Correlative', payload })
  }

  return (
    <CorrelativeContext.Provider
      value={{
        ...state,
        setCorrelativeId,
      }}
    >
      {children}
    </CorrelativeContext.Provider>
  );
};
