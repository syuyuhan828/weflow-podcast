import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.core.js";
import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger.js";
import { CSS3DRenderer, CSS3DObject } from "https://cdn.skypack.dev/three-css3d";
import {CSSPlugin} from "https://cdn.skypack.dev/gsap/CSSPlugin";

gsap.registerPlugin(CSSPlugin, ScrollTrigger);
document.querySelector(".IMG").style.display = "none"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(0, 0, 600);

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'fixed'; // 讓scroll可以成功的重點
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
document.body.appendChild(renderer.domElement);

//前景&後景
const firstImg = document.querySelector(".firstImgContainer");
const firstClone = firstImg.cloneNode(true);
firstClone.style.position = 'fixed';
firstClone.style.width = "150vw";
firstClone.style.height = "150vh";
firstClone.innerHTML = "&nbsp;"
firstClone.style.overflow = "hidden";
firstClone.style.background = "url('../img/start-bg.webp') center / cover no-repeat"
const firstObj = new CSS3DObject(firstClone);
firstObj.position.set(0, 0, 0);
scene.add(firstObj);


const lastImg = document.querySelector('.lastImgContainer');
const lastImgClone = lastImg.cloneNode(true);
lastImgClone.style.position = 'fixed';
lastImgClone.style.width = "150vw";
lastImgClone.style.height = "150vh";
lastImgClone.innerHTML = "&nbsp;"
lastImgClone.style.overflow = "hidden";
lastImgClone.style.background = "url('../img/bg_space.webp') center / cover no-repeat"
const lastImgObj = new CSS3DObject(lastImgClone);
lastImgObj.position.set(0, 0, -100);
scene.add(lastImgObj);
const lastImgZoffset = lastImgObj.position.z - camera.position.z


const rabbitImg = document.querySelector(".rabbitImgContainer");
const rabbitImgClone = rabbitImg.cloneNode(true);
rabbitImgClone.style.position = 'fixed';
rabbitImgClone.style.width = "400px";
rabbitImgClone.style.height = "400px";
rabbitImgClone.style.backgroundImage = "url('../img/weflow-avatar.png')"
rabbitImgClone.style.transformOrigin = "bottom left"
const rabbitImgObj = new CSS3DObject(rabbitImgClone);
rabbitImgObj.position.set(30, -15, 60);
scene.add(rabbitImgObj);


const rabbitImgZOffset = rabbitImgObj.position.z - camera.position.z;

gsap.to(rabbitImgObj.position, {
    x: "+= 20",
    y: "+= 30",
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "power1.ease",
})

gsap.to(rabbitImgObj.element, 2, {
    rotation: 90,
    transformOrigin: "left center",
})

const sloganImg = document.querySelector(".sloganImgContainer");
const sloganImgClone = sloganImg.cloneNode(true);
sloganImgClone.style.width = 'fixed';
sloganImgClone.style.backgroundImage = "url('../img/weflow-slogan.png')"
sloganImgClone.style.backgroundPosition = 'center';
sloganImgClone.style.backgroundSize = 'contain';
sloganImgClone.style.backgroundRepeat = 'no-repeat';
sloganImgClone.style.width = "40vw";
sloganImgClone.style.height = "30vh";
// sloganImgClone.style.border = "1px solid #fff"
const sloganImgObj = new CSS3DObject(sloganImgClone);
sloganImgObj.position.set(-400, -200, 10)
const sloganZoffset = sloganImgObj.position.z - camera.position.z;
scene.add(sloganImgObj);

gsap.from(sloganImgObj.element, {
    opacity: 0,
    duration: 1.2,
    ease: "back out(2.0)",
})

gsap.from(sloganImgObj.scale, {
    x: 0.5,
    y: 0.5,
    z: 1,
    duration: 1.2,
    ease: "back.out(2.0)"
});


const aboutUs = document.querySelector(".aboutUsSection")
const aboutUsClone = aboutUs.cloneNode(true);
aboutUsClone.style.position = "fixed";
aboutUsClone.style.backgroundSize = 'contain';
aboutUsClone.style.backgroundRepeat = 'no-repeat';
aboutUsClone.style.backgroundPosition = 'center';
aboutUsClone.style.width = "40vw";
aboutUsClone.style.height = "40vh";
aboutUsClone.style.color = "white"
// aboutUsClone.style.border = "1px solid white";
aboutUsClone.style.fontFamily = "Verdana";
const aboutUsObj = new CSS3DObject(aboutUsClone);
aboutUsObj.position.set(-400, -10, 0);
scene.add(aboutUsObj)
const aboutUsObjZOffset = aboutUsObj.position.z - camera.position.z;

const aboutUsh2 = aboutUsClone.querySelector("h2");
aboutUsh2.style.fontSize = "7vw";
aboutUsh2.style.margin = "0 0 3vh";
const aboutUsh4 = aboutUsClone.querySelector("h4");
aboutUsh4.style.margin = "1vh 0 0";
aboutUsh4.style.fontSize = "24px";
const aboutUsp = aboutUsClone.querySelector("p");
aboutUsp.style.margin = "3vh 0 0"
aboutUsp.style.fontSize = "18px";

