import React, { useEffect, useRef, useState } from "react";
import FileInputForm from "../components/FileInputForm";
import useExcelToJson from "../hooks/useExcelToJson";
import useGetHeadersByExcel from "../hooks/useGetHeadersByExcel";
import useGetUniqueValues from "../hooks/useGetUniqueValues";
import useFindStartEndRoomInfos from "../hooks/useFindStartEndRoomInfos";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import useMerge from "../hooks/useMerge";
import Roomcards from "../components/RoomCards";
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
