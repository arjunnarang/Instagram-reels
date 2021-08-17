import React, { useState, useEffect } from 'react';

const UseEffect = () => {

    const[task, setTask] = useState("");
    const[taskList, setTaskList] = useState([]);
    
    const handleAddTask = (e) =>{
        let newTaskList = [...taskList, {id: Date.now(), task: task}];
        setTaskList(newTaskList);
        setTask("");
    }
    
    // useEffect(()=>{
    //     console.log("runs after every render")
    // }); // runs after componentDidMount, componentDidUpdate, componentWillUnmount

    // useEffect(() => {
    //     console.log("runs after first render");
    //     console.log("dependency code");
    // }, []);  // runs after componentDidMount
    
    useEffect(() => {
        console.log("runs after tasklist updation");
        console.log("dependency code");

        return function(){
            console.log("I am a ckeanup function !!!");
        }
    }, [taskList]);

    return ( 
        <div>
            <div className="input">
                <input type="text" value={task} onChange={(e) => {setTask(e.target.value)}}/>
                <button className="input button" onClick={handleAddTask}>Add task</button>
            </div>
            <div className="tasks">
                {taskList.map((taskObj) => {
                    return <div key = {taskObj.id} className="task">
                        {taskObj.task}
                    </div>
                })}
            </div>
        </div>
     );
}
 
export default UseEffect;