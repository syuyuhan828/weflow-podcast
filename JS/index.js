import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.core.js";
import gsap from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger.js";
import { CSS3DRenderer, CSS3DObject } from "https://cdn.skypack.dev/three-css3d";
import {CSSPlugin} from "https://cdn.skypack.dev/gsap/CSSPlugin";



/*
Observation: 可以加入一些延遲的滑動感覺
Observation: 可以加入更多的動畫小元件
Observation: Price Card可以做Hover特效
*/
gsap.registerPlugin(CSSPlugin, ScrollTrigger);

// 1. 隱藏原本 DOM 圖層
document.querySelector(".IMG").style.display = "none";


// 2. 建立場景與相機
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.set(0, 0, 600);

// 3. 建立 CSS3DRenderer 並設定尺寸
const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;
document.body.appendChild(renderer.domElement);

// 3.1 建立Three.js Hover effect

// 4. 前景 & 後景 clone + 加入 scene
const firstImg = document.querySelector(".img-container-1"); //前景
const firstClone = firstImg.cloneNode(true);
firstClone.style.position = "static";
firstClone.style.width = "150vw";
firstClone.style.height = "150vh";
firstClone.innerHTML = "&nbsp;";
firstClone.style.overflow = "hidden";
const firstObj = new CSS3DObject(firstClone);
firstObj.position.set(0, 0, 0);
scene.add(firstObj);

const lastImg = document.querySelector(".img-container-2"); //後景
const lastClone = lastImg.cloneNode(true);
lastClone.style.position = "static";
lastClone.style.width = "1000vw";
lastClone.style.height = "1000vh";
lastClone.innerHTML = "&nbsp;";
const lastObj = new CSS3DObject(lastClone);
lastObj.position.set(0, 0, -2000);
scene.add(lastObj);

// 5. 兔子機器人建立 &動畫
const rabbitImg = document.querySelector('.rabbit-img-container')
const rabbitImgClone = rabbitImg.cloneNode(true);
const initRabbitX = 30;
const initRabbitY = -400; //-15


rabbitImgClone.style.position = "static";
rabbitImgClone.style.width = "400px";
rabbitImgClone.style.height = "400px";
const rabbitImgObj = new CSS3DObject(rabbitImgClone);
const rabbitZOffset = rabbitImgObj.position.z - camera.position.z; 
rabbitImgObj.position.set(initRabbitX, initRabbitY, 60);
scene.add(rabbitImgObj);
rabbitImgClone.style.transformOrigin = "bottom left"

let rabbitFloatTween = gsap.to(rabbitImgObj.position, {
    y: "+=40",
    x: "+=50",
    duration: 5,
    yoyo: true,
    repeat: -1,
    ease: "power1.ease",
})





// 6. WeFlow 標語物件建立
const sloganImg = document.querySelector(".slogan-text-container");
const sloganImgClone = sloganImg.cloneNode(true);
sloganImgClone.style.position = "static";
sloganImgClone.style.backgroundSize     = 'contain';
sloganImgClone.style.backgroundRepeat   = 'no-repeat';
sloganImgClone.style.backgroundPosition = 'center';
sloganImgClone.style.width = "40vw";
sloganImgClone.style.height = "30vh";

const sloganImgObj = new CSS3DObject(sloganImgClone);
sloganImgObj.position.set(-300, -200, 10)
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

gsap.to(sloganImgObj.element, {
    filter: "drop-shadow(0 0 20px #00fff0)",
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1  // 等淡入結束再開始
});

// 8. 建立about-us 物件
const aboutUsData = {
    title: "ABOUT US",
    subtitle: "Dive into The WeFlow Universe",
    content: "At WeFlow, we believe in the transformative power of conversation. An intentional, well-guided dialogue can unlock insights, forge stronger connections, and accelerate progress in any project or learning endeavor.",
    a: "JOIN US NOW"
}

