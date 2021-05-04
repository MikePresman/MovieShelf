import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react'
import UserContext from '../Contexts/UserContext';



const Explore = () => {
    const [top5, setTop5] = useState([]);
    const {user} = useContext(UserContext);


    //this gets the context data - just as a test, we will extend this to a HOC
    useEffect(() => {
        console.log(user);
    },[])




    //load top 10 books
    useEffect(() => {
        let top5Movies = [];
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=454a5f6a555d21549c86c51fa91f0a1a').then(resp => resp.json()).then(data => {
            console.log(data);
            for (let i = 0; i < 5; i++){
                let movie = data.results[i];
                top5Movies.push({key: movie.id, title: movie.title, image: "https://image.tmdb.org/t/p/original/" + movie.poster_path});
            }
            setTop5(top5Movies);
        });

    }, [])

    return (
        <Container>
            <Grid>
            { top5 ? top5.map(movie =>
                <Grid.Column key = {movie.key} width={3}>
                    <Image src = {movie.image}/>
                    {movie.title}    
                </Grid.Column>
            ) : null} 
            </Grid>
        </Container>
        );
    }


export default Explore;