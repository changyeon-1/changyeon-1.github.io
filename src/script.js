// Three.js 및 GLTFLoader 가져오기
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


// 장면 생성
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87CEEB); // 밝은 하늘색

//카메라 생성
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.2, 1000);
camera.position.set(3, 5, 3); // 위에서 아래를 바라보는 위치로 이동
camera.lookAt(0, 0, 0); // 장면 중심을 바라보도록 설정

function updateCameraPosition(character) {
    // 캐릭터 위치에서 오프셋 추가
    const offset = new THREE.Vector3(10, 17.5, 10); // 쿼터뷰 오프셋
    const targetPosition = character.clone().add(offset); // 캐릭터 기준으로 오프셋 추가

    // 부드러운 이동 (선형 보간)
    camera.position.lerp(targetPosition, 0.1); // 0.1: 부드러운 이동 속도
}


// 렌더러 생성
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 바닥 평면 추가
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x008000,
    opacity: 0.8,       // 투명도 (0.0: 완전히 투명, 1.0: 완전히 불투명)
    transparent: true   // 투명도 활성화
 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
scene.add(plane);

// 특정 영역 박스 생성
const boxGeometry = new THREE.BoxGeometry(3.0, 2, 1.5); // 박스 크기
const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: false, // 박스를 투명하게 보여줌
    transparent: true,     // 투명도 활성화
    opacity: 0,
    depthWrite: false, // 깊이 버퍼 비활성화
});
const detectionBox = new THREE.Mesh(boxGeometry, boxMaterial);
detectionBox.position.set(-4, 0, -5); // 박스 위치
scene.add(detectionBox);

// 특정 영역 박스 생성
const boxGeometry2 = new THREE.BoxGeometry(3.0, 2, 1.5); // 박스 크기
const boxMaterial2 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true, // 박스를 투명하게 보여줌
    transparent: true,     // 투명도 활성화
    opacity: 0,
    depthWrite: false, // 깊이 버퍼 비활성화
});
const detectionBox2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
detectionBox2.position.set(1.2, 0, -5); // 박스 위치
scene.add(detectionBox2);

const fontLoader = new FontLoader();
let textMesh;

fontLoader.load('./node_modules/three/examples/fonts/NanumGothicExtraBold_Regular.json', (font) => {
    const textGeometry = new TextGeometry('마우스 우클릭으로 이동하세요', {
        font: font,
        size: 0.2, // 텍스트 크기
        depth: 0.02, // 텍스트 깊이
        curveSegments: 10, // 곡선 세그먼트
    });

    const textMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, // 텍스트 색상
        transparent: true, // 투명도 활성화
        opacity: 1.0, // 초기 투명도
     }); // 텍스트 색상
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // 텍스트 위치 및 회전 설정
    textMesh.position.set(-1.75, 0.1, 1); // plane 위에 배치
    textMesh.rotation.x = -Math.PI / 2; // 텍스트가 plane에 평행하게 눕도록 회전

    scene.add(textMesh); // 장면에 추가

     // 두 번째 텍스트: "캡스톤 디자인 1"
     const textGeometry2 = new TextGeometry('캡스톤디자인1', {
        font: font,
        size: 0.3, // 텍스트 크기
        depth: 0.02, // 텍스트 깊이
        curveSegments: 10, // 곡선 세그먼트
    });

    const textMaterial2 = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
    });

    const newTextMesh = new THREE.Mesh(textGeometry2, textMaterial2);

    // 두 번째 텍스트 위치 설정
    newTextMesh.position.set(-5.3, 0.1, -4.9); // 새로운 위치
    newTextMesh.rotation.x = -Math.PI / 2;

    scene.add(newTextMesh); // 두 번째 텍스트 장면에 추가

    // 두 번째 텍스트: "캡스톤 디자인 2"
    const textGeometry3 = new TextGeometry('캡스톤디자인2', {
        font: font,
        size: 0.3, // 텍스트 크기
        depth: 0.02, // 텍스트 깊이
        curveSegments: 10, // 곡선 세그먼트
    });

    const textMaterial3 = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
    });

    const newTextMesh3 = new THREE.Mesh(textGeometry3, textMaterial3);

    // 세 번째 텍스트 위치 설정
    newTextMesh3.position.set(0, 0.1, -4.9); // 새로운 위치
    newTextMesh3.rotation.x = -Math.PI / 2;

    scene.add(newTextMesh3); // 두 번째 텍스트 장면에 추가
    });
    

    // 추가 텍스트 배열 처리
