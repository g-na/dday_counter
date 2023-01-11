const msgBox = document.querySelector("#inform-msg");
const container = document.querySelector("#d-day-counter");
container.style.display = "none";
//msgBox.textContent = "d-day를 입력해주세요.";
msgBox.innerHTML = "<h3>D-day를 입력해주세요.";
const intervalIdArr = [];

const dateFormMaker = function () {
  const year = document.querySelector("#date-input-year").value;
  const month = document.querySelector("#date-input-month").value;
  const day = document.querySelector("#date-input-day").value;

  //const dateFormat = year + '-' + month + '-' + day;
  const dateFormat = `${year}-${month}-${day}`; // 템플릿 리터럴
  return dateFormat;
};

const counterMaker = function (inputDate) {
  const targetDate = new Date(inputDate).setHours(0, 0, 0, 0); //setHours(0,0,0,0) 자정을 기준으로 시각 설정
  const nowDate = new Date();
  const temp = (targetDate - nowDate) / 1000; // return된 초 단위 결과값

  if (temp <= 0) {
    msgBox.style.display = "flex";
    container.style.display = "none";
    setClearInterval();
    return (msgBox.innerHTML = "<h3>타이머가 종료되었습니다.</h3>");
  } else if (isNaN(temp)) {
    // Date() 생성자 함수는 날짜 값만 반환. 날짜가 아닌 경우 NaN반환
    //NaN값 확인을 위해서는 isNaN() 함수 사용, 비교 연산자 이용 불가
    msgBox.style.display = "flex";
    container.style.display = "none";
    setClearInterval();
    return (msgBox.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>");
  }

  const resultObj = {
    days: Math.floor(temp / 3600 / 24), //Math.floor 소수점 이하 버림
    hours: Math.floor(temp / 3600) % 24,
    minutes: Math.floor(temp / 60) % 60,
    seconds: Math.floor(temp) % 60,
  };

  //   const documentObj = {
  //     rdays: document.getElementById("days"),
  //     rhours: document.getElementById("hours"),
  //     rmin: document.getElementById("minutes"),
  //     rsec: document.getElementById("seconds"),
  //   };

  const resKeys = Object.keys(resultObj);
  const docArr = ["days", "hours", "minutes", "seconds"]; //HTML id
  //const docKeys = Object.keys(documentObj);

  //   for (let i = 0; i < resKeys.length; i++) {
  //     documentObj[docKeys[i]].textContent = resultObj[resKeys[i]];
  //   }

  //   let index = 0;
  //   for (let key in documentObj) {
  //     documentObj[key].textContent = resultObj[resKeys[index]];
  //     index++;
  //   }

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of docArr) {
    const remainingTime = format(resultObj[resKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
};

const starter = function () {
  const inputDate = dateFormMaker();
  container.style.display = "flex";
  msgBox.style.display = "none";
  setClearInterval();
  counterMaker(inputDate); // setInterval 최초 실행시 1초 간격 사이 0시간 0분 0초 나오는 현상 해결
  // setInterval(x,y): x함수를 y초마다 계속해서 반복
  // 실행할 때마다 interval에 고유 id값이 반영됨
  const intervalId = setInterval(() => {
    counterMaker(inputDate);
  }, 1000);
  //()=> 화살표 함수, 익명함수
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  //counterMaker 함수에서  사용중인 데이터 초기화
  for (let j = 0; j < intervalIdArr.length; j++) {
    clearInterval(intervalIdArr[j]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  msgBox.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";
  msgBox.style.display = "flex";
  setClearInterval();
};
