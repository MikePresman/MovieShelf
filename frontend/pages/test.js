import React, { useEffect } from 'react';
import api from '../Services/AxiosManager';


const test = () => {


    useEffect(() => {
        api.post('http://localhost:5000/getkey').then(resp => console.log(resp));
    },[])

    return (
        <h1>Hello</h1>
    );
}

export default test;