fontLoader.load('./node_modules/three/examples/fonts/NanumGothicExtraBold_Regular.json', (font) => {
    const textArray = ['원광대학교', '디지털콘텐츠공학과', '20212255김창연', '웹페이지포트폴리오입니다'];

    textArray.forEach((text, index) => {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: 0.5, // 글자 크기
            depth: 0.1, // 글자 두께
            curveSegments: 12,
        });

        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // 각 텍스트 위치 설정
        textMesh.position.set(-10 + index, 0.1, 5 + index * 1.2);
        textMesh.rotation.y = -Math.PI * 1.75; // 텍스트가 plane에 평행하게 눕도록 회전
        scene.add(textMesh);
    });
});

// 조명 추가
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

// 마우스 휠 이벤트 추가
window.addEventListener('wheel', (event) => {
    event.preventDefault();

    // 카메라 줌 조정 (1.0 이상으로 제한)
    camera.zoom += event.deltaY * -0.001; // 휠 방향에 따라 줌 조정
    camera.zoom = Math.max(1.0, Math.min(5, camera.zoom)); // 최소 1, 최대 5로 제한
    camera.updateProjectionMatrix(); // 변경 사항 반영
    
    },
    { passive: false } // 수동 리스너로 설정 console 알림제거
);


let stickman;
let mixer; // AnimationMixer
let actions = {}; // 애니메이션 클립 저장
let activeAction = null;

// GLTFLoader를 사용하여 캐릭터 로드
const loader = new GLTFLoader();
loader.load(
    '/assets/stickman/scene.gltf', // GLTF 파일 경로
    function (gltf) {
        stickman = gltf.scene;
        stickman.position.set(0, 0, 0);
        stickman.scale.set(1, 1, 1);
        scene.add(stickman);
    
        // AnimationMixer 생성
        mixer = new THREE.AnimationMixer(stickman);

        // 애니메이션 클립 추가
        gltf.animations.forEach((clip) => {
            actions[clip.name] = mixer.clipAction(clip);
        });

        // 기본 애니메이션 실행 (예: Idle)
        if (actions['Idle']) {
            activeAction = actions['Idle'];
            activeAction.play();
        }
    },
    undefined,
    function (error) {
        console.error('모델 로드 중 오류 발생:', error);
    }
);

loader.load(
    '/assets/lowpoly_tree/tree.gltf', // Tree 파일 경로
    function (gltf) {
        const tree = gltf.scene;
        tree.position.set(8, 0, 5); // 5, 0, 5 위치에 배치
        tree.scale.set(1, 1, 1);   // 필요 시 스케일 조정
        scene.add(tree);

        console.log('Tree added to the scene at position (5, 0, 5).');
    },
    undefined,
    function (error) {
        console.error('Error loading tree:', error);
    }
);
loader.load(
    '/assets/lowpoly_tree/tree.gltf', // Tree 파일 경로
    function (gltf) {
        const tree = gltf.scene;
        tree.position.set(8, 0, -5); // 5, 0, 5 위치에 배치
        tree.scale.set(0.8, 0.8, 0.8);   // 필요 시 스케일 조정
        scene.add(tree);

        console.log('Tree added to the scene at position (5, 0, 5).');
    },
    undefined,
    function (error) {
        console.error('Error loading tree:', error);
    }
);
loader.load(
    '/assets/lowpoly_tree/tree.gltf', // Tree 파일 경로
    function (gltf) {
        const tree = gltf.scene;
        tree.position.set(-8, 0, -8); // 5, 0, 5 위치에 배치
        tree.scale.set(1.2, 1.2, 1.2);   // 필요 시 스케일 조정
        scene.add(tree);

        console.log('Tree added to the scene at position (5, 0, 5).');
    },
    undefined,
    function (error) {
        console.error('Error loading tree:', error);
    }
);
loader.load(
    '/assets/lowpoly_tree/tree.gltf', // Tree 파일 경로
    function (gltf) {
        const tree = gltf.scene;
        tree.position.set(-9, 0, 10); // 5, 0, 5 위치에 배치
        tree.scale.set(1, 1, 1);   // 필요 시 스케일 조정
        scene.add(tree);

        console.log('Tree added to the scene at position (5, 0, 5).');
    },
    undefined,
    function (error) {
        console.error('Error loading tree:', error);
    }
);

