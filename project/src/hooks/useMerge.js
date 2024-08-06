import { useEffect, useState } from "react";

const useMerge = (data1, data2) => {
  const [mergeInfos, setMergeInfos] = useState(null);

  useEffect(() => {
    if (data1 && data2) {
      const mergeInfos = [];
      for (const rowD2 of data2) {
        const sameNameIndex = data1.findIndex((rowD1) => rowD1.name === rowD2.name); // 같은 교회가 위치한 인덱스

        // 이름 같은 교회 찾은 경우(형제 자매 둘 다 있는 경우)
        if (sameNameIndex !== -1) {
          const {
            name: name1,
            totalPersonnel: totalPersonnel1,
            startRoomNum: startRoomNum1,
            endRoomNum: endRoomNum1,
            startPersonnel: startPersonnel1,
            endPersonnel: endPersonnel1,
            roomClass: roomClass1,
          } = data1[sameNameIndex]; // 합칠 데이터 1
          const {
            name: name2,
            totalPersonnel: totalPersonnel2,
            startRoomNum: startRoomNum2,
            endRoomNum: endRoomNum2,
            startPersonnel: startPersonnel2,
            endPersonnel: endPersonnel2,
            roomClass: roomClass2,
          } = rowD2; // 합칠 데이터 2

          //   데이터 합치기
          const mergedData = {
            name: name2,
            totalPersonnel: [totalPersonnel1, totalPersonnel2],
            startRoomNum: [startRoomNum1, startRoomNum2],
            endRoomNum: [endRoomNum1, endRoomNum2],
            startPersonnel: [startPersonnel1, startPersonnel2],
            endPersonnel: [endPersonnel1, endPersonnel2],
            roomClass: [roomClass1, roomClass2],
          };
          // 데이터 삽입

          mergeInfos.push(mergedData);
        }
        // 이름 같은 교회 못찾은 경우(형제 자매 둘 중 하나만 있는 경우)
        else {
          const {
            name: name2,
            totalPersonnel: totalPersonnel2,
            startRoomNum: startRoomNum2,
            endRoomNum: endRoomNum2,
            startPersonnel: startPersonnel2,
            endPersonnel: endPersonnel2,
            roomClass: roomClass2,
          } = rowD2; // 합칠 데이터 2
          //   데이터 합치기
          const mergedData = {
            name: name2,
            totalPersonnel: [null, totalPersonnel2],
            startRoomNum: [null, startRoomNum2],
            endRoomNum: [null, endRoomNum2],
            startPersonnel: [null, startPersonnel2],
            endPersonnel: [null, endPersonnel2],
            roomClass: [null, roomClass2],
          };
          // 데이터 삽입
          mergeInfos.push(mergedData);
        }
      }
      
      setMergeInfos(mergeInfos);
    }
  }, [data1, data2]);

  return { mergeInfos };
};

export default useMerge;
