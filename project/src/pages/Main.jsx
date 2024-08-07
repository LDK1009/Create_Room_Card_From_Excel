import React, { useRef, useState } from "react";
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
import RoomPapers from "../components/RoomPapers";

const Main = () => {
  // 다운로드 로딩 상태
  const [isLoadingCard, setIsLoadingCard] = useState(null);
  const [isLoadingPaper, setIsLoadingPaper] = useState(null);

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
  const { mergeInfos } = useMerge(startEndRoomInfos1, startEndRoomInfos2, uniqueValues[0], uniqueValues[1]);

  // 변환 버튼 클릭 시 실행
  const handleFindStartEnd = () => {
    findStartEndRoomInfos1(excelData[0], uniqueValues[0], headers[0]);
    findStartEndRoomInfos2(excelData[1], uniqueValues[1], headers[1]);
  };

  // 이미지 다운로드 참조
  const cardImgRef = useRef([]);
  const paperImgRef = useRef([]);

  // 카드 다운로드 핸들러
  const handleCardDownload = async () => {
    if (!cardImgRef.current) {
      alert("다운로드 대상(카드)이 존재하지 않습니다.");
      return;
    }
    try {
      setIsLoadingCard(true);
      // 폴더 생성
      const zip = new JSZip();
      const folder = zip.folder("카드");

      // 폴더에 이미지 삽입
      for (const [index, item] of cardImgRef.current.entries()) {
        const canvas = await html2canvas(item, { scale: 2 }); // html > canvas 변환

        console.log(`${index}번째 카드 다운로드...`);

        canvas.toBlob((blob) => {
          // canvas -> blob 변환
          // 다음에 folder.file 코드에 await 테스트해보기(setTimeout과 치환)
          if (blob !== null) {
            folder.file(`${mergeInfos[index].name}.png`, blob); //  폴더에 이미지 삽입
          }
        });
      }

      // 3초 후에 showMessage 함수를 실행
      setTimeout(() => {
        // 폴더 다운로드
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "카드.zip"); // 폴더 다운로드
        });

        setIsLoadingCard(false);
      }, 2000);
    } catch (error) {
      console.error("카드 다운로드 오류 : ", error);
    }
  };

  // 라벨지 다운로드 핸들러
  const handlePaperDownload = async () => {
    if (!paperImgRef.current) {
      alert("다운로드 대상(라벨지)이 존재하지 않습니다.");
      return;
    }
    try {
      setIsLoadingPaper(true);
      // 폴더 생성
      const zip = new JSZip();
      const folder = zip.folder("라벨지");

      // 폴더에 이미지 삽입
      for (const [index, item] of paperImgRef.current.entries()) {
        const canvas = await html2canvas(item, { scale: 2 }); // html > canvas 변환

        console.log(`${index}번째 라벨지 다운로드...`);

        canvas.toBlob((blob) => {
          // canvas -> blob 변환
          // 다음에 folder.file 코드에 await 테스트해보기(setTimeout과 치환)
          if (blob !== null) {
            folder.file(`라벨지${index + 1}.png`, blob); //  폴더에 이미지 삽입
          }
        });
      }

      // 2초 후에 showMessage 함수를 실행
      setTimeout(() => {
        // 폴더 다운로드
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "라벨지.zip"); // 폴더 다운로드
        });
        setIsLoadingPaper(false);
      }, 2000);
    } catch (error) {
      console.error("라벨지 다운로드 오류 : ", error);
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
      <button onClick={handleCardDownload}>카드 다운로드</button>
      <div>{isLoadingCard === true && "Loading...🤫"} </div>
      <div>{isLoadingCard === false && "Complete!😘"} </div>
      <button onClick={handlePaperDownload}>라벨지 다운로드</button>
      <div>{isLoadingPaper === true && "Loading...🤫"} </div>
      <div>{isLoadingPaper === false && "Complete!😘"} </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
        <div>{mergeInfos && <Roomcards mergeInfos={mergeInfos} cardImgRef={cardImgRef} />}</div>
        <div>{mergeInfos && <RoomPapers mergeInfos={mergeInfos} peperImgRef={paperImgRef} />}</div>
      </div>
    </>
  );
};

export default Main;
