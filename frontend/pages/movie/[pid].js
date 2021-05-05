import React, { useContext, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Grid, Image, Segment, Header, Card, Icon, Button, Label} from 'semantic-ui-react';
import UserContext from '../../Components/Contexts/UserContext';
import api from '../../Services/AxiosManager';

//make a dynamic route
const Movie = (props) => {
    const router = useRouter();
    const { pid } = router.query; //dynamic router id, function scope - handle use cases in potentially multiple useEffects
    const {user} = useContext(UserContext);

    const [movieDetails, setMovieDetails] = useState(null); //movieDetails contains the generic movieDetails
    const [actors, setActors] = useState([]); //actors we get from movieDetails - used to query more specific actor details
    const [actorsDetailed, setActorsDetailed] = useState([]); //actorsDetailed is the specific API request to get specific actor data catered to our needs
    
   
   
    //fetch API to get actorsDetailed data - using Promise.all to wait for each actor to be queryed so we populate all before sending it off to the view
    useEffect(() => {
      async function handler() {
        let fetchCast = actors.map(actor => fetch(`https://api.themoviedb.org/3/person/${actor.key}?api_key=454a5f6a555d21549c86c51fa91f0a1a`).then(resp => resp.json()).then(data =>  {
          return {key: data.id, name : data.name, img : "https://image.tmdb.org/t/p/original/" + data.profile_path} 
        }));

        const results = await Promise.all(fetchCast);
        setActorsDetailed(results);
      }
      handler();
    }, [actors]);
    
    //fetch movieDetails from API and setup 'actors' data which will later be used to populate actorsDetailed
    useEffect(() => {
      if(router.isReady){
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
      }
    }, [pid])


      const addToWatchList = (e) => {
        api.post("/add-to-watch", {movieID: pid}).then(resp => resp).then(data => console.log(data)).catch(err => console.log(err));
      }




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
            <Segment>
            <Grid.Row>
                {movieDetails ? <h4>{movieDetails.desc}</h4> : null }
            </Grid.Row>
            </Segment>


            {/* //Cards */}
            <Segment>
            <Grid.Row>
              <Card.Group itemsPerRow={6}>
                {actorsDetailed ?  actorsDetailed.map(actor => 
                <Card key = {actor.key} fluid image = {actor.img} header = {actor.name} color = "blue" style={{"fontSize": "10px"}}/>
                
            
                ) : null }
              </Card.Group>
            </Grid.Row>
            </Segment>


            {user ? 
              <Segment>      
                <Label color = "blue" as = 'a' onClick={addToWatchList}>
                  <Icon name = "star" size = "large"/>
                  Add To Watch List
                </Label>
            </Segment> 
            : null}
          
        
        
          </Grid.Column>
        </Grid>
      </Grid.Column>
      




    {/* //Right Column - Movie Poster */}
      <Grid.Column width = {5}>
          {movieDetails ? <Image src = {"https://image.tmdb.org/t/p/original/" + movieDetails.poster} fluid/> : null}
      </Grid.Column>
    
    </Grid>
  );
}

export default Movie;
