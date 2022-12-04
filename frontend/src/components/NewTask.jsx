import React, { useState } from 'react'




const NewTaskPopup = (props) => {
  const [content, setContent] = useState("")
  const d = new Date()


  function createTodo() {
    let z = d.getDate()

    if(z<10) z = "0"+z
    const dateString = z+"."+(d.getMonth()+1)+"."+d.getFullYear()
    fetch("http://192.168.0.144:3001/api/v1/todo/", {
      method: 'POST',
      body: JSON.stringify({
        "title":props.title,
        "status": 1,
        "content":content,
        "createdAt":dateString
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(props.cp())

    

  }




  return (
    <div className="popup">
      <i className="closepopup" onClick={props.cp}>
        &#10006;
      </i>
      <div className={"bigscreenpopup "}>
        <div className="titlebar">
          <h1 >{props.title}</h1>

        </div>
        <textarea className='ta' placeholder='Content' value={content} onChange={(e) =>{ setContent(e.target.value)}}>+</textarea>
        <button className='cb' onClick={()=>createTodo()}>Create</button>
      </div>
    </div>
  )
}



const NewTask = () => {
  const [p, toggleP] = useState(false)
  function collapseFunc() {
    toggleP(!p)
  }
  return (
    <>
      <div className='Task newtask'>
        <input type="text" id='ip' placeholder='Enter the Title!' />
        <button onClick={() => toggleP(!p)} >+</button>

      </div>
      {p === false ? <></> : <NewTaskPopup cp={collapseFunc} title={document.getElementById("ip")?.value} />}
    </>
  )
}

export default NewTask