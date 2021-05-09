import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Image, Segment, Label, Header, Icon, Input, Button } from 'semantic-ui-react'
import UserContext from '../Contexts/UserContext';
import api from '../../Services/AxiosManager';


const Explore = () => {
    const [top5, setTop5] = useState([]);
    const {user} = useContext(UserContext);
    const [moviesToWatch, setMoviesToWatch] = useState()
    const [dummy, setDummy] = useState();
    

    async function getMoviesData(moviesData){
     let moviesToWatch = moviesData.moviesToWatchList.map(movie_id => 
             fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=454a5f6a555d21549c86c51fa91f0a1a`)
             .then(resp => resp.json())
             .then(data => {return {key: data.id, name : data.title, img : "https://image.tmdb.org/t/p/original/" + data.poster_path}}));

     const results = await Promise.all(moviesToWatch);
     setMoviesToWatch(results);
    }



    useEffect(() => {
        api.post("/get-to-watch").then(resp => resp).then(respData =>getMoviesData(respData.data)).catch(err => console.log(err));
    },[dummy])


    //load top 10 books
    useEffect(() => {
        let top5Movies = [];
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=454a5f6a555d21549c86c51fa91f0a1a').then(resp => resp.json()).then(data => {
            for (let i = 0; i < 5; i++){
                let movie = data.results[i];
                top5Movies.push({key: movie.id, title: movie.title, image: "https://image.tmdb.org/t/p/original/" + movie.poster_path});
            }
            setTop5(top5Movies);
        });

    }, [])

    const remove = (movieID) => {
        const formData = {movieID: movieID}
        console.log(formData);
        api.post("/remove-to-watch", formData).then().then(data => setDummy(data)).catch(err => console.log(err));
    }

    return (
        <>
        <Container>
            <Grid>
            { top5 ? top5.map(movie =>
                <Grid.Column key = {movie.key} width={3}>
                    <Image src = {movie.image}/>
                    {movie.title}    
                </Grid.Column>
            ) : null} 
            </Grid>

        {user ? 
            <Segment>
                <Grid>
                    <Grid.Row centered>
                        <Header>
                            My Watch List
                        </Header>
                    </Grid.Row>
                    <Grid.Row centered>
                    {moviesToWatch ? moviesToWatch.map(movie =>
                        <Grid.Column key = {movie.key} width={3}>
                            {/* add a checkmark for removed and handle it onclick to remove from db */}
                            <Icon link style={{"fontSize": "18px"}} name = "checkmark" color="teal" size = "large" onClick={() => remove(movie.key)}>Remove</Icon>
                            <Image src = {movie.img} size = "small" />

                            
                                {movie.name}    
                        </Grid.Column>
                    ): null} 
                    </Grid.Row>
                </Grid>


        </Segment> : null} 
        </Container>

        </>

        );
    }


export default Explore;