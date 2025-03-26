import {useRoutes,useNavigate} from 'react-router-dom'
import { useAuth } from './authContext';
import { useEffect } from 'react';
import Login from './layout/Login';
import Landing from './layout/Landing';
import Signup from './layout/Signup';
import Home from './layout/Home';
import Layout from './layout/Layout';
import CreateTip from './layout/Create-tips';
import Profile from './layout/Profile';
import UserProfile from './layout/UserProfile';
import ExclusiveTipsPage from './layout/ExclusiveTIps';
import Success from './layout/Success';
import Cancel from './layout/Cancel';

const ProjectRouter=()=>{
    const navigate=useNavigate();
    const {currentUser,setCurrentUser}=useAuth();
    useEffect(()=>{
        const userIdStorage=localStorage.getItem("userId");
        if(userIdStorage && !currentUser){
            setCurrentUser(userIdStorage);
        } 
        if(!userIdStorage && !["/login","/signup","/"].includes(window.location.pathname)){
            navigate('/login');
        }
        if(userIdStorage && window.location.pathname=='/login'){
            navigate('/home');
        }
    },[currentUser,navigate,setCurrentUser])
    let router=useRoutes([
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/",
            element:<Landing/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/",
            element:<Layout/>,
            children:[
                {path:"/home",element:<Home/>},
                { path: "/create-tip", element: <CreateTip/> },
                { path: "/profile", element: <Profile/> },
                { path: "/user/:username", element: <UserProfile/> },
                {path:"/profile/:userId",element:<UserProfile/>},
                {path: "/exclusive", element: <ExclusiveTipsPage />},
                { path: "/payment/success", element: <Success /> },
                { path: "/payment/cancel", element: <Cancel /> },
            ],

        },

    ])
    return router;
};
export default ProjectRouter