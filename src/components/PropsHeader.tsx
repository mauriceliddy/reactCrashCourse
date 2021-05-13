import PropTypes from 'prop-types'

//Arrow Function Version
const PropsHeader = (props:FullName) => {
    return (
        <header>
            <h1>
                Task Tracker and {props.firstName}
            </h1>
        </header>
    )
}

interface FullName {
    firstName: string;
    lastName: string;
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

export default PropsHeader;
