import './App.css';
import MyRoutes from './MyRoutes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from './store';


let logoutTimer;

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state)=>state.auth.token);
  const tokenExpirationDate = useSelector((state)=>state.auth.tokenExpirationDate);
 
  useEffect(()=>{
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(()=>{
        dispatch(AuthActions.logout());
      }, remainingTime);
      
    }
    else{
      clearTimeout(logoutTimer);
    }
  },[token, dispatch, tokenExpirationDate]);

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && new Date(storedData.expiration) > new Date()){
      dispatch(AuthActions.login({userId : storedData.userId, token : storedData.token, author : storedData.author, expiration : new Date(storedData.expiration),  }));
    }
  },[dispatch]);

  

  return (
    <div className="app">
      <MyRoutes />
    </div>
  );
}

export default App;
