import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        file: null
    });

    const [error, setError] = useState('');

    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleFileChange = event => {
        setNewPost({
            ...newPost,
            file: event.target.files[0]
        });
    };

    const handlePostSubmit = async () => {
        try {
            const { title, content, file } = newPost;

            if (!title || !content) {
                setError('Title and Content are required fields');
                return;
            }

            const postData = { title, content };
            const response = await axios.post('/api/posts', postData);
            console.log('Post created', response.data);
            setNewPost({ title: '', content: '', file: null });
            setError('');
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Error creating post. Please try again.');
        }
    };

    return (
        <div className="create-post">
            <h2>Create a Post</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="text" name="title"
                placeholder="Title" value={newPost.title}
                onChange={handleInputChange} />
            <textarea name="content"
                placeholder="Content" value={newPost.content}
                onChange={handleInputChange}>
            </textarea>
            <input type="file" name="file"
                accept="image/*" onChange={handleFileChange} />
            <button onClick={handlePostSubmit}>
                Post
            </button>
        </div>
    );
}

export default CreatePost;
