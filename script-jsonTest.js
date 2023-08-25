fetch("./data/restaurant.json")
.then(res => res.json())
.then(data => {
    const tDiv = document.querySelector(".testDiv");
    const tDiv2 = document.querySelector(".testDiv2");
    const resList = data.레스토랑;
    let menu = 0;
    let resDetail = 0;
    let resMenus = 0;

    resList.forEach((resListV, resListK) => {
        // 객체요소 생성
        const name = document.createElement("span");
        
        // 생성한 객체 화면에 뿌리기
        tDiv.appendChild(name);
        // 객체에 class이름 추가
        tDiv.classList.add("hehe")
        // 객체에 data에서 text 불러와서 추가
        name.innerText = `${resListV.name} ${resListV.mainMenu}`;
        // 이미지 주소 가져오기(뿌리기)
        tDiv.setAttribute("href", resListV.thumb)
        tDiv.getAttribute("href")



        // 혹시라도 겹 제이슨일 경우
        // name.addEventListener("click", function(e) {
        //     tDiv2.innerHTML = "";
        //     tDiv2.classList.toggle("active")
        //     resListV.상세설명.메뉴소개.forEach(function(listV, listK) {
        //         menu = document.createElement("span");
        //         tDiv2.appendChild(menu);
        //         menu.innerText = listV.이름;
        //         console.log(listV.이름)
        //     })
        // })
    })
})

