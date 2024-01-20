import React, { useState } from "react";
import axios from 'axios';

export default function CommentList({ postId, comments }){
    const [content, setContent] = useState('');

    const renderComments = comments.map((comment) => {
        const deleteComment = async (commentId) => {
            try{
                await axios.delete(`http://${process.env.REACT_APP_COMMENTS_CONTAINER_URL}:4001/posts/${postId}/comments`, {
                    data: {
                        id: commentId
                    }
                });
                console.log("Deleted a comment successfully");     
                window.location.reload(); 
            } catch(err){
                console.log(err);
            }
        }

        const updateComment = async (event, commentId) => {
            if(event){
                event.preventDefault();
            }
            try{
                await axios.put(`http://${process.env.REACT_APP_COMMENTS_CONTAINER_URL}:4001/posts/${postId}/comments`, {
                    id: commentId,
                    content: content
                });
                console.log("Updated a comment successfully");      
            } catch(err){
                console.log(err);
            }
            window.location.reload();
        }

        return (
            <div key={`comment-${comment.id}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <li style={{ marginRight: "10px", marginLeft: "20px" }}>{comment.content}</li>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginLeft: "10px" }}>
                        <label style={{ marginRight: "10px" }}>Edit</label>
                        <input 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)}
                            className='form-control'
                            style={{ flex: 1 }}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <button onClick={() => deleteComment(comment.id)}>Delete</button>
                    <form onSubmit={(e) => updateComment(e, comment.id)} style={{ marginLeft: "10px" }}>
                        <button className='btn btn-primary' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
            
    });

    return <ul>{renderComments}</ul>
}


