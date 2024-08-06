import { useEffect, useState } from "react";
import * as xlsx from "xlsx";

const useExcelToJson = (selectedFile) => {
  const [excelData, setExcelData] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader(); // 파일 읽기 API 객체
      reader.onload = (e) => {
        // 이벤트 핸들러, 파일 읽기가 완료되었을 때 실행
        const data = new Uint8Array(e.target.result); // e.target.result를  8비트 부호 없는 정수 배열로 변환.
        const workbook = xlsx.read(data, { type: "array" }); // xlsx가 Uint8Array 객체 형식의 데이터를 읽는다.
        const jsonDatas = new Array(2); // 탭 개수 크기의 배열 생성
        
        for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName]; // 시트 데이터 접근
          if(sheetName === "형제"){
            jsonDatas[0] = xlsx.utils.sheet_to_json(worksheet); // 형제 데이터는 항상 0번째에 위치
          }
          else if (sheetName === "자매"){
            jsonDatas[1] = xlsx.utils.sheet_to_json(worksheet); // 자매 데이터는 항상 1번째에 위치
          }
        }

        setExcelData(jsonDatas);
      };
      reader.readAsArrayBuffer(selectedFile); // 파일 읽기 작업 시작(ArrayBuffer 형식으로 읽기, 8비트 정수 배열)
    }
  }, [selectedFile]);

  return { excelData };
};

export default useExcelToJson;
