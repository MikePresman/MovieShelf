import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useRouter } from 'next/router';
import UserContext from '../Components/Contexts/UserContext';
import api from '../Services/AxiosManager';



const WithAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [allowed, setAllowed] = useState(false);
        const {warningMessage} = useContext(UserContext);
        
        useEffect(() => {
                api.post("/auth-check")
                .then(resp => resp.data)
                .then(_ => setAllowed(true))
                .catch(err => {
                    console.log(err);
                    warningMessage("Login Required To Access The Page");
                    router.push("/login");
                });
            
        }, [])

        return (
            <>
            {!allowed ? <h1>Loading</h1> : <WrappedComponent {...props}/>}    
            </>
        )
        
        
        
        
    }
  
}

export default WithAuth;