import React, { useState, useEffect } from 'react'
import { Button } from "antd"
import { Tabs } from 'react-vant'
import "../css/home.css"
import { SearchBar } from "antd-mobile"
import { Stepper } from "react-vant"
import "../css/ball.css"
import pinyin from 'pinyin'; //  npm i segmentit 先下载中文分词包 npm i pinyin 再下载拼音包
export default function Home() {
  // 显示隐藏
  const [flag, setFlag] = useState(false)
  let aaa = () => {
    setFlag(!flag)
  }
  let bbb = () => {
    setFlag(false)
  }

  // 标签栏横向滚动
  const [cate, setCate] = useState([
    { "id": 1, "name": "推荐" },
    { "id": 2, "name": "html" },
    { "id": 3, "name": "css" },
    { "id": 4, "name": "django" },
    { "id": 5, "name": "vue" },
    { "id": 6, "name": "react" },
    { "id": 7, "name": "webpack" },
  ])
  const [list, setList] = useState([
    { "id": 1, "title": "html是什么", "cid": 2, "context": "html是超文本标记语言" },
    { "id": 2, "title": "css是什么", "cid": 3, "context": "css是层叠样式表" },
    { "id": 3, "title": "django是什么", "cid": 4, "context": "django是python的web框架" },
    { "id": 4, "title": "vue是什么", "cid": 5, "context": "vue是前端框架" },
    { "id": 5, "title": "react是什么", "cid": 6, "context": "react是前端框架" },
    { "id": 6, "title": "webpack是什么", "cid": 7, "context": "webpack是前端打包工具" },
  ])

  // 滚动监听改变头部导航
  const [scrollDistance, setScrollDistance] = useState(0)

  // 搜索框轮播
  let timer;
  let inputlist = ["隆江猪脚饭", "奶茶", "菠萝炒饭", "狗肉肠粉", "烧烤生蚝"];
  let [inputIndex, setInputIndex] = useState(0);
  useEffect(() => {
    // 搜索框轮播
    timer = setInterval(() => {
      if (inputIndex >= inputlist.length - 1) {
        setInputIndex(0);
      } else {
        setInputIndex(prevIndex => (prevIndex + 1) % inputlist.length);
      }
    }, 3000);

    // 滚动监听改变头部导航
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer)
    };
  }, [])
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrollDistance(scrollTop);
  };


  //  购物车小球抛物线 
  let [value9, setValue9] = useState(0)
  let dianji = (evt) => {
    var $ball = document.getElementById('ball');  //获取小球的dom节点
    $ball.style.backgroundColor = 'red'
    // 将小球进行归位，移到点击的位置，
    $ball.style.top = evt.clientY + 'px';
    $ball.style.left = evt.clientX + 'px';
    $ball.style.transition = 'left 0s, top 0s';  //动画
    // 小球向下进行抛掷， 设置定时器可以重复点击
    setTimeout(() => {
      $ball.style.top = window.innerHeight + 'px';
      // $ball.style.bottom = "10px"
      $ball.style.left = '50px';
      //css动画   加上cubic-bezier(.35,.8,1,1) 立方贝塞尔曲线  
      $ball.style.transition = 'left 1s cubic-bezier(.35,.8,1,1), top 1s ease-in';
    }, 20)
  }


  // 获取中文大写首字母
  let [name,setName] = useState('')
  let [code,setCode] = useState('')
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    const newCode = newName
      ? newName
          .split('')
          .map((char) => {
            const pinyinArray = pinyin(char, { style: pinyin.STYLE_FIRST_LETTER });
            return pinyinArray.length > 0 ? pinyinArray[0][0].toUpperCase() : '';
          })
          .join('')
      : '';

    setCode(newCode);
  };

  return (
    <div>
      <h2>显示隐藏</h2>
      {/* 显示隐藏 */}
      <Button onClick={aaa}>按钮</Button>
      <div style={{ width: '300px', height: "100px", display: flag ? "block" : "none" }}>
        <input></input><br></br>
        <Button>取消</Button>
        <Button onClick={bbb}>确定</Button>
      </div>

      <h2>标签栏横向滚动</h2>
      {/* 标签栏横向滚动 */}
      <Tabs style={{ width: '100%', fontSize: '20px' }} className="box">
        {cate.map(item => (
          <Tabs.TabPane key={item} title={`${item.name}`} >
            {
              list.filter(items => items.cid === item._id).map(items => {
                return <div style={{ width: "100%", height: "300px" }}>
                  名称{items.title}<br></br>
                  {items.context}
                </div>
              })
            }
          </Tabs.TabPane>
        ))}
      </Tabs>

      <h2>搜索框轮播</h2>
      {/* 搜索框轮播 */}
      <SearchBar placeholder={inputlist[inputIndex]} onFocus={() => navigate('/search')} style={{ width: "90%", marginLeft: "5%" }} />



      <h2>购物车小球抛物线</h2>
      {/* 购物车小球抛物线 */}
      <div id="ball"></div>
      <Stepper
        min={0}
        value={value9}
        onChange={v => {
          setValue9(v)
          console.log(v);
        }}
        style={{ marginLeft: "70%" }}
        onPlus={dianji}
        onMinus
      /><br></br>


      <h2>获取中文大写首字母</h2>
      {/* 获取中文大写首字母 */}
      仓库名称<input type='text' value={name} onChange={handleNameChange} /><br></br>
      助记码<input type='text' value={code} readOnly />


      
      <h2>滚动监听改变头部导航</h2>
      {/* 滚动监听改变头部导航 */}
      {
        scrollDistance > 80 ?
          <div style={{ width: "100%", height: "80px", backgroundColor: "red", zIndex: "100", position: "fixed", top: "100px" }}><h1>我是导航我在这</h1></div>
          :
          null
      }
      <div style={{ width: "100%", height: "800px", backgroundColor: "skyblue" }}>滚动监听改变头部导航</div>
    </div>
  )
}
