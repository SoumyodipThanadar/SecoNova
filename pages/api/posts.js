// // pages/api/posts.js
// export default function handler(req, res) {
//     if (req.method === 'GET') {
//         res.status(200).json([
//             {
//                 _id: '1',
//                 title: 'First Post',
//                 content: 'This is a test post',
//                 file: null,
//                 likes: 0,
//                 comments: []
//             },
//             {
//                 _id: '2',
//                 title: 'Second Post',
//                 content: 'Another test post',
//                 file: null,
//                 likes: 5,
//                 comments: [{ text: 'Nice post!' }]
//             }
//         ]);
//     } else if (req.method === 'PUT') {
//         const { id, action, text } = req.body;
//         if (action === 'like') {
//             res.status(200).json({
//                 _id: id,
//                 title: 'First Post',
//                 content: 'This is a test post',
//                 file: null,
//                 likes: 1,
//                 comments: []
//             });
//         } else if (action === 'comment') {
//             res.status(200).json({
//                 _id: id,
//                 title: 'First Post',
//                 content: 'This is a test post',
//                 file: null,
//                 likes: 0,
//                 comments: [{ text }]
//             });
//         }
//     } else if (req.method === 'POST') {
//         res.status(201).json({ message: 'Created' });
//     } else {
//         res.status(405).end();
//     }
// }


import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!mongoose.connections[0].readyState) {
    mongoose.connect(MONGODB_URI);
}

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    file: String,
    likes: { type: Number, default: 0 },
    comments: [{ text: String }]
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch posts' });
        }
    } else if (req.method === 'POST') {
        try {
            const { title, content, file } = req.body;
            if (!title || !content) {
                return res.status(400).json({ error: 'Title and content are required' });
            }
            const post = new Post({ title, content, file });
            await post.save();
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create post' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, action, text } = req.body;
            let updatedPost;
            if (action === 'like') {
                updatedPost = await Post.findByIdAndUpdate(
                    id,
                    { $inc: { likes: 1 } },
                    { new: true }
                );
            } else if (action === 'comment') {
                updatedPost = await Post.findByIdAndUpdate(
                    id,
                    { $push: { comments: { text } } },
                    { new: true }
                );
            }
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update post' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            await Post.findByIdAndDelete(id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete the post you requested, Sorry!' });
        }
    } else {
        res.status(405).end();
    }
}
