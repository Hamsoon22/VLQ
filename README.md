# VLQ
This is project is online Valued Living Questionnaire (VLQ) for mental health

가치 명료화 설문 (Values Clarification Questionnaire)

이 프로젝트는 Acceptance & Commitment Therapy(ACT)의 핵심 도구인 **가치 명료화(Value Clarification)** 설문을 React 기반 웹 애플리케이션으로 구현한 것입니다.  
사용자는 두 단계를 통해 자신의 삶에서 중요하게 여기는 영역과 실제 실천 정도를 비교하고, 피드백을 시각적으로 받아볼 수 있습니다.

🔍 기능 소개

- 12개의 삶의 영역(가족, 일, 창의성 등)에 대해
  - **중요도**와 **실천도**를 0~10점으로 입력
- 점수 기반 자동 피드백 제공
  - [피드백 1] 중요하게 여기는 가치
  - [피드백 2] 중요하지만 실천하지 못하는 가치
  - [피드백 3] 전체 삶의 가치 실천 점수

💻 데모

👉 GitHub Pages 링크: (https://hamsoon22.github.io/VLQ/)

> 위 주소는 실제 배포 후 작동하며, `vite.config.js`의 `base` 경로도 `/VLQ/`로 설정되어야 합니다.

📦 로컬에서 실행하기

```bash
git clone https://hamsoon22.github.io/VLQ
cd VLQ
npm install
npm run dev
