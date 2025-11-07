import React from 'react'
import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([]) 
  const [showfinished, setshowfinished] = useState(true)
  useEffect(() => {
  let todostring=localStorage.getItem("todos")
    if(todostring){
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
    
  }, [])
  const togglefinished=()=>{
    setshowfinished(!showfinished)
  }
  const savetolocalstorage=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const handleedit=(e,id)=>{
let t=todos.filter(i=>i.id===id)
settodo(t[0].todo)
let newtodos=todos.filter(item=>{
  return item.id!==id
})
settodos(newtodos)
  savetolocalstorage()

}
  const handledelete=(e,id)=>{
// let id=e.target.name
let newtodos=todos.filter(item=>{
  return item.id!==id
})
settodos(newtodos)
  savetolocalstorage()

  }
  const handleadd=()=>{
settodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
  settodo("")
    savetolocalstorage()

  }
const handlechange=(e)=>{
  settodo(e.target.value)
}
const handlecheckbox=(e) => { 
  let id=e.target.name
  let index=todos.findIndex(item=>{
    return item.id===id
  })
  let newtodos=[...todos]
  newtodos[index].isCompleted=!newtodos[index].isCompleted
  settodos(newtodos)
    savetolocalstorage()
}
  return (
    <>
    <Navbar/>
    <div className="md:container mx-3 bg-violet-100 rounded-xl p-5 my-5 md:mx-auto min-h-[80vh] md:w-1/2">
    <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
     <div className="addtodo my-5 flex flex-col gap-4">
      <h2 className='text-lg font-bold'>Add a Todo</h2>
      <input onChange={handlechange} className='bg-white w-full rounded-full px-5 py-2' type="text" value={todo} />
      <button onClick={handleadd}  disabled={todo.length<2} className='bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold rounded-md p-2 py-1 '>Save</button>
     </div>
     <input className='my-4' onChange={togglefinished} type="checkbox" checked={showfinished} name="" id="" /> Show Finished
      <h2 className='text-lg font-bold'>Your Todos</h2>
      <div className="todos">
        {todos.length==0 && <div className='m-5' >No Todos</div>}
        {todos.map((item)=>{
        return(showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-full my-3">
          <div className='flex gap-5'>
          <input onChange={handlecheckbox}  type="checkbox" checked={item.isCompleted} name={item.id} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons flex h-full">
         <button onClick={(e)=>{handleedit(e,item.id)}}  className='bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold rounded-md p-2 py-1 mx-1 ' ><FaRegEdit />
</button>
         <button onClick={(e)=>{handledelete(e,item.id)}}  className='bg-violet-800 hover:bg-violet-950 text-white text-sm font-bold rounded-md p-2 py-1 mx-1' ><MdDelete />
</button>
         </div>
        </div>
        })}
      </div>
     </div>
     
    </>
  )
}

export default App
