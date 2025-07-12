// App.jsx (Valued Living Questionnaire - Multilingual)
import React, { useState, createContext, useContext } from "react";
import ResultPage from "./ResultPage";
import './LanguageSelector.css';

export const LanguageContext = createContext();

const translations = {
  ko: {
    title: "가치 명료화 설문",
    importanceTitle: "1. 내가 가치롭게 여기는 정도",
    commitmentTitle: "2. 실제로 헌신하고 전념하는 정도",
    next: "다음",
    noneLabel: "해당 없음",
    disabledText: "해당 없음으로 선택된 항목입니다.",
    questions: [
      "가족 (부부관계나 자녀양육 제외)", "부부관계/친밀한 관계", "부모됨/양육하기",
      "친구관계", "일", "자기 자신에 대한 교육/훈련",
      "휴식/즐거운 활동", "영성/초월성", "사회참여/시민의식",
      "자신을 신체적으로 돌보기 (운동, 수면, 식이 등)", "환경문제", "예술, 창조성 등"
    ]
  },
  my: {
    title: "တန်ဖိုးထားသော ဘဝနေထိုင်မှု စစ်တမ်း",
    importanceTitle: "၁။ မည်သည့်နယ်ပယ်ကို တန်ဖိုးထားသည်ဟု သင်ထင်ပါသလဲ။",
    commitmentTitle: "၂။ သင်၏အပြုအမူသည် မည်မျှ ကိုက်ညီပါသလဲ။",
    next: "ဆက်လက်လုပ်ဆောင်မည်",
    noneLabel: "မသက်ဆိုင်ပါ",
    disabledText: "ရွေးချယ်ထားသော အရာများကို သက်ဆိုင်ခြင်းမရှိပါ။",
    questions: [
      "မိသားစု (အိမ်ထောင်ပြုခြင်း သို့မဟုတ် မိဘဖြစ်ခြင်းမှအပ)", "အိမ်ထောင်ရေး/စုံတွဲ/ရင်းနှီးသောဆက်ဆံရေး", "မိဘတာဝန်ယူခြင်း",
      "သူငယ်ချင်းများ/လူမှုဘဝ", "အလုပ်", "ပညာရေး/လေ့ကျင့်ရေး",
      "အပန်းဖြေခြင်း/ပျော်ရွှင်မှု", "စိတ်ဓာတ်ရေးရာ/ဘာသာရေး", "နိုင်ငံသားတာဝန်/ရပ်ရွာလူမှုဘဝ",
      "ကိုယ်ကာယထိန်းသိမ်းမှု (အစားအသောက်၊ လေ့ကျင့်ခန်း၊ အိပ်စက်ခြင်း)", "သဘာဝပတ်ဝန်းကျင်ဆိုင်ရာကိစ္စရပ်များ", "အနုပညာ၊ ဖန်တီးမှုဆိုင်ရာဖော်ထုတ်မှုနှင့် အလှအပဆိုင်ရာ"
    ]
  },
  en: {
    title: "Valued Living Questionnaire",
    importanceTitle: "1. The degree to which you value each area",
    commitmentTitle: "2. The degree to which you live in accordance with your values",
    next: "Next",
    noneLabel: "Not Applicable",
    disabledText: "This item was marked as not applicable.",
    questions: [
      "Family (excluding marriage or parenting)", "Marriage/Intimate Relationships", "Parenting",
      "Friendship", "Work", "Education/Training",
      "Recreation/Fun", "Spirituality", "Citizenship/Community Life",
      "Physical Self-Care (exercise, sleep, diet)", "Environmental Issues", "Art/Creativity"
    ]
  }
};

function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");
  const langData = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, langData }}>
      {children}
    </LanguageContext.Provider>
  );
}

function Container({ children }) {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
      {children}
    </div>
  );
}

function QuestionSection({ title, responses, setResponses, onNext, disabledIndices = []}) {
  const { langData } = useContext(LanguageContext);
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
        {langData.questions.map((q, idx) => {
          const isDisabled = disabledIndices.includes(idx);
          const allowNone = idx === 0 || idx === 2;

          return (
            <li key={idx} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
              <div style={{ marginBottom: '0.5rem', fontWeight: 500, color: isDisabled ? '#999' : '#000' }}>{q}</div>
              {isDisabled ? (
                <div style={{ fontStyle: 'italic', color: '#aaa' }}>{langData.disabledText}</div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem' }}>
                  {allowNone && (
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', color: '#888' }}>
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        value={0}
                        checked={responses[idx] === 0}
                        onChange={() => handleChange(idx, 0)}
                      />
                      {langData.noneLabel}
                    </label>
                  )}
                  {[...Array(10)].map((_, i) => {
                    const score = i + 1;
                    return (
                      <label key={score} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}>
                        <input
                          type="radio"
                          name={`q-${idx}`}
                          value={score}
                          checked={responses[idx] === score}
                          onChange={() => handleChange(idx, score)}
                        />
                        {score}
                      </label>
                    );
                  })}
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
          {langData.next}
        </button>
      </div>
    </Container>
  );
}

function calculateResults(importance, commitment, labels) {
  const validImportance = importance.map(v => v ?? 0);
  const validCommitment = commitment.map(v => v ?? 0);

  const scored = labels.map((q, i) => ({
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

  const score = scored.reduce((sum, val) => sum + val.importance * val.commitment, 0) / 12;

  return { feedback1, feedback2, score };
}

function App() {
  const { lang, setLang, langData } = useContext(LanguageContext);
  const [step, setStep] = useState(1);
  const [importance, setImportance] = useState(Array(12).fill(undefined));
  const [commitment, setCommitment] = useState(Array(12).fill(undefined));
  const [results, setResults] = useState(null);

  const handleNext = () => setStep(2);
  const handleSubmit = () => {
    const res = calculateResults(
      importance.map(v => v ?? 0),
      commitment.map(v => v ?? 0),
      langData.questions
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
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#333' }}>{langData.title}</h1>
        <div style={{ marginTop: '1rem' }}>
        <div className="language-buttons">
        ` <button
            className={`lang-btn ${lang === "ko" ? "active" : ""}`}
            onClick={() => setLang("ko")}
          >
            한국어
          </button>
          <button
            className={`lang-btn ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            English
          </button>
          <button
            className={`lang-btn ${lang === "my" ? "active" : ""}`}
            onClick={() => setLang("my")}
          >
            မြန်မာ
          </button>
        </div>
        </div>
      </div>

      {step === 1 && (
        <QuestionSection
          title={langData.importanceTitle}
          responses={importance}
          setResponses={setImportance}
          onNext={handleNext}
          langData={langData}
        />
      )}

      {step === 2 && (
        <QuestionSection
          title={langData.commitmentTitle}
          responses={commitment}
          setResponses={setCommitment}
          onNext={handleSubmit}
          disabledIndices={importance.map((v, i) => v === 0 && (i === 0 || i === 2) ? i : null).filter(i => i !== null)}
          langData={langData}
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
export default function WrappedApp() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}