import React, { useEffect, useRef, useState } from "react";
import FileInputForm from "../components/FileInputForm";
import useExcelToJson from "../hooks/useExcelToJson";
import useGetHeadersByExcel from "../hooks/useGetHeadersByExcel";
import useGetUniqueValues from "../hooks/useGetUniqueValues";
import useFindStartEndRoomInfos from "../hooks/useFindStartEndRoomInfos";
import styled from "styled-components";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { excelData } = useExcelToJson(selectedFile);
  const { headers } = useGetHeadersByExcel(selectedFile, "name"); // 교회명이 포함된 컬럼명
  const { uniqueValues } = useGetUniqueValues(excelData, headers); // 교회 리스트

  const { startEndRoomInfos, findStartEndRoomInfo } = useFindStartEndRoomInfos();

  const divRef = useRef(null);

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

  /**
   * 1. 프로퍼티 중 교회명이 들어가는 속성을 찾는다. 즉, 교회명이 들어가는 컬럼명을 찾는다(ex) 교회명, 교회명_1,  교회명_2)
   * 2. 배열을 순회하며 행의 컬럼명들을 모두 추출한다. ex) A교회, B교회, C교회
   * 3. 2번에서 모든 교회명을 추출했기 때문에 중복을 삭제한다.
   * 4. 교회명 리스트업 완료
   */

  const Roomcards = startEndRoomInfos?.map((church) => {
    const { name, totalPersonnel, startRoomNum, endRoomNum, startPersonnel, endPersonnel, roomClass } = church;
    const roomArange = `${startRoomNum}(${startPersonnel})-${endRoomNum}(${endPersonnel})`;
    return (
      // 교회
      // 3명 B
      // 211 - 214(2)
      <>
        <Container>
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

  useEffect(() => {
    console.log("headers >> ", headers);
    console.log("uniqueValues >> ", uniqueValues);
  }, [headers, uniqueValues]);

  return (
    <>
      {/* 파일 선택 인풋폼 */}
      <FileInputForm setSelectedFile={setSelectedFile} />
      {/* 변환 버튼 */}
      <button onClick={() => findStartEndRoomInfo(excelData, uniqueValues, headers)}>변환</button>
      <button onClick={handleDownload}>결과 다운로드</button>
      {/* 변환 결과 */}
      {startEndRoomInfos && (
        <div>
          변환 결과
          <div ref={divRef}>{Roomcards}</div>
          <pre>{JSON.stringify(startEndRoomInfos, null, 2)}</pre>
        </div>
      )}
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
