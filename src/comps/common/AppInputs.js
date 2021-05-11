import React from 'react'
import './styles/AppInputs.css'

export function AppInput(props) {
 
  const {title,iconclass,ref,onFocus,onBlur,placeholder,type,value,onChange,name,checked,disabled,onKeyUp,className,autoComplete} = props
   
  return ( 
    <label className={`appinput ${className}`}> 
      <h6>{title}</h6>
      <i className={iconclass}></i> 
      <input style={{paddingRight: iconclass?"40px":"10px"}} ref={ref} autoComplete={autoComplete} onFocus={() => onFocus&&onFocus()} onBlur={() => onBlur&&onBlur()} placeholder={placeholder} type={type} value={value} onChange={(e) => onChange&&onChange(e)} name={name} checked={checked} disabled={disabled} onKeyUp={(e) => onKeyUp&&onKeyUp(e)}/>
    </label>
  )   
}    

export function AppSelect(props) {
  const {multiple, options, regname, title, onChange, value} = props
  let optionsdata = options && options.map((data) =>
    <option key={data.id} value={regname?data.value:data.name?data.name.toLowerCase().replaceAll(' ',''):data.name} name={regname?data.name:null}>  
        {data.name}
    </option>
  )  
  return ( 
    <label className="appselect">
      <h6>{title}</h6>
      {
        multiple?
        <select onChange={(e) => onChange(e)} value={value} multiple>
          {optionsdata}
        </select>:
        <select onChange={(e) => onChange(e)} value={value} >
          {optionsdata}
        </select>
      }
    </label>
  )
} 
 
export function AppSwitch(props) { 

  const {iconclass,title,onChange,checked} = props

  return (   
    <div className="appswitch">  
    <h6><i className={iconclass}></i>{title}</h6> 
    <label className="form-switch">
        <input type="checkbox" onChange={(e) => onChange(e)} checked={checked}/>
        <i></i> 
    </label>   
    </div>
  )  
} 

