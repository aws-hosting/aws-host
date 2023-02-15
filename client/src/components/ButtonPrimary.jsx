import React from 'react'
import './../styles/components/ButtonPrimary.scss'

const ButtonPrimary = (props) => {
    return (
        <button {...props} className={`button-primary ${props.disabled === true && 'disabled'} `}>{props.children}</button>
    )
}

export default ButtonPrimary