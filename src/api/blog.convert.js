
let getText = function (obj) {
  return (obj && obj._text) ? obj._text : ''
}

let getBlogApp = function (item) {
  let blogApp = getText(item.blogapp)
  if (blogApp.length === 0) {
    let link = item.link._attr.href._value
    if (link) {
      blogApp = link.split('/p/')[0].replace('http://www.cnblogs.com/', '')
    }
  }
  return blogApp
}

export function getHomePageConvert (data) {
  let entry = data.feed.entry
  let result = []
  entry.map(item => {
    try {
      let convertItem = {
        id: getText(item.id),
        author: {
          name: getText(item.author.name),
          avatar: getText(item.author.avatar),
          uri: getText(item.author.uri),
          blogapp: getBlogApp(item)
        },
        blogapp: getBlogApp(item),
        summary: getText(item.summary),
        views: getText(item.views),
        title: getText(item.title),
        published: getText(item.published),
        comments: getText(item.comments),
        link: item.link._attr.href._value,
        diggs: getText(item.diggs) ? getText(item.diggs) : 0
      }
      result.push(convertItem)
    } catch (error) {
    }
  })
  return result
}

export function getCommentConvert (data) {
  let entry = data.feed.entry
  if (entry) {
    if (!Array.isArray(entry)) {
      entry = [entry]
    }
    return entry.map(item => {
      return {
        id: getText(item.id),
        author: {
          name: getText(item.author.name),
          avatar: getText(item.author.uri)
        },
        content: getText(item.content),
        published: getText(item.published),
        updated: getText(item.updated)
      }
    })
  } else {
    return null
  }
}

export function bloggerConvert (data) {
  const entry = data.feed.entry
  if (entry) {
    if (Array.isArray(entry)) {
      return entry.map(item => {
        return {
          blogapp: getText(item.blogapp),
          postcount: getText(item.postcount),
          avatar: getText(item.avatar),
          name: getText(item.title),
          updated: getText(item.updated)
        }
      })
    } else {
      return [
        {
          blogapp: getText(entry.blogapp),
          postcount: getText(entry.postcount),
          avatar: getText(entry.avatar),
          name: getText(entry.title),
          updated: getText(entry.updated)
        }
      ]
    }
  } else {
    return null
  }
}
