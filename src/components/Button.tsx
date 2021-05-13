
const Button = (props:ButtonValues) =>{

    return(
        <button onClick = {props.onClick} style = {{backgroundColor:props.color}} className = 'btn'>
            {props.text}
        </button>
    )
}

interface ButtonValues{
    color:string,
    text:string,
    onClick():void
}

export default Button;