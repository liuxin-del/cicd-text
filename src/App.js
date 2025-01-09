import React from 'react'
import { Tabbar } from 'react-vant';
import { FriendsO, HomeO, Search, SettingO } from '@react-vant/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import '@nutui/nutui-react/dist/style.css'
export default function App() {
  let navigate = useNavigate()
  return (
    <div>
        <Outlet></Outlet>
        <Tabbar>
        <Tabbar.Item icon={<HomeO />} onClick={()=>navigate('/lian')}>首页</Tabbar.Item>
        <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<FriendsO />}>标签</Tabbar.Item>
        <Tabbar.Item icon={<SettingO />}>标签</Tabbar.Item>
      </Tabbar>
    </div>
  )
}
