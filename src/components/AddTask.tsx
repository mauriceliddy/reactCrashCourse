import { useState } from "react";


const AddTask = (props: onAddDefinition) => {
    // Each input is going to have its own piece of state. (Component level state, not App level state)
    // So.. 
    // () after useState => default values
    //Defining state here
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    //Handle the submitting of the form
    const onSubmit = (e: any) => {
        //So as to not leave the page
        e.preventDefault();

        //validation for incoming text. Make sure there is text in teh box
        if (!text) {
            alert('Please add some text')
            return;
        }

        // IF there is text: call onAdd method and pass a task(defined below)
        props.onAdd({text,day,reminder}); 

        //Clear the form after submit
        setText('');
        setDay('');
        setReminder(false);

    }

    // returning a form
    //Each label and input is being wrapped in a class of form control 

    // Inputs: value is {text}, i.e, the component state. In order to change it you need an onCHange
    // where we pass an event (e) and call setText() on that event to change the value of the text
    return (
        <form className='add-form' onSubmit = {onSubmit}>
            <div className='form-control'>
                <label> Task </label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control '>
                <label> Day and Time </label>
                <input type='text' placeholder='Add Day and time' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label> Set Reminder </label>
                <input type='checkbox' checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )

}

// In order to pass onAdd as a prop from App.js
interface onAddDefinition {
    onAdd(task: TaskDefinition): void;

}

//In order to define the onAddDefinition, need to define task too. Fuck me
interface TaskDefinition {
    text: string,
    day: string,
    reminder: boolean,
   
}
export default AddTask;