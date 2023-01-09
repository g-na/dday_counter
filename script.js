const msgBox = document.querySelector("#inform-msg");
const container = document.querySelector("#d-day-counter");
//container.style.display = "none";
//msgBox.textContent = "d-day를 입력해주세요.";
msgBox.innerHTML = "<h3>D-day를 입력해주세요.";

const dateFormMaker = function () {
  const year = document.querySelector("#date-input-year").value;
  const month = document.querySelector("#date-input-month").value;
  const day = document.querySelector("#date-input-day").value;

  //const dateFormat = year + '-' + month + '-' + day;
  const dateFormat = `${year}-${month}-${day}`; // 템플릿 리터럴
  return dateFormat;
};

const counterMaker = function () {
  const inputDate = dateFormMaker();
  const targetDate = new Date(inputDate).setHours(0, 0, 0, 0); //setHours(0,0,0,0) 자정을 기준으로 시각 설정
  const nowDate = new Date();
  const temp = (targetDate - nowDate) / 1000; // return된 초 단위 결과값

  if (temp <= 0) {
    return (msgBox.innerHTML = "<h3>타이머가 종료되었습니다.</h3>");
  } else if (isNaN(temp)) {
    // Date() 생성자 함수는 날짜 값만 반환. 날짜가 아닌 경우 NaN반환
    //NaN값 확인을 위해서는 isNaN() 함수 사용, 비교 연산자 이용 불가
    return (msgBox.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>");
  }

  const days = Math.floor(temp / 3600 / 24); //Math.floor 소수점 이하 버림
  const hours = Math.floor(temp / 3600) % 24;
  const minutes = Math.floor(temp / 60) % 60;
  const seconds = Math.floor(temp) % 60;

  const rdays = document.getElementById("days");
  const rhours = document.getElementById("hours");
  const rmin = document.getElementById("minutes");
  const rsec = document.getElementById("seconds");

  rdays.textContent = days;
  rhours.textContent = hours;
  rmin.textContent = minutes;
  rsec.textContent = seconds;

  console.log(days, hours, minutes, seconds);
};
