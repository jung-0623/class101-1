import {Route, Routes} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import MyInfoPage from './components/pages/MyInfoPage';
import LoginPage from "./components/pages/LoginPage";
import WritePostPage from "./components/pages/WritePostPage";
import PostDetailPage from "./components/pages/PostDetailPage";
import NavigationBar from "./components/NavigationBar";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/myInfo" element={<MyInfoPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/writePost" element={<WritePostPage/>}/>
                <Route path="/post" element={<PostDetailPage/>}/>
            </Routes>
            <NavigationBar />
        </div>
    )
}

export default App
