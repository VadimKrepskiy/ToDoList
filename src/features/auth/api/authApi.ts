import {BaseResponse} from '@/common/types'
import {baseApi} from '@/app/baseApi.ts'
import {LoginArgs} from '@/features/auth/api/authApi.types.ts'

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<BaseResponse<{ id: number; email: string; login: string}>, void>({
            query: () => 'auth/me',
        }),
        login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
            query: (body) => ({
                url: "auth/login",
                method: "POST",
                body,
            }),
        }),
        logout: build.mutation<BaseResponse, void>({
            query: () => ({
                url: 'auth/login',
                method: 'POST',
            })
        }),
    })
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi