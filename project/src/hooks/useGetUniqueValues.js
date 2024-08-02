// useGetUniqueValues.js
import { useEffect, useState } from "react";

// 엑셀 데이터의 해당 컬럼 중 고유값만을 추출하여 반환한다.
const useGetUniqueValues = (excelData, headers) => {
  const [uniqueValues, setUniqueValues] = useState([]);

  useEffect(() => {
    if (excelData && headers) {
      const allValues = []; // 해당 컬럼에 속하는 모든 값 (중복 허용)
      // 뉴로직
      for (const header of headers) {
        for (const row of excelData) {
          allValues.push(row[header]);
        }
      }
      const uniqValues = [...new Set(allValues)]; // 중복 제거
      const filteredUniqValues = uniqValues.filter((value) => value !== undefined && value !== null);
      setUniqueValues(filteredUniqValues);
    }
  }, [excelData, headers]);

  return { uniqueValues };
};

export default useGetUniqueValues;
