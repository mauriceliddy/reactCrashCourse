import React from 'react';
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect } from "react";
import AddTask from './components/AddTask'

function App() {

  // Create variable to help execute the functionality of having the add task field only show up
  // once you click the 'Add' button
  // This form will now be dependend on that state. SO we would adjust that in <AddTask/> down in the App
  const [showAddTask, setShowAddTask] = useState(false);

  //using state in React
  // Keep the state in here in App so it can be accessed by other components

  // The useState([] as any) line is in there to combat the issue of having no predefined state
  // Typescript did not like that. ALso needed to fix that was adding a 'task:any' instead of task in a few places below
  const [tasks, setTasks] = useState([] as any)


  // Take in values from fake api. useEffect (imported above). Must be something thats called on load of page?
  // Inside useEffect. Decalre async function getTasks(), which calls fetchTasks()
  // which makes the api call and returns thge json data.
  // Then using that returned data, call setTasks to set the state.
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  // the empty array(dependendcy array) is at the bottom in case of if you have any dependencies. We dont here though
  // If you wanted the data to change


  // Take fetchTasks out of  UseEffect and put it here, in case we need to use it elsewhere
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    console.log(data)
    return data;
  }

  // POST Method
  // fetch(uri) + specify method type + header type()json
  // + body (what we are sending). In this case the task
  // wrapped as Json data by using JSON.stringify()
  const addTask = async (task: TaskDefinition) => {
    console.log('Adding:');
    console.log(task);

    const res = await fetch('http://localhost:5000/tasks',
      {
         method:'POST',
         headers:{
           'Content-type':'application/json'
         },
         body: JSON.stringify(task) 
      }
    );

    // Save that new object that just got sent to the database
   //const data = res.json;
    //Call setTasks() to change the local state immediately
    // Will update the GUI without having to make an extra
    // GET call to the DB
    setTasks([...tasks,task]);
    window.location.reload();

    /* Old code for when we were hard coding everything
    // create random id number becuase we dont have a database
    const tempId = Math.floor(Math.random() * 1000)+ 1
    
    // Create new task based on task created(passed in) and add id to it
    const newTask = {tempId, ...task};
   
    //Then call setTasks() to set the new state to add teh new task to it
    setTasks([...tasks,newTask])
    */
  }


  interface TaskDefinition {
    id: number,
    text: string,
    day: string,
    reminder: boolean,
    onDelete(id: number): void
    onToggle(id: number): void
  }



  // In order to delete tasks
  // Use setTasks()
  // To 'delete' Filter the tasks according to what is not passed in as the id 
  // Function changes to async as it returns a promise
  const deleteTask = async (id: number) => {
    console.log('deleting id number...', id);

    //Make async call and delete
    // Dont have to save into a variable as we are not getting any data back.
    // Note teh backticks
    // fetch() takes 2 arguments: 1: The URI, the second is an object where we specify the REST method
    await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'DELETE'
      })

    // show only the tasks that are not the id passed in (removes from the UI) 
    setTasks(tasks.filter((task: any) => task.id !== id))

  }

  //Toggle reminder (Change color and switch from true to false)
  // Reads as: tasks in our state, map through, for reach one call it 'task'
  // Where the task.id from the current iteration is equal to the one passed in..
  // ..then we will take that task (...task), and change the reminder to the opposite.. 
  // .. of what it was (!task.reminder).
  // Otherwise, just leave it as task (keep the same value that was passed in).
  // That means you are clicking on the wrong one.
  const toggleReminder = (id: number) => {
    console.log('Changing the toggle reminder now');
    setTasks(tasks.map((task: any) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }


  // -> { showAddTask && <AddTask onAdd = {addTask}/>}
  // This line use to just be: <AddTask onAdd = {addTask}/>
  // That wuld simply render the <AddTask> Component
  // When we enclose in {} we make it a dependned function (kinda)
  // The code: 'showAddTask &&' is shorthand for: 'If showAddTask ===true then keep what's after it'
  // I.e., <AddTask onAdd = {addTask}/>, so render that


  return (
    <div className='container'>
      <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No tasks to show')}
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
