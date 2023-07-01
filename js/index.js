const 정답 = "APPLE";

let index = 0; // index : 입력 칸 (한칸 단위)
let attempts = 0; // attempts : 몇번 시도 했는지 (한줄 단위)

function appStart() {
  // 다음줄로 이동
  const nextLine = () => {
    attempts += 1;
    index = 0;
  };

  const 게임_종료 = () => {
    window.removeEventListener("keydown", handleKeydown);
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

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      /* ${attempts}${index} -> 몇번째 시도에 몇번째 칸에 업데이트*/
      `.board-block[data-index='${attempts}${index}']`
    );

    if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else if (index === 5) return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  window.addEventListener("keydown", handleKeydown);
}

appStart();
