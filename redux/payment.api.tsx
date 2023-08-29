import { useState} from 'react'
import axios from "../helpers/axios"
import useToast from '../hooks/useToast'

type PayProp = {
    payment_id:number,
    forWhat:string,
    query_param?:string}
const useDynamicPaymentApi =  ()=>{
   
    const [loading,setIsloading] = useState(false)
    
    const {notify} = useToast()
    
    const pay = async ({payment_id,forWhat,query_param=''}:PayProp) =>{
        notify('Loading Gateway ','success')
        try{
            if(setIsloading){
                setIsloading(true)
         
            }
             const resp = await axios.post(`/tenant/dues/process_payment/${forWhat}/${payment_id}/${query_param}`)
            
             window.location.href=resp.data.data.data.authorization_url
         
             return resp.data.data
        }
        catch(e:any){
            if(setIsloading){
                setIsloading(false)
            }
            try{
                notify(e.response.data.message.error)
            }catch(e){
                notify('Please check your internet')
            }
           
        }
    }

    return {
        pay,
        'loadingPay':loading,

    }
}

export default useDynamicPaymentApi