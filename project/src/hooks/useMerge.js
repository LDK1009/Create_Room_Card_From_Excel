import { useEffect, useState } from "react";

const useMerge = (data1, data2, churchList1, churchList2) => {
  const [mergeInfos, setMergeInfos] = useState(null);

  useEffect(() => {
    if (data1 && data2) {
      const mergedChurchList = [...churchList1, ...churchList2]; // 배열 합치기
      const uniqueMergedChurchList = [...new Set(mergedChurchList)]; // 중복 제거(모든 교회 리스트)
      const mergeInfos = [];

      // 교회명 리스트 순회
      for (const churchName of uniqueMergedChurchList) {
        const findResult1 = data1.findIndex((rowD1) => rowD1.name === churchName); // data1에서 해당 교회가 위치한 인덱스
        const findResult2 = data2.findIndex((rowD2) => rowD2.name === churchName); // data2에서 해당 교회가 위치한 인덱스

        // 형제, 자매 모두 있는 교회
        if (findResult1 !== -1 && findResult2 !== -1) {
          // 합칠 데이터1
          const {
            name: name1,
            totalPersonnel: totalPersonnel1,
            startRoomNum: startRoomNum1,
            endRoomNum: endRoomNum1,
            startPersonnel: startPersonnel1,
            endPersonnel: endPersonnel1,
            roomClass: roomClass1,
          } = data1[findResult1];

          // 합칠 데이터2
          const {
            totalPersonnel: totalPersonnel2,
            startRoomNum: startRoomNum2,
            endRoomNum: endRoomNum2,
            startPersonnel: startPersonnel2,
            endPersonnel: endPersonnel2,
            roomClass: roomClass2,
          } = data2[findResult2];

          // 합친 데이터
          const mergeInfo = {
            name: name1,
            totalPersonnel: [totalPersonnel1, totalPersonnel2],
            startRoomNum: [startRoomNum1, startRoomNum2],
            endRoomNum: [endRoomNum1, endRoomNum2],
            startPersonnel: [startPersonnel1, startPersonnel2],
            endPersonnel: [endPersonnel1, endPersonnel2],
            roomClass: [roomClass1, roomClass2],
          };

          mergeInfos.push(mergeInfo);
        }
        // 형제만 있는 교회
        else if (findResult1 !== -1) {
          // 합칠 데이터1
          const {
            name: name1,
            totalPersonnel: totalPersonnel1,
            startRoomNum: startRoomNum1,
            endRoomNum: endRoomNum1,
            startPersonnel: startPersonnel1,
            endPersonnel: endPersonnel1,
            roomClass: roomClass1,
          } = data1[findResult1];

          // 합친 데이터
          const mergeInfo = {
            name: name1,
            totalPersonnel: [totalPersonnel1, null],
            startRoomNum: [startRoomNum1, null],
            endRoomNum: [endRoomNum1, null],
            startPersonnel: [startPersonnel1, null],
            endPersonnel: [endPersonnel1, null],
            roomClass: [roomClass1, null],
          };

          mergeInfos.push(mergeInfo);
        }
        // 자매만 있는 교회
        else if (findResult2 !== -1) {
          // 합칠 데이터1
          const {
            name: name2,
            totalPersonnel: totalPersonnel2,
            startRoomNum: startRoomNum2,
            endRoomNum: endRoomNum2,
            startPersonnel: startPersonnel2,
            endPersonnel: endPersonnel2,
            roomClass: roomClass2,
          } = data2[findResult2];

          // 합친 데이터
          const mergeInfo = {
            name: name2,
            totalPersonnel: [null, totalPersonnel2],
            startRoomNum: [null, startRoomNum2],
            endRoomNum: [null, endRoomNum2],
            startPersonnel: [null, startPersonnel2],
            endPersonnel: [null, endPersonnel2],
            roomClass: [null, roomClass2],
          };

          mergeInfos.push(mergeInfo);
        }
      }
      setMergeInfos(mergeInfos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data1, data2]);

  return { mergeInfos };
};

export default useMerge;
