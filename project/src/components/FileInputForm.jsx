import React from "react";

// 사용자로부터 파일을 입력받는다.
const FileInputForm = ({ setSelectedFile }) => {

  // 파일 입력받기
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <h2>파일 업로드 폼</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  );
};

export default FileInputForm;
