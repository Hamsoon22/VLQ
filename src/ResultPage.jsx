// ResultPage.jsx (Multilingual with Context)
import React, { useEffect, useContext } from "react";
import {
  ResponsiveContainer, ComposedChart, Line, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid, Label
} from "recharts";
import { LanguageContext } from "./App";

const translations = {
  ko: {
    questions: [
      "가족 (부부관계나 자녀양육 제외)", "부부관계/친밀한 관계", "부모됨/양육하기", "친구관계", "일", "자기 자신에 대한 교육/훈련", "휴식/즐거운 활동", "영성/초월성", "사회참여/시민의식", "자신을 신체적으로 돌보기 (운동, 수면, 식이 등)", "환경문제", "예술, 창조성 등"
    ],
    shortLabels: ["가족", "부부관계", "양육", "친구", "일", "교육", "휴식", "영성", "시민참여", "신체돌봄", "환경", "예술"],
    title1: "내가 많은 가치를 두고 있는 분야",
    title2: "가치는 높지만 실천이 낮은 분야",
    title3: "나의 전반적인 가치로운 삶 점수",
    none: "해당 없음",
    value: "가치",
    action: "실천",
    retry: "다시하기"
  },
  my: {
    questions: [
      "မိသားစု (အိမ်ထောင်ပြုခြင်း သို့မဟုတ် မိဘဖြစ်ခြင်းမှအပ)", "အိမ်ထောင်ရေး/စုံတွဲ/ရင်းနှီးသောဆက်ဆံရေး", "မိဘတာဝန်ယူခြင်း", "သူငယ်ချင်းများ/လူမှုဘဝ", "အလုပ်", "ပညာရေး/လေ့ကျင့်ရေး", "အပန်းဖြေခြင်း/ပျော်ရွှင်မှု", "စိတ်ဓာတ်ရေးရာ/ဘာသာရေး", "နိုင်ငံသားတာဝန်/ရပ်ရွာလူမှုဘဝ", "ကိုယ်ကာယထိန်းသိမ်းမှု (အစားအသောက်၊ လေ့ကျင့်ခန်း၊ အိပ်စက်ခြင်း)", "သဘာဝပတ်ဝန်းကျင်ဆိုင်ရာကိစ္စရပ်များ", "အနုပညာ၊ ဖန်တီးမှုဆိုင်ရာဖော်ထုတ်မှုနှင့် အလှအပဆိုင်ရာ"
    ],
    shortLabels: ["မိသားစု", "အိမ်ထောင်ရေး", "မိဘ", "သူငယ်ချင်း", "အလုပ်", "ပညာရေး", "အပန်းဖြေ", "စိတ်ဓာတ်", "ရပ်ရွာ", "ကိုယ်ထိန်းသိမ်း", "သဘာဝ", "အနုပညာ"],
    title1: "သင်အကောင်းဆုံးတန်ဖိုးထားသောနယ်ပယ်များ",
    title2: "တန်ဖိုးထားသော်လည်း လုပ်ဆောင်မှုနည်းသောနယ်ပယ်များ",
    title3: "သင်၏ယနေ့ဘဝအရည်အသွေးစုစုပေါင်းအဆင့်",
    none: "မရှိပါ",
    value: "တန်ဖိုး",
    action: "လုပ်ဆောင်မှု",
    retry: "ထပ်မံလုပ်ဆောင်မည်"
  },
  en: {
    questions: [
      "Family (excluding marriage or parenting)", "Marriage/Intimate Relationships", "Parenting", "Friendship", "Work", "Education/Training", "Recreation/Fun", "Spirituality", "Citizenship/Community Life", "Physical Self-Care (exercise, sleep, diet)", "Environmental Issues", "Art/Creativity"
    ],
    shortLabels: ["Family", "Marriage", "Parenting", "Friends", "Work", "Education", "Fun", "Spirituality", "Civic", "Self-Care", "Environment", "Art"],
    title1: "Areas You Value Most",
    title2: "Highly Valued But Less Engaged Areas",
    title3: "Your Overall Valued Living Score",
    none: "None",
    value: "Value",
    action: "Action",
    retry: "Try Again"
  }
};

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
  const { lang } = useContext(LanguageContext);
  const t = translations[lang] || translations.ko;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const chartData = t.questions.map((label, index) => {
    const imp = importance[index];
    const isException = index === 0 || index === 2;
    const com = (!isException || imp !== 0) ? (commitment[index] ?? 0) : 0;
    return {
      name: t.shortLabels[index],
      importance: isException ? (imp ?? 0) : Math.max(imp ?? 1, 1),
      commitment: com
    };
  });

  return (
    <Container>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3>{t.title1}</h3>
          {results.feedback1.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.feedback1.map((item, idx) => (
                <li key={idx}>{`${idx + 1}. ${item}`}</li>
              ))}
            </ul>
          ) : <p>{t.none}</p>}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>{t.title2}</h3>
          {results.feedback2.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.feedback2.map((item, idx) => (
                <li key={idx}>{`${idx + 1}. ${item}`}</li>
              ))}
            </ul>
          ) : <p>{t.none}</p>}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>{t.title3}</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {isNaN(results.score) ? t.none : `${results.score.toFixed(2)} / 100`}
          </p>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 0, bottom: 120 }}>
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
              tickFormatter={(value) => value === 0 ? t.none : value}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 10]}
              tickFormatter={(value) => value === 0 ? t.none : value}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Tooltip
              formatter={(value, name, props) => {
                const dataKey = props.dataKey;
                const labelMap = {
                  importance: t.value,
                  commitment: t.action
                };
                const isException = props.payload.name === t.shortLabels[0] || props.payload.name === t.shortLabels[2];
                const isDisabled = isException && props.payload.importance === 0;
                if (value === 0 && isDisabled) {
                  return [t.none, labelMap[dataKey] || name];
                }
                return [value, labelMap[dataKey] || name];
              }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="importance" stroke="#8884d8" name={t.value} />
            <Line yAxisId="right" type="monotone" dataKey="commitment" stroke="#82ca9d" name={t.action} />
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
          {t.retry}
        </button>
      </div>
    </Container>
  );
}

export default ResultPage;
