import { useState } from "react";

const useFindStartEndRoomInfos = () => {
  const [startEndRoomInfos, setStartEndRoomInfos] = useState(null);

  // 각 교회별 시작/끝 방번호 찾기
  const findStartEndRoomInfo = (excelData, churchList, headers) => {
    if (excelData) {
      const infos = []; // 각 교회의 첫,마지막 방 정보가 들어갈 배열dd

      // 교회명 배열 순회(A교회, B교회, ...)
      for (const name of churchList) {
        let startIndex = 0;
        let endIndex = 0;
        let startPersonnel = null;
        let endPersonnel = null;

        // 컬럼마다(headers) 교회명이 등장하는지 확인
        for (const [index, header] of headers.entries()) {
          let findResult = excelData.findIndex((item) => item[header] === name); // 해당 열에 교회 존재 여부
          const findStartResult = excelData.findIndex((item) => item[header] === name); // 해당 교회가 처음으로 등장하는 인덱스(찾으면 해당 인덱스 반환, 못찾으면 -1 반환)
          const findEndResult =
            excelData.length - 1 - [...excelData].reverse().findIndex((item) => item[header] === name); // // 해당 교회가 마지막으로 등장하는 인덱스(찾으면 해당 인덱스 반환, 못찾으면 -1 반환)
          const personnelColName = `personnel${index + 1}`; // 인원을 찾을 컬럼명

          // 첫째열에서 처음 찾으면 무조건 첫째열에 마지막이 있다.
          // 이 외열에서 처음 찾으면 처음 찾은 곳이 마지막이거나 첫째열에 마지막이 있다.
          if (index === 0 && findResult !== -1) {
            // 첫째열에서 감지함
            startIndex = findStartResult;
            endIndex = findEndResult;
            startPersonnel = excelData[startIndex][personnelColName];
            endPersonnel = excelData[endIndex][personnelColName];
          } else if (index !== 0 && findResult !== -1) {
            // 이 외 열의 경우
            startIndex = findStartResult; // 첫방의 헤드를 옮긴다.
            startPersonnel = excelData[startIndex][personnelColName];
            if (endPersonnel === null) {
              endIndex = findEndResult;
              endPersonnel = excelData[endIndex][personnelColName];
            }
          }
        }

        const startRoomNum = excelData[startIndex].roomNum; // 해당 교회가 배정된 첫방
        const endRoomNum = excelData[endIndex].roomNum; // 해당 교회가 배정된 마지막방
        const floorNum = Math.floor(startRoomNum / 100); // 방 층수
        const roomClass = floorNum === 2 || floorNum % 2 !== 0 ? "B" : "A"; // 분류
        const totalPersonnels = totalPersonnelByChurch(excelData, headers);
        const totalPersonnel = totalPersonnels[name];

        // 해당 교회의 시작, 끝 방 정보
        const startEndRoomNum = {
          name,
          totalPersonnel,
          startRoomNum,
          endRoomNum,
          startPersonnel,
          endPersonnel,
          roomClass,
        };

        // 데이터 삽입
        infos.push(startEndRoomNum);
      }

      setStartEndRoomInfos(infos);
    } else {
      alert("파일을 선택해주세요!");
    }
  };

  return { startEndRoomInfos, findStartEndRoomInfo };
};

const totalPersonnelByChurch = (excelData, headers) => {
  let obj = {};

  for (const row of excelData) {
    for (const [index, col] of headers.entries()) {
      const name = row[col];
      const personnelColName = "personnel" + (index + 1);
      const personnel = row[personnelColName];

      if (!name) continue; // 이름이 없는 경우 건너뛴다.

      if (!obj[name]) {
        // 먼저 0으로 초기화
        obj[name] = 0;
      }

      obj[name] += personnel || 0; // personnel이 undefined인 경우 0으로 처리
    }
  }

  return obj;
};

export default useFindStartEndRoomInfos;