// Raycaster와 마우스 포지션 설정
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// 이동 속도
const moveSpeed = 0.02;
let targetPosition = null;

// Clock 생성
const clock = new THREE.Clock();

// 마우스 우클릭 이벤트
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    // 마우스 위치 계산
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster로 클릭 지점 계산
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(plane);

    if (intersects.length > 0) {
        targetPosition = intersects[0].point; // 클릭한 지점의 좌표
        console.log('Target Position:', targetPosition);

        // 이동 애니메이션 재생
        if (actions['Run'] && activeAction !== actions['Run']) {
            if (activeAction) activeAction.fadeOut(0.2); // 이전 애니메이션 페이드아웃
            activeAction = actions['Run'];
            activeAction.reset().fadeIn(0.2).play();

            // 애니메이션 속도 조정
            mixer.timeScale = 1.5; // Run 애니메이션 속도를 1.5배로 설정
        }
    }
});

let isPopupShown = false;
let isCharacterInsideBox = false;
let currentPageIndex = 0; // 현재 페이지 인덱스
const pages = [
    `
    <p style="font-size: 25px;">어린이 안전교육 모바일 게임</p>
    <p style="font-size: 20px;">캡스톤디자인1 수업에서 어린이 안전교육을 위한 모바일게임 프로젝트를 진행했었고, Unity를 사용해 전체 개발을 맡았었습니다.</p>
    <img src=".assets//images1/image1.jpg" alt="Page 1 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">1/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">팀원이 만들어준 캐릭터와 각각 디자인을 받아서 적용했습니다.</p>
    <img src=".assets//images1/image2.jpg" alt="Page 2 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">2/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">인벤토리 시스템과 안전교육, 그림퀴즈를 만들어서 메인페이지에서 버튼으로 연결했습니다.</p>
    <img src=".assets//images1/image3.jpg" alt="Page 3 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">3/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">퀴즈는 문제은행 시스템을 만들어서 랜덤으로 퀴즈가 나오게 구현했습니다.</p>
    <img src=".assets//images1/image4.jpg" alt="Page 4 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">4/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">퀴즈를 풀기 전에 교육이 필요하다 판단되어, 캐릭터들끼리의 대화 스크립트를 작성하고, TTS를 이용해 문자와 함께 소리가 같이 재생되도록 구현했습니다.</p>
    <img src=".assets//images1/image5.jpg" alt="Page 5 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">5/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">인벤토리 시스템을 만들어서 문제를 풀고 보상을 받으면 캐릭터 의상을 구매할 수 있게 했으며, JSON형식으로 저장해 앱을 다시 종료해도 변경내역이 적용되도록 했습니다.</p>
    <img src=".assets//images1/image6.jpg" alt="Page 6 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">6/6</p>
    `
];

