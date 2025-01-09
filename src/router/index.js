import React from "react";
import { createBrowserRouter,Navigate } from "react-router-dom";
import App from "../App";
import Home from "../component/Home"
import Search from "../component/Search";
import Lian from '../Lian(tabs 无限滚动 搜索跳转 回到顶部)'
import Lou from '../Lou(楼层组件)'
import Sreach from "../Sreach(搜索功能)";
import Lian1 from "../Lian1(无限滚动)";
// import List from '../list(富文本编辑器)';
import Echarts from '../EchartsComponent(图表)';
import File from "../File";
import Canvas from "../Canvas";
const router = createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        children:[
            {
                path:'/lian',
                element:<Lian></Lian>
            },
            {
                path:"/home",
                element:<Home></Home>,
            },
            {
                path:"/search",
                element:<Search></Search>,
            }
        ]
    },
    {
        path:'/file',
        element:<File></File>
    },
   
    {
        path:'/lou',
        element:<Lou></Lou>
    },
    {
        path:'/sreach',
        element:<Sreach></Sreach>
    },
    {
        path:'/lian1',
        element:<Lian1></Lian1>
    },
    // {
    //     path:'/list',
    //     element:<List></List>
    // },
    {
        path:'/echarts',
        element:<Echarts></Echarts>
    },
    {
        path:'/canvas',
        element:<Canvas></Canvas>
    }


])

export default router;