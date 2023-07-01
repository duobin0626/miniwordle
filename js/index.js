const 정답 = "APPLE";

let index = 0; // index : 입력 칸 (한칸 단위)
let attempts = 0; // attempts : 몇번 시도 했는지 (한줄 단위)
let timer;

function appStart() {
  // 게임오버 화면 출력
  const 게임오버_화면 = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:44vw; background-color:blue; color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const 게임_종료 = () => {
    window.removeEventListener("keydown", handleKeydown);
    게임오버_화면();
    clearInterval(timer);
  };

  // 다음줄로 이동
  const nextLine = () => {
    if (attempts === 6) return 게임_종료();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    //정답확인
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }

    if (맞은_갯수 === 5) 게임_종료();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const 이전_블럭 = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      이전_블럭.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']` /* ${attempts}${index} -> 몇번째 시도에 몇번째 칸에 업데이트*/
    );

    // key 확인용 로그
    console.log(e.key, e.keyCode);

    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0"); // 1. 숫자이기 때문에 문자열로 변환
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".timer-text");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
