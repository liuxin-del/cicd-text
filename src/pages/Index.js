import React from 'react'

export default function Index() {
    // 上传文件
    const [file, setFile] = useState(null)
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    };
    const uploadFile = async () => {
        const formData = new FormData()
        formData.append("file", file);
        const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);
        alert('文件上传成功');
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

    // 触底加载
    let loadMore = async () => {
        const val = await axios.get('http://localhost:3000/getdata', { params: { page: page, limit: 4 } })
        console.log(val.data);
        await sleep(2000)
        const newData = val.data.list
        setPage(page + 1)
        setData(prevData => [...prevData, ...newData])
        setHasMore(newData.length > 0)
        console.log(newData);
    }
    return (
        <div>

            {/* 文件上传 */}
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile} disabled={!file}>
                开始上传
            </button>


            {/* 触底加载 */}
            <div>
                <List>
                    {data.map(item => (
                        <List.Item key={item._id} style={{ position: "relative" }} >
                            <video
                                controls
                                src={item.src}
                                style={{ width: '200px', height: "130px" }}
                            />
                            <span style={{ position: "absolute", fontSize: '15px', top: "30px", left: "220px" }}>{item.title}</span>

                        </List.Item>
                    ))}
                </List>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </div>
        </div >
    )
}
