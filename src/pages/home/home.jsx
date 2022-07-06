import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/post/post';
import { TagsBlock } from '../../components/tagsBlock/tagsBlock';
import {useDispatch, useSelector} from "react-redux";
import {fetchPostTC, fetchTagsTC} from "../../store/posts/postsReducer";

export const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.login.data);
    const posts = useSelector(state => state.posts.posts);
    const tags = useSelector(state => state.posts.tags);
    const isPostsLoading = useSelector(state => state.posts.isPostsLoading);
    const isTagsLoading = useSelector(state => state.posts.isTagsLoading);
    console.log(userData)

    React.useEffect(() => {
        dispatch(fetchPostTC())
        dispatch(fetchTagsTC())
    }, []);


    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="Новые" />
                <Tab label="Популярные" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(!isPostsLoading ? [...Array(5)] : posts).map((item, index) =>
                        !isPostsLoading ? (
                            <Post key={index}  isLoading={true}/>
                        ): (
                        <Post
                            _id={item._id}
                            title={item.title}
                            imageUrl={item.imageUrl ? `http://localhost:5555/${item.imageUrl}`: ''} // todo env на все ссылки при деплои не забыть поменять!!!!
                            user={item.user}
                            createdAt={item.createdAt}
                            viewsCount={item.viewsCount}
                            commentsCount={3}
                            tags={item.tags}
                            isLoading={false}
                            isEditable={userData ?._id === item.user._id}
                        />
                    ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags} isLoading={!isTagsLoading} />
                </Grid>
            </Grid>
        </>
    );
};