aboutUsh2.style.opacity = 0;
aboutUsh4.style.opacity = 0;
aboutUsp.style.opacity  = 0;


const iceCreamPlanetImg = document.querySelector(".iceCreamPlanet")
const iceCreamPlanetClone = iceCreamPlanetImg.cloneNode(true);
iceCreamPlanetClone.style.position = "fixed";
iceCreamPlanetClone.style.width = "800px";
iceCreamPlanetClone.style.height = "800px";
iceCreamPlanetClone.style.background = 'url("./img/icecream-planet.png") center / cover no-repeat';
iceCreamPlanetClone.style.opacity = "1";
const iceCreamPlanetObj = new CSS3DObject(iceCreamPlanetClone);
iceCreamPlanetObj.position.set(9999, -200, 0);
scene.add(iceCreamPlanetObj);
const iceCreamZOffset = iceCreamPlanetObj.position.z - camera.position.z ;





let z_max = 600;
let z_min = 0;
//100vh結束動畫
ScrollTrigger.create({
    trigger: ".scrollController",
    start: "top+=100vh",
    end: "top+=300vh",
    scrub: 1, 
    // markers: true,
    onUpdate: (self) => {
        const progress = self.progress;
        const z = z_max - progress * (z_max - z_min);
        camera.position.set(0, 0, z);  
        camera.lookAt(0, 0, 0);
        
        // 隨鏡頭移動物件
        lastImgObj.position.z = camera.position.z + lastImgZoffset;

        
        const rotationRadian = progress * Math.PI * 2
        rabbitImgObj.rotation.z = rotationRadian;
    }
});

gsap.to(rabbitImgObj.rotation, {
    z: Math.PI * 2,
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=100vh",
        end: "top+=300vh",              
        scrub: 1,
        // markers: true             
    },
    onUpdate: () => {
        rabbitImgObj.position.z = camera.position.z + rabbitImgZOffset
    }
});


// 0vh ~ 100vh 動畫 (slogan 淡出, 兔子吸入黑洞)
//太空人的scrub(延遲)要1
gsap.to(sloganImgObj.element, {
    filter: "drop-shadow(0 0 20px #00fff0)",
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: 1,
    onUpdate: () =>{
        sloganImgObj.position.z = camera.position.z + sloganZoffset;
    }
})

gsap.to([aboutUsh2, aboutUsh4, aboutUsp], {
    opacity: 1,
    y: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power3.out",
    onUpdate: () =>{
        aboutUsObj.position.z = camera.position.z + aboutUsObjZOffset;
    },
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=400vh",
        end: "top+=600vh",
        scrub: true,
        // markers: true
    }
});

// aboutUsObj quit
gsap.to(aboutUsObj.element, {
    opacity: 0,
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=1120vh", 
        end: "top+=1200vh",
        scrub: true
    }
});

//Planet come-in effect
// 確保初始位置在畫面外（左邊很遠）
gsap.to(iceCreamPlanetObj.position, {
    x: 450,
    y: -250,
    onUpdate: () => {
        iceCreamPlanetObj.position.z = camera.position.z + iceCreamZOffset;
    },
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=400vh",
        end: "top+=420vh",
        scrub: true,
        // markers: true  
    }
});

gsap.fromTo(iceCreamPlanetObj.element, 
    { opacity: 0 },
    {
        opacity: 1,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=400vh",
            end: "top+=420vh",
            scrub: true
        }
    }
);
// //Planet Leave
gsap.to(iceCreamPlanetObj.element, {
    opacity: 0,
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=1100vh", 
        end: "top+=1200vh",
        scrub: true
    }
})

//page3
const serviceSection = document.querySelector(".serviceSection");
const serviceClone = serviceSection.cloneNode(true);
serviceClone.style.position = "fixed";
serviceClone.style.backgroundSize = 'contain';
serviceClone.style.backgroundRepeat = 'no-repeat';
serviceClone.style.backgroundPosition = 'center';
serviceClone.style.width = "40vw";
serviceClone.style.height = "40vh";
serviceClone.style.color = "white"
serviceClone.style.fontFamily = "Verdana";
// serviceClone.style.border = "2px solid #fff"
const serviceObj = new CSS3DObject(serviceClone);
serviceObj.position.set(-400, -10, 0);
scene.add(serviceObj)
const serviceObjZOffset = serviceObj.position.z - camera.position.z;

const serviceh2 = serviceClone.querySelector("h2");
serviceh2.style.fontSize = "7vw";
serviceh2.style.margin = "0 0 3vh";
const serviceh4 = serviceClone.querySelector("h4");
serviceh4.style.margin = "1vh 0 0";
serviceh4.style.fontSize = "24px";
const servicep = serviceClone.querySelector("p");
servicep.style.margin = "3vh 0 0"
servicep.style.fontSize = "18px";

serviceh2.style.opacity = "0";
serviceh4.style.opacity = "0";
servicep.style.opacity = "0";

