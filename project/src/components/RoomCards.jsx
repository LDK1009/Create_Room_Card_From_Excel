import styled from "styled-components";
import cardImg from "../assets/cardImg.png";

// 룸카드 컴포넌트
const Roomcards = ({ mergeInfos, imgRef }) => {
  console.log(mergeInfos);
  const cards = mergeInfos.map((church, index) => {
    const { name, totalPersonnel, startRoomNum, endRoomNum, startPersonnel, endPersonnel, roomClass } = church;
    const defineRoomArange = (startRoomNum, startPersonnel, endRoomNum, endPersonnel) => {
      let startPersonnelText = startPersonnel === 6 ? '' : `(${startPersonnel})`;
      let endPersonnelText = endPersonnel === 6 ? '' : `(${endPersonnel})`;
      if (startRoomNum !== null) {
        // 첫방막방이 같으면
        if (startRoomNum === endRoomNum) {
          return `${startRoomNum}${startPersonnelText}`;
        }

        // 첫방막방이 다르면
        else {
          return `${startRoomNum}${startPersonnelText}-${endRoomNum}${endPersonnelText}`;
        }
      }
    };

    const roomArange1 = defineRoomArange(startRoomNum[0], startPersonnel[0], endRoomNum[0], endPersonnel[0]);
    const roomArange2 = defineRoomArange(startRoomNum[1], startPersonnel[1], endRoomNum[1], endPersonnel[1]);

    return (
      // 교회명
      // 형제 | 10명 | A 201-202(4)
      // 자매 | 10명 | B 801-802(4)
        <Container key={index} ref={el => (imgRef.current[index] = el)}>
          <CardImg src={cardImg} />
          <TextContainer>
            <ChurchName>{name}</ChurchName>
            <InfoTextContainer>
              <SiblingContainer>
                <Gender>형제</Gender>
                <TotalPeople>{totalPersonnel[0] || null}</TotalPeople>
                <RoomClass>{roomClass[0] || null}</RoomClass>
                <RoomArange>{roomArange1 || null}</RoomArange>
              </SiblingContainer>
              <SistersConstainer>
                <Gender>자매</Gender>
                <TotalPeople>{totalPersonnel[1] || null}</TotalPeople>
                <RoomClass>{roomClass[1] || null}</RoomClass>
                <RoomArange>{roomArange2 || null}</RoomArange>
              </SistersConstainer>
            </InfoTextContainer>
          </TextContainer>
        </Container>
    );
  });

  return <>{cards}</>;
};

export default Roomcards;

const Container = styled.div`
  width: 300px;
  height: 225px;
  background-color: antiquewhite;
  border: 1px solid lightgreen;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
`;

const CardImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
const TextContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const ChurchName = styled.div`
  margin-top: 35px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const InfoTextContainer = styled.div`
  margin-top: 5px;
  width: 245px;
  /* background-color:rgba(0,0,0,0.3); */
`;
const SiblingContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const SistersConstainer = styled(SiblingContainer)``;

const Gender = styled.div`
  width: 40px;
  margin-left: 20px;
  text-align: center;
  /* background-color:rgba(255,0,0,0.3); */
`;

const TotalPeople = styled.div`
  width: 42px;
  text-align: center;
  /* background-color:rgba(0,255,0,0.3); */
`;

const RoomClass = styled.div`
  width: 30px;
  text-align: center;
  /* background-color:rgba(0,0,255,0.3); */
`;

const RoomArange = styled.div`
  width: 100px;
  text-align: left;
  /* background-color:rgba(255,0,0,0.3);   */
`;