const renderAboutUs = (data) => {
    return `
        <div class="about-us-container">
        <h2 style="font-size: 60px; line-height: 60px; padding: 0; margin: 20px 0;">${data.title}</h2>
        <h3 style="font-size: 32px; line-height: 32px; margin: 0; padding: 0">${data.subtitle}</h3>
        <p style="font-size: 26px;">${data.content}</p>
        <a href="" class="join-us-link" style="text-decoration: none; color: white; padding: 5px 10px; background-color: rgba(105, 105, 105, 0.4); margin: 0; border-radius: 20px; border: 1px solid #fff; cursor: pointer">${data.a}</a>
        </div>
    `;
};

const aboutUsHTML = renderAboutUs(aboutUsData);

const aboutUsImg = document.querySelector(".about-us-container");


const aboutUsImgClone = aboutUsImg.cloneNode(true);
aboutUsImgClone.innerHTML= aboutUsHTML
aboutUsImgClone.style.position = "static";
aboutUsImgClone.style.backgroundSize     = 'contain';
aboutUsImgClone.style.backgroundRepeat   = 'no-repeat';
aboutUsImgClone.style.backgroundPosition = 'center';
aboutUsImgClone.style.width = "30vw";
aboutUsImgClone.style.height = "60vh";
aboutUsImgClone.style.color = "white"

//玻璃遮罩
aboutUsImgClone.style.background = "rgba(255, 255, 255, 0.15)";
aboutUsImgClone.style.backdropFilter = "blur(10px)";
aboutUsImgClone.style.webkitBackdropFilter = "blur(10px)";
aboutUsImgClone.style.borderRadius = "20px";
aboutUsImgClone.style.border = "1px solid rgba(255, 255, 255, 0.2)";
aboutUsImgClone.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
aboutUsImgClone.style.padding = "20px 10px";
aboutUsImgClone.style.opacity = "0";


//一開始不要載入
const aboutUsh2 = aboutUsImgClone.querySelector("h2");
const aboutUsh3 = aboutUsImgClone.querySelector("h3");
const aboutUsp = aboutUsImgClone.querySelector("p");
const aboutUsa = aboutUsImgClone.querySelector("a");
aboutUsh2.style.display = "none";
aboutUsh3.style.display = "none";
aboutUsp.style.display  = "none";
aboutUsa.style.display = "none";

//製造元件
const aboutUsImgObj = new CSS3DObject(aboutUsImgClone);
const aboutUsZOffset = aboutUsImgObj.position.z - camera.position.z; 
aboutUsImgObj.position.set(-400, -10, -250);
scene.add(aboutUsImgObj);


//9. about us 星球物件
const iceCreamPlanetImg = document.querySelector(".planetImgContainer1")
const iceCreamPlanetClone = iceCreamPlanetImg.cloneNode(true);

iceCreamPlanetClone.style.position = "static";
iceCreamPlanetClone.style.width = "800px";
iceCreamPlanetClone.style.height = "800px";
iceCreamPlanetClone.style.backgroundImage = 'none';
const iceCreamPlanetObj = new CSS3DObject(iceCreamPlanetClone);
iceCreamPlanetObj.position.set(500, -300, -250);
scene.add(iceCreamPlanetObj);

gsap.to(iceCreamPlanetObj.position, {
    y: "+=20",
    x: "+=40",
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: "power1.ease",
})

gsap.to(iceCreamPlanetObj.scale, {
    x: 1.05, y: 1.05, z: 0.9,
    duration: 7,
    yoyo: true,
    repeat: -1,
    ease: "power1.ease",
})


//10. Service物件
const serviceData = {
    title: "SERVICE",
    subtitle: "WeFlow Podcast – Streamlined Voices, Seamless Stories",
    content: "At WeFlow, we turn meaningful conversations into impactful audio experiences. Our podcast service helps creators, educators, and brands effortlessly record, edit, and distribute high-quality podcasts.",
    a: "STAY TUNED"
}

