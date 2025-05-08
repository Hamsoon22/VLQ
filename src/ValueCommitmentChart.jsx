// ValueCommitmentChart.js
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

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const questions = [
  "가족", "부부관계/친밀한 관계", "부모됨/양육하기", "친구관계",
  "일", "자기 자신에 대한 교육/훈련", "휴식/즐거운 활동", "영성/초월성",
  "사회참여/시민의식", "신체적 자기관리", "환경문제", "예술·창조성"
];

const ValueCommitmentChart = ({ importance, commitment }) => {
  const dataPoints = questions.map((label, idx) => ({
    x: importance[idx] ?? null,
    y: commitment[idx] ?? null,
    label,
  })).filter(p => p.x !== null && p.y !== null); // null 제거

  const data = {
    datasets: [
      {
        label: "가치 점수 vs 실천도",
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
        text: "가치 점수 vs 실천도",
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = dataPoints[context.dataIndex].label;
            return `${label}: 가치 ${context.parsed.x}, 실천 ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: "가치 점수 (Importance)" },
        min: 0,
        max: 10
      },
      y: {
        title: { display: true, text: "실천도 (Commitment)" },
        min: 0,
        max: 10
      }
    }
  };

  return <Scatter data={data} options={options} />;
};

export default ValueCommitmentChart;
