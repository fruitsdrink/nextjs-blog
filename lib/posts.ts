import 'server-only'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

/**
 * 
 * 获取所有的文章
 */
export const getAllPosts = () => {
    const fileNames = fs.readdirSync(postsDir)

    return fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const filePath = path.join(postsDir, fileName)
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      const {content, data} = matter(fileContent)
      
      return {
        slug,
        content,
        ...data,
        title: data.title ?? slug,
        date: data.date ?? new Date(),
      }
    })
}

export const getPostBySlug = (slug: string) => {
  const filePath = path.join(postsDir, `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const {content, data} = matter(fileContent)

  return {
    slug,
    content,
   ...data,
    title: data.title?? slug,
    date: data.date?? new Date(),
  }
}