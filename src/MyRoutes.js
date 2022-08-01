import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PostContainer from './components/Posts-Container/PostContainer';
import Welcome from "./components/WelcomeContainer/Welcome";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';


const MyRoutes = function(){
    const authenticated = useSelector((state)=>state.auth.isLoggedIn);
    if(authenticated){
        return(
        <Routes>
        <Route path='/' element={<Fragment>
                                    <Header />
                                    <Welcome />
                                    <PostContainer />
                                    <Footer />
                                  </Fragment>
        } />
        <Route path='/dashboard' element={<Fragment>
                                    <Header />
                                    <Dashboard />
                                    <h1>My Posts</h1>
                                    <Footer />
                                  </Fragment>
        } />
        <Route path='/myposts' element={<Fragment>
                                    <Header />
                                    <h1>Here are all your Posts</h1>
                                    <h1>My Posts</h1>
                                    <Footer />
                                  </Fragment>
        } />
        <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
  }
  else{
    return(
      <Routes>
        <Route path='/' element={<Fragment>
                                    <Header />
                                    <Welcome />
                                    <PostContainer />
                                    <Footer />
                                  </Fragment>
        } />
        <Route path="/login" element={<Fragment>
                                        <Header />
                                        <Login />
                                        <Footer />    
                                    </Fragment>} 
        />
        <Route path="/signup" element={<Fragment>
                                        <Header />
                                        <Signup />
                                        <Footer />    
                                    </Fragment>} 
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
}

export default MyRoutes;