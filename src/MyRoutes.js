import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PostContainer from './components/Posts-Container/PostContainer';
import Welcome from "./components/WelcomeContainer/Welcome";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Myposts from './components/Myposts/Myposts';
import Createpost from './components/CreatePost/Createpost';
import PostContent from './components/PostContent/PostContent';
import { LoadingSliceActions, ErrorSliceActions, AllpostsActions } from './store';
import EditPost from './components/EditPost/EditPost';
import { useLocation } from 'react-router-dom';


const MyRoutes = function(){
    const authenticated = useSelector((state)=>state.auth.isLoggedIn);  
    const error = useSelector((state)=>state.error.error);
    const isLoading = useSelector((state)=>state.loading.loading);
    const dispatch = useDispatch();
    let AllPostsArray = useSelector((state)=>state.allposts.AllPostsArray);
    const location = useLocation();
    useEffect(()=>{
      const fetchPosts = async() => {
        dispatch(LoadingSliceActions.setLoading({value : true}));
        const response = await fetch('https://my-space-mern.herokuapp.com/posts');
          if(!response.ok){
            throw new Error("Error in fetching Posts!! Please try Again.");
          }
        const responseData = await response.json();
        const tempArray = responseData?.usersPost.map((post)=>post);
        dispatch(AllpostsActions.setAllPosts({ value : tempArray}));
        dispatch(LoadingSliceActions.setLoading({value : false}));
      }

      try{
        fetchPosts();
      }
      catch(err){
          dispatch(LoadingSliceActions.setLoading({value : false}));
          dispatch(ErrorSliceActions.setError({value : err.message}));
      }

    },[dispatch]);


    if(authenticated){
        return(
        <Routes>
        <Route path='/' element={<Fragment>
                                    <Header />
                                    <Welcome />
                                    <PostContainer isLoading={isLoading} error={error} AllPostsArray={AllPostsArray} />
                                    <Footer />
                                  </Fragment>
        } />
        <Route path='/dashboard' element={<Fragment>
                                    <Header /> 
                                    <Dashboard />
                                    <Myposts AllPostsArray={AllPostsArray} />
                                    <Footer />
                                  </Fragment>
        } />
        <Route path='/myposts' element={<Fragment>
                                    <Header />
                                    <Myposts AllPostsArray={AllPostsArray} />
                                    <Footer />
                                  </Fragment>
        } />
        <Route path='/createPost' element={<Fragment>
                                    <Header />
                                    <Createpost />
                                    <Footer />
                                  </Fragment>
        } />
        <Route path='/post/:postId' element={<Fragment>
                                    <Header />
                                    <PostContent AllPostsArray={AllPostsArray} />
                                    <Footer />
                                  </Fragment>
        } />
        <Route path='/edit/:postId' element={<Fragment>
                                    <Header />
                                    <EditPost data={location.state}/>
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
                                    <PostContainer isLoading={isLoading} error={error} AllPostsArray={AllPostsArray} />
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
        <Route path='/post/:postId' element={<Fragment>
                                    <Header />
                                    <PostContent AllPostsArray={AllPostsArray} />
                                    <Footer />
                                  </Fragment>
        } />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
}

export default MyRoutes;