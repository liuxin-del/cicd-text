import React from 'react';
import { useState ,useEffect} from 'react';
import 'animate.css';
import { Search } from 'react-vant';
import './css/list.css'
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
export default function Sreach() {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    // const [aa, setAa] = useState(JSON.parse(localStorage.getItem('aa')) || []);
    let [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
    useEffect(()=>{
        // getlist()
    },[])
    
    const sou=()=>{
        if(value==''){ 
        
        }else{
            if(history.length>=6){
                history.pop()
            }else{
            let index=history.findIndex(item=>item==value)
            if(index!==-1){
                history.splice(index,1)
            }
            history.unshift(value)
            setHistory(history)
            localStorage.setItem('history',JSON.stringify(history))
            setValue('')
          
        }
        getlist()
        }
      
    }
    const getlist=async()=>{
        let {data:{code,data}}=await axios.get('/datalist',{params:{value:value}})
        if(code===200){
            setList(data)
        }
    }
    //清除历史记录
    let del=()=>{
        setHistory([])
    }
  return (
    <div className='animate__animated animate__rollIn'>
         <Search value={value} onChange={setValue}  onClickInput={()=>sou()}  clearable placeholder="请输入搜索关键词" />
        <div className="s1">
            <p><span>历史记录</span> <span style={{marginLeft:'60%'}} onClick={()=>del()}>清除历史记录</span> </p>
            {
                history.map((item,index)=>(
                    <span key={index} style={{marginLeft:'20px',backgroundColor:'gray',fontSize:'20px'}}>
                         {item} <span>X</span>
                    </span>
                ))
            }
        </div>
        <div className="s2">
            {
                list.map(item=>(
                    <p key={item._id}>{item.name}</p>
                ))
            }
        </div>
    </div>
  )
}

