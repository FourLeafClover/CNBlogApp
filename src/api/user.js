import officalHttp from '@/utils/$official.http'
import newsHttp from '@/utils/$news.http'

export function addComment (blogapp, postid, content) {
  // {"blogApp":"FourLeafCloverZc","postId":6118617,"body":"mark1","parentCommentId":0}
  return officalHttp({
    method: 'post',
    url: '/mvc/PostComment/Add.aspx',
    data: {
      blogApp: blogapp,
      postid: postid,
      body: content,
      parentCommentId: 0
    }
  })
}

export function voteBlog (blogapp, postid, isDigg) {
  return officalHttp({
    method: 'post',
    url: '/mvc/vote/VoteBlogPost.aspx',
    data: {
      blogApp: blogapp,
      postid: postid,
      voteType: isDigg ? 'Digg' : 'Bury',
      isAbandoned: false
    }
  })
}

export function addNewsComment (content, contentid) {
  return newsHttp({
    url: '/Comment/InsertComment',
    method: 'post',
    data: {
      content: content,
      contentId: contentid,
      parentCommentId: ''
    }
  })
}

export function voteNews (contentId) {
  return newsHttp({
    url: '/News/VoteNews',
    method: 'post',
    data: {
      contentId: contentId,
      action: 'agree'
    }
  })
}
