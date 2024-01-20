import React, { useState } from "react";
import axios from 'axios';

export default function PostCreate(){
    const [title, setTitle] = useState('');

    const onSubmit = async(event) => {
        event.preventDefault();

        await axios.post(`http://${process.env.REACT_APP_POSTS_CONTAINER_URL}:4000/posts`, { // create a post to post bus
            title: title
        });

        setTitle('');
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group" style={{ display: "flex" }}>
                    <label>Title</label>
                    <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                      <button className="btn btn-primary">Submit</button>
                </div>           
            </form>
        </div>
    )
}