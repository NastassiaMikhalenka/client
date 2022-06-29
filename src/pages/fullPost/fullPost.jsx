import React from "react";

import {Post} from "../../components/post/post";
import {useParams} from "react-router-dom";
import axios from "../../api/axios";

export const FullPost = () => {
    const [data, setData] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)
    const {id} = useParams();
    console.log(id)

    React.useEffect(() => {
        axios.get(`/posts/${id}`).then(res => {
            console.log(res.data)
            setData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.warn(err)
            alert('Ошибка')
        })
    }, [])

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }

    return (
        <Post
            _id={data._id}
            title={data.title}
            imageUrl={data.imageUrl}
            user={data.user}
            createdAt={data.createdAt}
            viewsCount={data.viewsCount}
            commentsCount={3}
            tags={data.tags}
            isFullPost
        >
            <p>
                {data.text}
            </p>
        </Post>
    );
};