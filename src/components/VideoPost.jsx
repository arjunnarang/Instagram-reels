import React, { useState, useEffect, useContext } from 'react';
import {Card, CardHeader, CardActions, CardContent, CardMedia, Button, makeStyles, Typography, TextField, Avatar, Container} from "@material-ui/core";
import { firebaseDB } from '../config/firebase';
import {AuthContext} from '../context/AuthProvider';
import {Favorite, FavoriteBorder, Favoriteborder} from "@material-ui/icons";
const VideoPost = (props) => {
    
    let [user, setUser] = useState(null);
    let [commentList, setCommentList] = useState([]);
    let [comment, setComment] = useState("");
    let {currentUser} = useContext(AuthContext);
    let [likesCount, setLikesCount] = useState(null);
    let [isLiked, setIsLiked] = useState(false);
        useEffect(async () => {
        console.log(props);
        let uid = props.postObj.uid;
        let doc = await firebaseDB.collection("users").doc(uid).get();
        let user = doc.data();  // retrieving data of a user

        let commentList = props.postObj.comments;
        let likes = props.postObj.likes;
        // {uid, comment}, {uid, comment} ...
        let updatedCommentList = [];

        for(let i = 0; i<commentList.length; i++){
            let commentObj = commentList[i];
            let doc = await firebaseDB.collection("users").doc(commentObj.uid).get();
            let commentUserPic = doc.data().profileImageUrl;
            updatedCommentList.push({profilePic: commentUserPic, comment:commentObj.comment});
        }
        setUser(user);
        setCommentList(updatedCommentList);
        
        // if current user liked the post or didnt like the post
        if(likes.includes(currentUser.uid)){
            setLikesCount(likes.length);
            setIsLiked(true);
        }else{
            if(likesCount){
                setLikesCount(likes.length);
            }
        }
    },[]); //comp did mount
    
   
    const handleComment = (e) => {
        setComment(e.target.value);
    }
    const addNewComment = async (e) => {
        let profilePic;
        if(currentUser.uid === props.postObj.uid){
            profilePic = user.profileImageUrl;
        }else{
            let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
            profilePic = doc.data().profileImageUrl;
        }

        let newCommentList = [...commentList, {profilePic: profilePic, comment: comment}];

        let postObj = props.postObj;
        let newComment = {
            uid: currentUser.uid,
            comment: comment,
        }

        postObj.comments.push(newComment);
        await firebaseDB.collection("posts").doc(postObj.pid).set(postObj );
        setCommentList(newCommentList);
        setComment("");
        
    }

    const toggleIconClicked = async () => {
        let postObj = props.postObj;
        // if current post was already liked by the user
        if(isLiked){
            
            // removing current user from likes
            let likes = postObj.likes.filter((id) => {
                if(currentUser.uid == id){
                    return false;
                }
                return true;
            });
            props.postObj.likes = likes;
            await firebaseDB.collection("posts").doc(postObj.pid).set(postObj);
            setIsLiked(false);
            setLikesCount(likesCount==1 ? null : likesCount-1);
        }else{
        // if current post hasnt been liked by the user

            // adding current user in likes
            props.postObj.likes.push(currentUser.uid);
            await firebaseDB.collection("posts").doc(postObj.pid).set(postObj);
            setIsLiked(true);
            setLikesCount(!likesCount ? 1 : likesCount+1);
        }
    }
        return ( 
            <Container>
                <Card style={{height:"600px", width:"300px", marginBottom:"10px"}}>
                    <Avatar src={user ? user.profileImageUrl : ""}></Avatar>
                        <Typography variant="span">{user ? user.username : ""}</Typography>
                        <div className="video-container">
                        <Video src={props.postObj.videoLink}></Video>
                        </div>
                        {isLiked?
                            <Favorite style={{color: "red"}} onClick={() => {toggleIconClicked()}}></Favorite>:
                            <FavoriteBorder onClick={() => {toggleIconClicked()}}></FavoriteBorder>
                        }
                        {likesCount && (
                            <div>
                                <Typography variant="h6">Liked by {likesCount} others</Typography>
                            </div>
                        )}
                        <Typography variant="h6">Comments</Typography>

                        <TextField
                        variant="outlined"
                        label="Add a comment"
                        size="small"
                        onChange = {handleComment}
                        ></TextField>
                        <Button variant="contained" color="secondary" onClick={addNewComment}>
                        Post
                        </Button>
                        {commentList.map((commentObj) => {
                            return (
                            <>
                                <Avatar src={commentObj.profilePic}></Avatar>
                                <Typography variant="h6">{commentObj.comment}</Typography>
                            </>
                            );
                        })}
                </Card>
            </Container>
         );
};
 
function Video(props){
    return (<video  style={{
            height: "80%",
            width:"100%",}}
        muted={true} id={props.id} loop={true} controls >
        <source src={props.src} type="video/mp4"></source>
    </video>)
}
export default VideoPost;