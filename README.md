

🔗 프로젝트 URL : **[DEMO](https://dog-management-service.vercel.app/)**

🔗 Github 저장소 URL : **[GitHub](https://github.com/FC8-TOY1/DogManagementService)**

🔗 피그마 URL : **[피그마](https://www.figma.com/file/RpTUtel3zKIXFFDSo4hAXR/%EA%B0%95%EC%95%84%EC%A7%80-%EC%9C%A0%EC%B9%98%EC%9B%90-%EA%B4%80%EB%A6%AC-%EC%84%9C%EB%B9%84%EC%8A%A4?type=design&node-id=0%3A1&mode=dev&t=VzcQOUJ3t8CHcokN-1)**

🗓️ 개발 기간 : 2024.04.08 ~ 2024.04.21

## 🔨 사용 기술 스택

### Programming

![JavaScript](https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JAVASCRIPT&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=SASS&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Database

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

### Design

![FIGMA](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

### Collaboration tool

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### Deploying

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## 팀원 소개 및 구현 부분

| <img src="https://avatars.githubusercontent.com/u/110236953?v=4" width="150px"/> |                                                                       <img src="https://avatars.githubusercontent.com/u/89022828?v=4" width="150px" />                                                                        |                                     <img src="https://avatars.githubusercontent.com/u/79198245?v=4" width="150px" />                                     | <img src="https://avatars.githubusercontent.com/u/133835167?v=4" width="150px" /> |
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
|                   FE: [유현욱](https://github.com/YuHyeonWook)                   |                                                                                            FE: [김령태](https://github.com/catrt)                                                                                             |                                                      FE: [김여진](https://github.com/Yeojin-Kim12)                                                       |                    FE: [박수민](https://github.com/nakjilove)                     |
|                    유저 생성 페이지 구현 </br> 이미지 업로드                     | 현재 시간 구현<br>등하교 버튼 구현<br>등하교 모달 구현<br>home 페이지 레이아웃<br>gallery 페이지 레이아웃<br>강아지 컴포넌트 디자인<br>profile 구현<br>footer 구현<br>404 페이지 구현<br>페이지 접근 권한 구현<br>반응형 구현 | 로그인, 회원가입 구현<br>로그아웃 버튼 구현<br>결석 페이지 레이아웃<br>결석 modal 구현<br>결석 카테고리 필터링<br>결석 리스트 시간 필터링<br>반응형 구현 |                               갤러리 페이지 디자인                                |

## Router 구조

![image](https://github.com/KDT1-FE/Y_FE_Toy1/assets/110236953/39b0b999-39d6-4756-af58-2da82e39e970)

## 필수 요구사항

**1. 마이페이지 구현**

- 연차/ 반차/시간 조정 등 부재 신청 창 구현
  - 결석 신청 모달 구현
- 부재 신청 내역 확인 창 구현
  - workspaceapplication 페이지에서 확인 가능
- 부재 항목에 따른 필터링 기능 구현
  - workspaceapplication 페이지에서 필터링 가능
- 사진, 직무, 이름이 표기된 프로필 구현
  - userprofile 페이지에서 확인 가능
- 현 시각을 표시하는 시계 (타이머) 구현
  - home 페이지에서 확인 가능
- 시간 관리 기능 개발
  - 토글 형태의 근무 시작 / 종료 스위치 구현
    - home 페이지에서 등하교 관리 가능
    - userprofile 페이지에서 등하교 시간 확인 가능
  - 모달을 활용한 근무 시작 / 종료 확인 창 구현

**2. 기업 공지 모음 갤러리 구현(업로드 기능은 포함 x)**

- 공지 모음 갤러리 대신 API를 사용한 강아지 갤러리 구현

**3. netlify 등을 이용한 정적 페이지 배포**

- vercel을 이용한 정적 페이지 배포

## 선택 요구사항

- 마이페이지의 사진 업로드 기능
  - 최초 가입 시 원하는 사진 업로드 가능
- 로그인 기능
  - 회원가입, 로그인, 로그아웃 페이지 및 기능 구현
- 부재 신청시, 사유 기재 기능
  - 결석 신청 모달에서 사유 기재 가능
- 기타 동작이 완료되기 전에 로딩 애니메이션 구현
  - API를 사용해 강아지 데이터를 가져오기 전에 로딩 애니메이션 구현
- 페이지네이션
  - react-router를 사용하여 구현
- eslint 설정, 커밋컨벤션, 문서화 등 팀프로젝트 시 필요한 추가 작업들

## 구현

- 회원가입 / 로그인 / 유저정보

  ![dogManagement1](https://github.com/FC8-TOY1/DogManagementService/assets/79198245/dc451ca8-e945-4777-bc61-38a809aeaf52)

- 메인화면 / 등하교 / 프로필

  ![dogManagement2](https://github.com/FC8-TOY1/DogManagementService/assets/79198245/364c3837-c1bc-43e4-a30f-2bbf1ec8fa1e)

- 메인 공지사항 / 갤러리

  ![dogManagement3](https://github.com/FC8-TOY1/DogManagementService/assets/79198245/29d56978-353b-46dd-8c2b-8ff5007751eb)

- 결석 신청내역 / 필터링

  ![dogManagement4](https://github.com/FC8-TOY1/DogManagementService/assets/79198245/117a99ea-c868-41e6-aee8-43433e41cff5)

## 느낀 점 & 아쉬운 점

### 유현욱

- 팀 프로젝트를 하면서 어려운 부분도 있었지만, 돌이켜보면 알게된 것이 더 많은 것 같다.

### 김령태

- 첫 팀 프로젝트라서 완벽하다고 하지는 못하겠지만 좋은 팀원을 만나 생각보다는 잘 굴러간 것 같습니다. 기존 프로젝트에서 사용하지 않았던 방식을 사용하면서 발전하는 계기가 된 것 같습니다. 반복적으로 사용하는 코드를 분리해서 따로 관리했으면 더 좋았을 것 같고 시간 관리를 좀 더 세분화해서 구현했으면 더 좋았을 것 같다는 아쉬움이 남습니다.

### 김여진

- 첫 토이프로젝트인 만큼 새로운 기술을 적용하고 그 과정에서 많이 배웠습니다. 어려운 부분이 있으면 팀원들과 함께 해결하는 부분이 정말 좋았고 유익했습니다. 다만, 프로젝트를 진행하면서 React를 좀 더 공부해야겠다는 점과 개념을 충분히 이해하지 못한 채 사용한 부분이 있어 이를 보완해야겠다고 생각했습니다. 그러나 프로젝트를 완성했다는 성취감과 개발하면서 느낀 즐거움이 크게 느껴져서 좋았습니다.
