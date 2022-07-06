import React from "react";

import {Post} from "../../components/post/post";
import {useParams} from "react-router-dom";
import axios from "../../api/axios";
import {CommentsBlock} from "../../components/commentBlock/commentBlock";
import {CreateComment} from "../../components/commentBlock/createComment";
import {useSelector} from "react-redux";
import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
    const [data, setData] = React.useState()
    const [comments, setComments] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const {id} = useParams();
    const isAuth = useSelector(state => state.login.status);
    console.log(id)

    React.useEffect(() => {
        axios.get(`/posts/${id}`).then(res => {
            setData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.warn(err)
            alert('Ошибка')
        })
        axios.get(`/comments/post/${id}`).then(res => {
            setComments(res.data)
            // setIsLoading(false)
        }).catch((err) => {
            console.warn(err)
            alert('Ошибка')
        })
    }, [])
    console.log(comments)

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }

    return (
        <>
            <Post
                _id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `http://localhost:5555/${data.imageUrl}` : ''}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={comments.length}
                tags={data.tags}
                isFullPost>
            <ReactMarkdown children={data.text}  />
            </Post>
            <CommentsBlock
                items={comments}
                isLoading={isLoading}
            >
                <CreateComment postId={id}/>
            </CommentsBlock>

        </>
    );
};