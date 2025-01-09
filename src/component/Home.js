import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import { Sticky } from '@nutui/nutui-react'
import { Tabs } from '@nutui/nutui-react'
import { InfiniteScroll, List } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { BackTop } from '@nutui/nutui-react'
import { Sku, Button, Toast } from 'react-vant';
import { useNavigate } from 'react-router-dom'
import { Cell, Popup, PopupPosition } from 'react-vant'
import { Search } from 'react-vant';
import { CartO,ArrowUp,ArrowDown } from '@react-vant/icons';
export default function Home() {
  let navigate = useNavigate()
  const ref = useRef(null);
  const [state, setState] = useState('')
  const [tab1value, setTab1value] = useState('6686044c1aa258cfe51af4a6')
  let [cate, setCate] = useState([])
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    getcate()
  }, [])
  let getcate = async () => {
    let res = await axios.get("http://localhost:3000/catelist")
    setCate(res.data.list)
  }

  let loadMore = async () => {
    const append = await axios.get('http://localhost:3000/datalist', { params: { page: page, limit: 4 } })
    await sleep(2000)
    let newlist = append.data.list
    setPage(page + 1)
    setData(val => [...val, ...newlist])
    setHasMore(newlist.length > 0)
  }
  // 升序排序
  let sheng = () => {
    let newlist = [...data].sort((a, b) => a.price - b.price)
    setData(newlist)
  }
  // 降序排序
  let jiang = () => {
    let newlist = [...data].sort((a, b) => b.price - a.price)
    setData(newlist)
  }
  const onClose = () => setState('')

  let addsuccess = () => {
     Toast("加入购物车成功")
     console.log({name:"史努比服装",price:200});
     
  }
  let go = (name,price) => {
    setState('bottom')
    let obj = {
      name: name,
      price: price,
    }
    let lists = []
    let list = lists.push(obj)
    setList(list)
    
  }
  return (
    <div>
      <Sticky>
      
        <div style={{ width: "100%", height: "100px", backgroundColor: "white", paddingTop: "3px" }}>
        <h2>Lativ诚衣</h2>
        <Search  clearable placeholder="请输入搜索关键词" onFocus={()=>navigate("/search")} />
          {/* <input type='text' placeholder='搜索商品' style={{ width: "97.8%" }} onClick={()=>navigate("/search")}></input> */}
        </div>

        <Tabs
          value={tab1value}
          onChange={(value) => {
            console.log(value);
            setTab1value(value)
          }}
        >
          {
            cate.map((item) => {
              return <Tabs.TabPane title={item.name} value={item._id}></Tabs.TabPane>
            })
          }
        </Tabs>
        <div style={{backgroundColor:"white"}}>
        <span style={{ marginLeft: "22px", fontSize: "14px" }}>综合</span>
        <span style={{ marginLeft: "22px" }}>销量</span>
        <span style={{ lineHeight: "43px", marginLeft: "22px" }}>价格
          <span onClick={sheng}><ArrowUp/></span>
          <span onClick={jiang}><ArrowDown/></span>
        </span>
        </div>
      </Sticky>
      <List>
        {data.filter(item => item.cid === tab1value).map((item, index) => (
          // <List.Item key={index}>
          <div style={{ width: "150px", height: "250px",  float: "left", marginLeft: "23px", marginTop: "30px" }}>
            <img src={item.img} alt="" style={{ width: "150px", height: "150px" }} /><br></br>
            <p style={{ lineHeight: "30px" }}>{item.name}</p>
            ￥{item.price}
            <span onClick={() => go(item.name,item.price)} style={{marginLeft:'50px'}} ><CartO  /></span>
          </div>
          // </List.Item>
        ))}
        <BackTop target="target" />
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      <Popup
        visible={state === 'bottom'}
        style={{ height: '30%' }}
        position='bottom'
        onClose={onClose}
        description={list}
      >
        <img src='/img/1.jpg' alt="" style={{ width: "150px", height: "150px" }} />
        <div>史努比服装</div>
        <div>￥200</div>
        <Button onClick={()=>addsuccess()}>加入购物车</Button>
      </Popup>
      <div style={{ width: "100%", height: "50px" }}></div>
    </div >
  )
}
