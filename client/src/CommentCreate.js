import React, { useState } from 'react';
import axios from 'axios';

export default function CommentCreate({ postId }){
    const [content, setContent] = useState('');

    const onSubmit = async(event) => {
        event.preventDefault();

        await axios.post(`http://${process.env.REACT_APP_COMMENTS_CONTAINER_URL}:4001/posts/${postId}/comments`, {
            content: content
        });

        setContent('');
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
                <div className="form-group" style={{ display: "flex" }}>
                    <label>New Comment</label>
                    <input 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        className='form-control'
                    />
                    <button className='btn btn-primary'>Submit</button>
                </div>          
            </form>
        </div>
    )
}