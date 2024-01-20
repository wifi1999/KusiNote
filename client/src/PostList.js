import React, { useEffect, useState } from "react";
import axios from 'axios';
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

export default function PostList() {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        try {
            const res = await axios.get(`http://${process.env.REACT_APP_QUERY_CONTAINER_URL}:4002/posts`); // get from query, with empty comment
            console.log(res.data);
            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPosts = Object.values(posts).map((post) => {
        const deletePost = async(postId) => {
            try{
                await axios.delete(`http://${process.env.REACT_APP_POSTS_CONTAINER_URL}:4000/posts/${postId}`);
                console.log("Delete a post successfully");
                window.location.reload();
            } catch(err){
                console.log(err);
            }
        }
        return (
            <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
                <div className="card-body">
                    <div style={{ display: "flex", alignItems: "center" }} className="title-btn">
                        <h3>{post.title}</h3>
                        <button onClick={() => deletePost(post.id)} style={{ height: "30px" }}>Delete</button>
                    </div>
                    <CommentList postId={post.id} commentId={post.comment.id} comments={post.comment} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    });

    return (
        <div>
            {renderPosts}
        </div>
    )
}
