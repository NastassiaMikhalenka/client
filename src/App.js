import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components/header/header";
import {Home} from "./pages/home/home";
import {FullPost} from "./pages/fullPost/fullPost";
import {Login} from "./pages/login/login";
import {Registration} from "./pages/registration/registration";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {meTC} from "./store/auth/authReducer";
import {AddPost} from "./components/addPost/addPost";

function App() {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.login.status);
    useEffect(() => {
        dispatch(meTC())
    }, [])
    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/posts/:id" element={<FullPost/>}/>
                    <Route path="/add-post" element={<AddPost/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;