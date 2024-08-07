import { useEffect, useState } from "react";
import * as xlsx from "xlsx";

const useGetHeadersByExcel = (selectedFile, filterWord) => {
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader(); // 파일 읽기 API 객체
      reader.onload = (e) => {
        // 이벤트 핸들러, 파일 읽기가 완료되었을 때 실행
        const data = new Uint8Array(e.target.result); // e.target.result를  8비트 부호 없는 정수 배열로 변환.
        const workbook = xlsx.read(data, { type: "array" }); // xlsx가 Uint8Array 객체 형식의 데이터를 읽는다.
        const colNames = new Array(2); // 탭 개수 크기의 배열 생성

        // 시트이름 배열 순회
        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName]; // 시트 데이터 접근
          if (sheetName === "형제") {
            colNames[0] = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0]; // 형제 시트 컬럼명 배열 담기
          } else if (sheetName === "자매") {
            colNames[1] = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0]; // 자매 시트 컬럼명 배열 담기
          }
        }

        // 필터링(교회이름 컬럼명만 남김)
        for (let [index, colName] of colNames.entries()) {
          colNames[index] = colName.filter((item) => item.includes(filterWord));
        }

        setHeaders(colNames);
      };
      reader.readAsArrayBuffer(selectedFile); // 파일 읽기 작업 시작(ArrayBuffer 형식으로 읽기, 8비트 정수 배열)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return { headers };
};

export default useGetHeadersByExcel;
