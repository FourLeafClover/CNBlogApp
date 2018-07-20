let getText = function (obj) {
  return (obj && obj._text) ? obj._text : ''
}

export function newsItemConvert (data) {
  let entry = data.feed.entry
  if (entry) {
    return entry.map(item => {
      return {
        id: getText(item.id),
        sourceName: getText(item.sourceName),
        summary: getText(item.summary),
        title: getText(item.title),
        updated: getText(item.updated),
        views: getText(item.views),
        published: getText(item.published),
        diggs: getText(item.diggs),
        comments: getText(item.comments)
      }
    })
  } else {
    return []
  }
}

export function newsCommentConvert (data) {
  let entry = data.feed.entry
  if (entry) {
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
    return []
  }
}
