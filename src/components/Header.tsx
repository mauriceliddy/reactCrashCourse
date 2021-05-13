
import Button from './Button'
//Arrow Function Version
const Header = (props:HeaderValues) => {

   
    return (
        <header className = 'header'>
            <h1>
                {props.title}
            </h1>
            <Button color = {props.showAdd ? 'red':'green'} text = {props.showAdd ? 'Close': 'Add'} onClick={props.onAdd}/>
        </header>
    )
}

interface HeaderValues{
    title:string,
    onAdd():void,
    showAdd:boolean
}

//CSS in JS
// Incorporate by putting into the required tag like:
// <h1 style = {headingStyle}>

// const headingStyle={
//     color:'red',
//     backgroundColor:'black'
// }

// Class-based version
// import { Component } from "react";
// class Header extends Component{
    
//     render(){
//         return(
//             <h1>Hello from the class definition</h1>
//         )
//     }
// }

export default Header;
