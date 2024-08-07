import React from "react";
import RoomPaper from "./RoomPaper";

const RoomPapers = ({ mergeInfos, peperImgRef }) => {
  // name 프로퍼티를 기준으로 오름차순 정렬
  const sortedInfos = mergeInfos.sort((a, b) => a.name.localeCompare(b.name));

  console.log("sortedInfos>>", sortedInfos);
  const sclicedInfos = []; // 배열을 14개씩 조각내어 담는다.

  const scliceSize = 14;
  const sliceNum = Math.ceil(sortedInfos.length / scliceSize); // 14로 나눈 몫(소수점 반올림)

  for (let i = 0; i < sliceNum; i++) {
    const start = i * scliceSize;

    // 마지막 조각
    if (i === sliceNum - 1) {
      const infosPiece = sortedInfos.slice(start);
      sclicedInfos.push(infosPiece);
    }
    // 이 외 조각
    else {
      const infosPiece = sortedInfos.slice(start, start + scliceSize);
      sclicedInfos.push(infosPiece);
    }
  }

  const papers = sclicedInfos.map((el, index) => {
    return <RoomPaper key={index} info={el} peperImgRef={peperImgRef} index={index}  />;
  });

  return <>{papers}</>;
};

export default RoomPapers;
