import React, { useState, useEffect } from 'react';

const Posts = () => {
  const API_URL = 'http://localhost:3500/posts';

  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  return (
    <div className='postsContainer'>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className={`post ${expandedPostId === post.id ? 'expanded' : ''}`}>
          <div className='postHeader' onClick={() => handlePostClick(post.id)}>
            <h3>#{post.id}</h3>
            <div className='postTitle'>{post.title}</div>
          </div>
          {expandedPostId === post.id && (
            <div className='postBody'>
              <span>{post.body}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;