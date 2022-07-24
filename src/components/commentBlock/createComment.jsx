import React, {useState} from "react";

import styles from "./createComment.scss";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import axios from "../../api/axios";
import {useDispatch, useSelector} from "react-redux";

export const CreateComment = ({postId}) => {
    const dispatch = useDispatch()
    const [text, setValue] = useState('')
    console.log(postId)
    const isAuth = useSelector(state => state.login.status);

    const postCommit = () => {
        axios.post('/comments', {postId, text}).then(() => {
            console.log('Done');
            setValue('')
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <>
            <div className={styles.root}>
                <div className={styles.form}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        value={text}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        fullWidth
                    />
                    <Button variant="contained" onClick={postCommit}>Отправить</Button>
                </div>
            </div>
        </>
    );
};