// // import React from 'react'

// // export default function File() {
// //   return (
// //     <div>File</div>
// //   )
// // }
// import React, { useState } from 'react';
// import axios from 'axios';

// const File = () => {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');

//   // 选择文件
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // 上传文件
//   const handleUpload = () => {
//     if (!file) {
//       setUploadStatus('No file selected');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setUploadStatus('Uploading...');

//     axios.post('http://localhost:5000/upload', formData)
//       .then(response => {
//         setUploadStatus('File uploaded successfully');
//         console.log('File uploaded: ', response.data.filePath);
//       })
//       .catch(error => {
//         setUploadStatus('Upload failed');
//         console.error('Error uploading file: ', error);
//       });
//   };

//   return (
//     <div>
//       <h1>File Upload</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <p>{uploadStatus}</p>
//     </div>
//   );
// };

// export default File;


import React, { useState } from 'react';
import axios from 'axios';

const File = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // 选择文件
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 上传文件
  const handleUpload = () => {
    if (!file) {
      setUploadStatus('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploadStatus('Uploading...');

    // 使用axios进行文件上传
    axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 确保请求头正确
      },
    })
      .then(response => {
        setUploadStatus('File uploaded successfully');
        console.log('File uploaded: ', response.data.filePath);
      })
      .catch(error => {
        setUploadStatus('Upload failed');
        console.error('Error uploading file: ', error);
      });
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default File;