function showPopup() {
    if (isPopupShown) return; // 이미 표시 중이면 중단
    isPopupShown = true;

    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.top = '20%'; // 팝업 위치
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -20%)';
    popup.style.width = '70%'; // 창 너비의 50%
    popup.style.height = '70%'; // 창 높이의 50%
    popup.style.overflow = 'auto'; // 넘치는 내용 스크롤 활성화
    popup.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    popup.style.color = '#000000';
    popup.style.borderRadius = '8px';
    popup.style.boxSizing = 'border-box'; // 패딩 포함
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    // 팝업 내용 컨테이너
    const content = document.createElement('div');
    content.innerHTML = pages[currentPageIndex]; // 현재 페이지의 내용을 표시
    popup.appendChild(content);

    // 이전 버튼
    const prevButton = document.createElement('button');
    prevButton.innerText = '<';
    prevButton.style.position = 'absolute';
    prevButton.style.bottom = '20px';
    prevButton.style.right = '80px';
    prevButton.style.padding = '10px 20px';
    prevButton.style.backgroundColor = 'transparent';
    prevButton.style.color = '#000000';
    prevButton.style.border = 'none';
    prevButton.style.borderRadius = '4px';
    prevButton.style.cursor = 'pointer';
    prevButton.style.fontSize = '20px'; // 글자 크기 크게 설정
    prevButton.disabled = currentPageIndex === 0; // 첫 페이지에서는 비활성화
    prevButton.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            content.innerHTML = pages[currentPageIndex]; // 페이지 내용 업데이트
            updateButtons();
        }
    });
    popup.appendChild(prevButton);

    // 다음 버튼
    const nextButton = document.createElement('button');
    nextButton.innerText = '>';
    nextButton.style.position = 'absolute';
    nextButton.style.bottom = '20px';
    nextButton.style.right = '20px';
    nextButton.style.padding = '10px 20px';
    nextButton.style.backgroundColor = 'transparent';
    nextButton.style.color = '#000000';
    nextButton.style.border = 'none';
    nextButton.style.borderRadius = '4px';
    nextButton.style.fontSize = '20px'; // 글자 크기 크게 설정
    nextButton.style.cursor = 'pointer';
    nextButton.disabled = currentPageIndex === pages.length - 1; // 마지막 페이지에서는 비활성화
    nextButton.addEventListener('click', () => {
        if (currentPageIndex < pages.length - 1) {
            currentPageIndex++;
            content.innerHTML = pages[currentPageIndex]; // 페이지 내용 업데이트
            updateButtons();
        }
    });
    popup.appendChild(nextButton);

    // 팝업 닫기 버튼
    const closeButton = document.createElement('button');
    closeButton.innerText = 'x';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#000000';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '25px'; // 글자 크기 크게 설정
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
        isPopupShown = false;
        
    });
    popup.appendChild(closeButton);

    // 버튼 상태 업데이트
    function updateButtons() {
        prevButton.disabled = currentPageIndex === 0;
        nextButton.disabled = currentPageIndex === pages.length - 1;
    }

    document.body.appendChild(popup);
}

// 캐릭터가 영역 안에 있는지 체크
function checkCharacterInBox() {
    if (!stickman) return;

    const boxMin = detectionBox.position.clone().sub(new THREE.Vector3(1, 1, 1)); // 박스 최소 좌표
    const boxMax = detectionBox.position.clone().add(new THREE.Vector3(1, 1, 1)); // 박스 최대 좌표

    const isInsideBox =
        stickman.position.x >= boxMin.x &&
        stickman.position.y >= boxMin.y &&
        stickman.position.z >= boxMin.z &&
        stickman.position.x <= boxMax.x &&
        stickman.position.y <= boxMax.y &&
        stickman.position.z <= boxMax.z;

        if (isInsideBox) {
            if (!isCharacterInsideBox) {
                // 박스 안에 처음 들어왔을 때만 팝업 표시
                isCharacterInsideBox = true; // 박스 안에 있는 상태 유지
                showPopup(); // 회전 후 팝업 표시
            }
            
        } else {
            if (isCharacterInsideBox) {
                isCharacterInsideBox = false;
                
            }
            
        }

}

// 라운드 처리된 속이 빈 사각형 생성 함수
function createRoundedRect(width, height, radius, lineWidth) {
    const shape = new THREE.Shape();

    // 외부 큰 라운드 사각형
    shape.moveTo(-width / 2 + radius, -height / 2);
    shape.lineTo(width / 2 - radius, -height / 2);
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
    shape.lineTo(width / 2, height / 2 - radius);
    shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
    shape.lineTo(-width / 2 + radius, height / 2);
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
    shape.lineTo(-width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

    // 내부 작은 사각형 구멍
    const hole = new THREE.Path();
    const innerWidth = width - lineWidth * 2;
    const innerHeight = height - lineWidth * 2;
    const innerRadius = radius - lineWidth;

    hole.moveTo(-innerWidth / 2 + innerRadius, -innerHeight / 2);
    hole.lineTo(innerWidth / 2 - innerRadius, -innerHeight / 2);
    hole.quadraticCurveTo(innerWidth / 2, -innerHeight / 2, innerWidth / 2, -innerHeight / 2 + innerRadius);
    hole.lineTo(innerWidth / 2, innerHeight / 2 - innerRadius);
    hole.quadraticCurveTo(innerWidth / 2, innerHeight / 2, innerWidth / 2 - innerRadius, innerHeight / 2);
    hole.lineTo(-innerWidth / 2 + innerRadius, innerHeight / 2);
    hole.quadraticCurveTo(-innerWidth / 2, innerHeight / 2, -innerWidth / 2, innerHeight / 2 - innerRadius);
    hole.lineTo(-innerWidth / 2, -innerHeight / 2 + innerRadius);
    hole.quadraticCurveTo(-innerWidth / 2, -innerHeight / 2, -innerWidth / 2 + innerRadius, -innerHeight / 2);

    shape.holes.push(hole);

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff, // 라운드 사각형 색상
        side: THREE.DoubleSide,
    });

    return new THREE.Mesh(geometry, material);
}

