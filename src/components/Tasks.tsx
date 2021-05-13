import Task from './Task'

const Tasks = (props:TaskArray) => {
   
    

    return (
        <>
            {props.tasks.map((task) => (
                <Task key={task.id} {...task} onDelete={props.onDelete} onToggle = {props.onToggle}/>
            ))}
        </>
    )
}


// Fuck me. Ok. SO if you are passing an array of objects in Typescript:
// Step1: Create interface with the definition of the objects you're passing (type safety)
// In my case the interface was 'TaskDefinition'
// Step 2: Since to define props you would need a props:Interface => You need ANOTHER interface 
// that has an array defined in it because that's what is being passed in.
// The type of that array should be of the object definition. So in my case:
// 'tasks:TaskDefinition[]'
// Step 3: Call the props on the Interface that has the array parameter in it( in my case 'TaskArray').. phew
interface TaskDefinition{
       id: number,
    text: string,
    day: string,
    reminder: boolean
}

interface TaskArray{
    tasks:TaskDefinition[],
    onDelete(id:number):void,
    onToggle(id:number):void
 }


export default Tasks;




// Way to loop through the tasks when it is passed in as a prop.
// At some point we swicthed to having 'Task' be a component
// return (
//     <>
//         {props.tasks.map((task) => (
//             <h3 key={task.id}>{task.text}</h3>
//         ))}
//     </>
// )





// // Practicing changing state using setTasks
// const changeStuff = () =>{
//     console.log("Trying to change");
//     setTasks([
//         {
//             id: 1,
//             text: 'Doctors appointment',
//             day: 'Feb 4th 2002 @ 4:30',
//             reminder: true
//         },
//         {
//             id: 2,
//             text: 'Dentists appointment',
//             day: 'Feb 22nd 2005 @ 7:15',
//             reminder: true
//         }])
// }




// //This was usedot hardcode the values, but then we are using state, using useState
// const tasks =[

//     {
// id: 1,
//     text: 'Doctors appointment',
//         day: 'Feb 4th 2002 @ 4:30',
//             reminder: true
//     },
// {
//     id: 2,
//         text: 'Dentists appointment',
//             day: 'Feb 22nd 2005 @ 7:15',
//                 reminder: true
// },
// {
//     id: 3,
//         text: 'Fixing the car',
//             day: 'March 13th 220 @ 9:30am',
//                 reminder: false
// }
// ];
