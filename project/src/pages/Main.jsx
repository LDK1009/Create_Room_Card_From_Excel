import React, { useEffect, useState } from "react";
import FileInputForm from "../components/FileInputForm";
import useExcelToJson from "../hooks/useExcelToJson";
import useGetHeadersByExcel from "../hooks/useGetHeadersByExcel";
import useGetUniqueValues from "../hooks/useGetUniqueValues";
import useFindStartEndRoomInfos from "../hooks/useFindStartEndRoomInfos";

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { excelData } = useExcelToJson(selectedFile);
  const { headers } = useGetHeadersByExcel(selectedFile, "name"); // 교회명이 포함된 컬럼명
  const { uniqueValues } = useGetUniqueValues(excelData, headers); // 교회 리스트

  const { startEndRoomInfos, findStartEndRoomInfo } = useFindStartEndRoomInfos();
  /**
   * 1. 프로퍼티 중 교회명이 들어가는 속성을 찾는다. 즉, 교회명이 들어가는 컬럼명을 찾는다(ex) 교회명, 교회명_1,  교회명_2)
   * 2. 배열을 순회하며 행의 컬럼명들을 모두 추출한다. ex) A교회, B교회, C교회
   * 3. 2번에서 모든 교회명을 추출했기 때문에 중복을 삭제한다.
   * 4. 교회명 리스트업 완료
   */

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
      {/* 변환 결과 */}
      {startEndRoomInfos && (
        <div>
          변환 결과
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