const renderService = (data) => {
    return `
        <div class="service-container">
        <h2 style="font-size: 60px; line-height: 60px; padding: 0; margin: 20px 0;">${data.title}</h2>
        <h3 style="font-size: 32px; line-height: 32px; margin: 0; padding: 0">${data.subtitle}</h3>
        <p style="font-size: 26px;">${data.content}</p>
        <a href="" class="join-us-link" style="text-decoration: none; color: white; padding: 5px 10px; background-color: rgba(105, 105, 105, 0.4); margin: 0; border-radius: 20px; border: 1px solid #fff; cursor: pointer">${data.a}</a>
        </div>
    `;
};

const serviceHTML = renderService(serviceData);

const serviceImg = document.querySelector(".service-container");


const serviceImgClone = serviceImg.cloneNode(true);
serviceImgClone.innerHTML= serviceHTML
serviceImgClone.style.position = "static";
serviceImgClone.style.backgroundSize     = 'contain';
serviceImgClone.style.backgroundRepeat   = 'no-repeat';
serviceImgClone.style.backgroundPosition = 'center';
serviceImgClone.style.width = "30vw";
serviceImgClone.style.height = "65vh";
serviceImgClone.style.color = "white"

serviceImgClone.style.background = "rgba(255, 255, 255, 0.15)";
serviceImgClone.style.backdropFilter = "blur(10px)";
serviceImgClone.style.webkitBackdropFilter = "blur(10px)";
serviceImgClone.style.borderRadius = "20px";
serviceImgClone.style.border = "1px solid rgba(255, 255, 255, 0.2)";
serviceImgClone.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
serviceImgClone.style.padding = "20px 10px";
serviceImgClone.style.opacity = "0";



//一開始不要載入
const serviceh2 = serviceImgClone.querySelector("h2");
const serviceh3 = serviceImgClone.querySelector("h3");
const servicep = serviceImgClone.querySelector("p");
const servicea = serviceImgClone.querySelector("a");
serviceh2.style.display = "none";
serviceh3.style.display = "none";
servicep.style.display  = "none";
servicea.style.display = "none";

//製造元件
const serviceImgObj = new CSS3DObject(serviceImgClone);
const serviceZOffset = serviceImgObj.position.z - camera.position.z; 
serviceImgObj.position.set(-400, -50, -350);
scene.add(serviceImgObj);


//11. Service星球
const servicePlanetImg = document.querySelector(".planetImgContainer2")
const servicePlanetClone = servicePlanetImg.cloneNode(true);

servicePlanetClone.style.position = "static";
servicePlanetClone.style.width = "600px";
servicePlanetClone.style.height = "600px";
servicePlanetClone.style.backgroundImage = 'none';
const servicePlanetObj = new CSS3DObject(servicePlanetClone);
servicePlanetObj.position.set(300, -200, -250);

scene.add(servicePlanetObj);

gsap.to(servicePlanetObj.position, {
    y: "+=40",
    x: "+=50",
    duration: 6,
    yoyo: true,
    repeat: -1,
    ease: "power1.ease",
})

gsap.to(servicePlanetObj.scale, {
    x: 0.95, y: 1.1, z: 0.9,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: "power1.ease",
})

//12. 價格卡
const priceData = [
    {
        name: "WeFlow Basic",
        price: 0,
        planName: "pricePlan3",
        features: [
        "Limited Usage of text to podcast"
        ]
    },
    {
        name: "WeFlow Plus",
        price: 20,
        planName: "pricePlan2",
        features: [
        "Unlimited Usage of text to podcast",
        "Access to Our Experimental Product",
        "Extended Usage of Experimental Product"
        ]
    },
    {
        name: "WeFlow Pro",
        price: 99,
        planName: "pricePlan1",
        features: [
        "Unlimited Usage of text to podcast",
        "Access to Our Experimental Product",
        "Unlimited Usage of Experimental Product"
        ]
    },
    
];

