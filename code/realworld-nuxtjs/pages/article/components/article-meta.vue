<template>
  <div class="article-meta">
    <nuxt-link
        :to = "{
            name: 'profile',
            params: {
                username: article.author.username
            }
        }"
    >
        <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
        <nuxt-link
            class="author"
            :to = "{
                name: 'profile',
                params: {
                    username: article.author.username
                }
            }"
        >
        </nuxt-link>
        <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <!-- 本人文章显示，编辑与删除 -->
    <span v-if="user && user.username === article.author.username">
        <nuxt-link 
            class="btn btn-outline-secondary btn-sm" 
            :to="{
                name: 'editor',
                params: {
                    slug: article.slug
                }
            }"
        >
            <i class="ion-edit"></i> Edit Article
        </nuxt-link>
        <button class="btn btn-outline-danger btn-sm" @click.prevent="delArticleFn(article.slug)">
            <i class="ion-trash-a"></i> Delete Article
        </button>
    </span>
    <!-- 他人文章详情显示，关注或喜欢 -->
    <template v-else>
        <button 
            class="btn btn-sm"
            :class="[article.author.following ? 'btn-secondary' : 'btn-outline-secondary' ]"
            @click="onFollow(article)"
            :disabled="article.followDisabled"
        >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{followTxt.follow}} {{article.author.username}}
        </button>
        &nbsp;&nbsp;
        <button 
            class="btn btn-sm btn-outline-primary"
            :class="{
                active: article.favorited
            }"
            @click="onFavorite(article)"
            :disabled="article.favoriteDisabled"
        >
            <i class="ion-heart"></i>
            &nbsp;
            {{followTxt.favorite}} <span class="counter">({{article.favoritesCount}})</span>
        </button>
    </template>
  </div>
</template>

<script>
import { addFollow, deleteFollow, addFavorite, deleteFavorite, deleteArticleApi } from '@/api/article'
import { mapState } from 'vuex'
export default {
    name: 'articleMeta',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        followTxt () {
            let obj = {}
            obj.follow = this.article.author.following ? 'Unfollow' : 'Follow'
            obj.favorite = this.article.favorited ? 'Unfavorite Article' : 'Favorite Post'
            return obj
        },
        ...mapState(['user'])
    },
    methods: {
        async onFollow (article) {
            if (this.user) {
                article.followDisabled = true
                if (article.author.following) {
                    await deleteFollow(article.author.username)
                    article.author.following = false
                } else {
                    await addFollow(article.author.username)
                    article.author.following = true
                }
                article.followDisabled = false
            } else {
                this.$router.push({name: 'login'})
            }
        },
        async onFavorite (article) {
            if (this.user) {
                article.favoriteDisabled = true
                if (article.favorited) {
                    // 取消点赞
                    await deleteFavorite(article.slug)
                    article.favorited = false
                    article.favoritesCount += -1
                } else {
                    // 添加点赞
                    await addFavorite(article.slug)
                    article.favorited = true
                    article.favoritesCount += 1
                }
                article.favoriteDisabled = false
            } else {
                this.$router.push({name: 'login'})
            }
        },
        async delArticleFn (slug) {
            try {
                const { data } = await deleteArticleApi(slug)
                this.$router.push('/')
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>