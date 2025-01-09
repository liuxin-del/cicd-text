import React from 'react'
import { Search } from 'react-vant';
import { Sticky } from 'react-vant';
import { useState, useEffect } from 'react'
import { Swiper } from 'react-vant';
import './css/list.css'
import { InfiniteScroll} from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { useNavigate } from 'react-router-dom'
import { Tabs } from 'react-vant'
import { BackTop} from '@nutui/nutui-react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
export default function Lian() {
  const [value, setValue] = useState('');
  let navigate = useNavigate()
  let [list, setList] = useState([])
  let [cate, setCate] = useState([])
  let [page, setPage] = useState(1)
  let [cateid, setCateid] = useState('')
  let [pagesize, setPageSize] = useState(4)
  const [hasMore, setHasMore] = useState(true)
  let [a, setA] = useState([])
  let imgs=[
    {id:1,img:'./img/p1.jpg'},
    {id:2,img:'./img/p2.jpg'},
    {id:3,img:'./img/p3.jpg'},
  ]
  useEffect(() => {
    // getlist()
    getcate()
  }, [])
  // let getlist = async () => {
  //   let { data: { code, data} } = await axios.get('/datalist')
  //   if (code === 200) {
  //     setList(data)
  //   }
  // }
  //获取分类
  let getcate = async () => {
    let { data: { code, data } } = await axios.get('/cate')
    if (code === 200) {
      setCate(data)
    }
  }
  let dian = async (id) => {
    console.log(id)
    setCateid(id)
  }
  let loadMore = async () => {
    let { data: { code, data } } = await axios.get('/datalist', { params: { page: page, pagesize: pagesize, cateid: cateid } })
    console.log(data, '5555555555555')
    if (code === 200) {
      // setList(data)
      await sleep(2000)
      setList([...list, ...data])
      setPage(++page)
      if (data.length < pagesize) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    }
  }
  //价格排序
  let getprice = () => {
    let aa = [...list].sort((a, b) => b.price - a.price)
    setList(aa)
  }
  let getprice1 = () => {
    let aa1 = [...list].sort((a, b) => a.price - b.price)
    setList(aa1)
  }
  //加入购物车
  let add =async(id)=>{
    console.log(id,'idididid')
    let {data:{code,data}}=await axios.get('/addcart',{params:{id:id}})
    if(code===200){
      setA(data)
    }
  }
  return (
    <div>
      <Sticky>
      
        <Search value={value} onChange={setValue} onClickInput={()=>navigate('/sreach')} clearable placeholder="请输入搜索关键词" />
      </Sticky>

      <div className="box1" >
        <Swiper >
          {imgs.map((item,index)=>(
            <Swiper.Item key={index}>
              <img src={item.img}  style={{width:'100%',height:'100px'}} alt="" />
            </Swiper.Item>
          ))}
        </Swiper>
        <p onClick={() => navigate('/lou')}>跳转楼层</p>
        <p>
          <span style={{ marginLeft: "20px" }}>综合</span>
          <span style={{ marginLeft: "20px" }}>销量</span>
          <span style={{ marginLeft: "20px" }}>新品</span>
          <span style={{ marginLeft: "20px" }}>价格 <span onClick={() => getprice()}>up</span> <span onClick={() => getprice1()}>down</span> </span>
        </p>
        <Tabs onClickTab={(e) => dian(e.name)} >
          {cate.map((item, index) => (
            <Tabs.TabPane name={item._id} key={item._id} title={item.name} >
              {
                list.filter(i => i.cid === cateid).map(item => (
                  <div className="a" key={item._id}>
                    <img src={item.img} style={{ width: '100px', height: '100px' }} alt="" />
                    <p>￥{item.price}</p>
                    <p onClick={()=>add(item._id)}>加入购物车</p>
                  </div>
                ))
              }
              {/* {
                list.map(item => (
                  <div className="a" key={item._id}>
                    <img src={item.img} style={{ width: '100px', height: '100px' }} alt="" />
                  </div>
                ))
              } */}
            </Tabs.TabPane>
          ))}
        </Tabs>
        {/* {
          list.map(item => (
            <div className="a" key={item._id}>
              <img src={item.img} style={{ width: '100px', height: '100px' }} alt="" />
            </div>
          ))
        } */}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
      <BackTop target="target" style={{bottom:60,right:20}}/>
      {/* <div className="kk">
        {
          a.map(item=>(
            <div key={item._id}>
              <img src={item.img} style={{ width: '100px', height: '100px' }} alt="" />
            </div>
          ))
        }
      </div> */}
    </div>
  )
}