function createPriceCard(data) {
    const container = document.createElement("div");
    container.classList.add("price-card");

    // 設定卡片樣式
    container.style.width = "300px";
    container.style.height = "500px";
    container.style.padding = "20px";
    container.style.borderRadius = "16px";
    container.style.background = "rgba(255, 255, 255, 0.1)";
    container.style.backdropFilter = "blur(10px)";
    container.style.border = "1px solid rgba(255, 255, 255, 0.2)";
    container.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
    container.style.color = "white";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "space-between";
    container.style.opacity = "0";
    container.style.transition = "opacity 0.5s";


    const inner = document.createElement("div");
    inner.classList.add(data.planName);
    // inner.style.color = "black";

    const title = document.createElement("h2");
    title.textContent = data.name;
    title.style.marginBottom = "12px";
    title.style.fontSize = "40px";

    const ul = document.createElement("ul");
    ul.style.height = "300px";              
    ul.style.overflow = "hidden";           // 可改成 scroll
    ul.style.margin = "0";
    ul.style.padding = "0 0 0 20px";
    ul.style.listStyle = "disc";
    ul.style.fontSize = "20px";
    ul.style.lineHeight = "1.6";
    // ul.style.border = "1px solid #f0f"

    data.features.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        li.style.margin = "20px 0"
        ul.appendChild(li);
    });

    const price = document.createElement("div");
    price.innerHTML = `$ <span>${data.price}</span>USD / month`;
    price.style.marginTop = "20px";
    price.style.fontWeight = "bold";
    price.style.color = "#00ff99";
    price.style.fontSize = "18px";

    const priceSpan = price.querySelector("span")
    priceSpan.style.fontSize = "60px"

    inner.appendChild(title);
    inner.appendChild(ul);
    inner.appendChild(price);
    container.appendChild(inner);
    
    return container;
}

const priceObjects = [];
priceData.forEach((cardData, i) => {
    const cardDom = createPriceCard(cardData);
    const card3D = new CSS3DObject(cardDom);
    card3D.position.set(i * 200 - ((priceData.length - 1) * 200) / 2, 0, 250); //最後需調整成-400 因為: 離camera 340 是最佳大小 所以在 -60 的時候start
    card3D.scale.set(0.5, 0.5, 0.5);
    scene.add(card3D);
    

    priceObjects.push({
        cardData,
        dom: cardDom,
        object3D: card3D,
        priceCardZoffset: card3D.position.z - camera.position.z,
    })

    // const pricehover = cardDom;
    // function resetCardStyle(dom) {
    //     pricehover.style.transformOrigin = "center center";
    //     pricehover.style.willChange = "transform";
    //     dom.style.transform = "scale(1.2)";
    //     dom.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    //     dom.style.color = "white";
    //     dom.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
    //     dom.style.transition = "all 0.3s ease";
    // }
    // pricehover.addEventListener("mouseon", ()=>{
    //     pricehover.style.transformOrigin = "center center";
    //     pricehover.style.backgroundColor = "white";
    //     pricehover.style.color = "black";
    //     pricehover.style.cursor = "pointer"
    // })

    // pricehover.addEventListener("mouseleave", () => resetCardStyle(pricehover));





});





// LAST. 滾輪控制相機
let z = camera.position.z;
let z_max = 600;
let z_min = -500;
let rabbitInitX = rabbitImgObj.position.x;
let rabbitInitY = rabbitImgObj.position.y;
let rabbitInitPositionY = rabbitImgObj.position.z 

