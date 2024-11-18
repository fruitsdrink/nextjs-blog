/**
 * 博客配置
 */
export const siteConfig = {
  name: 'fruitsdrinkBlog',
  url: 'http://localhost:3000',
  description: "Nextjs 15 blog use velite, tailwind and shadcn",
  _author: 'fruitsdrink',
  get author() {
    return this._author;
  },
  set author(value) {
    this._author = value;
  },
  links: {
    github: '',
    twitter: '',
    personalSite: ''
  }
}

export type SiteConfig = typeof siteConfig