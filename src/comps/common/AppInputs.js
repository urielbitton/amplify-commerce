import React from 'react'
import './styles/AppInputs.css'

export function AppInput(props) {
 
  const {title,iconclass,className} = props
   
  return ( 
    <label className={`appinput ${className}`}> 
      <h6>{title}</h6>
      <i className={iconclass}></i> 
      <input style={{paddingRight: iconclass?"40px":"10px"}} {...props} />
    </label>
  )   
}     

export function AppSelect(props) {
  const {multiple, options, namebased, title, onChange, value, defaultValue} = props
  let optionsdata = options?.map((data) =>
    <option key={data.id} selected={data.selected} disabled={data.disabled} value={namebased?data.value:data.name?data.name.toLowerCase().replaceAll(' ',''):data.name} name={namebased?data.name:null}>  
        {data.name}
    </option>
  )  
  return ( 
    <label className="appselect">
      <h6>{title}</h6>
      {
        multiple?
        <select onChange={(e) => onChange(e)} value={value} multiple defaultValue={defaultValue}>
          {optionsdata}
        </select>:
        <select onChange={(e) => onChange(e)} value={value}>
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

