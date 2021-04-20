import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Image, Segment, Header, Card } from 'semantic-ui-react';

//make a dynamic route
const Movie = (props) => {
    const router = useRouter()
    const { pid } = router.query

    const [movieDetails, setMovieDetails] = useState(null);
    const [actors, setActors] = useState([]);
    const [actorsDetailed, setActorsDetailed] = useState([]);
    
    useEffect(() => {
      console.log(actorsDetailed);
    }, [actorsDetailed])

    useEffect(() => {
      async function handler() {
        let fetchCast = actors.map(actor => fetch(`https://api.themoviedb.org/3/person/${actor.key}?api_key=454a5f6a555d21549c86c51fa91f0a1a`).then(resp => resp.json()).then(data =>  {
          return {key: data.id, name : data.name, img : "https://image.tmdb.org/t/p/original/" + data.profile_path} }));
        const results = await Promise.all(fetchCast);
        setActorsDetailed(results);
      }

      handler();
    }, [actors]);
    
 
    useEffect(() => {
      //gets movie data
      fetch(`https://api.themoviedb.org/3/movie/${pid}?api_key=454a5f6a555d21549c86c51fa91f0a1a`)
        .then(response => response.json()).then(data => {
          setMovieDetails({key: data.id, title : data.title, poster:data.poster_path, desc: data.overview, time: data.runtime, genres: data.genres, tagline: data.tagline});
        }).catch(err => console.log(err));

        let actors = [];
        fetch(`https://api.themoviedb.org/3/movie/${pid}/credits?api_key=454a5f6a555d21549c86c51fa91f0a1a`).then(resp => resp.json()).then(data => {
          for (let i = 0; i < 6; i++) {
            actors.push({key: data.cast[i]?.id});
          }
          setActors(actors);
        }).catch(err => console.log(err));
      
      }, [pid])

  return (
    <Grid columns={2}>
    
      {/* //Left Column */}
      <Grid.Column width = {11}>
        <Grid centered>
          <Grid.Column width = {11}>
            
            {/* //Title */}
            <Grid.Row>
            {movieDetails ?
              <Header as='h2' color = "teal" style = {{"marginTop" : "10px" }} textAlign='center'>
                  {movieDetails.title}
              </Header> : null}
            </Grid.Row>


            {/* //Description */}
            <Grid.Row>
                {movieDetails ? <h4>{movieDetails.desc}</h4> : null }
            </Grid.Row>


            {/* //Cards */}
            <Grid.Row>
              <Card.Group itemsPerRow={6}>
                {actorsDetailed ?  actorsDetailed.map(actor => <Card image = {actor.img} header = {actor.name} fluid/>) : null }
              </Card.Group>
            </Grid.Row>
          
        
        
          </Grid.Column>
        </Grid>
      </Grid.Column>
      




    {/* //Right Side */}
      <Grid.Column width = {5}>
          {movieDetails ? <Image src = {"https://image.tmdb.org/t/p/original/" + movieDetails.poster} fluid/> : null}
      </Grid.Column>
    
    </Grid>
  );
}

export default Movie;