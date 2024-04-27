import React from 'react'

import { ApiContext, IApiContext } from './api-context'

export function useApi(): IApiContext {
  const context = React.useContext(ApiContext)
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }

  return context
}
