export enum UserActionTypes {
    'SET_USER'= 'SET_USER',
    'UPDATE_USER'= 'UPDATE_USER',
    'SET_USER_TOKEN'= 'SET_USER_TOKEN',
    'UPDATE_USER_LOADING'= 'UPDATE_USER_LOADING'
}
export interface IUser{
    username: string,
    email: string
}

export const setUser = (user: IUser)=>({
    type: UserActionTypes.SET_USER,
    payload: user,
})

export const setUserToken = (token: string)=>({
    type: UserActionTypes.SET_USER_TOKEN,
    payload: token,
})

export const updateUserLoading = (loading: boolean)=>({
    type: UserActionTypes.UPDATE_USER_LOADING,
    payload: loading,
})