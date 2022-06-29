import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components/header/header";
import {Home} from "./pages/home/home";
import {FullPost} from "./pages/fullPost/fullPost";
import {Login} from "./pages/login/login";
import {Registration} from "./pages/registration/registration";

function App() {
  return (
      <>
        <Header />
        <Container maxWidth="lg">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/posts/:id" element={<FullPost/>}/>
                <Route path="/add-post" element={<div>Add post</div>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
            </Routes>
        </Container>
      </>
  );
}

export default App;