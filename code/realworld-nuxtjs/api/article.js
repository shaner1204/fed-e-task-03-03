import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

// 获取关注文章列表
export const getYourFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params,

        // headers: {
        //     // 添加用户身份，数据格式：注意 Token 和数据之间有一个空格
        //     Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTExMjc5LCJ1c2VybmFtZSI6InNoYW5lcjEyMDQiLCJleHAiOjE2MDM5NjE1NTJ9.cQLFnkw2Dr9DGksrAEMybFZ2ANmiwdRWPjpLKtIAPQc`
        // }
    })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 获取文章评论列表
export const getArticleComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

// 添加文章评论
export const addArticleComments = (article, params) => {
    console.log(params, '添加评论参数')
    console.log(article, '添加评论参数')
    // const { article } = params
    const { comment } = params
    // console.log(params, 'comment')
    // console.log(params.comment, 'params.comment')
    return request({
        method: 'POST',
        url: `/api/articles/${article.slug}/comments`,
        data: {
            comment
        }
    })
}

// 发布文章
export const publishArticleApi = data => {
    console.log(data)
    return request({
        method: 'POST',
        url: '/api/articles',
        data
    })
}