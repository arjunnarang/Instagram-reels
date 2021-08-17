import React, { useEffect } from 'react';

import video1 from "./video1.mp4";
import video2 from "./video2.mp4";
import video3 from "./video3.mp4";
import video4 from "./video4.mp4";
import'./IntersectionDemo.css';

const IntersectionDemo = () => {

    let conditionObject = {
        root: null,  // observe from whole page
        threshold: "0.8",
    }

    function cb(entries){
        console.log(entries);

        entries.forEach((entry) => {
            let child = entry.target.children[0];

            // play(); => async
            // pause(); => async

            child.play().then(function (){
                if(entry.isIntersecting == false){
                    child.pause();
                }
            });
        });
    }

    useEffect(() => {

        // this code will run when component loads
        let observerObject = new IntersectionObserver(cb, conditionObject);
        let elements = document.querySelectorAll('.video-container');

        // Intersection observer starts observing each video
        elements.forEach((el)=>{
            observerObject.observe(el);
        });
    }, []);
    return ( <div>
        <div className="video-container">
            <Video src={video1} id="a"></Video>
        </div>
        <div className="video-container">
            <Video src={video2} id="b"></Video>
        </div>
        <div className="video-container">
            <Video src={video3} id="c"></Video>
        </div>
        <div className="video-container">
            <Video src={video4} id="d"></Video>
        </div>
       
    </div> );
};

function Video(props){
    return (<video className="video-styles" muted={true} id={props.id} loop={true}>
        <source src={props.src} type="video/mp4"></source>
    </video>);
}
 
export default IntersectionDemo;