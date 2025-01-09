import React, { useEffect, useState,useRef } from 'react';
import { NavBar, Toast, ProductCard } from 'react-vant';
import { Input, Select, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InfiniteScroll, List } from 'antd-mobile'
import 'animate.css';
import { CartO } from '@react-vant/icons';
export default function Search() {
  const ref = useRef(null);
  let navigate = useNavigate();
  let [status, setStatus] = useState('1');
  let [name, setName] = useState('');
  let [list, setList] = useState([]);
  let [data, setData] = useState([]);
  let [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);

  useEffect(() => {
  }, [history]);

 

  

  // 搜索
  let search = async () => {
    if (history.length >= 6) {
      let copy = [...history];
      add(name);
      copy.pop();
      copy.unshift(name);
      setHistory(copy);
      localStorage.setItem('history', JSON.stringify(copy));
    } else {
      add(name);
    }
    getdata()
  };
  let getdata = async () => {
    let res = await axios.get("http://localhost:3000/datalist",{params:{name:name}})
    setData(res.data.list)
  }

  // 添加历史记录
  let add = (name) => {
    let copy = [...history];
    let index = copy.indexOf(name);
    if (index === -1) {
      copy.unshift(name);
      localStorage.setItem('history', JSON.stringify(copy));
      setHistory(copy);
      setName('');
    } else {
      copy.splice(index, 1);
      copy.unshift(name);
      localStorage.setItem('history', JSON.stringify(copy));
      setHistory(copy);
    }
  };
  // 删除全部历史记录
  let delall = async () => {
    localStorage.removeItem('history');
    setHistory([]);
  };
  return (
    <div class="animate__animated animate__fadeInRight">
      <NavBar
        title={
          <Input style={{ width:'500px' }} value={name} onChange={(e) => setName(e.target.value)} />
        }
        leftText=""
        rightText={
          <span onClick={search}>搜索</span>
        }
        onClickLeft={() => navigate(-1)}
      />
      <div >
        <p>历史记录<span onClick={delall} style={{marginLeft:'200px'}}>全部删除</span></p>
        <div>
          {
            history.map((item) => (
              <span
                key={item}
                style={{
                  marginLeft:'20px'
               
                }}
                onClick={() => add(item)}
              >
                {item}
              </span>
            ))
          }
        </div>
        <List>
        {data.map((item, index) => (
          <div style={{ width: "150px", height: "250px", float: "left", marginLeft: "23px", marginTop: "30px" }}>
            <img src={item.img} alt="" style={{ width: "150px", height: "150px" }} /><br></br>
            <p style={{ lineHeight: "30px" }}>{item.name}</p>
            ￥{item.price}
            <span onClick={() => ref.current?.show()} style={{marginLeft:'50px'}}><CartO  /></span>
          </div>
        ))}
      </List>
      </div>
    </div>
  );
}