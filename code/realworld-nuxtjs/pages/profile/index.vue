<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.name}}</h4>
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
              <nuxt-link 
                class="nav-link"
                :class="{
                  active: tab === 'my_articles'
                }"
                exact
                :to="{
                  name: 'profile',
                  query: {
                    tab: 'my_articles'
                  }
                }">My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
                class="nav-link"
                :class="{
                  active: tab === 'favorited_articles'
                }"
                exact
                :to="{
                  name: 'profile',
                  query: {
                    tab: 'favorited_articles'
                  }
                }">Favorited Articles</nuxt-link>
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
          <nuxt-link class="preview-link"
            :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }"
          >
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list" v-for="(tag, index) in article.tagList" :key="index">
              <li class="tag-default tag-pill tag-outline">{{tag}}</li>
            </ul>
          </nuxt-link>
        </div>
        <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li 
                class="page-item"
                :class="{
                  active : item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link 
                  class="page-link" 
                  :to="{
                    name: 'profile',
                    query: {
                      page: item,
                      tab: tab
                    }
                  }"
                >{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
        <!-- 分页列表 -->

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
  async asyncData (context) {
    console.log(context.query)
    const page = Number.parseInt(context.query.page || 1)
    const limit = 2
    const tab = context.query.tab || 'my_articles'
    const { data } = await getUserProfile(context.route.params.username)
    const { profile } = data
    const atriclesData = tab === 'favorited_articles' ? 
      await getArticles({
        favorited: profile.username, 
        limit,
        offset: (page - 1) * 2
      }) : await getArticles({
        author: profile.username,
        limit,
        offset: (page - 1) * 2
      })
    const { articles, articlesCount } = atriclesData.data
    return {
      tab: tab,
      profile: data.profile,
      articles,
      articlesCount,
      limit,
      page
    }
  },
  watchQuery: ['tab', 'page'],
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
}
</script>

<style>

</style>