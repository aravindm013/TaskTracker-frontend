import { useState, useEffect } from "react"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import axios from "axios"

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3055/api/tasks')
      .then((response) => {
        const result = response.data
        setTasks(result)
      })
      .catch((err) => {
        alert(err.message)
      })
  }, [] )
  
  const addTask = async (text, day, reminder) => {
    const newTask = {
      text: text,
      day: day,
      reminder: reminder
    }
    try {
      await axios.post('http://localhost:3055/api/tasks', newTask)
      const response = await axios.get('http://localhost:3055/api/tasks')
      const result = response.data
      setTasks(result)
    } catch(err){
      alert(err.message)
    }
  }
  
  const deleteTask = async (id) => {
    try {
      console.log("id",id)
      const delResponse = await axios.delete(`http://localhost:3055/api/tasks/${id}`)
      console.log(delResponse)
      const response = await axios.get('http://localhost:3055/api/tasks')
      const result = response.data
      setTasks(result)
    } catch(err){
      console.log(err)
      alert(err.message)
    }
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder : !task.reminder} : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} />
      { showAddTask && <AddTask onAdd={addTask} /> }
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleReminder} />
        ) : (
        'No tasks to show'
      )}
    </div>
  )
}

export default App 
