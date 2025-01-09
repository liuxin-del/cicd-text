import React from 'react'
import { Sku, Button, Toast } from 'react-vant';
import { SkuInstance } from 'react-vant';
import { getSkuData, initialSku } from '../demo/data';
import { useNavigate } from 'react-router-dom'
const demoData = getSkuData();
export default function Sku() {
  return (
    <div>
         <Sku
        ref={ref}
        sku={demoData.sku}
        goods={demoData.goods_info}
        goodsId={demoData.goods_id}
        properties={demoData.properties}
        onAddCart={()=>addsuccess()}
        // onBuyClicked={(value) => Toast(JSON.stringify(value))}
      />
    </div>
  )
}
