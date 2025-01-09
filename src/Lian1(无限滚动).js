import React from 'react'
import { useState, useEffect } from 'react'
import { InfiniteScroll} from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { Tabs } from 'react-vant'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
export default function Lian1() {
    let [list, setList] = useState([])
    let [cate, setCate] = useState([])
    let [page, setPage] = useState(1)
    let [pagesize, setPagesize] = useState(3)
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        // getlist()
        getcate()
    },[])
    //获取列表
    let loadMore=async()=>{
        let getlist=async()=>{
            let {data:{code,data}}=await axios.get('/datalist',{params:{page:page,pagesize:pagesize}})
            if(code===200){
                await sleep(500)
                setList([...list,...data])
                setPage(page+1)
                if(data.length<pagesize){
                    setHasMore(false)
                }else{
                    setHasMore(true)
                }
            }
        }
        getlist()
    }
   
    //获取分类
    let getcate=async()=>{
        let {data:{code,data}}=await axios.get('/cate')
        if(code===200){
            setCate(data)
        }
    }
  return (
    <div>
        <Tabs>
        {cate.map(item => (
          <Tabs.TabPane name={item} key={item._id} title={item.name}>
            {
            list.filter(j=>j.cid===item._id).map(item=>(
                <div key={item._id}>
                    <img src={item.img} style={{width:'100px',height:'100px'}} alt="" />
                    <p>{item.price}</p>
                </div>
            ))
        }
          </Tabs.TabPane>
        ))}
      </Tabs>
        {/* {
            list.map(item=>(
                <div key={item._id}>
                    <img src={item.img} style={{width:'100px',height:'100px'}} alt="" />
                    <p>{item.price}</p>
                </div>
            ))
        } */}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
    </div>
  )
}
