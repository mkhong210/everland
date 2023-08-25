const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();

const div = document.querySelector(".testDiv");
const div2 = document.querySelector(".testDiv2");
const div3 = document.querySelector(".testDiv3");
const div4 = document.querySelector(".testDiv4");
const div5 = document.querySelector(".testDiv5");


const calcDate = `${String(year).padStart(2, "0")}${String(month+1).padStart(2, "0")}${String(day).padStart(2, "0")}`;
const calcTime = `${String(hour-1).padStart(2, "0")}30`;


fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=ngqOdvltpGhzMol6rHjhjR06JQdvHSi2z8gtrRpZxqrP1ACdp1TbqPTZ1MhAIMxHZ8nw6BRDHgI%2BMcgLq85pbA%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${calcDate}&base_time=${calcTime}&nx=64&ny=121`)
.then(res => res.json())
.then(data => {
    const sky = data.response.body.items.item[18].fcstValue;


    function submitSky() {
    }
    if(sky == 1) {
        div2.innerText = "현재 하늘상태 맑음🌞"
    } else if (sky == 3) {
        div2.innerText = "현재 하늘상태 구름많음☁"
    } else if (sky == 4) { 
        div2.innerText = "현재 하늘상태 흐림⛅"
    } else {
        div2.innerText = "일시적으로 불러올 수 없습니다."
    }
    setInterval(submitSky, 500);
})

fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=ngqOdvltpGhzMol6rHjhjR06JQdvHSi2z8gtrRpZxqrP1ACdp1TbqPTZ1MhAIMxHZ8nw6BRDHgI%2BMcgLq85pbA%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${calcDate}&base_time=${calcTime}&nx=64&ny=121`)
.then(res => res.json())
.then(data => {
    const temp = data.response.body.items.item[3].obsrValue;

    function submitTemp() {
        div.innerText = `현재 에버랜드의 기온은${temp}도 입니다.`
    }
    
    setInterval(submitTemp, 500);
}
)

fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=ngqOdvltpGhzMol6rHjhjR06JQdvHSi2z8gtrRpZxqrP1ACdp1TbqPTZ1MhAIMxHZ8nw6BRDHgI%2BMcgLq85pbA%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${calcDate}&base_time=0500&nx=64&ny=121`)
.then(res => res.json())
.then(data => {
    const rainy = data.response.body.items.item[7].fcstValue;
    const tmn = data.response.body.items.item[301].fcstValue;
    const tmx = data.response.body.items.item[120].fcstValue;

    function submitRainy() {
        div3.innerText = `오늘의 강수확률${rainy}%
        최저${tmn}도 최고${tmx}도`
    }
    
    setInterval(submitRainy, 500);
})


fetch("./data.json")
.then(res => res.json())
.then(data => {
    let ques = data.questions;
    ques.forEach(function(quesV, quesK) {
        const bttn = document.createElement("button");
        bttn.classList.add("bttns");
        bttn.dataset.name = (`버튼${quesK}`);
        div4.appendChild(bttn);

        for(const quesKey in quesV) {
            bttn.innerText = quesKey;
        }
    });

    const bttns = document.querySelectorAll(".bttns");
    bttns.forEach(function(bttnsV, bttnsK) {
        bttnsV.addEventListener("click", function(event) {
            div5.innerHTML = "";
            const bttnsText = bttnsV.innerText;
            console.log(ques[bttnsK][bttnsText]);
            const answers = document.createElement("span");
            div5.appendChild(answers);
            answers.innerText = ques[bttnsK][bttnsText];
        })
    });
})