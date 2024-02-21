import { create } from 'zustand'

export type AuthState = {
    username: string,
    password: string,
    status: string,
    accessToken: string,
    refreshToken: string,
    setAccessToken: (token: string) => void,
    setRefreshToken: (token: string) => void,
    setStatus: (status: string) => void,
    setUsername: (username: string) => void,
    setPassword: (password: string) => void,
}

const useAuthStore = create<AuthState>()((set, _get) => ({
    username: '',
    password: '',
    status: '',
    accessToken: '',
    refreshToken: '',
    setAccessToken: (token: string) => {
        set({
            accessToken: token
        })
    },
    setRefreshToken: (token: string) => {
        set({
            refreshToken: token
        })
    },
    setStatus: (status: string) => {
        set({
            status
        })
    },
    setUsername: (username: string) => {
        set({
            username
        })
    },
    setPassword: (password: string) => {
        set({
            password
        })
    }
})
)

export default useAuthStore