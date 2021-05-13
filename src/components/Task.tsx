import {FaTimes} from 'react-icons/fa'

const Task = (props:TaskDefinition) => {

     // In here we have the logic for:
    // Displaying text -> {props.text}
    // Styling the 'x' icons
    // Assigning an event listener (onClick) for when we click the 'x'
    // Its a fucking mess but whats happening is: instead of calling onClick directly like: onClick = {props.onDelete}
    // we call a fucntion that calls onDelete and then we pass in the Id (This is to move the ID to deleteTask())
    
    // In addition to that there's the claseName. We want to change the className dynamically
    // To display the green border .That reads as:
    // Using backticks: In a template literal ${}, if props.reminder is true then sub with the 
    // text 'reminder', else add a blank string: ''  
    return(
        <div className = {`task ${props.reminder ? 'reminder' : ''}`} onDoubleClick = {() => props.onToggle(props.id)}>
            <h3> {props.text} <FaTimes style = {{color: 'red', cursor: 'pointer'}} onClick = {() => props.onDelete(props.id)}/> </h3>
            <p>{props.day}</p>
            
        </div>
    )
}

interface TaskDefinition{
    id: number,
 text: string,
 day: string,
 reminder: boolean,
 onDelete(id:number):void
 onToggle(id:number):void
}

// interface TaskArray{
//  task:TaskDefinition[]
// }


export default Task;