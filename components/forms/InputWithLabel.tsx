import React from 'react'
import { TextField } from "@mui/material"

type Prop ={
    register:any,
    label:string,
    type?:'text'|'file'|'password'
}
const InputWithLabel =( {register,label,type='text'}:Prop)=>{


    return (
            <TextField
            //   placeholder='body'
              label={label}
            //   size='medium'
            size='small'
              style={{width:'100%'}}
              InputLabelProps={{ shrink: true,  }}
              type={type}
              {...register}
              />
    )
}
export default InputWithLabel