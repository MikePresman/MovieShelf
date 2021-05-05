import React, { useEffect, useLayoutEffect } from 'react';
import WithAuth from '../Services/WithAuth';

const safeRoute = () => {    
    return (
        <h1>Protected</h1>
    );
}

export default WithAuth(safeRoute);

//Add reviews, favourites, recommended movies,
//profiles
//tweet like feature with websockets


//Work on websockets, learn pub-sub
//Implement Redis Data Cache
//Think about how RabbitMQ can be used