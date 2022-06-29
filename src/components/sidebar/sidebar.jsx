import React from "react";
import styles from "./sidebar.module.scss";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const SideBar = ({title, children}) => {
    return (
        <Stack classes={{root: styles.root}}>
            <Typography variant="h6" classes={{root: styles.title}}>
                {title}
            </Typography>
            {children}
        </Stack>
    );
};