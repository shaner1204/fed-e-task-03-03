<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>
            {{profile.bio}}
          </p>
          <nuxt-link 
            class="btn btn-sm btn-outline-secondary action-btn" 
            :to="{
              name: 'settings'
            }"
          >
            <i class="ion-gear-a"></i> Edit Profile Settings
          </nuxt-link>
          <!-- <button class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{profile.username}}
          </button> -->
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link active"
                :to="{
                  name: 'profile',
                  query: {
                    tab: 'my_articles'
                  }
                }"
              >My Articles
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
              :to="{
                name: 'profile',
                query: {
                  tab: 'favorited_articles'
                }
              }"
              >Favorited Articles
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link
              :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"
            >
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link class="author"
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
                {{article.author.username}}</nuxt-link>
              <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list" v-for="(tag, index) in article.tagList" :key="index">
              <li class="tag-default tag-pill tag-outline">{{tag}}</li>
            </ul>
          </a>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
            <div class="info">
              <a href="" class="author">Albert Pai</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 32
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline">Music</li>
              <li class="tag-default tag-pill tag-outline">Song</li>
            </ul>
          </a>
        </div>


      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import { getArticles } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前 会先执行中间件
  middleware: 'authenticated',
  name: 'ProfileIndex',
  data () {
    return {
      profile: {
        bio: '', // 个人经历
        image: '', 
        username: '',
        following: false
      },
      articles: []
    }
  },
  created () {
    this.getUserProfileFn()
  },
  watchQuery: ['tab'],
  methods: {
    async getUserProfileFn () {
      const { data } = await getUserProfile(this.$route.params.username)
      this.profile = data.profile
      this.articlesListFn()
    },
    async articlesListFn () {
      const articleTab = !this.$route.query.tab ? 'my_articles' : this.$route.query.tab
      console.log(articleTab, 'tab')
      const { data: myArticleData } = articleTab === 'my_articles' ? await getArticles({author: this.profile.username}) : await getArticles({favorited: this.profile.username})
      this.articles = myArticleData.articles
      console.log(this.articles, '我的文章')
    }
  }
}
</script>

<style>

</style>