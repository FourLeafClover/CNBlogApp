// export const WCF_API = process.env.NODE_ENV === 'deveploment' ? '' : ''
// export const OFFICAL_API = process.env.NODE_ENV === 'deveploment' ? '' : ''
export const ENV = 'prod' // process.env.NODE_ENV
export const WCF_API = ENV === 'development' ? '' : 'http://wcf.open.cnblogs.com'
export const OFFICAL_API = ENV === 'development' ? '' : 'https://www.cnblogs.com'
export const NEWS_API = ENV === 'development' ? '' : 'https://news.cnblogs.com'
export const Version = '2018.08.18'
