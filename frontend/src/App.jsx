import React from 'react'
import Task from './components/Task'
import "./index.css"
import { useState,useEffect,useReducer } from 'react'
import NewTask from './components/NewTask'



const App = () => {

    const [todos,setTodos] = useState([])
   
    
    useEffect(() => {
       
        fetch("http://localhost:3001/api/v1/todo/",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then((res)=>setTodos(res))
    
      
    }, [todos])
    



  return (
    <div className='App'>
        <div className="middleSlider">
            <h1 className='tasks-h1'>Tasks</h1>
            <NewTask />
            {todos.map((e)=>
            <Task {...e}/>
            )}
        </div>
    </div>
  )
}

export default App