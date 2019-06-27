const ssbRef = require('ssb-ref')

const about = require('./models/about')
const post = require('./models/post')
const authorView = require('./views/author')

module.exports = async function (ctx) {
  const feedId = ctx.params.id

  if (ssbRef.isFeed(feedId) === false) {
    throw new Error(`not a feed: ${ctx.params.id}`)
  }

  const description = await about.description(feedId)
  const name = await about.name(feedId)
  const image = await about.image(feedId)

  const msgs = await post.fromFeed(feedId)

  const avatarUrl = `http://localhost:8989/blobs/get/${image}`

  ctx.body = authorView({
    msgs,
    name,
    description,
    avatarUrl
  })
}