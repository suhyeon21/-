const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", (e) => {
  if (!isTxt("id", 5)) e.preventDefault(); //id
});

function isTxt(name, len) {
  if (len == undefined) len = 5;
  let input = form.querySelector(`[name=${name}]`);
  let txt = input.value;

  if (txt.length >= len) {
    const errMsgs = input.closest("td").querySelectorAll(".errMsg");
    if (errMsgs.length > 0)
      input.closest("td").querySelector(".errMsg").remove();
    return true;
  } else {
    //경고문구가 이미 있는지 해당 input의 부모 td에서 찾기
    const errMsgs = input.closest("td").querySelectorAll(".errMsg");
    //배열의 개수가 0보다 크면 있다는 뜻이므로 찾아서 제거
    if (errMsgs.length > 0)
      input.closest("td").querySelector(".errMsg").remove();
    //경고문구 - p태그 생성
    const errMsg = document.createElement("p");
    errMsg.classList.add("errMsg");
    //p태그에 경고문구 삽입
    errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
    //해당 input의 부모td를 찾아서 아랫쪽에 p태그 삽입
    input.closest("td").append(errMsg);
    //조건을 만족하지 않으면 리턴값으로 false를 전달
    return false;
  }
}

//라디오 유효성 검사 함수 정의

function isCheck(name) {
  //여러개의 요소를 변수로 담고 isChecked에 false값 설정
  let inputs = form.querySelectorAll(`[name=${name}]`);
  let isChecked = false;

  for (let el of inputs) {
    if (el.checked) isChecked = true;
  }

  //isChecked가 true라면 리턴값으로 true전달
  if (isChecked) {
    const errMsgs = inputs[0]
      .closest("td")
      .querySelectorAll(".errMsg")
      .remove();
    return true;
  } else {
    const errMsgs = inputs[0].closest("td").querySelectorAll(".errMsg");
    if (errMsgs.length > 0)
      inputs[0].closest("td").querySelector(".errMsg").remove();

    const errMsg = document.createElement("p");
    errMsg.classList.add("errMsg");
    errMsg.append("필수항목을 체크해 주세요");
    inputs[0].closest("td").append(errMsg);
    return false;
  }
}

//비밀번호 유효성 검사 함수 정의
function isPwd(name1, name2, len) {
  //비밀번호 요소를 변수로 저장
  let pwd1 = form.querySelector(`[name=${name1}]`);
  let pwd2 = form.querySelector(`[name=${name2}]`);

  //비밀번호 value값 변수로 저장
  let pwd1_val = pwd1.value;
  let pwd2_val = pwd2.value;

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_+\[\]]/;

  //조건1 두 값이 같을 경우
  //조건2 빈값이 아닐 경우
  //조건3 숫자가 포함되어있는가
  //조건4 영문자가 포함되어있는가
  //조건5 특수문자가 포함되어있는가
  //조건6 비밀번호 길이가 len이상인가
  if (
    pwd1_val === pwd2_val &&
    pwd1_val !== "" &&
    num.test(pwd1_val) &&
    eng.test(pwd1_val) &&
    spc.test(pwd1_val) &&
    pwd1_val.length >= len
  ) {
    const errMsgs = pwd1.closest("td").querySelectorAll(".errMsg");
    if (errMsgs.length > 0)
      pwd1.closest("td").querySelector(".errMsg").remove();

    return true;
  } else {
    const errMsgs = pwd1.closest("td").querySelectorAll(".errMsg");
    if (errMsgs.length > 0)
      pwd1.closest("td").querySelector(".errMsg").remove();

    const errMsg = document.createElement("p");
    errMsg.classList.add("errMsg");
    errMsg.append(
      `비밀번호는 ${len}글자 이상, 영문자, 숫자, 특수문자를 포함해 동일하게 입력해 주세요`
    );
    pwd1.closest("td").append(errMsg);
    return false;
  }
}
