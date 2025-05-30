import React, { useEffect } from "react";
import {
  ResponsiveContainer, ComposedChart, Line, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid, Label
} from "recharts";

const questions = [
  "가족 (부부관계나 자녀양육 제외)",
  "부부관계/친밀한 관계",
  "부모됨/양육하기",
  "친구관계",
  "일",
  "자기 자신에 대한 교육/훈련",
  "휴식/즐거운 활동",
  "영성/초월성",
  "사회참여/시민의식",
  "자신을 신체적으로 돌보기 (운동, 수면, 식이 등)",
  "환경문제",
  "예술, 창조성 등"
];
const shortLabels = [
  "가족",
  "부부관계",
  "양육",
  "친구",
  "일",
  "교육",
  "휴식",
  "영성",
  "시민참여",
  "신체돌봄",
  "환경",
  "예술"
];

function Container({ children }) {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '1rem auto',
      padding: '0.2rem',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      {children}
    </div>
  );
}

function ResultPage({ results, importance, commitment, onReset }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const chartData = questions.map((label, index) => {
    const imp = importance[index];
    const isException = index === 0 || index === 2; // 가족과 양육만 해당 없음 허용
    const com = (!isException || imp !== 0) ? (commitment[index] ?? 0) : 0;
    return {
      name: shortLabels[index],
      importance: isException ? (imp ?? 0) : Math.max(imp ?? 1, 1),
      commitment: com
    };
  });

  return (
    <Container>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3>내가 많은 가치를 두고 있는 분야</h3>
          {results.feedback1.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.feedback1.map((item, idx) => (
                <li key={idx}>{`${idx + 1}. ${item}`}</li>
              ))}
            </ul>
          ) : <p>해당 없음</p>}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>가치는 높지만 실천이 낮은 분야</h3>
          {results.feedback2.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.feedback2.map((item, idx) => (
                <li key={idx}>{`${idx + 1}. ${item}`}</li>
              ))}
            </ul>
          ) : <p>해당 없음</p>}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>나의 전반적인 가치로운 삶 점수</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {isNaN(results.score) ? "점수 없음" : `${results.score.toFixed(2)} / 100`}
          </p>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 0, bottom: 120 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={100}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              yAxisId="left"
              domain={[0, 10]}
              tickFormatter={(value) => value === 0 ? "해당없음" : value}
              ticks={[0, 2, 4, 6, 8, 10]}
            >
              <Label
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle", fontSize: 14 }}
              />
            </YAxis>
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 10]}
              tickFormatter={(value) => value === 0 ? "해당없음" : value}
              ticks={[0, 2, 4, 6, 8, 10]}
            >
              <Label
                angle={90}
                position="insideRight"
                style={{ textAnchor: "middle", fontSize: 14 }}
              />
            </YAxis>
            <Tooltip
              formatter={(value, name, props) => {
                const dataKey = props.dataKey;
                const labelMap = {
                  importance: "가치",
                  commitment: "실천"
                };
                const isException = props.payload.name === "가족" || props.payload.name === "양육";
                const isDisabled = isException && props.payload.importance === 0;
                if (value === 0 && isDisabled) {
                  return ["해당 없음", labelMap[dataKey] || name];
                }
                return [value, labelMap[dataKey] || name];
              }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="importance" stroke="#8884d8" name="가치" />
            <Line yAxisId="right" type="monotone" dataKey="commitment" stroke="#82ca9d" name="실천" />
          </ComposedChart>
        </ResponsiveContainer>
        <button onClick={onReset} style={{
          marginTop: '2rem',
          marginBottom: '2rem',
          backgroundColor: '#666',
          color: 'white',
          padding: '0.6rem 1.6rem',
          borderRadius: '8px',
          fontSize: '1rem'
        }}>
          다시하기
        </button>
      </div>
    </Container>
  );
}

export default ResultPage;