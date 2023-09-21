import React, { useEffect, useState } from "react";

const Post = (props) => {
    return (
        <div>
        <p>Username: {props.data.username}</p>
        <p>Welcome {props.data.firstName} {props.lastName}</p>
        <p>{props.data.content}</p>
        </div>
    )
};

export default function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            const response = await fetch(`http://localhost:3000/posts`);

            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const posts = await response.json();
            setPosts(posts);
        }

        getPosts();

        return;
    });

    function postList() {
        return posts.map((post) => {
            return (
                <Post
                data={post}
                />
            )
        })
    }

    return (
        <div>{postList()}</div>
    )
}