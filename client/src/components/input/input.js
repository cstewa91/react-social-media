import React, { Component, Fragment } from 'react'
import './input'

class Input extends Component {
   state = {
     
   }
   componentDidMount = () => {

   }

   render() {
      const { input, label, inputClassName, labelClassName, errorClassName, loginActive, meta: { error, touched }, size, type = 'text', textArea, textAreaClassName, maxLength, min, placeholder } = this.props
      if (!textArea) {
         return (
            <Fragment>
               <input {...input} type={type} id={input.name} label={label} size={size} className={inputClassName} min={min} maxLength={maxLength} placeholder={placeholder}/>
               <p className={errorClassName}>{touched && error}</p>
            </Fragment>
         )
      }
      return (
         <Fragment>
            <textarea {...input} type={type} id={input.name} label={label} size={size} className={textAreaClassName} min={min} maxLength={maxLength} placeholder={placeholder}/>
            <p className={errorClassName}>{touched && error}</p>
         </Fragment>
      )
   }
}

export default Input

