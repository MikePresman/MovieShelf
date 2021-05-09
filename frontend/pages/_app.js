import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css';
import Navigator from '../Components/Nav/Navigator';
import UserContext from '../Components/Contexts/UserContext';
import { useEffect, useState } from 'react';
import { localStorageService } from '../Services/AxiosManager';
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);
  const [message, setMessage] = useState();
  const router = useRouter();
  
  //every time page is refreshed we check. Might need to make this check more secure
  //security-wise it's fine, but could show inconsistent data if client tampers with localStorage
  useEffect(() => {
    if (localStorage.getItem("username")){
      setUser({username: localStorage.getItem("username"), user_id: localStorage.getItem("user_id")})
    }  
  }, [])
  
  //initial signIn on login.js call
  const signIn = (username, id) => {
    setUser( {username : username, user_id: id} )
  }
  
  //needs to be called on signout for HOC withAuth
  const signOut = () => {
    localStorageService.clearToken();
    localStorageService.removeUserDetails();
    setUser(undefined); 
    router.push('/');
  }
  

  //Implement this logic into /login which will populate a message saying you must login in order to access this page
  const warningMessage = (msg) => {
    setMessage(msg);
  }


  return (
    <>
    <UserContext.Provider value = {{user:user, message: message, signIn: signIn, signOut: signOut, warningMessage: warningMessage}}>
        <Navigator/>
        <Component {...pageProps} />
    </UserContext.Provider>
  </>
  );
}

export default MyApp
