import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #F9F7F4; color: #1C1C2E; }
  
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); } to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .fade-up { animation: fadeUp 0.5s ease forwards; opacity: 0; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.25s; }
  .delay-3 { animation-delay: 0.4s; }
  .delay-4 { animation-delay: 0.55s; }
  .delay-5 { animation-delay: 0.7s; }
  .delay-6 { animation-delay: 0.85s; }

  .sidebar {
    width: 72px;
    background: linear-gradient(180deg, #0B6E6E 0%, #074f4f 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    gap: 6px;
    position: fixed;
    left: 0; top: 0; bottom: 0;
    z-index: 100;
    box-shadow: 4px 0 24px rgba(11,110,110,0.15);
  }

  .nav-btn {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    gap: 3px;
    border: none;
    background: transparent;
    color: rgba(255,255,255,0.6);
    font-size: 9px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
  }
  .nav-btn:hover { background: rgba(255,255,255,0.1); color: white; }
  .nav-btn.active { background: rgba(255,255,255,0.18); color: white; }
  .nav-btn svg { width: 20px; height: 20px; }

  .main { margin-left: 72px; display: flex; height: 100vh; overflow: hidden; }

  .center-panel {
    flex: 1;
    background: #F9F7F4;
    overflow-y: auto;
    padding: 32px 28px;
    border-right: 1px solid #E8E4DE;
    min-width: 380px;
    max-width: 520px;
  }

  .right-panel {
    flex: 1.2;
    background: #ffffff;
    overflow-y: auto;
    padding: 32px 28px;
  }

  .app-logo {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 700;
    color: white;
    text-align: center;
    line-height: 1.1;
    margin-bottom: 24px;
    padding: 0 8px;
  }

  .tab-bar {
    display: flex;
    gap: 4px;
    background: #EDE9E3;
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 24px;
  }

  .tab {
    flex: 1; padding: 8px 4px;
    border-radius: 9px;
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #7A7A8A;
    cursor: pointer;
    transition: all 0.2s;
  }
  .tab.active {
    background: white;
    color: #0B6E6E;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: #5A5A6E;
    margin-bottom: 6px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .field-group { margin-bottom: 16px; }

  input, textarea, select {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid #E0DBD4;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1C1C2E;
    background: white;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    resize: vertical;
  }
  input:focus, textarea:focus, select:focus {
    border-color: #0B6E6E;
    box-shadow: 0 0 0 3px rgba(11,110,110,0.1);
  }
  textarea { min-height: 80px; }

  .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .analyze-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #0B6E6E, #0d8a8a);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 8px;
    box-shadow: 0 4px 16px rgba(11,110,110,0.3);
  }
  .analyze-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(11,110,110,0.35); }
  .analyze-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #1C1C2E;
    margin-bottom: 6px;
  }
  .section-sub {
    font-size: 13px;
    color: #8A8A9A;
    margin-bottom: 28px;
    line-height: 1.5;
  }

  .result-card {
    background: #F9F7F4;
    border-radius: 14px;
    padding: 18px 20px;
    margin-bottom: 14px;
    border: 1px solid #EDE9E3;
  }

  .result-card-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #0B6E6E;
    margin-bottom: 12px;
    display: flex; align-items: center; gap-6px;
  }

  .result-card-title span { margin-right: 6px; }

  .summary-text {
    font-size: 14px;
    line-height: 1.7;
    color: #2C2C3E;
  }

  .symptom-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #EDE9E3;
  }
  .symptom-item:last-child { border-bottom: none; }

  .urgent-dot {
    width: 8px; height: 8px; border-radius: 50%;
    margin-top: 5px; flex-shrink: 0;
  }

  .dx-item {
    padding: 12px 0;
    border-bottom: 1px solid #EDE9E3;
  }
  .dx-item:last-child { border-bottom: none; }

  .dx-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .dx-name { font-weight: 600; font-size: 14px; }

  .badge {
    font-size: 10px; font-weight: 700; padding: 3px 9px;
    border-radius: 20px; letter-spacing: 0.05em;
  }
  .badge-high { background: #FFE8E8; color: #C0392B; }
  .badge-medium { background: #FFF4E0; color: #D4820A; }
  .badge-low { background: #E8F5E8; color: #276527; }

  .dx-reasoning { font-size: 13px; color: #5A5A6E; line-height: 1.5; margin-bottom: 8px; }
  .dx-questions { font-size: 12px; color: #0B6E6E; }

  .workup-item {
    display: flex; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #EDE9E3;
    align-items: flex-start;
  }
  .workup-item:last-child { border-bottom: none; }
  .workup-test { font-weight: 600; font-size: 13px; min-width: 140px; }
  .workup-just { font-size: 13px; color: #5A5A6E; line-height: 1.4; }

  .rx-item {
    padding: 12px 14px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E0DBD4;
    margin-bottom: 8px;
  }
  .rx-med { font-weight: 600; font-size: 14px; color: #0B6E6E; margin-bottom: 4px; }
  .rx-details { font-size: 12px; color: #5A5A6E; display: flex; gap: 12px; flex-wrap: wrap; }
  .rx-note { font-size: 12px; color: #8A8A9A; margin-top: 4px; font-style: italic; }

  .red-flag-box {
    background: #FFF5F5;
    border: 1.5px solid #FFCDD2;
    border-radius: 14px;
    padding: 16px 18px;
  }
  .red-flag-item {
    display: flex; align-items: flex-start; gap: 8px;
    font-size: 13px; color: #C0392B;
    padding: 4px 0; line-height: 1.5;
  }

  .empty-state {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 100%; min-height: 400px;
    text-align: center; gap: 12px;
  }
  .empty-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: linear-gradient(135deg, #E8F5F5, #C8E6E6);
    display: flex; align-items: center; justify-content: center;
    font-size: 32px; margin-bottom: 8px;
  }
  .empty-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #2C2C3E; }
  .empty-sub { font-size: 14px; color: #9A9AAA; max-width: 280px; line-height: 1.6; }

  .loading-state {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 100%; min-height: 400px; gap: 16px;
  }
  .loading-ring {
    width: 48px; height: 48px;
    border: 3px solid #E8F5F5;
    border-top-color: #0B6E6E;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  .loading-text { font-family: 'Playfair Display', serif; font-size: 18px; color: #0B6E6E; }
  .loading-sub { font-size: 13px; color: #9A9AAA; animation: pulse 1.5s ease-in-out infinite; }

  .error-box {
    background: #FFF5F5; border: 1.5px solid #FFCDD2;
    border-radius: 14px; padding: 20px;
    text-align: center; margin-top: 40px;
  }

  .disclaimer {
    font-size: 11px; color: #AAAABC;
    text-align: center; padding: 20px;
    border-top: 1px solid #EDE9E3;
    line-height: 1.6; margin-top: 8px;
  }

  .lab-normal { color: #276527; font-weight: 500; }
  .lab-high { color: #C0392B; font-weight: 600; }
  .lab-low { color: #D4820A; font-weight: 600; }

  .powered-badge {
    font-size: 9px; color: rgba(255,255,255,0.4);
    text-align: center; margin-top: auto; padding-top: 12px;
    font-family: 'DM Sans', sans-serif;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D0CCC6; border-radius: 3px; }
`;

const NAV_ITEMS = [
  { id: "consultation", icon: "🩺", label: "Consult" },
  { id: "lab", icon: "🧪", label: "Labs" },
  { id: "rx", icon: "💊", label: "Rx" },
];

async function analyzePatient(patientData) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are CliniqAI, an expert clinical decision support assistant for GPs in Pakistan. Analyze patient data and respond ONLY with valid JSON, no preamble, no markdown, no backticks. Use this exact structure:
{"patientSummary":"string","symptomFlags":[{"symptom":"string","significance":"string","urgent":boolean}],"differentialDiagnosis":[{"diagnosis":"string","likelihood":"High|Medium|Low","reasoning":"string","confirmingQuestions":["string"]}],"suggestedWorkup":[{"test":"string","justification":"string"}],"prescriptionDraft":[{"medication":"string","dose":"string","frequency":"string","duration":"string","instructions":"string"}],"redFlags":["string"]}
Consider Pakistani endemic diseases (typhoid, dengue, hepatitis B/C, TB, malaria). Keep redFlags empty array if none. Max 3 red flags, 4 diagnoses, 4 workup items, 3 medications.`,
      messages: [{
        role: "user",
        content: `Patient: ${patientData.name}, Age: ${patientData.age}, Gender: ${patientData.gender}
Chief Complaint: ${patientData.chiefComplaint}
Medical History: ${patientData.medicalHistory}
Current Symptoms: ${patientData.symptoms}
Duration: ${patientData.duration}`
      }]
    })
  });
  const data = await response.json();
  const text = data.content.map(i => i.text || "").join("");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

async function interpretLabs(labText) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are a clinical lab interpreter. Respond ONLY with valid JSON, no preamble, no backticks:
{"abnormalHigh":[{"name":"string","value":"string","normalRange":"string"}],"abnormalLow":[{"name":"string","value":"string","normalRange":"string"}],"normal":[{"name":"string","value":"string"}],"clinicalInterpretation":"string","urgentFlags":["string"]}`,
      messages: [{ role: "user", content: `Interpret these lab results: ${labText}` }]
    })
  });
  const data = await response.json();
  const text = data.content.map(i => i.text || "").join("");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

export default function CliniqAI() {
  const [activeNav, setActiveNav] = useState("consultation");
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [labResult, setLabResult] = useState(null);
  const [error, setError] = useState(null);

  const [patient, setPatient] = useState({
    name: "", age: "", gender: "Male",
    chiefComplaint: "", medicalHistory: "", symptoms: "", duration: ""
  });
  const [labText, setLabText] = useState("");

  const handleAnalyze = async () => {
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await analyzePatient(patient);
      setResult(res);
    } catch (e) {
      setError("Analysis failed. Please check your inputs and try again.");
    }
    setLoading(false);
  };

  const handleLabAnalyze = async () => {
    setLoading(true); setError(null); setLabResult(null);
    try {
      const res = await interpretLabs(labText);
      setLabResult(res);
    } catch (e) {
      setError("Lab interpretation failed. Please try again.");
    }
    setLoading(false);
  };

  const currentResult = activeNav === "lab" ? labResult : result;

  return (
    <>
      <style>{FONTS}{styles}</style>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="app-logo">Cliniq<br/>AI</div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${activeNav === item.id ? "active" : ""}`}
              onClick={() => { setActiveNav(item.id); setError(null); }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="powered-badge">Powered by<br/>Claude AI</div>
        </div>

        {/* Main */}
        <div className="main">
          {/* Center Panel */}
          <div className="center-panel">

            {/* CONSULTATION */}
            {activeNav === "consultation" && (
              <>
                <div className="section-title">New Consultation</div>
                <div className="section-sub">Enter patient details for AI-powered clinical analysis.</div>

                <div className="tab-bar">
                  {["Patient Info", "Symptoms", "History"].map((t, i) => (
                    <button key={i} className={`tab ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
                  ))}
                </div>

                {activeTab === 0 && (
                  <>
                    <div className="field-group">
                      <div className="field-label">Full Name</div>
                      <input placeholder="e.g. Muhammad Ali" value={patient.name} onChange={e => setPatient({ ...patient, name: e.target.value })} />
                    </div>
                    <div className="row-2">
                      <div className="field-group">
                        <div className="field-label">Age</div>
                        <input type="number" placeholder="35" value={patient.age} onChange={e => setPatient({ ...patient, age: e.target.value })} />
                      </div>
                      <div className="field-group">
                        <div className="field-label">Gender</div>
                        <select value={patient.gender} onChange={e => setPatient({ ...patient, gender: e.target.value })}>
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="field-group">
                      <div className="field-label">Chief Complaint</div>
                      <textarea placeholder="What brings the patient in today?" value={patient.chiefComplaint} onChange={e => setPatient({ ...patient, chiefComplaint: e.target.value })} />
                    </div>
                    <div className="field-group">
                      <div className="field-label">Duration</div>
                      <input placeholder="e.g. 3 days, 2 weeks" value={patient.duration} onChange={e => setPatient({ ...patient, duration: e.target.value })} />
                    </div>
                  </>
                )}

                {activeTab === 1 && (
                  <div className="field-group">
                    <div className="field-label">Current Symptoms</div>
                    <textarea style={{ minHeight: 180 }} placeholder="Describe all current symptoms in detail — fever, pain location, nausea, fatigue, etc." value={patient.symptoms} onChange={e => setPatient({ ...patient, symptoms: e.target.value })} />
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="field-group">
                    <div className="field-label">Medical History</div>
                    <textarea style={{ minHeight: 180 }} placeholder="Past diagnoses, surgeries, chronic conditions, current medications, allergies, family history..." value={patient.medicalHistory} onChange={e => setPatient({ ...patient, medicalHistory: e.target.value })} />
                  </div>
                )}

                <button className="analyze-btn" onClick={handleAnalyze} disabled={loading || !patient.chiefComplaint || !patient.name}>
                  {loading ? <><div className="spinner" /> Analyzing...</> : <>✦ Analyze with CliniqAI</>}
                </button>
              </>
            )}

            {/* LAB */}
            {activeNav === "lab" && (
              <>
                <div className="section-title">Lab Interpreter</div>
                <div className="section-sub">Paste raw lab report values for instant AI interpretation and flagging.</div>
                <div className="field-group">
                  <div className="field-label">Lab Report Text</div>
                  <textarea style={{ minHeight: 260 }}
                    placeholder={"Hemoglobin: 9.2 g/dL\nWBC: 11,500\nPlatelets: 430,000\nALT: 85 U/L\nCreatinine: 1.8 mg/dL\n..."}
                    value={labText} onChange={e => setLabText(e.target.value)} />
                </div>
                <button className="analyze-btn" onClick={handleLabAnalyze} disabled={loading || !labText}>
                  {loading ? <><div className="spinner" /> Interpreting...</> : <>🧪 Interpret Results</>}
                </button>
              </>
            )}

            {/* RX */}
            {activeNav === "rx" && (
              <>
                <div className="section-title">Prescription</div>
                <div className="section-sub">Run a consultation first to generate a prescription draft here.</div>
                {result?.prescriptionDraft ? (
                  result.prescriptionDraft.map((rx, i) => (
                    <div key={i} className="rx-item fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="rx-med">💊 {rx.medication}</div>
                      <div className="rx-details">
                        <span>📏 {rx.dose}</span>
                        <span>🕐 {rx.frequency}</span>
                        <span>📅 {rx.duration}</span>
                      </div>
                      {rx.instructions && <div className="rx-note">ℹ️ {rx.instructions}</div>}
                    </div>
                  ))
                ) : (
                  <div className="empty-state" style={{ minHeight: 200 }}>
                    <div style={{ fontSize: 40 }}>💊</div>
                    <div style={{ color: "#AAAABC", fontSize: 14 }}>No prescription generated yet. Run a consultation first.</div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            {loading && (
              <div className="loading-state">
                <div className="loading-ring" />
                <div className="loading-text">Analyzing...</div>
                <div className="loading-sub">CliniqAI is reviewing the clinical picture</div>
              </div>
            )}

            {!loading && error && (
              <div className="error-box">
                <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
                <div style={{ fontWeight: 600, color: "#C0392B", marginBottom: 6 }}>Something went wrong</div>
                <div style={{ fontSize: 13, color: "#5A5A6E" }}>{error}</div>
              </div>
            )}

            {!loading && !error && !currentResult && (
              <div className="empty-state">
                <div className="empty-icon">🩺</div>
                <div className="empty-title">Ready to Analyze</div>
                <div className="empty-sub">Fill in patient details on the left and click Analyze to get a full clinical assessment.</div>
              </div>
            )}

            {/* Consultation Result */}
            {!loading && !error && result && activeNav === "consultation" && (
              <>
                <div className="section-title fade-up">Clinical Assessment</div>
                <div className="section-sub fade-up delay-1" style={{ marginBottom: 20 }}>
                  AI analysis for <strong>{patient.name}</strong>, {patient.age}y {patient.gender}
                </div>

                {/* Summary */}
                <div className="result-card fade-up delay-1">
                  <div className="result-card-title"><span>📋</span> Patient Summary</div>
                  <div className="summary-text">{result.patientSummary}</div>
                </div>

                {/* Symptom Flags */}
                {result.symptomFlags?.length > 0 && (
                  <div className="result-card fade-up delay-2">
                    <div className="result-card-title"><span>🚦</span> Symptom Flags</div>
                    {result.symptomFlags.map((s, i) => (
                      <div key={i} className="symptom-item">
                        <div className="urgent-dot" style={{ background: s.urgent ? "#C0392B" : "#0B6E6E" }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{s.symptom}</div>
                          <div style={{ fontSize: 12, color: "#5A5A6E", marginTop: 2 }}>{s.significance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Differential Diagnosis */}
                {result.differentialDiagnosis?.length > 0 && (
                  <div className="result-card fade-up delay-3">
                    <div className="result-card-title"><span>🔬</span> Differential Diagnosis</div>
                    {result.differentialDiagnosis.map((dx, i) => (
                      <div key={i} className="dx-item">
                        <div className="dx-top">
                          <div className="dx-name">{dx.diagnosis}</div>
                          <div className={`badge badge-${dx.likelihood?.toLowerCase()}`}>{dx.likelihood}</div>
                        </div>
                        <div className="dx-reasoning">{dx.reasoning}</div>
                        {dx.confirmingQuestions?.length > 0 && (
                          <div className="dx-questions">Ask: {dx.confirmingQuestions.join(" · ")}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Workup */}
                {result.suggestedWorkup?.length > 0 && (
                  <div className="result-card fade-up delay-4">
                    <div className="result-card-title"><span>🧫</span> Suggested Workup</div>
                    {result.suggestedWorkup.map((w, i) => (
                      <div key={i} className="workup-item">
                        <div className="workup-test">{w.test}</div>
                        <div className="workup-just">{w.justification}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Red Flags */}
                {result.redFlags?.length > 0 && (
                  <div className="red-flag-box fade-up delay-5">
                    <div className="result-card-title" style={{ color: "#C0392B", marginBottom: 10 }}><span>🚨</span> Red Flags</div>
                    {result.redFlags.map((f, i) => (
                      <div key={i} className="red-flag-item">⚠️ {f}</div>
                    ))}
                  </div>
                )}

                <div className="disclaimer">
                  CliniqAI is a decision support tool only. All clinical decisions remain the sole responsibility of the treating physician.
                </div>
              </>
            )}

            {/* Lab Result */}
            {!loading && !error && labResult && activeNav === "lab" && (
              <>
                <div className="section-title fade-up">Lab Interpretation</div>
                <div className="section-sub fade-up delay-1">AI analysis of submitted lab values</div>

                {(labResult.abnormalHigh?.length > 0 || labResult.abnormalLow?.length > 0) && (
                  <div className="result-card fade-up delay-1">
                    <div className="result-card-title"><span>⚠️</span> Abnormal Values</div>
                    {labResult.abnormalHigh?.map((v, i) => (
                      <div key={i} className="workup-item">
                        <div className="workup-test lab-high">↑ {v.name}</div>
                        <div className="workup-just">{v.value} <span style={{ color: "#AAAABC" }}>(Normal: {v.normalRange})</span></div>
                      </div>
                    ))}
                    {labResult.abnormalLow?.map((v, i) => (
                      <div key={i} className="workup-item">
                        <div className="workup-test lab-low">↓ {v.name}</div>
                        <div className="workup-just">{v.value} <span style={{ color: "#AAAABC" }}>(Normal: {v.normalRange})</span></div>
                      </div>
                    ))}
                  </div>
                )}

                {labResult.normal?.length > 0 && (
                  <div className="result-card fade-up delay-2">
                    <div className="result-card-title"><span>✅</span> Normal Values</div>
                    {labResult.normal.map((v, i) => (
                      <div key={i} className="workup-item">
                        <div className="workup-test lab-normal">{v.name}</div>
                        <div className="workup-just">{v.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="result-card fade-up delay-3">
                  <div className="result-card-title"><span>📋</span> Clinical Interpretation</div>
                  <div className="summary-text">{labResult.clinicalInterpretation}</div>
                </div>

                {labResult.urgentFlags?.length > 0 && (
                  <div className="red-flag-box fade-up delay-4">
                    <div className="result-card-title" style={{ color: "#C0392B", marginBottom: 10 }}><span>🚨</span> Urgent Flags</div>
                    {labResult.urgentFlags.map((f, i) => (
                      <div key={i} className="red-flag-item">⚠️ {f}</div>
                    ))}
                  </div>
                )}

                <div className="disclaimer">
                  CliniqAI is a decision support tool only. All clinical decisions remain the sole responsibility of the treating physician.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}