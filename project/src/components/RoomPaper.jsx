import React from "react";
import styled from "styled-components";
import defineRoomArange from "../modules/defineRoomArange";

const RoomPaper = ({ info, peperImgRef, index }) => {
  return (
    <Container ref={(el) => (peperImgRef.current[index] = el)}>
      <Title>숙소배정표</Title>
      <Table>
        <TableRow info1={info[0]} info2={info[1]} />
        <TableRow info1={info[2]} info2={info[3]} />
        <TableRow info1={info[4]} info2={info[5]} />
        <TableRow info1={info[6]} info2={info[7]} />
        <TableRow info1={info[8]} info2={info[9]} />
        <TableRow info1={info[10]} info2={info[11]} />
        <TableRow info1={info[12]} info2={info[13]} last />
      </Table>
      <Footer>괄호 안의 숫자는 해당 호실에 배정된 인원이며, 해당 호실은 다른 교회와 함께 사용하게 됩니다 :)</Footer>
    </Container>
  );
};

const TableRow = ({ info1, info2, last }) => {
  const roomArangeSibling1 = defineRoomArange(
    info1?.startRoomNum[0],
    info1?.startPersonnel[0],
    info1?.endRoomNum[0],
    info1?.endPersonnel[0]
  );
  const roomArangeSisters1 = defineRoomArange(
    info1?.startRoomNum[1],
    info1?.startPersonnel[1],
    info1?.endRoomNum[1],
    info1?.endPersonnel[1]
  );
  const roomArangeSibling2 = defineRoomArange(
    info2?.startRoomNum[0],
    info2?.startPersonnel[0],
    info2?.endRoomNum[0],
    info2?.endPersonnel[0]
  );
  const roomArangeSisters2 = defineRoomArange(
    info2?.startRoomNum[1],
    info2?.startPersonnel[1],
    info2?.endRoomNum[1],
    info2?.endPersonnel[1]
  );

  const peopleSibling1 = info1?.totalPersonnel[0] ? `${info1?.totalPersonnel?.[0]}명` : "";
  const peopleSisters1 = info1?.totalPersonnel[1] ? `${info1?.totalPersonnel?.[1]}명` : "";
  const peopleSibling2 = info2?.totalPersonnel[0] ? `${info2?.totalPersonnel?.[0]}명` : "";
  const peopleSisters2 = info2?.totalPersonnel[1] ? `${info2?.totalPersonnel?.[1]}명` : "";

  return (
    <>
      <tr>
        <TdName1 colSpan={4}>{info1?.name}</TdName1>
        <TdName2 colSpan={4}>{info2?.name}</TdName2>
      </tr>
      <tr>
        <Td1>형제</Td1>
        <Td2>{peopleSibling1}</Td2>
        <Td3>{info1?.roomClass[0]}</Td3>
        <Td4>{roomArangeSibling1}</Td4>
        <Td1>형제</Td1>
        <Td2>{peopleSibling2}</Td2>
        <Td3>{info2?.roomClass[0]}</Td3>
        <Td4 style={{ borderRight: "1px solid black" }}>{roomArangeSibling2}</Td4>
      </tr>
      <tr>
        <Td1>자매</Td1>
        <Td2>{peopleSisters1}</Td2>
        <Td3>{info1?.roomClass[1]}</Td3>
        <Td4>{roomArangeSisters1}</Td4>
        <Td1>자매</Td1>
        <Td2>{peopleSisters2}</Td2>
        <Td3>{info2?.roomClass[1]}</Td3>
        <Td4 style={{ borderRight: "1px solid black" }}>{roomArangeSisters2}</Td4>
      </tr>
      {last ? null : (
        <tr>
          <Gap />
        </tr>
      )}
    </>
  );
};

///////////////////////스타일링
const Container = styled.div`
  width: 595px;
  height: 842px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin-bottom: 100px;
`;

const Title = styled.div`
  line-height: 88px;
  font-size: 35px;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 12px;
  text-align: center;
  border: 0px;
`;

const TdName1 = styled.td`
  border: 1px solid black;
  width: 255px;
  height: 33px;
  font-size: 14px;
  text-align: left;
  padding: 0px;
  padding-left: 8px;
  border-right: 0px;
`;

const TdName2 = styled(TdName1)`
  border-right: 1px solid black;
`;

const Td1 = styled.td`
  border: 1px solid black;
  border-top: 0px;
  border-right: 0px;
  width: 55px;
  height: 29px;
  padding: 0px;
`;
const Td2 = styled(Td1)`
  width: 51px;
`;
const Td3 = styled(Td1)`
  width: 25px;
  border-right: 0px;
`;
const Td4 = styled(Td1)`
  width: 124px;
  text-align: left;
  border-left: 0px;
`;

const Gap = styled.td`
  height: 4px;
`;

const Footer = styled.div`
  line-height: 57px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default RoomPaper;
