
"use client";

export default function InvestmentPlanView() {
  return (
    <div className="investment-plan-container" style={{ margin: '20px 0', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <iframe 
        srcDoc={`
          <html>
            <head>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #F5F2EC; }
                .ig {
                  font-family: 'Outfit', sans-serif;
                  background: #F5F2EC;
                  overflow: hidden;
                  max-width: 100%;
                  margin: 0 auto;
                }
                .ig-header {
                  background: #1E3320;
                  padding: 20px 28px 18px;
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-end;
                }
                .ig-pre { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 4px; }
                .ig-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #fff; line-height: 1.2; }
                .ig-title span { color: #8FBB92; }
                .ig-header-right { text-align: right; }
                .ig-rate-lbl { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 3px; }
                .ig-rate-val { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: #C8E6C9; }
                .section-label { display: flex; align-items: center; gap: 8px; padding: 14px 28px 10px; }
                .sl-line { flex: 1; height: 0.5px; background: #C8C0B0; }
                .sl-text { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #8A8070; font-weight: 500; white-space: nowrap; }
                .plots-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 0 20px 6px; }
                .plot-card { background: #fff; border: 1px solid #E0D9CE; border-radius: 12px; overflow: hidden; }
                .plot-card.featured { border-color: #2C4A2E; border-width: 1.5px; }
                .pc-head { background: #2C4A2E; padding: 8px 10px 6px; text-align: center; }
                .plot-card:not(.featured) .pc-head { background: #3C3C3C; }
                .pc-size { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #fff; line-height: 1; }
                .pc-total { font-size: 10px; font-weight: 600; color: #8FBB92; margin-top: 3px; }
                .pc-body { padding: 8px 10px; }
                .pc-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; font-size: 10px; }
                .pct { color: #7A7060; }
                .pcv { font-weight: 500; color: #1A2E1B; font-size: 10px; }
                .pc-bar-wrap { height: 3px; background: #EDE8DF; border-radius: 2px; margin-bottom: 5px; }
                .pc-bar { height: 3px; border-radius: 2px; }
                .steps-strip { margin: 4px 20px 6px; background: #1E3320; border-radius: 10px; padding: 12px 16px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; position: relative; }
                .step-item { text-align: center; }
                .step-pct { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #fff; line-height: 1; }
                .step-lbl { font-size: 9px; color: rgba(255,255,255,0.45); line-height: 1.4; margin-top: 3px; letter-spacing: 0.04em; }
                .boq-section { padding: 0 20px 8px; }
                .boq-header { display: grid; grid-template-columns: 180px repeat(4, 1fr); gap: 6px; padding: 0 0 6px; border-bottom: 1px solid #D8D0C4; margin-bottom: 6px; }
                .boq-hcell { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #8A8070; text-align: center; font-weight: 500; }
                .boq-hcell:first-child { text-align: left; }
                .boq-row { display: grid; grid-template-columns: 180px repeat(4, 1fr); gap: 6px; padding: 7px 0; border-bottom: 0.5px solid #EDE8DF; align-items: center; }
                .boq-phase { display: flex; align-items: center; gap: 8px; }
                .phase-badge { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
                .phase-name { font-size: 11.5px; color: #2A2520; font-weight: 500; }
                .phase-months { font-size: 9.5px; color: #9A8F80; display: block; font-weight: 400; }
                .boq-val { font-size: 11px; color: #2A2520; text-align: center; font-weight: 400; }
                .boq-total-row { display: grid; grid-template-columns: 180px repeat(4, 1fr); gap: 6px; padding: 9px 0 4px; margin-top: 2px; border-top: 1.5px solid #2C4A2E; }
                .total-label { font-size: 11px; font-weight: 600; color: #1A2E1B; text-transform: uppercase; letter-spacing: 0.06em; }
                .total-val { font-size: 12px; font-weight: 600; color: #1A2E1B; text-align: center; font-family: 'Cormorant Garamond', serif; }
                .grand-row { display: grid; grid-template-columns: 180px repeat(4, 1fr); gap: 6px; padding: 4px 0 8px; }
                .grand-label { font-size: 10px; color: #8A8070; }
                .grand-val { font-size: 10px; text-align: center; background: #EAF3EB; color: #1A2E1B; border-radius: 6px; padding: 4px 4px; font-weight: 500; }
                .ig-footer { background: #1E3320; padding: 10px 24px; display: flex; justify-content: space-between; align-items: center; }
                .footer-brand { display: flex; align-items: center; gap: 10px; }
                .fb-arb { font-size: 12px; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
                .fb-ahmro { font-size: 11px; font-weight: 500; color: #8FBB92; }
                .footer-note { font-size: 10px; color: rgba(255,255,255,0.4); }
              </style>
            </head>
            <body>
              <div class="ig">
                <div class="ig-header">
                  <div class="ig-header-left">
                    <div class="ig-pre">ARB. Farms × Ahmro Global</div>
                    <div class="ig-title">Land Purchase &amp;<br><span>Construction Plan</span></div>
                  </div>
                  <div class="ig-header-right">
                    <div class="ig-rate-lbl">Land rate</div>
                    <div class="ig-rate-val">PKR 72,000 / Marla</div>
                  </div>
                </div>
                <div class="section-label"><div class="sl-line"></div><div class="sl-text">Step 1 — Choose your plot &amp; land payment</div><div class="sl-line"></div></div>
                <div class="plots-grid">
                  <div class="plot-card"><div class="pc-head"><div class="pc-size">1 Acre</div><div class="pc-total">PKR 11,520,000</div></div><div class="pc-body"><div class="pc-row"><span class="pct">18% Down</span><span class="pcv">2,073,600</span></div><div class="pc-row"><span class="pct">32% @ M6</span><span class="pcv">3,686,400</span></div><div class="pc-row"><span class="pct">75% @ M12</span><span class="pcv">2,880,000</span></div><div class="pc-row"><span class="pct">100% @ M18</span><span class="pcv">2,880,000</span></div></div></div>
                  <div class="plot-card featured"><div class="pc-head"><div class="pc-size">2 Acres</div><div class="pc-total">PKR 23,040,000</div></div><div class="pc-body"><div class="pc-row"><span class="pct">18% Down</span><span class="pcv">4,147,200</span></div><div class="pc-row"><span class="pct">32% @ M6</span><span class="pcv">7,372,800</span></div><div class="pc-row"><span class="pct">75% @ M12</span><span class="pcv">5,760,000</span></div><div class="pc-row"><span class="pct">100% @ M18</span><span class="pcv">5,760,000</span></div></div></div>
                  <div class="plot-card featured"><div class="pc-head"><div class="pc-size">5 Acres</div><div class="pc-total">PKR 57,600,000</div></div><div class="pc-body"><div class="pc-row"><span class="pct">18% Down</span><span class="pcv">10,368,000</span></div><div class="pc-row"><span class="pct">32% @ M6</span><span class="pcv">18,432,000</span></div><div class="pc-row"><span class="pct">75% @ M12</span><span class="pcv">14,400,000</span></div><div class="pc-row"><span class="pct">100% @ M18</span><span class="pcv">14,400,000</span></div></div></div>
                  <div class="plot-card"><div class="pc-head"><div class="pc-size">10 Acres</div><div class="pc-total">PKR 115,200,000</div></div><div class="pc-body"><div class="pc-row"><span class="pct">18% Down</span><span class="pcv">20,736,000</span></div><div class="pc-row"><span class="pct">32% @ M6</span><span class="pcv">36,864,000</span></div><div class="pc-row"><span class="pct">75% @ M12</span><span class="pcv">28,800,000</span></div><div class="pc-row"><span class="pct">100% @ M18</span><span class="pcv">28,800,000</span></div></div></div>
                </div>
                <div class="steps-strip">
                  <div class="step-item"><div class="step-pct">18%</div><div class="step-lbl">Down payment</div></div>
                  <div class="step-item"><div class="step-pct">32%</div><div class="step-lbl">Month 6</div></div>
                  <div class="step-item"><div class="step-pct">75%</div><div class="step-lbl">Month 12</div></div>
                  <div class="step-item"><div class="step-pct">100%</div><div class="step-lbl">Month 18</div></div>
                </div>
                <div class="ig-footer">
                  <div class="footer-brand"><div class="fb-arb">ARB. Farms</div><div class="fb-ahmro">Ahmro Global</div></div>
                  <div class="footer-note">All amounts in PKR</div>
                </div>
              </div>
            </body>
          </html>
        `}
        style={{ width: '100%', height: '580px', border: 'none' }}
        title="Investor Infographic"
      />
    </div>
  );
}
