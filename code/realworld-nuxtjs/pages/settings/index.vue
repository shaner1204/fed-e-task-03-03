<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <template v-if="user.username">
          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image" :disabled="inputDisabled">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" :disabled="inputDisabled">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model='user.bio' :disabled="inputDisabled"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email" :disabled="inputDisabled">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="New Password" v-model="user.password" :disabled="inputDisabled">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="updateUserFn" :disabled="inputDisabled">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click.prevent="logoutFn">
            Or click here to logout.
          </button>
        </template>
        
        <div class="loading-page" v-else>
          loading……
        </div>
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
        email: '',
        password: ''
      },
      inputDisabled: false
    }
  },
  created () {
    this.getUserFn()
  },
  methods: {
    async getUserFn () {
      const { data } = await getUser()
      this.user = data.user
    },
    async updateUserFn () {
      try {
        this.inputDisabled = true
        const { data } = await updateUserApi({ user:this.user })
        // const { user: userData } = data
        // console.log(userData, '修改用户信息')
        this.inputDisabled = false
        this.$router.push({name: 'profile', params: {username: this.user.username}})
      } catch (err) {
        console.log(err)
      }
    },
    logoutFn () {
      this.$store.commit('setUser', '') 
      Cookie.remove('user')
      this.$router.push('/')
    }
  },
  head () {
    return {
      title: 'Realworld-NuxtJs'
    }
  }
}
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-family: sans-serif;
  }
</style>