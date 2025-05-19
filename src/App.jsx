import React, { useState } from "react";
import ResultPage from "./ResultPage";

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

function Container({ children }) {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
      {children}
    </div>
  );
}

function QuestionSection({ title, responses, setResponses, onNext, disabledIndices = [] }) {
  const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = parseInt(value);
    setResponses(updated);
  };

  const handleNextWithScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNext();
  };

  return (
    <Container>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '2rem', textAlign: 'center', color: '#2a2a2a' }}>{title}</h2>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {questions.map((q, idx) => {
        const isDisabled = disabledIndices.includes(idx);
        return (
          <li key={idx} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: 500, color: isDisabled ? '#999' : '#000' }}>{q}</div>
            {isDisabled ? (
              <div style={{ fontStyle: 'italic', color: '#aaa' }}>해당 없음으로 선택된 항목입니다.</div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem' }}>
                {[...Array(11)].map((_, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}>
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={i}
                      checked={responses[idx] === i}
                      onChange={() => handleChange(idx, i)}
                    />
                    {i}
                  </label>
                ))}
                
                {/* ✅ 해당 없음 옵션 추가: 가족(idx === 0), 양육(idx === 2)만 */}
                {(idx === 0 || idx === 2) && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', color: '#888' }}>
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={-1}
                      checked={responses[idx] === -1}
                      onChange={() => handleChange(idx, -1)}
                      disabled={isDisabled} // ← 여기 추가!
                    />
                    해당 없음
                  </label>
                )}
              </div>
            )}
          </li>
        );
      })}
      </ul>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <button
          onClick={handleNextWithScroll}
          style={{ backgroundColor: '#000', color: 'white', padding: '0.7rem 2rem', borderRadius: '8px', fontSize: '1rem' }}
        >
          다음
        </button>
      </div>
    </Container>
  );
}
 
  
function calculateResults(importance, commitment) {
  const validImportance = importance.map(v => v < 0 ? 0 : v);
  const validCommitment = commitment.map(v => v < 0 ? 0 : v);

  const scored = questions.map((q, i) => ({
    label: q,
    importance: validImportance[i],
    commitment: validCommitment[i],
    index: i
  }));

  const feedback1 = scored
    .filter(item => item.importance >= 9)
    .sort((a, b) => b.importance - a.importance)
    .map(item => item.label);

  const feedback2 = scored
    .filter(item => item.importance >= 9 && item.commitment <= 6)
    .sort((a, b) => b.importance - a.importance)
    .map(item => item.label);

  const score = validImportance.reduce((sum, val, i) => sum + val * validCommitment[i], 0) / 12;

  return { feedback1, feedback2, score };
}


function App() {
  const [step, setStep] = useState(1);
  const [importance, setImportance] = useState(Array(12).fill(undefined));
  const [commitment, setCommitment] = useState(Array(12).fill(undefined));
  const [results, setResults] = useState(null);

  const handleNext = () => setStep(2);
  const handleSubmit = () => {
    const res = calculateResults(
      importance.map(v => v < 0 ? 0 : v),
      commitment.map(v => v < 0 ? 0 : v)
    );
    setResults(res);
    setStep(3);
  };

  const handleReset = () => {
    setImportance(Array(12).fill(undefined));
    setCommitment(Array(12).fill(undefined));
    setResults(null);
    setStep(1);
  };

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#333' }}>
          가치 명료화 설문
        </h1>
      </div>
      {step === 1 && (
        <QuestionSection
          title="1. 내가 가치롭게 여기는 정도"
          responses={importance}
          setResponses={setImportance}
          onNext={handleNext}
        />
      )}

       {step === 2 && (
        <QuestionSection
          title="2. 실제로 헌신하고 전념하는 정도"
          responses={commitment}
          setResponses={setCommitment}
          onNext={handleSubmit}
          disabledIndices={importance.map((v, i) => v === -1 ? i : null).filter(i => i !== null)}
        />
      )}

      {step === 3 && results && (
        <ResultPage
          results={results}
          importance={importance}
          commitment={commitment}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
