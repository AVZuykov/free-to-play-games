import React from 'react'

export interface IApiContext {}

export const ApiContext = React.createContext<IApiContext>(undefined!)
