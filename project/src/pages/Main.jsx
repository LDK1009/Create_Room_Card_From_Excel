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
import JSZip from "jszip";

const Main = () => {
  // 선택된 엑셀 파일
  const [selectedFile, setSelectedFile] = useState(null);
  // 엑셀 -> JSON 데이터
  const { excelData } = useExcelToJson(selectedFile);
  // 컬럼명 배열
  const { headers } = useGetHeadersByExcel(selectedFile, "name"); // 교회명이 포함된 컬럼명
  // 교회 리스트
  const { uniqueValues } = useGetUniqueValues(excelData, headers); // 교회 리스트

  // 각 교회의 첫방막방 정보 추출
  const { startEndRoomInfos: startEndRoomInfos1, findStartEndRoomInfo: findStartEndRoomInfos1 } =
    useFindStartEndRoomInfos(); // 형제
  const { startEndRoomInfos: startEndRoomInfos2, findStartEndRoomInfo: findStartEndRoomInfos2 } =
    useFindStartEndRoomInfos(); // 자매

  // 교회별 형제 자매 탭 데이터 합치기
  const { mergeInfos } = useMerge(startEndRoomInfos1, startEndRoomInfos2);

  // 변환 버튼 클릭 시 실행
  const handleFindStartEnd = () => {
    findStartEndRoomInfos1(excelData[0], uniqueValues[0], headers[0]);
    findStartEndRoomInfos2(excelData[1], uniqueValues[1], headers[1]);
  };

  // 이미지 다운로드 참조
  const imgRef = useRef([]);

  // 다운로드 핸들러
  const handleDownload = async () => {
    if (!imgRef.current) {
      alert("다운로드 대상이 존재하지 않습니다.");
      return;
    }

    try {
      // 폴더 생성
      const zip = new JSZip();
      const folder = zip.folder("교회별 방배정 카드");

      // 폴더에 이미지 삽입
      for (const [index, item] of imgRef.current.entries()) {
        const canvas = await html2canvas(item, { scale: 2 }); // html > canvas 변환
         canvas.toBlob((blob) => { // canvas -> blob 변환
          if (blob !== null) {
            folder.file(`${mergeInfos[index].name}.png`, blob); //  폴더에 이미지 삽입
          }
        });
      }

      // 폴더 다운로드
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "교회별 방배정 카드.zip"); // 폴더 다운로드
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
      {mergeInfos && <Roomcards mergeInfos={mergeInfos} imgRef={imgRef} />}
      <div style={{ display: "flex" }}>
        {/* 변환 결과1 */}
        {mergeInfos && (
          <div>
            <h1>변환 결과</h1>
            {/* <CardWraper ref={imgRef}>{Roomcards}</CardWraper> */}
            <pre>{JSON.stringify(mergeInfos, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
