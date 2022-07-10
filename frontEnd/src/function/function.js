import {Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Tokenvarify=async(props)=>{
        try {

            const navigate=useNavigate()
            const cookies=new Cookies()
            const token=cookies.get('token')

            console.log(`call api`)
            let result= await fetch('btokenvarify',{
                method:'GET',
                headers:{
                    'content-Type':'application/json',
                    token:token
                }
            })
            result=await result.json()
            console.log(`result.result ${result.result}`)
            if(!result.result){
                navigate(props.render)
            }
            
        } catch (error) {
            console.log(`error from function ====####==== ${error}`)
        }
}

export default Tokenvarify