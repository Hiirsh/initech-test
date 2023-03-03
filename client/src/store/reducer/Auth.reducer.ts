interface ILogin {
  auth: boolean
  login: string
}

const IS: ILogin = {
  auth: false,
  login: ''
}

export enum ILoginEnum {
  setAuth = 'SET_AUTH',
  setLogin = 'SET_LOGIN'
}

interface ILoginReducerAuth {
  type: ILoginEnum.setAuth,
  payload: boolean
}

interface ILoginReducerLogin {
  type: ILoginEnum.setLogin,
  payload: string
}

export type ILoginReducerActionsTypes = ILoginReducerAuth | ILoginReducerLogin

export const LoginReducer = (state = IS, action: ILoginReducerActionsTypes): ILogin => {
  switch (action.type) {
    case ILoginEnum.setAuth:
      return {...state, auth: action.payload}
    case ILoginEnum.setLogin:
      return {...state, login: action.payload}
    default:
      return state
  }
}
