const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

class PrizeInformation {
  constructor(String1, String2, number1, number2, String3, String4, Data) {
    prizeImageSrc: String1;
    prizeName: String2;
    prizeNumber: number;
    prizeSpecies: number;//1:潮牌、2：美妆、3：数码、4：美食、5：好玩
    activitiyInformation: String3;
    creatorPhoneNumber: String4;
    beginTime: Time1
  }
}