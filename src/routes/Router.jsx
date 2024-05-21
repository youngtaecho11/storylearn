import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import Login from '../pages/Login.jsx';
import Error from '../pages/Error.jsx';
import Header from '../layout/Header.jsx';
import styled from 'styled-components';
import Signup from '../pages/Signup.jsx';
import Solving from "../pages/Solving.jsx";
import Quiz from "../pages/Quiz.jsx";

const Router = () => {
    return (
        <RouterContainer>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/" element={sessionStorage ? <Home /> : <Navigate replace to="/login" />} />
                    <Route path="/solving" element={<Solving />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </RouterContainer>
    );
};

export default Router;

const RouterContainer = styled.div`
  width: 100%;
`;
