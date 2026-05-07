import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        axios
            .get('/api/posts')
            .then((response) => setPosts(response.data))
            .catch((error) => console.error(
                'Error fetching posts:', error));
    }, []);

    const handleLike = async (id) => {
        try {
            const response = await axios.put('/api/posts', {
                id, action: 'like'
            });
            setPosts(posts.map(
                (post) => (post._id === id ? response.data : post)));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleComment = async (id, text) => {
        try {
            const response = await axios.put('/api/posts', {
                id, action: 'comment', text
            });
            setPosts(posts.map(
                (post) => (post._id === id ? response.data : post)));
            setCommentText(''); 
        } catch (error) {
            console.error('Error commenting on post:', error);
        }
    };


     const handleDelete = async (id) => {
        try {
            await axios.delete('/api/posts', { data: {id}});
            setPosts(posts.filter((post) => post._id !== id));
        }
        catch (error){
            console.error('Error deleting post:', error);
        }
    };
    



    const convertImageToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="home">
            <h2>Recent Posts</h2>
            {posts.map((post) => (
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {post.file && (
                        <div>
                            <img src={post.file} alt="Post" />
                        </div>
                    )}
                    <p>Likes: {post.likes}</p>
                    <button onClick={() => handleLike(post._id)}>
                        Like
                    </button>
                    <button
                        onClick={() => handleDelete(post._id)}
                        style={{color: 'yellow', backgroundColor: 'red', marginLeft: '10px'}}>
                            Delete
                        </button>
                    <p>Comments: {post.comments.length}</p>
                    <ul>
                        {post.comments.map((comment, index) => (
                            <li key={index}>{comment.text}</li>
                        ))}
                    </ul>
                    <div>
                        <input type="text" placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)} />
                        <button
                            onClick={() => handleComment(post._id, commentText)}>
                            Comment
                        </button>

                        

                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;