import React, { useContext, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Grid, Image, Segment, Header, Card, Icon, Button, Label, Comment, Form, Feed} from 'semantic-ui-react';
import UserContext from '../../Components/Contexts/UserContext';
import api from '../../Services/AxiosManager';
import { route } from 'next/dist/next-server/server/router';

//make a dynamic route
const Movie = (props) => {
    const router = useRouter();
    const { pid } = router.query; //dynamic router id, function scope - handle use cases in potentially multiple useEffects
    const {user} = useContext(UserContext);

    const [movieDetails, setMovieDetails] = useState(null); //movieDetails contains the generic movieDetails
    const [actors, setActors] = useState([]); //actors we get from movieDetails - used to query more specific actor details
    const [actorsDetailed, setActorsDetailed] = useState([]); //actorsDetailed is the specific API request to get specific actor data catered to our needs
    const [comment, setComment] = useState();

    const [commentsList, setCommentsList] = useState();
    const [dummy, setDummy] = useState();
  
    //fetch comments
    useEffect(() => {
      if (router.isReady)
        api.post('get-comments', {"movieID": pid}).then().then(resp => { console.log(resp); setCommentsList(resp.data.payload)}).catch(err => console.log(err));
    },[dummy, comment, pid])

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

      const replyMessage = (e) => {
        setComment(e.target.value);
      }

      const sendComment = () =>{
        if (comment !== undefined && comment !== ""){
          api.post("set-comment", {"movieID": pid, "comment": comment }).then().then(resp => {
            setComment('');
            }).catch(err => console.log(err));
        }
      }

      const likeHandler = (commentID) => {
        api.post("like-moviecomment", {"commentID": commentID}).then(resp => resp).then(data => setDummy(data)).catch(err => console.log(err));
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
                  <Icon name = "tag" size = "large"/>
                  Add To Watch List
                </Label>
            </Segment> 
            : null}
          
        
    <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
      
      {/* //Comments Section */}
  {commentsList ? 
      commentsList.map(comment_info => 
    
    <Comment key = {comment_info.key}>
      <Comment.Avatar src={`https://avatars.dicebear.com/api/human/${comment_info.avatar}.svg`} />
      <Comment.Content>
        <Comment.Author as='a'>{comment_info.userPosted}</Comment.Author>
        <Comment.Metadata>
          <div>{comment_info.datePosted}</div>

        <Feed onClick ={() => likeHandler(comment_info.comment_id)}>
          <Feed.Event>
              <Feed.Content>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' color='red'/> {comment_info.up_votes} Likes
                  </Feed.Like>  
                </Feed.Meta>
              </Feed.Content>
          </Feed.Event>
        </Feed>


        </Comment.Metadata>
        <Comment.Text>{comment_info.commentText}</Comment.Text>
      </Comment.Content>
    </Comment>
        
)
    : null }
    <Form reply>
      <Form.TextArea value = {comment} onChange = {replyMessage}/>
      <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick = {sendComment}/>
    </Form>
    </Comment.Group>
    
        
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
