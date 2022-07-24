import React from "react";

import {Post} from "../../components/post/post";
import {useParams} from "react-router-dom";
import axios from "../../api/axios";
import {CommentsBlock} from "../../components/commentBlock/commentBlock";
import {CreateComment} from "../../components/commentBlock/createComment";
import {useDispatch, useSelector} from "react-redux";
import ReactMarkdown from 'react-markdown'
import {fetchPostOneTC} from "../../store/posts/postsReducer";

export const FullPost = () => {
    const dispatch = useDispatch()
    const [postOne, setData] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)
    const {id} = useParams();
    // const isLoading = useSelector(state => state.posts.isPostsLoading);
    // const postOne = useSelector(state => state.posts.postOne);
    console.log(postOne)

    React.useEffect(() => {
        // dispatch(fetchPostOneTC(id))
        axios.get(`/posts/${id}`).then(res => {
            setData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.warn(err)
            alert('Ошибка')
        })
        // axios.get(`/comments/post/${id}`).then(res => {
        //     setComments(res.data)
        //     // setIsLoading(false)
        // }).catch((err) => {
        //     console.warn(err)
        //     alert('Ошибка')
        // })
    }, [])

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }

    return (
        <>
            <Post
                _id={postOne._id}
                title={postOne.title}
                imageUrl={postOne.imageUrl ? `http://localhost:5555/${postOne.imageUrl}` : ''}
                user={postOne.user}
                createdAt={postOne.createdAt}
                viewsCount={postOne.viewsCount}
                // commentsCount={comments.length}
                tags={postOne.tags}
                isFullPost>
            <ReactMarkdown children={postOne.text}  />
            </Post>
            <CommentsBlock
                id={id}
                isLoading={isLoading}
            >
                <CreateComment postId={id}/>
            </CommentsBlock>

        </>
    );
};