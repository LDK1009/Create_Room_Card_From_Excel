# 숙소 라벨지 생성기!


<a href="https://create-room-card-from-excel-dpvd298qu-dong-kyu-lees-projects.vercel.app/" target="_blank">
<img src="https://github.com/user-attachments/assets/8dc550c6-a3d7-453f-8fb5-87acdb062a52" alt="배너" width="100%"/>
</a>

<br/>
<br/>

# 0. Getting Started (시작하기)
```bash
$ npm start
```
[서비스 링크](https://create-room-card-from-excel-dpvd298qu-dong-kyu-lees-projects.vercel.app/)

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: 숙소 배정 라벨지 생성기!
- 프로젝트 설명: 일정 양식의 엑셀 파일 데이터를 통해 교회별 방 배정 현황 및 배정 인원을 표기된 '라벨지'와 라벨지를 14개씩 묶은 '카드'를 생성합니다.

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)
| 이동규 |
|:------:|
| <img src="https://github.com/user-attachments/assets/c1c2b1e3-656d-4712-98ab-a15e91efa2da" alt="이동규" width="150"> |
| FE |
| [GitHub](https://github.com/LDK1009) |

<br/>
<br/>

# 3. Key Features (주요 기능)
- **엑셀 파일 업로드**:
  - 파일 선택 버튼과 드래그앤드랍 박스를 통해 엑셀 파일을 업로드 할 수 있습니다.

- **파일 변환**:
  - 파일 변환 버튼을 클릭하여 엑셀 데이터를 교회별 방 배정 현황 및 배정 인원을 표기된 라벨지 이미지로 변환합니다.

- **라벨지 다운로드**:
  - 라벨지 다운로드 버튼을 클릭하여 생성된 모든 라벨지 이미지를 다운로드합니다.

- **카드 다운로드**:
  - 카드 다운로드 버튼을 클릭하여 생성된 모든 카드 이미지를 다운로드합니다.

<br/>
<br/>

# 4. Tasks & Responsibilities (작업 및 역할 분담)
|  |  |  |
|-----------------|-----------------|-----------------|
| 이동규    |  <img src="https://github.com/user-attachments/assets/c1c2b1e3-656d-4712-98ab-a15e91efa2da" alt="이동규" width="100"> | <ul><li>프로젝트 계획 및 관리</li><li>커스텀 훅 개발</li><li>컴포넌트 개발</li></ul>     |

<br/>
<br/>

# 5. Technology Stack (기술 스택)
## 5.1 Language
|  |  |
|-----------------|-----------------|
| HTML5    |<img src="https://github.com/user-attachments/assets/2e122e74-a28b-4ce7-aff6-382959216d31" alt="HTML5" width="100">| 
| CSS3    |   <img src="https://github.com/user-attachments/assets/c531b03d-55a3-40bf-9195-9ff8c4688f13" alt="CSS3" width="100">|
| Javascript    |  <img src="https://github.com/user-attachments/assets/4a7d7074-8c71-48b4-8652-7431477669d1" alt="Javascript" width="100"> | 

<br/>

## 5.2 Frotend
|  |  |  |
|-----------------|-----------------|-----------------|
| React    |  <img src="https://github.com/user-attachments/assets/e3b49dbb-981b-4804-acf9-012c854a2fd2" alt="React" width="100"> | 18.3.1    |
| StyledComponents    |  <img src="https://github.com/user-attachments/assets/c9b26078-5d79-40cc-b120-69d9b3882786" alt="StyledComponents" width="100">| 6.1.12   |
| file-saver    |      | 2.0.5  |
| html2canvas    |      | 1.4.1    |
| jszip    |     | 3.10.1    |
| xlsx    |     | 0.18.5    |

<br/>


<br/>

## 5.3 Cooperation
|  |  |
|-----------------|-----------------|
| Git    |  <img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="100">    |
| Git Kraken    |  <img src="https://github.com/user-attachments/assets/32c615cb-7bc0-45cd-91ea-0d1450bfc8a9" alt="git kraken" width="100">    |


<br/>

# 6. Project Structure (프로젝트 구조)
```plaintext
project/
├── public/
│   ├── index.html           # HTML 템플릿 파일
│   └── favicon.ico          # 아이콘 파일
├── src/
│   ├── assets/              # 이미지, 폰트 등 정적 파일
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── hooks/               # 커스텀 훅 모음
│   ├── pages/               # 각 페이지별 컴포넌트
│   ├── App.js               # 메인 애플리케이션 컴포넌트
│   ├── index.js             # 엔트리 포인트 파일
│   ├── index.css            # 전역 css 파일
│   package-lock.json    # 정확한 종속성 버전이 기록된 파일로, 일관된 빌드를 보장
│   package.json         # 프로젝트 종속성 및 스크립트 정의
├── .gitignore               # Git 무시 파일 목록
└── README.md                # 프로젝트 개요 및 사용법
```

<br/>
<br/>
