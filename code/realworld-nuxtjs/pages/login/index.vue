<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ? 'Sing in' : 'Sign up'}}</h1>
        <p class="text-xs-center">
          <!-- <a href="">Have an account?</a> -->
          <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(messages, filed) in errors">
            <li
              v-for="(message, index) in messages"
              :key="index"
            >{{ filed }} {{ message }}</li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input v-model="user.username"
            class="form-control form-control-lg" 
            type="text" placeholder="Your Name" required>
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email"
            class="form-control form-control-lg" 
            type="email" placeholder="Email" required>
          </fieldset>
          <fieldset class="form-group">
            <input  v-model="user.password"
            class="form-control form-control-lg" 
            type="password" placeholder="Password" required
            minlength="8">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sing in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import {login, register} from '@/api/user'
// 仅在客户端加载  js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  // 在路由匹配组件渲染之前 会先执行中间件
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  data () {
    return  {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {} // 错误信息
    }
  },
  computed: {
    isLogin () {
      console.log(this.$route, '$route')
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin ?  await login({
          user: this.user
        }) : await register({
          user: this.user
        })
        // console.log(data)
        // 保存用户的登录状态
        this.$store.commit('setUser', data.user) 

        // 为了防止刷新 页面数据 丢失,我们需要把数据 持久化
        Cookie.set('user', data.user)

        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        // console.log('请求失败', err)
        console.dir(err)
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>