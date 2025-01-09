import React, { useEffect, useRef, useState } from 'react';
import { SideBar } from 'antd-mobile';
import { useThrottleFn } from 'ahooks';
import './css/list.css'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
export default function Lou() {
  const [cate, setCate] = useState([]);
  const [list, setList] = useState([]);
  const [activeId, setActiveId] = useState('66f5233d0d9e74b889179501');
  const items = [
    { key: '66f5233d0d9e74b889179501', title: '男装', text: ['1', '2', '3', '4'] },
    { key: '66f5234c0d9e74b889179502', title: '女装', text: ['1', '2', '3', '4'] },
    { key: '66f523590d9e74b889179503', title: '儿童', text: ['1', '2', '3', '4'] },
    { key: '4', title: '第四项', text: ['1', '2', '3', '4'] },
  ];
  useEffect(() => {
    getcate()
    getlist()
  }, [])
  //获取分类
  let getcate = async () => {
    let { data: { code, data } } = await axios.get('/cate')
    if (code === 200) {
      setCate(data)
    }
  }
  //获取列表
  let getlist = async () => {
    let { data: { code, data } } = await axios.get('/datalist')
    if (code === 200) {
      setList(data)
      console.log(data,'8888888888');
      

    }
  }
  const [activeKey, setActiveKey] = useState('1');
  const { run: handleScroll } = useThrottleFn(() => {
    let currentKey = items[0].key;
    for (const item of items) {
      const element = document.getElementById(`anchor-${item.key}`);
      if (!element)
        continue;
      const rect = element.getBoundingClientRect();
      if (rect.top <= 400) {
        currentKey = item.key;
      }
      else {
        break;
      }
    }
    setActiveKey(currentKey);
  }, {
    leading: true,
    trailing: true,
    wait: 100,
  });
  const mainElementRef = useRef(null);
  useEffect(() => {
    const mainElement = mainElementRef.current;
    if (!mainElement)
      return;
    mainElement.addEventListener('scroll', handleScroll);
    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <div className="v">
      <div className='container'>
        <div className='side'>
          <SideBar activeKey={activeKey} onChange={key => {
            var _a;
            (_a = document.getElementById(`anchor-${key}`)) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
          }}>
            {cate.map(item => (<SideBar.Item key={item._id} title={item.name} />))}
            {/* {items.map(item => (<SideBar.Item key={item.key} title={item.title} />))} */}
            {/* {cate.map(item => (
            <SideBar.Item key={item._id} title={item.name} />
          ))} */}
            {/* {cate.map(item => (<SideBar.Item style={{"color":activeId===item._id?"red":"black"}}   key={item._id} title={item.name} />))} */}
          </SideBar>
        </div>
        <div className='main' ref={mainElementRef}>
          {cate.map(item => (<div key={item._id} style={{ width: '100%', height: "800px" }}>
            <h2 id={`anchor-${item._id}`}>{item.name}</h2>
            {
              list.filter(j => j.cid === item._id).map(item => (
                <p key={item._id}>{item.name}</p>
              ))
            }
          </div>))}
        </div>
      </div>
      </div>
     
    </div>
  )
}
