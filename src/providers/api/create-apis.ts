import { IApiContext } from './api-context'

interface ICreateApisParams {
  basePath?: string
}

export function createApis({ basePath }: ICreateApisParams): IApiContext {
  const param = {
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  }

  return {}
}
