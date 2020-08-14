/**
 * Nuxt.js 配置文件
 */
module.exports = {
    router: {
        // 自定义路由表规则
        extendRoutes (routes, resolve) {
            console.log(routes, 'routes')
            // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
            routes.splice(0)

            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: '', // 默认子路由
                            name: 'home',
                            comopnent: resolve(__dirname, 'pages/home/')
                        },
                        {
                            path: '/login', // 默认子路由
                            name: 'login',
                            comopnent: resolve(__dirname, 'pages/login/')
                        }
                    ]
                }
            ])
        }
    }
}