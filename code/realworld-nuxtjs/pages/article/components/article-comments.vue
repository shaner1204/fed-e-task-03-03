<template>
  <div>
      <form class="card comment-form">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentTxt"></textarea>
        </div>
        <div class="card-footer">
          <img :src="article.author.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary"
            @click.prevent.stop="addComment(article)"
          >
            Post Comment
          </button>
        </div>
      </form>
        
        <div class="card"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
          </div>
          <div class="card-footer">
            <nuxt-link class="comment-author"
              :to="{
                name: 'profile',
                params: {
                  username: comment.author.username
                }
              }"
            >
              <img :src="comment.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <nuxt-link class="comment-author"
              :to="{
                name: 'profile',
                params: {
                  username: comment.author.username
                }
              }"
            >
              {{comment.author.username}}
            </nuxt-link>
            <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
            <span class="mod-options">
              <!-- <i class="ion-edit"></i> -->
              <i class="ion-trash-a" 
                v-if="user && user.username === comment.author.username" 
                @click="delCommentFn(article, comment.id)"
              ></i>
            </span>
          </div>
        </div>

  </div>
</template>

<script>
import { getArticleComments, addArticleComments, deleteComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
    name: 'ArticleComments',
    data () {
      return {
        comments: [], // 评论列表
        commentTxt: '' // 评论内容
      }
    },
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState(['user'])
    },
    created () {
      this.commnetList()
    },
    methods: {
      async commnetList () {
        const { data } = await getArticleComments(this.article.slug)
        this.comments = data.comments
      },
      async addComment (article) {
        if (this.user) {
          try {
            const { data } = await addArticleComments(article, {
              comment: {
                body: this.commentTxt
              }
            })
            this.commentTxt = ''
            this.commnetList()
          } catch (err) {
            console.log(err.response.data.errors)
          }
        } else {
          this.$router.push({name: 'login'})
        }
      },
      async delCommentFn (article, id) {
        try {
          const { data } = await deleteComment(article.slug, id)
          this.commnetList()
        } catch (err) {
          console.log(err.response.data.errors)
        }
      }
    }
}
</script>

<style>

</style>