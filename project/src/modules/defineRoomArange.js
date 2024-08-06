const defineRoomArange = (startRoomNum, startPersonnel, endRoomNum, endPersonnel) => {
  let startPersonnelText = startPersonnel === 6 ? "" : `(${startPersonnel})`;
  let endPersonnelText = endPersonnel === 6 ? "" : `(${endPersonnel})`;
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

export default defineRoomArange;
