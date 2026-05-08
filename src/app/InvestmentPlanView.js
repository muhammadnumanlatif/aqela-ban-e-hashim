
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
                .legend { display: flex; align-items: center; gap: 14px; padding: 8px 20px 4px; flex-wrap: wrap; }
                .leg-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #7A7060; }
                .leg-dot { width: 8px; height: 8px; border-radius: 2px; }
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

                <div class="section-label" style="padding-top:10px;"><div class="sl-line"></div><div class="sl-text">Step 2 — Payment milestones</div><div class="sl-line"></div></div>
                <div class="steps-strip">
                  <div class="step-item"><div class="step-pct">18%</div><div class="step-lbl">Down payment<br>Book today</div></div>
                  <div class="step-item"><div class="step-pct">32%</div><div class="step-lbl">Month 6<br>2nd instalment</div></div>
                  <div class="step-item"><div class="step-pct">75%</div><div class="step-lbl">Month 12<br>Construction starts</div></div>
                  <div class="step-item"><div class="step-pct">100%</div><div class="step-lbl">Month 18<br>Land fully paid</div></div>
                </div>
                <div style="padding: 8px 28px 4px; font-size: 10px; color: #6B9E6E; letter-spacing: 0.04em;">
                  ↑ Construction phases below are triggered automatically once 75% land payment is cleared
                </div>

                <div class="section-label" style="padding-top:8px;"><div class="sl-line"></div><div class="sl-text">Step 3 — Construction BOQ (post 75% land clearance)</div><div class="sl-line"></div></div>
                <div class="boq-section">
                  <div class="boq-header"><div class="boq-hcell">Phase</div><div class="boq-hcell">1 Acre</div><div class="boq-hcell">2 Acres</div><div class="boq-hcell">5 Acres</div><div class="boq-hcell">10 Acres</div></div>
                  <div class="boq-row"><div class="boq-phase"><div class="phase-badge" style="background:#378ADD;"></div><div><div class="phase-name">Phase 1 — Foundations</div><div class="phase-months">Months 0–3</div></div></div><div class="boq-val">7,723,825</div><div class="boq-val">9,950,630</div><div class="boq-val">14,105,897</div><div class="boq-val">18,773,168</div></div>
                  <div class="boq-row"><div class="boq-phase"><div class="phase-badge" style="background:#2C4A2E;"></div><div><div class="phase-name">Phase 2 — Core structure</div><div class="phase-months">Months 4–8</div></div></div><div class="boq-val">13,210,000</div><div class="boq-val">13,643,494</div><div class="boq-val">17,128,253</div><div class="boq-val">23,041,747</div></div>
                  <div class="boq-row"><div class="boq-phase"><div class="phase-badge" style="background:#6B9E6E;"></div><div><div class="phase-name">Phase 3 — Installations</div><div class="phase-months">Months 9–14</div></div></div><div class="boq-val">4,550,000</div><div class="boq-val">6,306,062</div><div class="boq-val">9,046,969</div><div class="boq-val">11,803,031</div></div>
                  <div class="boq-row"><div class="boq-phase"><div class="phase-badge" style="background:#C8A050;"></div><div><div class="phase-name">Phase 4 — Finishing</div><div class="phase-months">Months 15–24</div></div></div><div class="boq-val">8,558,103</div><div class="boq-val">9,807,400</div><div class="boq-val">15,697,255</div><div class="boq-val">25,547,449</div></div>
                  <div class="boq-total-row"><div class="total-label">Total finish product</div><div class="total-val">34,041,928</div><div class="total-val">39,707,586</div><div class="total-val">55,978,374</div><div class="total-val">79,165,395</div></div>
                  <div class="grand-row"><div class="grand-label">Land + construction combined</div><div class="grand-val">45.56M</div><div class="grand-val">62.75M</div><div class="grand-val">113.58M</div><div class="grand-val">194.37M</div></div>
                </div>

                <div class="legend">
                  <div class="leg-item"><div class="leg-dot" style="background:#378ADD;"></div>Phase 1 — Foundations</div>
                  <div class="leg-item"><div class="leg-dot" style="background:#2C4A2E;"></div>Phase 2 — Structure</div>
                  <div class="leg-item"><div class="leg-dot" style="background:#6B9E6E;"></div>Phase 3 — Installations</div>
                  <div class="leg-item"><div class="leg-dot" style="background:#C8A050;"></div>Phase 4 — Finishing</div>
                </div>

                <div class="ig-footer">
                  <div class="footer-brand"><div class="fb-arb">ARB. Farms</div><div class="fb-ahmro">Ahmro Global Pvt Ltd</div></div>
                  <div class="footer-note">All amounts in PKR · Subject to T&amp;C</div>
                </div>
              </div>
            </body>
          </html>
        `}
        style={{ width: '100%', height: '800px', border: 'none' }}
        title="Investor Infographic"
      />
    </div>
  );
}
