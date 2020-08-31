<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model='user.bio'></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="New Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="updateUserFn">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click.prevent="logoutFn">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { getUser, updateUserApi } from '@/api/user'
// 仅在客户端加载  js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  // 在路由匹配组件渲染之前 会先执行中间件
  middleware: 'authenticated',
  name: 'SettingsIndex',
  data () {
    return {
      user: {
        image: '',
        username: '',
        bio: '',
        email: ''
      }
    }
  },
  created () {
    this.getUserFn()
  },
  methods: {
    async getUserFn () {
      const { data } = await getUser()
      this.user = data.user
      console.log(data, 'data-----getuser')
    },
    async updateUserFn () {
      try {
        const { data } = await updateUserApi({ user:this.user })
        const { user } = data
        console.log(data, '修改用户信息')
        this.$router.push({name: 'profile', query: {username: user.username}})
      } catch (err) {
        console.log(err)
      }
    },
    logoutFn () {
      Cookie.set('user', '')
    }
  }
}
</script>

<style>

</style>