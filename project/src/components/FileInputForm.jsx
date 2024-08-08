import React, { useState } from "react";
import styled from "styled-components";
import dndImage1 from "../assets/DnDBox1.svg";
import dndImage2 from "../assets/DnDBox2.svg";
import uploadIcon1 from "../assets/fileUpload1.svg";
import uploadIcon2 from "../assets/fileUpload2.svg";
// 사용자로부터 파일을 입력받는다.
const FileInputForm = ({ selectedFile, setSelectedFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
      handleFileChange({ target: { files } });
    }
  };

  // 파일 입력받기
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <HiddenFileInput type="file" id="fileInput" accept=".xlsx, .xls" onChange={handleFileChange} />
      <CustomFileLabel htmlFor="fileInput">파일 선택</CustomFileLabel>
      <DnDBox
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        isDragging={dragActive}
        dragActive={dragActive}
      >
        <DnDIcon src={dragActive ? uploadIcon2 : uploadIcon1} />
        {selectedFile ? (
          <DnDText dragActive={dragActive}>{selectedFile?.name}</DnDText>
        ) : (
          <DnDText dragActive={dragActive}>파일을 이곳에 첨부해 주세요 :)</DnDText>
        )}
      </DnDBox>
    </>
  );
};

// 숨겨진 파일 인풋
const HiddenFileInput = styled.input`
  display: none;
`;

// 파일 선택 버튼 스타일
const CustomFileLabel = styled.label`
  width: 326px;
  height: 53px;
  background-color: #303030;
  color: #ffffff;
  border-radius: 15px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 68px;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const DnDBox = styled.div`
  width: 802px;
  height: 130px;
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-image: url(${(props) => (props.dragActive ? dndImage2 : dndImage1)});
  background-size: cover; /* 이미지가 화면을 덮도록 */
  background-position: center; /* 이미지가 중앙에 위치하도록 */
  background-repeat: no-repeat; /* 이미지가 반복되지 않도록 */
`;

const DnDIcon = styled.img`
  margin-right: 10px;
  color: red;
`;

const DnDText = styled.div`
  font-size: 20px;
  color: ${(props) => (props.dragActive ? "#9BA5FF" : "black")};
`;
export default FileInputForm;
