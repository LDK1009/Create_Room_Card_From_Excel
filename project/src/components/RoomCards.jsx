import styled from "styled-components";
import defineRoomArange from "../modules/defineRoomArange";

// 룸카드 컴포넌트
const Roomcards = ({ mergeInfos, imgRef }) => {
  // name 프로퍼티를 기준으로 오름차순 정렬
  const sortedInfos = mergeInfos.sort((a, b) => a.name.localeCompare(b.name));

  // 카드 컴포넌트
  const cards = sortedInfos.map((church, index) => {
    const { name, totalPersonnel, startRoomNum, endRoomNum, startPersonnel, endPersonnel, roomClass } = church;

    const roomArange1 = defineRoomArange(startRoomNum[0], startPersonnel[0], endRoomNum[0], endPersonnel[0]);
    const roomArange2 = defineRoomArange(startRoomNum[1], startPersonnel[1], endRoomNum[1], endPersonnel[1]);
    return (
      // 교회명
      // 형제 | 10명 | A 201-202(4)
      // 자매 | 10명 | B 801-802(4)
      <Container key={index} ref={(el) => (imgRef.current[index] = el)}>
        {/* <CardImg src={cardImg} /> */}
        <TextContainer>
          <ChurchName>{name}</ChurchName>
          <Table>
            <tr>
              <Td1>형제</Td1>
              <Td2>{totalPersonnel[0] || null}</Td2>
              <Td3>{roomClass[0] || null}</Td3>
              <Td4>{roomArange1 || null}</Td4>
            </tr>
            <tr>
              <Td1>자매</Td1>
              <Td2>{totalPersonnel[1] || null}</Td2>
              <Td3>{roomClass[1] || null}</Td3>
              <Td4>{roomArange2 || null}</Td4>
            </tr>
          </Table>
        </TextContainer>
        <Footer>VISIONCAMP</Footer>
      </Container>
    );
  });

  return <>{cards}</>;
};

export default Roomcards;

const Container = styled.div`
  width: 297px;
  height: 223px;
  background-color: #efa235;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
const TextContainer = styled.div`
  width: 245px;
  height: 163px;
  margin-top: 17px;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const ChurchName = styled.div`
  margin-top: 21px;
  font-size: 15px;
  text-align: center;
  font-family: "TheJamsil4Medium";
`;

const Table = styled.table`
  border: 1px solid black;
  width: 199px;
  height: 82px;
  border-collapse: collapse;
  border: 0px;
  font-size: 12px;
  text-align: center;
  margin-top: 18px;
`;

const Td1 = styled.td`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  width: 38px;
  height: 40px;
`;
const Td2 = styled(Td1)`
  width: 44px;
`;
const Td3 = styled(Td1)`
  width: 21px;
  border-right: 0px;
`;
const Td4 = styled(Td1)`
  width: 96px;
  border-right: 0px;
  text-align: left;
`;

const Footer = styled.div`
  margin-top: 14px;
  font-size: 15px;
  color: #3956bc;
  font-family: "TheJamsil6ExtraBold";
  letter-spacing: 2px;
  -webkit-text-stroke: 0.5px #3956bc; /* 텍스트 테두리 두께와 색상 */
`;