// 라운드 사각형 생성
const roundedRect = createRoundedRect(3.5, 1.8, 0.5, 0.1); // (가로, 세로, 라운드 크기, 선 두께)
roundedRect.position.set(detectionBox.position.x, detectionBox.position.y +0.1, detectionBox.position.z);
roundedRect.rotation.x = -Math.PI / 2; // 바닥에 평행하게 설정
scene.add(roundedRect);


//--------------------------------------------------------------
let isPopupShown2 = false;
let isCharacterInsideBox2 = false;
let currentPageIndex2 = 0; // 현재 페이지 인덱스
const pages2 = [
    `
    <p style="font-size: 25px;">웹캠과 손동작을 이용한 3D모델링 퍼즐 게임</p>
    <p style="font-size: 20px;">캡스톤디자인2 수업에서 Python의 mediapipe를 이용한 프로젝트를 진행했었고, Unity를 사용해 전체 개발을 맡았었습니다.</p>
    <img src="./assets/images2/image1.png" alt="Page 1 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">1/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">파이썬으로부터 유니티로 UDP를 통해 전송된 손의 위치 데이터를 받아 유니티의 3D 공간 내에서 손가락 위치를 시각화하게 구현했습니다. </p>
    <img src="./assets/images2/image2.png" alt="Page 2 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">2/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">3D프로그램에서 unity에서 사용할 수 있게끔 세팅하여 유니티로 모델링을 불러왔습니다.</p>
    <img src="./assets/images2/image3.png" alt="Page 3 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">3/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">웹캠을 사용하여 손을 인식하고, Unity 게임 공간 내에서 손의 움직임을 따라가도록 구현했습니다.</p>
    <img src="./assets/images2/image4.png" alt="Page 4 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">4/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">게임 공간 내에서 사용자가 손으로 3D 오브젝트를 잡으면, 오브젝트는 손을 따라 이동하며, 손을 놓으면 해당 위치에 오브젝트가 놓이게 됩니다.</p>
    <img src="./assets/images2/image5.png" alt="Page 5 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">5/6</p>
    `,
    `
    <p style="font-size: 20px;">&nbsp</p>
    <p style="font-size: 20px;">개발자가 지정한 오차범위 내의 좌표에 오브젝트가 있을 경우, 오브젝트는 고정되어 퍼즐 게임의 일부분으로 작동하도록 설계했습니다. 사용자는 카메라를 회전시켜 3D 오브젝트를 360도 탐색하며 퍼즐을 풀 수 있습니다.</p>
    <img src="./assets/images2/image6.png" alt="Page 6 Image" style="width: 70%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    <p style="font-size: 15px; text-align: right;">6/6</p>
    `
];

