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
import styled from "styled-components";

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
      <Container>
        <Header>❤ 숙소배정 라벨지 생성기 ❤</Header>
        <Body>
          <FileInputForm selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
          <TransformButton onClick={handleFindStartEnd}>파일 변환</TransformButton>
          <PaperButtonWrap>
            <PaperDownloadButton onClick={handlePaperDownload}>라벨지 다운로드</PaperDownloadButton>
            {isLoadingPaper === null ? null : (
              <LoadingText>{isLoadingPaper ? "다운로드 중..." : "다운로드 완료!"} </LoadingText>
            )}
          </PaperButtonWrap>
          <CardButtonWrap>
            <CardDownloadButton onClick={handleCardDownload}>카드 다운로드</CardDownloadButton>
            {isLoadingCard === null ? null : (
              <LoadingText>{isLoadingCard ? "다운로드 중..." : "다운로드 완료!"} </LoadingText>
            )}
          </CardButtonWrap>
        </Body>
        <Foot>
          <div>{mergeInfos && <Roomcards mergeInfos={mergeInfos} cardImgRef={cardImgRef} />}</div>
          <div>{mergeInfos && <RoomPapers mergeInfos={mergeInfos} peperImgRef={paperImgRef} />}</div>
        </Foot>
      </Container>
    </>
  );
};

const Container = styled.div``;

const Header = styled.div`
  line-height: 173px;
  font-size: 40px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: "KCC-Ganpan";
  border-bottom: 2px solid black;
`;

const Body = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "KCC-Ganpan";
`;

const TransformButton = styled.div`
  width: 326px;
  height: 53px;
  margin-top: 48px;
  background-color: #303030;
  color: #ffffff;
  border-radius: 15px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const PaperButtonWrap = styled.div`
  height: 103px;
  margin-top: 80px;
`;
const PaperDownloadButton = styled(TransformButton)`
  margin-top: 0px;
`;

const CardButtonWrap = styled(PaperButtonWrap)`
  margin-top: 30px;
`;

const CardDownloadButton = styled(PaperDownloadButton)``;

const LoadingText = styled.div`
  height: 50px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Foot = styled.div`
  padding-top: 52px;
  background-color: #303030;
  display: flex;
  justify-content: space-evenly;
`;
export default Main;
