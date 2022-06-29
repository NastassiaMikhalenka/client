import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import {SideBar} from "../sidebar/sidebar";

export const TagsBlock = ({ items, isLoading = true }) => {
    return (
        <SideBar title="Тэги">
            <List>
                {(isLoading ? [...Array(5)] : items).map((name, i) => (
                    <a
                        style={{ textDecoration: "none", color: "black" }}
                        href={`/tags/${name}`}
                    >
                        <ListItem key={i} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                {isLoading ? (
                                    <Skeleton width={100} />
                                ) : (
                                    <ListItemText primary={name} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </a>
                ))}
            </List>
        </SideBar>
    );
};