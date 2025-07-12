// ValueCommitmentChart.js (Multilingual)
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { LanguageContext } from "./App";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);
const { lang } = useContext(LanguageContext);

const translations = {
  ko: {
    questions: [
      "가족", "부부관계/친밀한 관계", "부모됨/양육하기", "친구관계",
      "일", "자기 자신에 대한 교육/훈련", "휴식/즐거운 활동", "영성/초월성",
      "사회참여/시민의식", "신체적 자기관리", "환경문제", "예술·창조성"
    ],
    title: "가치 점수 vs 실천도",
    xLabel: "가치 점수 (Importance)",
    yLabel: "실천도 (Commitment)",
    tooltip: (label, x, y) => `${label}: 가치 ${x}, 실천 ${y}`
  },
  my: {
    questions: [
      "မိသားစု", "အိမ်ထောင်ရေး/ရင်းနှီးမှု", "မိဘတာဝန်ယူခြင်း", "သူငယ်ချင်းများ",
      "အလုပ်", "ပညာရေး/လေ့ကျင့်ရေး", "အပန်းဖြေမှု", "စိတ်ဓာတ်/ဘာသာရေး",
      "ရပ်ရွာလူမှုဘဝ", "ကိုယ်ထိန်းသိမ်းမှု", "သဘာဝပတ်ဝန်းကျင်", "အနုပညာ/ဖန်တီးမှု"
    ],
    title: "တန်ဖိုးနှင့် လုပ်ဆောင်မှုဂရပ်ဖ်",
    xLabel: "တန်ဖိုး (Importance)",
    yLabel: "လုပ်ဆောင်မှု (Commitment)",
    tooltip: (label, x, y) => `${label}: တန်ဖိုး ${x}, လုပ်ဆောင်မှု ${y}`
  },
  en: {
    questions: [
      "Family", "Marriage/Intimate Relationship", "Parenting", "Friends",
      "Work", "Education/Training", "Recreation/Fun", "Spirituality",
      "Citizenship/Community Life", "Physical Self-Care", "Environmental Issues", "Art/Creativity"
    ],
    title: "Importance vs Commitment",
    xLabel: "Importance Score",
    yLabel: "Commitment Score",
    tooltip: (label, x, y) => `${label}: Importance ${x}, Commitment ${y}`
  }
};

const ValueCommitmentChart = ({ importance, commitment, lang = "ko" }) => {
  const { lang } = useContext(LanguageContext);
  // const t = translations[lang] || translations.ko;

  const dataPoints = t.questions.map((label, idx) => ({
    x: importance[idx] ?? null,
    y: commitment[idx] ?? null,
    label,
  })).filter(p => p.x !== null && p.y !== null);

  const data = {
    datasets: [
      {
        label: t.title,
        data: dataPoints,
        pointRadius: 6,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        }
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: t.title,
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const { label, x, y } = dataPoints[context.dataIndex];
            return t.tooltip(label, x, y);
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: t.xLabel },
        min: 0,
        max: 10
      },
      y: {
        title: { display: true, text: t.yLabel },
        min: 0,
        max: 10
      }
    }
  };

  return <Scatter data={data} options={options} />;
};

export default ValueCommitmentChart;