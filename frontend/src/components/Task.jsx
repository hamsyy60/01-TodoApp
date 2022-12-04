import React from 'react'
import { useState } from 'react'

const PopUp = (props) => {
    return (
        <div className="popup">
            <i className="closepopup" onClick={props.collapseFunc}>
                &#10006;
            </i>
            <div className={"bigscreenpopup s" + props.status}>
                <div className='titlebar'>
                    <h1>{props.d.title}</h1>
                    <span>{props.d.createdAt}</span>
                </div>
                <div className='buttons'>
                    <button onClick={()=>props.changeStatus(1)}className='s1'>Pending!</button>
                    <button onClick={()=>props.changeStatus(2)}className='s2'>Doing...</button>
                    <button onClick={()=>props.changeStatus(3)}className='s3'>Done!</button>
                </div>
                <p>{props.d.content}</p>
            </div>
        </div>
    )
}


const Task = (props) => {







    const [collapsed, toggleCollapse] = useState("collapsed")
    const [status,setStatus] = useState(props.status)
    function collapseFunc() {
        if (collapsed === "expanded") toggleCollapse("collapsed")
        else toggleCollapse("expanded")
    }

    function changeStatus(newS){

        console.log("changed status to "+newS)
        fetch("192.168.0.144:3001/api/v1/todo/changestatus/",{
            method: 'POST',
            body:JSON.stringify({
                "id": props.id,
                "status":newS
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setStatus(newS)
        
    }

    return (
        <>
            <div className={"s" + status + " Task "} onClick={() => collapseFunc()}>
                <span className='title'>{props.title}</span>



                <span onClick={(e)=>{e.stopPropagation(); changeStatus(1)}} className="circle s1"></span>
                <span onClick={(e)=>{e.stopPropagation(); changeStatus(2)}} className="circle s2"></span>
                <span onClick={(e)=>{e.stopPropagation(); changeStatus(3)}} className="circle s3"></span>
            </div>
            {collapsed === "collapsed" ? <></> : <PopUp d={props} status={status} collapseFunc={collapseFunc} changeStatus ={changeStatus}/>}
        </>
    )
}

export default Task