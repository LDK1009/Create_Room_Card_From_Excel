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
import useMerge from "../hooks/useMerge";
const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { excelData } = useExcelToJson(selectedFile);
  const { headers } = useGetHeadersByExcel(selectedFile, "name"); // 교회명이 포함된 컬럼명
  const { uniqueValues } = useGetUniqueValues(excelData, headers); // 교회 리스트

  const { startEndRoomInfos: startEndRoomInfos1, findStartEndRoomInfo: findStartEndRoomInfos1 } =
    useFindStartEndRoomInfos(); // 형제
  const { startEndRoomInfos: startEndRoomInfos2, findStartEndRoomInfo: findStartEndRoomInfos2 } =
    useFindStartEndRoomInfos(); // 자매

  const { mergeInfos } = useMerge(startEndRoomInfos1, startEndRoomInfos2);

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
  const Roomcards = ({ mergeInfos }) => {
    const cards = mergeInfos.map((church) => {
      const { name, totalPersonnel, startRoomNum, endRoomNum, startPersonnel, endPersonnel, roomClass } = church;
      const roomArange1 = startRoomNum[0]
        ? `${startRoomNum[0]}(${startPersonnel[0]})-${endRoomNum[0]}(${endPersonnel[0]})`
        : null;
      const roomArange2 = startRoomNum[1] ? `${startRoomNum[1]}(${startPersonnel[1]})-${endRoomNum[1]}(${endPersonnel[1]})`
        : null;

      return (
        // 교회명
        // 형제 | 10명 | A 201-202(4)
        // 자매 | 10명 | B 801-802(4)
        <>
          <Container>
            {/* <Img src={cardImg}/> */}
            <Name>{name}</Name>
            <StyledTable>
              <tbody>
                <tr>
                  <StyledTh>형제</StyledTh>
                  <StyledTd>{totalPersonnel[0] || null}</StyledTd>
                  <StyledTd>
                    {roomClass[0] || null}
                    {roomArange1 || null}
                  </StyledTd>
                </tr>
                <tr>
                  <StyledTh>자매</StyledTh>
                  <StyledTd>{totalPersonnel[1] || null}</StyledTd>
                  <StyledTd>
                    {roomClass[1] || null}
                    {roomArange2 || null}
                  </StyledTd>
                </tr>
              </tbody>
            </StyledTable>
          </Container>
        </>
      );
    });

    return <>{cards}</>;
  };

  return (
    <>
      {/* 파일 선택 인풋폼 */}
      <FileInputForm setSelectedFile={setSelectedFile} />
      {/* 변환 버튼 */}
      <div>
        <button onClick={handleFindStartEnd}>변환</button>
      </div>
      <button onClick={handleDownload}>결과 다운로드</button>
      {mergeInfos && <Roomcards mergeInfos={mergeInfos} />}
      <div style={{ display: "flex" }}>
        {/* 변환 결과1 */}
        {mergeInfos && (
          <div>
            <h1>변환 결과</h1>
            {/* <CardWraper ref={divRef}>{Roomcards}</CardWraper> */}
            <pre>{JSON.stringify(mergeInfos, null, 2)}</pre>
          </div>
        )}
      </div>
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
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;
