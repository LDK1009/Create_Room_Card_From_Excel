import { useEffect, useState } from "react";

const useFindStartEndRoomNum = () => {
  const [startEndRoomNumByChurch, setStartEndRoomNumByChurch] = useState(null);

  // 각 교회별 시작/끝 방번호 찾기
  const findStartEndRoomNum = (excelData, churchList, headers) => {
    if (excelData) {
      console.log("excelData>>",excelData);
      const infos = []; // 각 교회의 첫,마지막 방 정보가 들어갈 배열dd

      // 교회명 배열 순회(A교회, B교회, ...)
      for (const [index,name] of churchList.entries()) {
        let startIndex = 0;
        let endIndex = 0;

        console.log(index);

        // 컬럼명 배열 순회(name1, name2, ...)
        for (const [index, header] of headers.entries()) {
          let findResult = excelData.findIndex((item) => item[header] === name);
          const findStartResult = excelData.findIndex((item) => item[header] === name); // 해당 교회가 처음으로 등장하는 인덱스(찾으면 해당 인덱스 반환, 못찾으면 -1 반환)
          const findEndResult = excelData.length - 1 - [...excelData].reverse().findIndex((item) => item[header] === name); // // 해당 교회가 마지막으로 등장하는 인덱스(찾으면 해당 인덱스 반환, 못찾으면 -1 반환)

          // 첫째열에서 처음 찾으면 무조건 첫째열에 마지막이 있다.
          // 이 외열에서 처음 찾으면 처음 찾은 곳이 마지막이거나 첫째열에 마지막이 있다.
          if (index === 0 && findResult !== -1) { // 첫째열에서 감지함
            startIndex = findStartResult;
            endIndex = findEndResult;
          } else if (index !== 0 && findResult !== -1) { // 이 외 열에서 또 찾았을 때
            startIndex = findStartResult; // 첫방의 헤드를 옮긴다.
          }
        }

        // const startRoomNum = excelData[startIndex].roomNum; // 해당 교회가 배정된 첫방
        // const endRoomNum = excelData[endIndex].roomNum; // 해당 교회가 배정된 마지막방
        const startRoomNum = excelData[startIndex].roomNum; // 해당 교회가 배정된 첫방
        const endRoomNum = excelData[endIndex].roomNum; // 해당 교회가 배정된 마지막방
        const startEndRoomNum = {
          // 해당 교회의 시작, 끝 방 정보
          name,
          startRoomNum,
          endRoomNum,
        };

        infos.push(startEndRoomNum);
      }

      setStartEndRoomNumByChurch(infos);
      console.log(infos);
    } else {
      alert("파일을 선택해주세요!");
    }
  };

  return { startEndRoomNumByChurch, findStartEndRoomNum };
};

export default useFindStartEndRoomNum;
