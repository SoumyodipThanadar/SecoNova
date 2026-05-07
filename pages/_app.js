//GET - Fenching in the Home Page
//POST - Creating a new post
//PUT - Updating a post
//DELETE - Deleting a post

import '../style/globals.css';
import React from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return (
        <div className="app">
            <nav>
                <ul>
                    <li>
                        <button onClick={() => router.push('/')}>Home</button>
                    </li>
                    <li>
                        <button onClick={() => router.push('/create')}>Create Post</button>
                    </li>
                    <li>
                        <button onClick={() => router.push('/create')}>Complain</button>
                    </li>
                </ul>
            </nav>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;

