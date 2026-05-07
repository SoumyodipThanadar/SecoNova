import React, { useState } from 'react';
import axios from 'axios';

function Post ({ post}) {
    const [commentInput, setCommentInput] = useState('');
    
    const handleLike = postId => {
        axios.post(`/api/posts/like/${postId}`)
        .then (response => {

        })
        .catch(error => console.error('Error liking post:', error));

    };

    const handleAddComment = (postId, commentText) => {
        axios.post('/api/podtd/comment/${postId}', {text: commentText})
        .then(response => {

        })
        .catch(
            error => console.error('Error adding comment:', error));
        };
        
        return (
            <div className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {
                    post.file && (
                        <div>
                            <img src={'/uploads/${post.file}'}
                                 alt="Post Media" />
                                 </div>

                    )}
                    <p>Likes: {post.likes}</p>
                    <button
                    onClick={() => handleLike(post._id)}>
                        Like
                    </button>
                    <p>Comments: {post.comments.length}</p>
                    <ul>
                        {
                            post.comments.map((commnet, index) => (
                                <li key = {index}>{comment.text}
                                    </li>
                            ))
                        }
                    </ul>
                    <input type="text" placeholder="Add a comment"
                    className="comment-input"
                    onChangeCapture={(e) => setCommentInput(e.target.value)} />

                    <button
                    onClick={() => handleAddComment(post._id, commentInput)}
                    className="comment-button">
                        Add Comments
                    </button>





                



            </div>
        );

        
    }
export default Post;