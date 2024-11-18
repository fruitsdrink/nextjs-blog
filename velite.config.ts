import {defineConfig, defineCollection, s} from 'velite'


// 从slug中获取slugAsParams，用作路由参数
const computedFields = <T extends {slug: string}>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/")
})

// 定义博客文章集合
const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    slug: s.path(),
    title: s.string().max(99),
    desc: s.string().max(999).optional(),
    date: s.isodate(),
    published: s.boolean().default(true),
    body: s.mdx()
  }).transform(computedFields)
})

export default defineConfig({
  root: 'content', // content目录为根目录
  output: {
    data: '.velite', // 生成的静态数据存储在.velite目录下
    assets: 'public/static', // 生成的静态资源存储在public/static目录下
    base:'/static/', // 静态资源的base路径
    name: '[name]-[hash:6].[ext]', // 生成的静态资源文件名
    clean: true // 生成静态资源时，是否清除之前的静态资源
  },
  collections: {posts},
  mdx: {
    rehypePlugins: [],
    remarkPlugins: []
  }
})