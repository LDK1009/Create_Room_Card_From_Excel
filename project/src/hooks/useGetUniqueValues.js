// useGetUniqueValues.js
import { useEffect, useState } from "react";

// 엑셀 데이터의 해당 컬럼 중 고유값만을 추출하여 반환한다.
const useGetUniqueValues = (excelData, headers) => {
  const [uniqueValues, setUniqueValues] = useState([]);

  useEffect(() => {
    if (excelData && headers) {
      const allValues = [[],[]]; // 해당 컬럼에 속하는 모든 값 (중복 허용)

      for (const [index, sheetData] of excelData.entries()) {
        const header = headers[index]; // 해당 시트의 헤더 배열
        // 모든 교회 담기
        for (const col of header) {
          for (const row of sheetData) {
            allValues[index].push(row[col]);
          }
        }
      }

      for (let [index, allValue] of allValues.entries()) {
        // 중복 제거
        const uniqValue = [...new Set(allValue)];
        // 빈값 제거
        const filteredUniqValue = uniqValue.filter((value) => value !== undefined && value !== null);
        allValues[index] = filteredUniqValue;
      }
      
      setUniqueValues(allValues);
    }
  }, [excelData, headers]);

  return { uniqueValues };
};

export default useGetUniqueValues;
