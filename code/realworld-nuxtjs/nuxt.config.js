/**
 * Nuxt.js 配置文件
 */
module.exports = {
    router: {
        linkActiveClass: 'active',
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
                            component: resolve(__dirname, 'pages/home/')
                        },
                        {
                            path: '/login', // 默认子路由
                            name: 'login',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile/')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings/')
                        },
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor/')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/')
                        }
                    ]
                }
            ])
        }
    },

    // 运行服务环境
    // server: {
    //     host: '0.0.0.0', // localhost 只能是运行在本机访问；对外提供访问需设置成 0.0.0.0,这样就会监听所有的网卡地址，然后通过外网地址也就可以访问到（即生产环境服务器）；如果在本地的话，就是局域网大家都可访问
    //     port: 3000 // 服务端端口号
    // },

    // 注册插件
    plugins: [
        // 路径模块： ~ 开头，相当于从根目录出发
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}