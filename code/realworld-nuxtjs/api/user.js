import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}

// 用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}

// 获取当前用户
export const getUser = params => {
    return request({
        method: 'GET',
        url: '/api/user',
        params
    })
}

// 更新当前用户信息
export const updateUserApi = data => {
    return request({
        method: 'PUT',
        url: '/api/user',
        data
    })
}

// 获取用户简介
export const getUserProfile = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`
    })
}