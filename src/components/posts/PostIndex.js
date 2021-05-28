import React from 'react'
import { getAllPosts } from '../../lib/api'
import Error from '../common/Error'
import PostCard from './PostCard'

function PostIndex({ popup, input }) {
  const [posts, setPosts] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !posts && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllPosts()
        setPosts(res.data.reverse())
      } catch (error) {
        setIsError(true)
      }
    }
    getData()
  }, [popup, input])

  const handleUpdatePosts = (updatedPost) => {
    console.log(updatedPost)
    const updatedPosts = posts.map((post) => {
      if (updatedPost._id !== post._id) {
        return post
      }
      return updatedPost

    })
    console.log(updatedPosts)
    setPosts(updatedPosts)
  }

  const filterPosts = () => {
    return (
      posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(input) || post.text.toLowerCase().includes(input) || post.user.username.toLowerCase().includes(input)
        )
      })
    )
  }

  console.log('index')
  return (
    <section className='section'>
      <div className='container'>
        <div className='columns is-multiline'>
          {isError && <Error />}
          {isLoading && <p className="subtitle has-text-centered is-fullwidth">...Loading</p>}
          {posts &&
            filterPosts().map((post) => (
              <PostCard
                key={post._id}
                title={post.title}
                image={post.image}
                text={post.text}
                userId={post.user._id}
                comments={post.comments}
                likedByArray={post.userlikes}
                postId={post._id}
                handleUpdatePosts={handleUpdatePosts}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default PostIndex