function showPopup2() {
    if (isPopupShown2) return; // 이미 표시 중이면 중단
    isPopupShown2 = true;

    const popup2 = document.createElement('div');
    popup2.style.position = 'absolute';
    popup2.style.top = '20%'; // 팝업 위치
    popup2.style.left = '50%';
    popup2.style.transform = 'translate(-50%, -20%)';
    popup2.style.width = '70%'; // 창 너비의 50%
    popup2.style.height = '70%'; // 창 높이의 50%
    popup2.style.overflow = 'auto'; // 넘치는 내용 스크롤 활성화
    popup2.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    popup2.style.color = '#000000';
    popup2.style.borderRadius = '8px';
    popup2.style.boxSizing = 'border-box'; // 패딩 포함
    popup2.style.padding = '20px';
    popup2.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    // 팝업 내용 컨테이너
    const content2 = document.createElement('div');
    content2.innerHTML = pages2[currentPageIndex2]; // 현재 페이지의 내용을 표시
    popup2.appendChild(content2);

    // 이전 버튼
    const prevButton2 = document.createElement('button');
    prevButton2.innerText = '<';
    prevButton2.style.position = 'absolute';
    prevButton2.style.bottom = '20px';
    prevButton2.style.right = '80px';
    prevButton2.style.padding = '10px 20px';
    prevButton2.style.backgroundColor = 'transparent';
    prevButton2.style.color = '#000000';
    prevButton2.style.border = 'none';
    prevButton2.style.borderRadius = '4px';
    prevButton2.style.cursor = 'pointer';
    prevButton2.style.fontSize = '20px'; // 글자 크기 크게 설정
    prevButton2.disabled = currentPageIndex2 === 0; // 첫 페이지에서는 비활성화
    prevButton2.addEventListener('click', () => {
        if (currentPageIndex2 > 0) {
            currentPageIndex2--;
            content2.innerHTML = pages2[currentPageIndex2]; // 페이지 내용 업데이트
            updateButtons2();
        }
    });
    popup2.appendChild(prevButton2);

    // 다음 버튼
    const nextButton2 = document.createElement('button');
    nextButton2.innerText = '>';
    nextButton2.style.position = 'absolute';
    nextButton2.style.bottom = '20px';
    nextButton2.style.right = '20px';
    nextButton2.style.padding = '10px 20px';
    nextButton2.style.backgroundColor = 'transparent';
    nextButton2.style.color = '#000000';
    nextButton2.style.border = 'none';
    nextButton2.style.borderRadius = '4px';
    nextButton2.style.fontSize = '20px'; // 글자 크기 크게 설정
    nextButton2.style.cursor = 'pointer';
    nextButton2.disabled = currentPageIndex2 === pages2.length - 1; // 마지막 페이지에서는 비활성화
    nextButton2.addEventListener('click', () => {
        if (currentPageIndex2 < pages2.length - 1) {
            currentPageIndex2++;
            content2.innerHTML = pages2[currentPageIndex2]; // 페이지 내용 업데이트
            updateButtons2();
        }
    });
    popup2.appendChild(nextButton2);

    // 팝업 닫기 버튼
    const closeButton2 = document.createElement('button');
    closeButton2.innerText = 'x';
    closeButton2.style.position = 'absolute';
    closeButton2.style.top = '20px';
    closeButton2.style.right = '20px';
    closeButton2.style.padding = '10px 20px';
    closeButton2.style.backgroundColor = 'transparent';
    closeButton2.style.color = '#000000';
    closeButton2.style.border = 'none';
    closeButton2.style.borderRadius = '4px';
    closeButton2.style.cursor = 'pointer';
    closeButton2.style.fontSize = '25px'; // 글자 크기 크게 설정
    closeButton2.addEventListener('click', () => {
        document.body.removeChild(popup2);
        isPopupShown2 = false;
        
    });
    popup2.appendChild(closeButton2);

    // 버튼 상태 업데이트
    function updateButtons2() {
        prevButton2.disabled = currentPageIndex2 === 0;
        nextButton2.disabled = currentPageIndex2 === pages2.length - 1;
    }

    document.body.appendChild(popup2);
}

// 캐릭터가 영역 안에 있는지 체크
function checkCharacterInBox2() {
    if (!stickman) return;

    const boxMin2 = detectionBox2.position.clone().sub(new THREE.Vector3(1, 1, 1)); // 박스 최소 좌표
    const boxMax2 = detectionBox2.position.clone().add(new THREE.Vector3(1, 1, 1)); // 박스 최대 좌표

    const isInsideBox2 =
        stickman.position.x >= boxMin2.x &&
        stickman.position.y >= boxMin2.y &&
        stickman.position.z >= boxMin2.z &&
        stickman.position.x <= boxMax2.x &&
        stickman.position.y <= boxMax2.y &&
        stickman.position.z <= boxMax2.z;

        if (isInsideBox2) {
            if (!isCharacterInsideBox2) {
                // 박스 안에 처음 들어왔을 때만 팝업 표시
                isCharacterInsideBox2 = true; // 박스 안에 있는 상태 유지
                showPopup2(); // 회전 후 팝업 표시
            }
            
        } else {
            if (isCharacterInsideBox2) {
                isCharacterInsideBox2 = false;
                
                
            }
            
        }

}

