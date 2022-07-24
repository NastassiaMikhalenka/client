import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import {SideBar} from "../sidebar/sidebar";
import axios from "../../api/axios";

export const CommentsBlock = ({id, children, isLoading = true }) => {
    const [comments, setComments] = React.useState([])

    React.useEffect(() => {
        axios.get(`/comments/post/${id}`).then(res => {
            setComments(res.data)
            // setIsLoading(false)
        }).catch((err) => {
            console.warn(err)
            alert('Ошибка')
        })
    }, [comments])
    return (
        <SideBar title="Комментарии">
            <List>
                {(isLoading ? [...Array(5)] : comments).map((obj, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                {isLoading ? (
                                    <Skeleton variant="circular" width={40} height={40} />
                                ) : (
                                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                                )}
                            </ListItemAvatar>
                            {isLoading ? (
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Skeleton variant="text" height={25} width={120} />
                                    <Skeleton variant="text" height={18} width={230} />
                                </div>
                            ) : (
                                <ListItemText
                                    primary={`${obj.user.fullName}  ${obj.createdAt}` }

                                    secondary={obj.text}
                                />
                            )}
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
            {children}
        </SideBar>
    );
};