window.addEventListener("wheel", e => {
    e.preventDefault();
    z -= e.deltaY * 0.3;
    z = Math.max(z_min, Math.min(z_max, z));
    camera.position.z = z;
    // console.log("z: ", z)
    
    console.log(`兔子在 ${rabbitInitX}, ${rabbitInitY}, ${rabbitImgObj.position.z}`)

    //兔子吸進洞的特效
    const suckStart = 600;
    const suckEnd = 160; 

    //保持鏡頭跟兔子的距離
    let rabbitChangeRatioAnimate1 = (suckStart - z) / (suckStart - suckEnd)
    rabbitImgObj.position.z = camera.position.z + rabbitZOffset
    //改變Z軸
    if (z <= suckStart && z >= suckEnd){
        
        //嘔吐兔子
        let rotationRadian = rabbitChangeRatioAnimate1 * Math.PI * 2;
        rabbitImgObj.rotation.z = rotationRadian;

    
    
    }

    
    //讓about Us Img(第二層元件) 出現在160~150出現
    const aboutUsStart = 160;
    const aboutUsEnd = 50; //兔子在-500
    aboutUsImgObj.position.z = camera.position.z + aboutUsZOffset
    
    if (z <= aboutUsStart && z >= aboutUsEnd) {
        //160~50的元件要出現
        aboutUsh2.style.display = "block";
        aboutUsh3.style.display = "block";
        aboutUsp.style.display  = "block";
        aboutUsa.style.display = "block";
        aboutUsImgClone.style.opacity = "1";;
        iceCreamPlanetClone.style.backgroundImage = 'url("../img/icecream-planet.png")'
        // console.log("about Us image is showing")

    } else {
        aboutUsh2.style.display = "none";
        aboutUsh3.style.display = "none";
        aboutUsp.style.display  = "none";
        aboutUsa.style.display = "none";
        aboutUsImgClone.style.opacity = "0";;
        iceCreamPlanetClone.style.backgroundImage = "none";
        // console.log("about Us image is not showing")
    }

    const serviceStart = 40;
    const serviceEnd = -50;
    serviceImgObj.position.z = camera.position.z + serviceZOffset;

    if (z <= serviceStart && z >= serviceEnd) {
        //50~-50的元件要出現
        serviceh2.style.display = "block";
        serviceh3.style.display = "block";
        servicep.style.display  = "block";
        servicea.style.display = "block";
        serviceImgClone.style.opacity = "1"
        servicePlanetClone.style.backgroundImage = 'url("../img/service-planet.png")'
        
    } else {
        serviceh2.style.display = "none";
        serviceh3.style.display = "none";
        servicep.style.display  = "none";
        servicea.style.display = "none";
        servicePlanetClone.style.backgroundImage = "none";
        serviceImgClone.style.opacity = "0"
    }

    const priceCardStart = -60;
    const priceCardEnd = -500;
    //const aboutUsZOffset = aboutUsImgObj.position.z - camera.position.z; 
    priceObjects[0].object3D.position.z = camera.position.z + priceObjects[0].priceCardZoffset
    priceObjects[1].object3D.position.z = camera.position.z + priceObjects[1].priceCardZoffset
    priceObjects[2].object3D.position.z = camera.position.z + priceObjects[2].priceCardZoffset

    if (z <= priceCardStart && z >= priceCardEnd){
        priceObjects[0].dom.style.opacity = "1"
        priceObjects[1].dom.style.opacity = "1"
        priceObjects[2].dom.style.opacity = "1"
    } else{
        priceObjects[0].dom.style.opacity = "0"
        priceObjects[1].dom.style.opacity = "0"
        priceObjects[2].dom.style.opacity = "0"
    }

    // 初始兔子 tween，設為 paused
    let rabbitSlideTween = gsap.to(rabbitImgObj.position, {
        x: 600,
        duration: 0.2,
        paused: true
    });

    let rabbitAnimation3 = "default"; // 可為 "default" 或 "moved"

    if (z <= priceCardStart && z >= priceCardEnd && rabbitAnimation3 !== "moved") {
        rabbitAnimation3 = "moved";
        rabbitFloatTween.pause();  // 停止浮動
        rabbitSlideTween.play();   // 播放移動到 x: 600
    }

    if (z >= priceCardStart && rabbitAnimation3 !== "default") {
        rabbitAnimation3 = "default";
        rabbitSlideTween.reverse();   // 撥回 x: 30（原位）
        rabbitFloatTween.play();      // 恢復浮動
    } 
}, { passive: false });





// 6. animate loop
function animate() {
    requestAnimationFrame(animate);
    
    renderer.render(scene, camera);


    //文字淡出特效
    const fadeStartZ = 550;
    const fadeEndZ = 500;
    let t = (z - fadeEndZ) / (fadeStartZ - fadeEndZ);
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    sloganImgObj.element.style.opacity = t;

    
}
animate();