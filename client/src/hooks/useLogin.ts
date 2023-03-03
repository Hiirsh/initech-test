import { ILoginEnum } from '../store/reducer/Auth.reducer'
import { useDispatch } from 'react-redux'

export const useLogin = () => {
  const dispatch = useDispatch()

  return {
    setAuth: (payload: boolean) => {
      dispatch({type: ILoginEnum.setAuth, payload})
    },
    setLogin: (payload: string) => {
      dispatch({type: ILoginEnum.setLogin, payload})
    }
  }
}