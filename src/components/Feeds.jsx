import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import {Button} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { firebaseDB, firebaseStorage, timeStamp } from "../config/firebase";
import { uuid } from 'uuidv4';
import VideoPost from './VideoPost';

const Feeds = (props) => {

    let {signOut} = useContext(AuthContext);
    const [videoFile, setVideoFile] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [posts, setAllPosts] = useState([]);
    const [uploadVideoError, setUploadVideoError] = useState("");

    const handleLogout = async() =>{
        try {
            await signOut();
            props.history.push("/login");
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleInputFile = (e)=> {
        let file = e.target.files[0];
        setVideoFile(file);
    };
    const handleUploadFile = async (e)=> {
        try {

            // if(videoFile.size / 1000000 > 5){
            //     setUploadVideoError("Selected file exceeds 5MB!!!");
            //     return;
            // }
            // upload video file in firebase storage
            let uid = currentUser.uid;
            const uploadVideoObject = firebaseStorage.ref(`/profilePhotos/${uid}/${Date.now()}.mp4`).put(videoFile);

            uploadVideoObject.on("state_changed", fun1, fun2, fun3);

            function fun1(snapshot) {
                // bytes transferred
                // totoal bytes
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
              }
              // if indicates a error !!
              function fun2(error) {
                console.log(error);
              }
              // it indicates success of the upload !!

              async function fun3(){
                  let videoUrl = await uploadVideoObject.snapshot.ref.getDownloadURL();

                  let pid = uuid(); // unique id

                  await firebaseDB.collection("posts").doc(pid).set({
                      pid:pid,
                      uid:uid,
                      comments:[],
                      likes:[],
                      videoLink: videoUrl,
                      createdAt: timeStamp(),
                  });

                  //get the document of user
                  let doc = await firebaseDB.collection("users").doc(uid).get();
                  let document = doc.data();
                  document.postsCreated.push(pid);
                  await firebaseDB.collection("users").doc(uid).set(document);
                  setUploadVideoError("");
              }
        } catch (error) {
            
        }
    }
    
    // intersection observer work
    let conditionObject = {
        root: null,
        threshold:0.8,
    }

    function cb(entries){
        entries.forEach((entry) =>{
            let child = entry.target.children[0];

            child.play().then(function() {
                if(entry.isIntersecting == false){
                    child.pause();
                }
            })
        })
    }

    //useEffect for intersection observer
    useEffect(()=>{
        let observerObject = new IntersectionObserver(cb, conditionObject);

        let elements = document.querySelectorAll(".video-container");
        elements.forEach((el)=>{
            observerObject.observe(el);
        })
    }, [posts]);


    useEffect(()=>{
        // retrieve a collection
        // onSnapShot means whenever a new post gets uploaded, the callback function
        // in onSnapshot would run and will retieve all uploaded posts and add the current
        // post, that just got uploaded, in the firebase and the UI
        firebaseDB.collection("posts").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
            let posts = snapshot.docs.map((doc) =>{
                return doc.data();
            });
            setAllPosts(posts);
        });
    },[]);


    return ( <div>
        <button onClick={handleLogout}>Logout</button>
        <div className="uploadVideo">
            <div>
                <input type="file" onChange={handleInputFile} />
                <label>
                    <Button onClick={handleUploadFile}
                    variant="contained"
                    color="secondary"
                    startIcon={<PhotoCamera></PhotoCamera>}>Upload</Button>
                </label>
            </div>
            <p>{uploadVideoError}</p>
        </div>
        <div className="feeds-video-list" style={{margin: "auto"}}>
            {posts.map((postObj) => {
                return <VideoPost key={postObj.pid} postObj={postObj}></VideoPost>
            })}
        </div>
    </div> );
};
 
export default Feeds;