// 라운드 처리된 속이 빈 사각형 생성 함수
function createRoundedRect2(width, height, radius, lineWidth) {
    const shape2 = new THREE.Shape();

    // 외부 큰 라운드 사각형
    shape2.moveTo(-width / 2 + radius, -height / 2);
    shape2.lineTo(width / 2 - radius, -height / 2);
    shape2.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
    shape2.lineTo(width / 2, height / 2 - radius);
    shape2.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
    shape2.lineTo(-width / 2 + radius, height / 2);
    shape2.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
    shape2.lineTo(-width / 2, -height / 2 + radius);
    shape2.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

    // 내부 작은 사각형 구멍
    const hole2 = new THREE.Path();
    const innerWidth2 = width - lineWidth * 2;
    const innerHeight2 = height - lineWidth * 2;
    const innerRadius2 = radius - lineWidth;

    hole2.moveTo(-innerWidth2 / 2 + innerRadius2, -innerHeight2 / 2);
    hole2.lineTo(innerWidth2 / 2 - innerRadius2, -innerHeight2 / 2);
    hole2.quadraticCurveTo(innerWidth2 / 2, -innerHeight2 / 2, innerWidth2 / 2, -innerHeight2 / 2 + innerRadius2);
    hole2.lineTo(innerWidth2 / 2, innerHeight2 / 2 - innerRadius2);
    hole2.quadraticCurveTo(innerWidth2 / 2, innerHeight2 / 2, innerWidth2 / 2 - innerRadius2, innerHeight2 / 2);
    hole2.lineTo(-innerWidth2 / 2 + innerRadius2, innerHeight2 / 2);
    hole2.quadraticCurveTo(-innerWidth2 / 2, innerHeight2 / 2, -innerWidth2 / 2, innerHeight2 / 2 - innerRadius2);
    hole2.lineTo(-innerWidth2 / 2, -innerHeight2 / 2 + innerRadius2);
    hole2.quadraticCurveTo(-innerWidth2 / 2, -innerHeight2 / 2, -innerWidth2 / 2 + innerRadius2, -innerHeight2 / 2);

    shape2.holes.push(hole2);

    const geometry2 = new THREE.ShapeGeometry(shape2);
    const material2 = new THREE.MeshBasicMaterial({
        color: 0xffffff, // 라운드 사각형 색상
        side: THREE.DoubleSide,
    });

    return new THREE.Mesh(geometry2, material2);
}

// 라운드 사각형 생성
const roundedRect2 = createRoundedRect2(3.5, 1.8, 0.5, 0.1); // (가로, 세로, 라운드 크기, 선 두께)
roundedRect2.position.set(detectionBox2.position.x, detectionBox2.position.y +0.1, detectionBox2.position.z);
roundedRect2.rotation.x = -Math.PI / 2; // 바닥에 평행하게 설정
scene.add(roundedRect2);




// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // AnimationMixer 업데이트
    if (mixer) {
        mixer.update(delta); // 초 단위로 변환
    }
    // 텍스트 투명도 애니메이션
    if (textMesh) {
        const time = clock.getElapsedTime(); // 경과 시간
        const opacity = (Math.sin(time) + 1) / 2; // 0 ~ 1 범위로 변환
        textMesh.material.opacity = opacity; // 투명도 적용
        
    } 

    // 캐릭터 이동
    if (stickman && targetPosition) {
        const direction = new THREE.Vector3();
        direction.subVectors(targetPosition, stickman.position).normalize(); // 이동 방향 계산
        stickman.lookAt(targetPosition); // 목표를 바라보도록 회전


        const distance = stickman.position.distanceTo(targetPosition);
        if (distance > 0.1) {
            stickman.position.addScaledVector(direction, moveSpeed); // 부드럽게 이동
        } else {
            targetPosition = null; // 도착 후 타겟 제거

             // Idle 애니메이션 전환
             if (actions['Idle'] && activeAction !== actions['Idle']) {
                if (activeAction) activeAction.fadeOut(0.2); // 이전 애니메이션 페이드아웃
                activeAction = actions['Idle'];
                activeAction.reset().fadeIn(0.2).play();

                // Idle 애니메이션 속도 복구
                mixer.timeScale = 0.8; // Idle 애니메이션 기본 속도
            }
        }
    }
    // 캐릭터를 따라 카메라 위치 갱신
    if (stickman) {
        updateCameraPosition(stickman.position); // stickman의 현재 위치 사용
    }
    // 캐릭터와 특정 박스 충돌 체크
    checkCharacterInBox();
    checkCharacterInBox2();
    

    renderer.render(scene, camera);
}
animate();

// 화면 크기 변경 대응
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

