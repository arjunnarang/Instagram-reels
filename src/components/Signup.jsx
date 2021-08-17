import React, { useState, useContext } from 'react';
import { firebaseDB, firebaseStorage } from '../config/firebase';
import { AuthContext } from '../context/AuthProvider';
import Card from '@material-ui/core/card'
import { Button, CardContent, CardMedia, makeStyles, TextField, Typography } from '@material-ui/core';
import logo from '../download.png';
import {Link} from "react-router-dom";
const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState("");

    const {signUp} = useContext(AuthContext);

    const handleFileSubmit = (e)=>{
        let fileObject = e.target.files[0];
        setProfileImage(fileObject);
    };

    const handleSignUp = async() =>{
        try {
            let response = await signUp(email, password);
            let uid = response.user.uid;

            // you are signed up
            const uploadPhotoObject = firebaseStorage.ref(`/profilePhotos/${uid}/image.jpg`).put(profileImage);
            uploadPhotoObject.on("state_changed", fun1, fun2, fun3);

            //to track the progress of the upload
            function fun1(snapshot){
                // bytes transferred
                // total bytes
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                
            }

            function fun2(error){
                console.log(error);
            }

            // it indicates success of the upload!!

            async function fun3() {
                let profileImageUrl = await uploadPhotoObject.snapshot.ref.getDownloadURL();
                // db contains collection => document => {username, email, profileImageURL};
                firebaseDB.collection("users").doc(uid).set({
                    email: email,
                    userId: uid,
                    username: username,
                    profileImageUrl: profileImageUrl,
                    postsCreated:[],
                });
                props.history.push("/");
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const useStyles = makeStyles({
        root: {
            maxWidth: 345, 
        },
        media: {
            height: 140,
        },
        centerElements: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        },
        mb: {
            marginBottom: "1rem"
        },
        ml:{
            marginLeft: "2rem"
        },
    });
    const classes = useStyles();
    return (
        <div  className={classes.centerElements} >
            <Card variant="outlined"  style={{marginTop:"7rem"}} className={classes.root}>
                <CardMedia image={logo} style={{height: "5rem", backgroundSize: "contain"}}>
                </CardMedia>
                <CardContent className={classes.centerElements}>
                        <TextField label="username"  type="text" variant="outlined" size="small" className={classes.mb} value={username} onChange={(e) => setUsername(e.target.value)}>
                        </TextField>
                        <TextField label="email" type="email" variant="outlined" size="small" className={classes.mb} value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                        <TextField label="password" type="password" variant="outlined" size="small" className={classes.mb} value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                        <Button variant="contained" label="upload">
                            <input type="file" accept="image/*" onChange={(e) => handleFileSubmit(e)}/>
                        </Button>
                </CardContent>
                <Button variant="contained" color="primary" className={classes.ml} onClick={handleSignUp}>Signup</Button>
            </Card>
            <Card variant="outlined" style={{marginTop:"1rem"}}>
                <CardContent>
                    <Typography>
                        Have an account?
                        <Button variant="contained" color="primary"style={{marginLeft:"1rem"}}>
                        <Link style={{color:"white"}} to="/login">
                            Log in
                        </Link>
                        </Button>
                    </Typography>
                </CardContent>
            </Card>
        </div>
 );
};
 
export default Signup;