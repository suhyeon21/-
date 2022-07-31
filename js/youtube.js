/* youtube api key = AIzaSyB9zeQFs7g9K4g_p4oCeqToiPG81AmLFhk
url : 'https://www.googleapis.com/youtube/v3/playlistItems',  //데이터 요청 주소 

//옵션값 

part : 'snippet', 

maxResults : 불러올 영상 갯수 

playlistId : 재생목록 아이디 

AIzaSyB9zeQFs7g9K4g_p4oCeqToiPG81AmLFhk
*/

const main = document.querySelector("main");
const key = "AIzaSyB9zeQFs7g9K4g_p4oCeqToiPG81AmLFhk";

const playlistId = "PLUTOYlZjKt_ZJJO4HwADJIalRw28uqXVe";
const num = 4;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

createList(url);

main.addEventListener("click", (e) => {
  e.preventDefault();

  //클릭한 대상이 부모가 a일때만 함수 실행
  //다른 부분을 클릭할 때는 return으로 함수 실행하지 않고 중지
  if (e.target.closest("a")) return;
  createPop(e);
});

//span을 클릭했을 때 팝업 제거 - body에 이벤트 위임
document.body.addEventListener("click", (e) => {
  closePop(e);
});

function createPop(e) {
  let vidId = e.target.parentElement.getAttribute("data-vid");
  console.log(vidId);
  let pop = document.createElement("aside");
  pop.innerHTML = `
  <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen width="100%" height="100%"></iframe>
  <span class="close">CLOSE</span>
  `;

  document.body.append(pop);
}

function closePop(e) {
  const pop = document.querySelector("aside");

  if (pop) {
    const close = pop.querySelector("span");
    if (e.target == close) pop.remove();
  }
}

function createList(url) {
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      console.log(json.items);
      let items = json.items;
      let result = "";

      items.forEach((item) => {
        let tit = item.snippet.title;
        let desc = item.snippet.description;
        let date = item.snippet.publishedAt.split("T")[0];

        if (tit.length > 50) tit = tit.substr(0, 50) + "...";
        if (desc.length > 150) desc = desc.substr(0, 100) + "...";

        result += `
              <article>
                <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
                  <img src="${item.snippet.thumbnails.standard.url}">
                </a>
                <div class="con">
                  <h2>${tit}</h2>
                  
                
                </div>
              </article>
      `;
      });

      main.innerHTML = result;
    });
}
