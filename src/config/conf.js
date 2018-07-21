// export const WCF_API = process.env.NODE_ENV === 'deveploment' ? '' : ''
// export const OFFICAL_API = process.env.NODE_ENV === 'deveploment' ? '' : ''
const env = process.env.NODE_ENV
export const WCF_API = env === 'development' ? '' : 'http://wcf.open.cnblogs.com'
export const OFFICAL_API = env === 'development' ? '' : 'https://www.cnblogs.com'
export const NEWS_API = env === 'development' ? '' : 'https://news.cnblogs.com'