gsap.to([serviceh2, serviceh4, servicep], {
    opacity: 1,
    y: 0,
    duration: 0.1,
    ease: "power3.out",
    onUpdate: () => {
        serviceObj.position.z = camera.position.z + serviceObjZOffset;
    },
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=1220vh",
        end: "top+=2000vh",
        toggleActions: "play reverse play reverse",
        // markers: true
    }
});


const servicePlanetImg = document.querySelector(".servicePlanet");
const servicePlanetClone = servicePlanetImg.cloneNode(true);
servicePlanetClone.style.position = "fixed";
servicePlanetClone.style.width = "800px";
servicePlanetClone.style.height = "800px";
servicePlanetClone.style.background = 'url("../img/service-planet.png") center / cover no-repeat';
servicePlanetClone.style.opacity = "1";
const servicePlanetObj = new CSS3DObject(servicePlanetClone);
servicePlanetObj.position.set(500, -200, 0);
scene.add(servicePlanetObj);
const serviceZOffset = servicePlanetObj.position.z - camera.position.z ;

gsap.to(servicePlanetObj.position, {
    x: 450,
    y: -250,
    onUpdate: () => {
        servicePlanetObj.position.z = camera.position.z + serviceZOffset;
    },
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=1220vh",
        end: "top+=1800vh",
        scrub: true,
        toggleActions: "play reverse play reverse"
        // markers: true  
    }
});

gsap.fromTo(servicePlanetObj.element, 
    { opacity: 0 },
    {
        opacity: 1,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=1200vh",
            end: "top+=1800vh",
            scrub: true,
            toggleActions: "play reverse play reverse"
        }
    }
);
//planet leave
gsap.to(servicePlanetObj.element, {
    opacity: 0,
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=1820vh", 
        end: "top+=2000vh",
        scrub: true,
        toggleActions: "play reverse play reverse"
    }
})

const cards = [];

// 初始化卡片，加入 Z 距離計算
function create3DCard(className, targetX) {
    const dom = document.querySelector(`.${className}`);
    const clone = dom.cloneNode(true);
    clone.style.opacity = "0"; // 初始透明
    clone.style.width = "300px";
    clone.style.height = "400px";
    clone.style.background = "rgba(255,255,255,0.1)";
    clone.style.borderRadius = "16px";
    clone.style.backdropFilter = "blur(10px)";
    clone.style.border = "1px solid white";
    clone.style.color = "white";
    clone.style.padding = "20px";

    const obj = new CSS3DObject(clone);
    obj.position.set(-1000, 0, 0); // 初始在螢幕外左側
    obj.userData.targetX = targetX;
    obj.userData.zOffset = -600; // 相對攝影機距離（可調）

    scene.add(obj);
    cards.push(obj);
    return obj;
}

// 建立三張卡片
const card1 = create3DCard("price-card1", -400);
const card2 = create3DCard("price-card2", 0);
const card3 = create3DCard("price-card3", 400);


// 卡片進場動畫（x 移動 + opacity 淡入）
[card1, card2, card3].forEach((card, index) => {
    gsap.to(card.position, {
        x: card.userData.targetX,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=2100vh",
            end: "top+=2200vh",
            scrub: true,
        }
    });

    gsap.to(card.element.style, {
        opacity: 1,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=2100vh",
            end: "top+=2900vh",
            scrub: true,
        },
        delay: index * 0.1
    });
});

let rabbitSlideProgress = null;
const rabbitStartX = rabbitImgObj.position.x;
const rabbitStartY = rabbitImgObj.position.y;
const rabbitEndX = rabbitStartX + window.innerWidth * 0.4;
const rabbitEndY = rabbitStartY - window.innerHeight * 0.2;

gsap.to({}, {
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=2100vh",
        end: "top+=2200vh",
        ease: "power1.Out",
        scrub: true,
        onUpdate: (self) => {
            rabbitSlideProgress = self.progress; // 0~1
        },
        onLeave: () => rabbitSlideProgress = 1,
        onEnterBack: () => rabbitSlideProgress = 0,
        onLeaveBack: () => rabbitSlideProgress = null,
        // markers: true,
    }
});





function animate(){
    requestAnimationFrame(animate);
    

    // slogan 跟著 camera 移動
    sloganImgObj.position.z = camera.position.z + sloganZoffset;

    // 透明度控制
    const z = camera.position.z;
    const fadeStart = 400;
    const fadeEnd = 500;
    let opacity = 1;
    if (z <= fadeStart && z >= fadeEnd) {
        opacity = (z - fadeEnd) / (fadeStart - fadeEnd);
    } else if (z < fadeEnd) {
        opacity = 0;
    }
    sloganImgObj.element.style.opacity = opacity;

    cards.forEach(card => {
        card.position.z = camera.position.z + card.userData.zOffset;
    });

    if (rabbitSlideProgress !== null) {
        rabbitImgObj.position.x = rabbitStartX + (rabbitEndX - rabbitStartX) * rabbitSlideProgress;
        rabbitImgObj.position.y = rabbitStartY + (rabbitEndY - rabbitStartY) * rabbitSlideProgress;
    }

    renderer.render(scene, camera);
}




window.addEventListener("DOMContentLoaded", e=>{
    animate();
})
// animate();