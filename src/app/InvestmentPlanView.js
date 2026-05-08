
"use client";

import { fmt, fmtM } from "@/utils/calculations";

export default function InvestmentPlanView({ acres }) {
  // Land Calculations (160 Marla per Acre)
  const landRate = 72000;
  const totalLandCost = acres * 160 * landRate;
  
  const downPayment = totalLandCost * 0.18;
  const instalment6M = totalLandCost * 0.32;
  const instalment12M = totalLandCost * 0.25;
  const instalment18M = totalLandCost * 0.25;

  // Construction Calculations (Interpolated from base values)
  // These roughly match the logic in calculations.js but formatted for this view
  const interpVal = (v1, v5, a) => {
    const factor = Math.log(a) / Math.log(5); // Normalized to 5 acres for this specific view's interpolation
    return v1 + (v5 - v1) * factor;
  };

  const p1 = interpVal(7723825, 14105897, acres);
  const p2 = interpVal(13210000, 17128253, acres);
  const p3 = interpVal(4550000, 9046969, acres);
  const p4 = interpVal(8558103, 15697255, acres);
  const totalConst = p1 + p2 + p3 + p4;

  return (
    <div className="investment-plan-container" style={{ margin: '20px 0', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <iframe 
        srcDoc={`
          <html>
            <head>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #F5F2EC; font-family: 'Outfit', sans-serif; }
                .ig { background: #F5F2EC; overflow: hidden; max-width: 100%; margin: 0 auto; }
                .ig-header { background: #1E3320; padding: 20px 28px 18px; display: flex; justify-content: space-between; align-items: flex-end; }
                .ig-pre { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 4px; }
                .ig-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #fff; line-height: 1.2; }
                .ig-title span { color: #8FBB92; }
                .ig-header-right { text-align: right; }
                .ig-rate-lbl { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 3px; }
                .ig-rate-val { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: #C8E6C9; }
                
                .active-plan-header { background: #fff; border-bottom: 1px solid #E0D9CE; padding: 15px 28px; display: flex; justify-content: space-between; align-items: center; }
                .ap-label { font-size: 11px; font-weight: 700; color: #1E3320; text-transform: uppercase; letter-spacing: 0.1em; }
                .ap-value { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: #2C4A2E; }

                .section-label { display: flex; align-items: center; gap: 8px; padding: 20px 28px 10px; }
                .sl-line { flex: 1; height: 0.5px; background: #C8C0B0; }
                .sl-text { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #8A8070; font-weight: 500; white-space: nowrap; }
                
                .dynamic-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; padding: 10px 28px; }
                .dyn-card { background: #fff; border: 1.5px solid #2C4A2E; border-radius: 12px; padding: 15px; }
                .dyn-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; color: #1E3320; margin-bottom: 12px; border-bottom: 1px solid #EDE8DF; padding-bottom: 8px; }
                .dyn-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 11px; }
                .dyn-lbl { color: #7A7060; }
                .dyn-val { font-weight: 600; color: #1A2E1B; }
                
                .steps-strip { margin: 15px 28px; background: #1E3320; border-radius: 10px; padding: 15px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
                .step-item { text-align: center; }
                .step-pct { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #fff; }
                .step-lbl { font-size: 9px; color: rgba(255,255,255,0.5); margin-top: 4px; }
                
                .ig-footer { background: #1E3320; padding: 12px 28px; display: flex; justify-content: space-between; align-items: center; }
                .footer-brand { display: flex; align-items: center; gap: 10px; }
                .fb-arb { font-size: 12px; font-weight: 700; color: #fff; }
                .fb-ahmro { font-size: 11px; font-weight: 500; color: #8FBB92; }
                .footer-note { font-size: 10px; color: rgba(255,255,255,0.4); }
              </style>
            </head>
            <body>
              <div class="ig">
                <div class="ig-header">
                  <div class="ig-header-left">
                    <div class="ig-pre">ARB. Farms × Ahmro Global</div>
                    <div class="ig-title">Dynamic Investment<br><span>Plan for ${acres} Acres</span></div>
                  </div>
                  <div class="ig-header-right">
                    <div class="ig-rate-lbl">Land rate</div>
                    <div class="ig-rate-val">PKR 72,000 / Marla</div>
                  </div>
                </div>

                <div class="active-plan-header">
                  <div>
                    <div class="ap-label">Total Land Value</div>
                    <div class="ap-value">${totalLandCost.toLocaleString()} PKR</div>
                  </div>
                  <div style="text-align: right">
                    <div class="ap-label">Construction Cost</div>
                    <div class="ap-value">${Math.round(totalConst).toLocaleString()} PKR</div>
                  </div>
                </div>

                <div class="section-label"><div class="sl-line"></div><div class="sl-text">Step 1 — Land Payment Schedule</div><div class="sl-line"></div></div>
                <div class="dynamic-grid">
                  <div class="dyn-card">
                    <div class="dyn-title">Payment Breakdown</div>
                    <div class="dyn-row"><span class="dyn-lbl">Booking / Down Payment (18%)</span><span class="dyn-val">${Math.round(downPayment).toLocaleString()}</span></div>
                    <div class="dyn-row"><span class="dyn-lbl">Month 6 Instalment (32%)</span><span class="dyn-val">${Math.round(instalment6M).toLocaleString()}</span></div>
                    <div class="dyn-row"><span class="dyn-lbl">Month 12 Instalment (25%)</span><span class="dyn-val">${Math.round(instalment12M).toLocaleString()}</span></div>
                    <div class="dyn-row"><span class="dyn-lbl">Month 18 (Final 25%)</span><span class="dyn-val">${Math.round(instalment18M).toLocaleString()}</span></div>
                  </div>
                  <div class="dyn-card" style="border-color: #378ADD">
                    <div class="dyn-title" style="color: #378ADD">Milestones</div>
                    <div class="dyn-row"><span class="dyn-lbl">Possession</span><span class="dyn-val">M 12</span></div>
                    <div class="dyn-row"><span class="dyn-lbl">Construction Start</span><span class="dyn-val">M 12</span></div>
                    <div class="dyn-row"><span class="dyn-lbl">Registry</span><span class="dyn-val">M 18</span></div>
                  </div>
                </div>

                <div class="section-label"><div class="sl-line"></div><div class="sl-text">Step 2 — Construction Phases</div><div class="sl-line"></div></div>
                <div class="dynamic-grid">
                   <div class="dyn-card" style="grid-column: span 2">
                    <div class="dyn-title">Phased Expenditure</div>
                    <div class="dyn-row"><span class="dyn-lbl">Phase 1 — Foundations (Months 0-3)</span><span class="dyn-val">${Math.round(p1).toLocaleString()}</span></div>
                    <div class="dyn-row"><span class="dyn-lbl">Phase 2 — Core Structure (Months 4-8)</span><span class="dyn-val">${Math.round(p2).toLocaleString()}</span></div>
                    <div class="dyn-row"><span class="dyn-lbl">Phase 3 — Installations (Months 9-14)</span><span class="dyn-val">${Math.round(p3).toLocaleString()}</span></div>
                    <div class="dyn-row"><span class="dyn-lbl">Phase 4 — Finishing (Months 15-24)</span><span class="dyn-val">${Math.round(p4).toLocaleString()}</span></div>
                  </div>
                </div>

                <div class="ig-footer">
                  <div class="footer-brand"><div class="fb-arb">ARB. Farms</div><div class="fb-ahmro">Ahmro Global</div></div>
                  <div class="footer-note">Combined Estimate: ${Math.round(totalLandCost + totalConst).toLocaleString()} PKR</div>
                </div>
              </div>
            </body>
          </html>
        `}
        style={{ width: '100%', height: '650px', border: 'none' }}
        title="Investor Infographic"
      />
    </div>
  );
}
