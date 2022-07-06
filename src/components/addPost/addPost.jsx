import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './addPost.module.scss';
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import Stack from "@mui/material/Stack";
import axios from "../../api/axios";
import {TextareaAutosize} from "@mui/material";

export const AddPost = () => {
    // const imageUrl = '';
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.login.status);
    const [isLoading, setLoading] = React.useState(false);
    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const inputFileRef = React.useRef(null)

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (err) {
            console.warn(err);
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);


    const onSubmit = async () => {
        try {
            setLoading(true);
            const fields = {
                title,
                text,
                tags,
                imageUrl,
            };

            const {data} = await axios.post('/posts', fields);

            const id = data._id;
            navigate(`/posts/${id}`);
        } catch (err) {
            console.warn(err);
        }
    }

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/"/>
    }
    return (
        <Stack style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
                Загрузить превью
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                    <img className={styles.image} src={`http://localhost:5555/${imageUrl}`} alt="Uploaded"/>
                </>
            )}

            <br/>
            <br/>
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Заголовок статьи..."
                fullWidth
            />
            <TextField
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                classes={{root: styles.tags}} variant="standard" placeholder="Тэги" fullWidth/>

            <TextareaAutosize
                value={text}
                onChange={(e) => setText(e.target.value)}
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Текст статьи..."
                fullWidth
            />


            {/*<SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options}/>*/}
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    Опубликовать
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Stack>
    );
};