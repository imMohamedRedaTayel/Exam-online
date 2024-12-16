"use client"
import { persistor, store } from '@/redux/persist';
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
interface ReduxProviderProps {
  children: React.ReactNode
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <>
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  )
}

export default ReduxProvider