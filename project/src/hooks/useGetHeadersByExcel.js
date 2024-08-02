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
        const sheetName = workbook.SheetNames[0]; // 첫번째 시트 이름을 사용한다
        const worksheet = workbook.Sheets[sheetName]; // 시트 데이터 접근 (고차원 객체로 이루어져있다)(ex >> A1 : {v:셀값})
        const headers = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0]; // 첫 번째 행(헤더)만 가져오기
        if (filterWord) {
          const filteredHeaders = headers.filter((item) => item.includes(filterWord));
          setHeaders(filteredHeaders);
        } else {
          setHeaders(headers);
        }
      };
      reader.readAsArrayBuffer(selectedFile); // 파일 읽기 작업 시작(ArrayBuffer 형식으로 읽기, 8비트 정수 배열)
    }
  }, [selectedFile]);

  return { headers };
};

export default useGetHeadersByExcel;
