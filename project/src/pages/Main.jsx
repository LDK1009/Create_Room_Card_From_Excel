import React, { useEffect, useRef, useState } from "react";
import FileInputForm from "../components/FileInputForm";
import useExcelToJson from "../hooks/useExcelToJson";
import useGetHeadersByExcel from "../hooks/useGetHeadersByExcel";
import useGetUniqueValues from "../hooks/useGetUniqueValues";
import useFindStartEndRoomInfos from "../hooks/useFindStartEndRoomInfos";
import styled from "styled-components";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import cardImg from "../assets/cardImg.png";
const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { excelData } = useExcelToJson(selectedFile);
  const { headers } = useGetHeadersByExcel(selectedFile, "name"); // 교회명이 포함된 컬럼명
  const { uniqueValues } = useGetUniqueValues(excelData, headers); // 교회 리스트

  const { startEndRoomInfos: startEndRoomInfos1, findStartEndRoomInfo: findStartEndRoomInfos1 } =
    useFindStartEndRoomInfos(); // 형제
  const { startEndRoomInfos: startEndRoomInfos2, findStartEndRoomInfo: findStartEndRoomInfos2 } =
    useFindStartEndRoomInfos(); // 자매

  const divRef = useRef(null);

  const handleFindStartEnd = () => {
    findStartEndRoomInfos1(excelData[0], uniqueValues[0], headers[0]);
    findStartEndRoomInfos2(excelData[1], uniqueValues[1], headers[1]);
  };

  const handleDownload = async () => {
    if (!divRef.current) {
      alert("다운로드 대상이 존재하지 않습니다.");
      return;
    }

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  // 룸카드 컴포넌트
  const Roomcards = startEndRoomInfos1?.map((church) => {
    const { name, totalPersonnel, startRoomNum, endRoomNum, startPersonnel, endPersonnel, roomClass } = church;
    const roomArange = `${startRoomNum}(${startPersonnel})-${endRoomNum}(${endPersonnel})`;
    return (
      // 교회
      // 3명 B
      // 211 - 214(2)
      <>
        <Container>
          {/* <Img src={cardImg}/> */}
          <Name>{name}</Name>
          <FlexBox>
            <Total>{totalPersonnel}</Total>
            <Class>{roomClass}</Class>
          </FlexBox>
          <Arange>{roomArange}</Arange>
        </Container>
      </>
    );
  });

  return (
    <>
      {/* 파일 선택 인풋폼 */}
      <FileInputForm setSelectedFile={setSelectedFile} />
      {/* 변환 버튼 */}
      <div>
        <button onClick={handleFindStartEnd}>변환</button>
      </div>
      <button onClick={handleDownload}>결과 다운로드</button>
      <div style={{ display: "flex" }}>
        {/* 변환 결과1 */}
        {startEndRoomInfos1 && (
          <div>
            <h1>변환 결과1</h1>
            {/* <CardWraper ref={divRef}>{Roomcards}</CardWraper> */}
            <pre>{JSON.stringify(startEndRoomInfos1, null, 2)}</pre>
          </div>
        )}
        {/* 변환 결과2 */}
        {startEndRoomInfos2 && (
          <div>
            <h1>변환 결과2</h1>
            {/* <CardWraper ref={divRef}>{Roomcards}</CardWraper> */}
            <pre>{JSON.stringify(startEndRoomInfos2, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* 컬럼 종류 */}
      {headers && (
        <div>
          <h3>컬럼 종류:</h3>
          <pre>{JSON.stringify(headers, null, 2)}</pre>
        </div>
      )}
      {/* 선택된 엑설 데이터 종류 */}
      {excelData && (
        <div>
          <h3>엑셀 데이터:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default Main;

const Container = styled.div`
  width: 300px;
  height: 150px;
  background-color: antiquewhite;
  border: 1px solid lightgreen;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
`;

const Img = styled.img`
  width: 300px;
  height: 150;
`;
const FlexBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Total = styled.div`
  font-size: 18px;
`;
const Class = styled(Total)``;

const Arange = styled(Total)`
  font-size: 18px;
`;

const CardWraper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
