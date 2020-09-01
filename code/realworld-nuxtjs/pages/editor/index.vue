<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <ul class="error-messages">
          <template v-for="(messages, filed) in errors">
            <li
              v-for="(message, index) in messages"
              :key="index"
            >{{ filed }} {{ message }}</li>
          </template>
        </ul>
        <form @submit.prevent="publishArticle">
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title" required :disabled="inputDisabled">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description" required :disabled="inputDisabled">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body" required :disabled="inputDisabled"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tags" :disabled="inputDisabled"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" :disabled="inputDisabled">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { publishArticleApi, getArticle, updateArticleApi } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前 会先执行中间件
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
      tags: '',
      article: {
        title: '', // 文章标题
        description: '',
        body: '',
      },
      errors: {}, // 错误信息
      inputDisabled: false
    }
  },
  computed: {
    isUpdate () {
      return this.$route.params.slug ? this.$route.params.slug : ''
    }
  },
  created () {
    if (this.isUpdate) {
      this.getArticleFn()
    }
  },
  methods: {
    async publishArticle () {
      try {
        this.inputDisabled = true
        const tagList = this.tags.split(' ')
        this.article.tagList = tagList
        console.log(this.article, 'article')
        const { data } = this.isUpdate !== '' ? await updateArticleApi(this.$route.params.slug, this.article) : await publishArticleApi({ article: this.article })
        if (data.article.author) {
          this.inputDisabled = false
          this.$router.push('/')
        }
      } catch (err) {
        console.log(err)
        this.errors = err.response.data.errors
      }
    },
    async getArticleFn () {
      const { data } = await getArticle(this.$route.params.slug)
      this.article = data.article
      this.tags = data.article.tagList.join(' ')
    }
  }
}
</script>

<style>

</style>