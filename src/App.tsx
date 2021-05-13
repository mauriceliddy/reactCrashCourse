import React from 'react';
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from "react";
import AddTask from './components/AddTask'

function App() {

  // Create variable to help execute the functionality of having the add task field only show up
  // once you click the 'Add' button
  // This form will now be dependend on that state. SO we would adjust that in <AddTask/> down in the App
  const [showAddTask, setShowAddTask] = useState(false);

  //using state in React
  // Keep the state in here in App so it can be accessed by other components
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors appointment',
      day: 'Feb 4th 2002 @ 4:30',
      reminder: true
    },
    {
      id: 2,
      text: 'Dentists appointment',
      day: 'Feb 22nd 2005 @ 7:15',
      reminder: true
    },
    {
      id: 3,
      text: 'Fixing the car',
      day: 'March 13th 220 @ 9:30am',
      reminder: false
    }
  ]

  )


  const addTask = (task:TaskDefinition) =>{
    console.log('Adding:');
    console.log(task);

    // creat random id number becuase we dont have a database
    const tempId = Math.floor(Math.random() * 1000)+ 1
    
    // Create new task based on task created(passed in) and add id to it
    const newTask = {tempId, ...task};
    //Then call setTasks() to set the new state to add teh new task to it
    setTasks([...tasks,newTask])
  }


  interface TaskDefinition{
    id: number,
 text: string,
 day: string,
 reminder: boolean,
 onDelete(id:number):void
 onToggle(id:number):void
}



  // In order to delete tasks
  // Use setTasks()
  // To 'delete' Filter the tasks according to what is not passed in as the id 
  const deleteTask = (id: number) => {
    console.log('deleting id number...', id);

    setTasks(tasks.filter((task) => task.id !== id))

  }

  //Toggle reminder (Change color and switch from true to false)
  // Reads as: tasks in our state, map through, for reach one call it 'task'
  // Where the task.id from the current iteration is equal to the one passed in..
  // ..then we will take that task (...task), and change the reminder to the opposite.. 
  // .. of what it was (!task.reminder).
  // Otherwise, just leave it as task (keep the same value that was passed in).
  // That means you are clicking on the wrong one.
const toggleReminder = (id:number) =>{
  console.log('Changing the toggle reminder now');
  setTasks(tasks.map((task) => task.id === id ? {...task,reminder:!task.reminder} : task))
}


// -> { showAddTask && <AddTask onAdd = {addTask}/>}
// This line use to just be: <AddTask onAdd = {addTask}/>
// That wuld simply render the <AddTask> Component
// When we enclose in {} we make it a dependned function (kinda)
// The code: 'showAddTask &&' is shorthand for: 'If showAddTask ===true then keep what's after it'
// I.e., <AddTask onAdd = {addTask}/>, so render that


  return (
    <div className='container'>
      <Header title='Task Tracker' onAdd = {() => setShowAddTask(!showAddTask)} 
      showAdd = {showAddTask}/>
      { showAddTask && <AddTask onAdd = {addTask}/>}
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle = {toggleReminder}/>
    </div>

  )



  // //Example of how ot pass in props. Implemented in PropsHeader.tsx
  // return (
  //   <div className = 'container'>
  //       <Header firstName = 'Maurice'  lastName = 'Liddy'/>
  //   </div>
  // )

}

export default App;
