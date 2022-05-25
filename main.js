'use strict';

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// js scroll position 으로 검색 결과 : window.scrollY
// javascript element size : getBoundingClientRect()
// Make navbar transparent when it is on the top
document.addEventListener('scroll', ()=>{
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark')
    }
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null){
        return;
    }
    console.log(event.target.dataset.link);
    navbarMenu.classList.remove('open')
    scrollIntoView(link)
})

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('open');
})

//내가 쓴코드
// const contactBtn = document.querySelector('.home__contact');
// contactBtn.addEventListener('click', (event) => {
//     const target = event.target;
//     const link = target.dataset.link;
//     if (link == null){
//         return;
//     }
//     const scrollTo = document.querySelector(link);
//     scrollTo.scrollIntoView({behavior: "smooth"});
// })

//컨텍미 버튼을 누르면 컨텍트 페이지로 스크롤이 되게 만들어보자
//일단 버튼에 온클릭 이벤트를 줘야 할거 같고
//온클릭을 하면 실행되는 함수에서 
//스크롤링을 시켜주면 될거 같다

//Handle click on "contact me" button on home
const homContactBtn = document.querySelector('.home__contact');
homContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact')
})



//홈 화면의 반 정도를 지나면
//홈화면의 글자가 투명해 지는 효과를 주자!
//

//내가 쓴 코드 (홈크기의 절반정도 스크롤내리면 점점 투명해 지는효과)
// const home = document.querySelector('#home');
// const homeHeight = home.getBoundingClientRect().height;

// document.addEventListener('scroll', ()=>{
//     if (window.scrollY > homeHeight) {
//         home.classList.add('home-limpidity');
//     } else {
//         home.classList.remove('home-limpidity')
//     }
// })

//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', ()=>{
    //homeHeight은 408
    home.style.opacity = 1 - window.scrollY / homeHeight;
})
//에로우 버튼을 누르면 Home으로 스크롤되는 것과
//스크롤을 내리면 에로우 버튼이 생기는것 (클래스를 바꿔주는것)
// 홈하이트 만큼 스크롤이 되면 에로우 버튼이 보여야 한다.
// 그게 아니라면 에로우 버튼은 보이지 않아야 한다. 


// const arrowBtn = document.querySelector('#arrowall');

// document.addEventListener('scroll', ()=>{
    //스크롤이 홈의 높이 보다 커지면 에로우 버튼이 생겨야 한다. 
    //에로우 버튼을 숨겨주는 하이드 클래스를 제거함으로서 에로우 클래스만 남게 되고
    //보이게 된다. 
//     if (window.scrollY > homeHeight) {
//         arrowBtn.classList.remove('arrow__hide')
//     } else {
//         arrowBtn.classList.add('arrow__hide')
//     }
// })

//에로우 버튼을 클릭하면 홈으로 이동해야 한다.
// arrowBtn.addEventListener('click', () => {
//     scrollIntoView('#home')
// })
//에로우 업 버튼을 누르면 Home으로 돌아가는 기능을 만들어 보자
//home의 높이 만큼 스크롤링이 되었을때, arrow 버튼이 보이게 된다
//그리고 그 에로우 버튼을 누르면 Home으로 스크롤링 되는 기능을 만들자
//그 버튼은 무조건 화면의 오른쪽 하단에서 보여야 한다. 기본클래스는 하이드 상태여야 한다
//그러다가 스크롤링이 되면 보여지는 클래스를 추가 한다. 여기에 서서히 보여야 하니까
//트랜지션도 추가 한다. 



// show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=>{
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}

//Handle click on the "arrow up" button 
arrowUp.addEventListener('click', ()=>{
    scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        projects.forEach((project) => {
            console.log(`type : ${project.dataset.type}`);
        if (filter === '*' || filter === project.dataset.type) {
            project.classList.remove('invisible');
        } else {
            project.classList.add('invisible');
        }
        });
        projectContainer.classList.remove('anim-out');
    }, 300)
});