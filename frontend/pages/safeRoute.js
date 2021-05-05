import React, { useEffect, useLayoutEffect } from 'react';
import WithAuth from '../Services/WithAuth';

const safeRoute = () => {    
    return (
        <h1>Protected</h1>
    );
}

export default WithAuth(safeRoute);

//finish from remove watch list feature
//Add reviews, favourites, profiles && friends
//tweet like feature with websockets

//If Time Allows - Messaging friends, 
//Work on websockets, learn pub-sub
//Implement Redis Data Cache
//Think about how RabbitMQ can be used

// CMS for real estate agents - Spring & ReactJS