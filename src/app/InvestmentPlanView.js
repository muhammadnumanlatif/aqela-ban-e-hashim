
"use client";

export default function InvestmentPlanView({ acres }) {
  // Financial Logic
  const landRate = 72000;
  const totalLandCost = acres * 160 * landRate;
  
  const downPayment = totalLandCost * 0.18;
  const instalment6M = totalLandCost * 0.32;
  const instalment12M = totalLandCost * 0.25;
  const instalment18M = totalLandCost * 0.25;

  const interpVal = (v1, v5, a) => {
    const factor = Math.log(a) / Math.log(5);
    return v1 + (v5 - v1) * factor;
  };

  const p1 = interpVal(7723825, 14105897, acres);
  const p2 = interpVal(13210000, 17128253, acres);
  const p3 = interpVal(4550000, 9046969, acres);
  const p4 = interpVal(8558103, 15697255, acres);
  const totalConst = p1 + p2 + p3 + p4;

  return (
    <div className="investment-plan-container" style={{ margin: '20px 0', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', background: '#fff' }}>
      <iframe 
        srcDoc={`
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
                
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #fdfbf7; font-family: 'Outfit', sans-serif; color: #1e3320; overflow-x: hidden; }
                
                .hero { background: #1e3320; color: #fff; padding: 35px 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
                .hero-left h1 { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; letter-spacing: -0.01em; }
                .hero-left p { font-family: 'Outfit', sans-serif; opacity: 0.7; font-size: 13px; font-weight: 400; margin-top: 4px; }
                .acres-tag { background: #8fbb92; color: #1e3320; padding: 5px 15px; border-radius: 50px; font-weight: 600; font-size: 12px; margin-top: 10px; display: inline-block; font-family: 'Outfit', sans-serif; text-transform: uppercase; letter-spacing: 0.05em; }
                
                .total-investment-bar { background: #f8fafc; padding: 20px 40px; display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; gap: 20px; }
                .tib-item .lbl { font-family: 'Outfit', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 700; margin-bottom: 4px; }
                .tib-item .val { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #1b5235; line-height: 1.2; }
                .tib-item.grand-total { border-left: 2px solid #1b5235; padding-left: 30px; }
                .tib-item.grand-total .lbl { color: #1b5235; }
                .tib-item.grand-total .val { font-size: 22px; color: #1b5235; }

                .main-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 40px; }
                
                .column-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; margin-bottom: 25px; display: flex; align-items: center; gap: 12px; padding-bottom: 15px; border-bottom: 1.5px solid #ede8df; color: #1e3320; }
                .column-title span { background: #1e3320; color: #fff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-family: 'Outfit'; font-weight: 600; flex-shrink: 0; }

                .payment-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                .payment-table tr { border-bottom: 1px solid #f0ede8; }
                .payment-table td { padding: 14px 0; vertical-align: middle; }
                .pt-pct { font-family: 'Outfit', sans-serif; font-weight: 700; color: #1b5235; width: 65px; font-size: 18px; }
                .pt-info { font-family: 'Outfit', sans-serif; }
                .pt-info h4 { font-size: 14px; color: #1e3320; font-weight: 600; }
                .pt-info p { color: #8a8070; font-size: 11px; font-weight: 400; margin-top: 2px; }
                .pt-price { font-family: 'Outfit', sans-serif; text-align: right; font-weight: 700; color: #1b5235; font-size: 18px; }
                .pt-price span { font-size: 11px; opacity: 0.7; font-weight: 400; margin-left: 4px; }
                
                .milestone-badge { background: #eaf3eb; color: #2c4a2e; padding: 18px; border-radius: 12px; display: flex; align-items: center; gap: 15px; margin-top: 10px; border: 1px dashed #8fbb92; font-family: 'Outfit', sans-serif; }
                .mb-icon { font-size: 24px; }
                .mb-text h5 { font-size: 13px; font-weight: 700; margin-bottom: 4px; }
                .mb-text p { font-size: 11px; color: #5a5040; line-height: 1.5; font-weight: 400; }

                .construction-step { display: flex; gap: 15px; margin-bottom: 22px; font-family: 'Outfit', sans-serif; }
                .cs-icon { width: 42px; height: 42px; background: #fff; border: 1px solid #eee; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
                .cs-info { flex: 1; }
                .cs-info h4 { font-size: 13px; margin-bottom: 6px; font-weight: 600; color: #1e3320; }
                .cs-bar-wrap { height: 6px; background: #f0ede8; border-radius: 3px; margin: 8px 0; overflow: hidden; }
                .cs-bar { height: 100%; border-radius: 3px; }
                .cs-footer { display: flex; justify-content: space-between; font-size: 10px; color: #9a8f80; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
                .cs-footer .cost { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: #1b5235; letter-spacing: 0; }
                .cs-footer .cost span { font-size: 10px; opacity: 0.7; font-weight: 400; margin-left: 3px; }

                .subtotal-box { margin-top: 30px; padding: 22px; background: #f8fafc; border-radius: 16px; border: 1.5px solid #1b5235; font-family: 'Outfit', sans-serif; }
                .subtotal-lbl { font-size: 10px; font-weight: 700; color: #1b5235; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em; }
                .subtotal-row { display: flex; justify-content: space-between; align-items: baseline; }
                .subtotal-row .text { font-size: 13px; color: #1e3320; font-weight: 600; }
                .subtotal-row .val { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700; color: #1b5235; }
                .subtotal-row .val span { font-size: 12px; opacity: 0.7; font-weight: 400; margin-left: 4px; }

                .footer { background: #1e3320; color: #fff; padding: 25px 40px; display: flex; justify-content: space-between; align-items: center; font-family: 'Outfit', sans-serif; flex-wrap: wrap; gap: 15px; }
                
                @keyframes pulse-gold {
                  0% { box-shadow: 0 0 0 0 rgba(200, 160, 80, 0.4); transform: scale(1); }
                  70% { box-shadow: 0 0 0 15px rgba(200, 160, 80, 0); transform: scale(1.01); }
                  100% { box-shadow: 0 0 0 0 rgba(200, 160, 80, 0); transform: scale(1); }
                }

                .validity-banner {
                  background: linear-gradient(135deg, #1e3320 0%, #2a452d 100%);
                  color: #fff;
                  margin: 0 40px 40px 40px;
                  padding: 25px;
                  border-radius: 20px;
                  display: flex;
                  align-items: center;
                  gap: 25px;
                  border: 1px solid rgba(200, 160, 80, 0.3);
                  animation: pulse-gold 3s infinite ease-in-out;
                  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }

                .vb-icon {
                  width: 60px;
                  height: 60px;
                  background: #c8a050;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 28px;
                  flex-shrink: 0;
                  color: #1e3320;
                  box-shadow: 0 4px 15px rgba(200, 160, 80, 0.4);
                }

                .vb-content h6 {
                  font-family: 'Outfit', sans-serif;
                  font-size: 15px;
                  font-weight: 800;
                  margin-bottom: 6px;
                  color: #c8a050;
                  text-transform: uppercase;
                  letter-spacing: 0.12em;
                }

                .vb-content p {
                  font-size: 13px;
                  line-height: 1.6;
                  color: rgba(255,255,255,0.9);
                  font-family: 'Outfit', sans-serif;
                  font-weight: 400;
                }

                .vb-highlight {
                  color: #fff;
                  font-weight: 700;
                  text-decoration: underline;
                  text-decoration-color: #c8a050;
                  text-underline-offset: 3px;
                }
                .brand { font-size: 13px; opacity: 0.8; font-weight: 400; }
                .brand b { color: #8fbb92; font-weight: 600; }
                .contact { font-size: 10px; text-align: right; opacity: 0.5; font-weight: 300; line-height: 1.5; }

                /* Responsiveness xxl, xl, large, medium, small, mini, foldable */
                @media (max-width: 1280px) {
                  .main-layout { gap: 30px; padding: 30px; }
                  .hero, .total-investment-bar, .footer { padding-left: 30px; padding-right: 30px; }
                }

                @media (max-width: 1024px) {
                  .hero-left h1 { font-size: 28px; }
                  .column-title { font-size: 20px; }
                  .pt-pct { font-size: 18px; width: 55px; }
                }

                @media (max-width: 768px) {
                  .main-layout { grid-template-columns: 1fr; gap: 40px; }
                  .total-investment-bar { justify-content: flex-start; }
                  .tib-item { min-width: 150px; }
                  .hero { text-align: center; justify-content: center; }
                  .hero-left { width: 100%; }
                  .contact { text-align: center; width: 100%; }
                }

                @media (max-width: 640px) {
                  .hero, .total-investment-bar, .main-layout, .footer { padding: 20px; }
                  .hero-left h1 { font-size: 24px; }
                  .tib-item .val { font-size: 20px; }
                  .column-title { font-size: 18px; }
                  .payment-table td { padding: 10px 0; }
                  .pt-pct { width: 45px; font-size: 16px; }
                  .pt-price { font-size: 15px; }
                }

                @media (max-width: 480px) {
                  .hero-left h1 { font-size: 20px; }
                  .acres-tag { font-size: 10px; padding: 4px 12px; }
                  .tib-item { min-width: 100%; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 10px; }
                  .tib-item:last-child { border-bottom: none; padding-bottom: 0; border-left: none !important; padding-left: 0 !important; }
                  .payment-table td { display: block; width: 100%; text-align: left !important; padding: 5px 0; }
                  .pt-pct { width: 100%; margin-bottom: 5px; }
                  .pt-price { margin-top: 5px; font-size: 16px; color: #2c4a2e; }
                  .milestone-badge { flex-direction: column; text-align: center; }
                }

                @media (max-width: 320px) {
                  .hero-left h1 { font-size: 18px; }
                  .hero, .total-investment-bar, .main-layout, .footer { padding: 15px; }
                  .column-title { font-size: 16px; gap: 8px; }
                  .subtotal-row .val { font-size: 20px; }
                }
              </style>
            </head>
            <body>
              <div class="hero">
                <div class="hero-left">
                  <h1>Self Sustainable Farm Investment Plan</h1>
                  <p>A simple step-by-step roadmap for your agricultural future.</p>
                  <div class="acres-tag">Project Size: ${acres} Acres</div>
                </div>
                <div style="text-align: right; font-family: 'Outfit', sans-serif;">
                   <div style="font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 500;">Project Site</div>
                   <div style="font-weight: 600; font-size: 16px; font-family: 'Cormorant Garamond', serif; letter-spacing: 0.02em;">Aqeela-e-Bani Hashim</div>
                </div>
              </div>

              <div class="total-investment-bar">
                <div class="tib-item">
                  <div class="lbl">Land Subtotal</div>
                  <div class="val">${totalLandCost.toLocaleString()} <span style="font-size: 11px; opacity: 0.7;">PKR</span></div>
                </div>
                <div class="tib-item">
                  <div class="lbl">OFF Grid Subtotal</div>
                  <div class="val">${Math.round(totalConst).toLocaleString()} <span style="font-size: 11px; opacity: 0.7;">PKR</span></div>
                </div>
                <div class="tib-item grand-total">
                  <div class="lbl">Grand Total Investment</div>
                  <div class="val">${Math.round(totalLandCost + totalConst).toLocaleString()} <span style="font-size: 14px; font-weight: 500;">PKR</span></div>
                </div>
              </div>

              <div class="main-layout">
                <!-- Column 1: Land Acquisition -->
                <div class="column">
                  <div class="column-title"><span>1</span> Land Acquisition Plan</div>
                  
                  <table class="payment-table">
                    <tr>
                      <td class="pt-pct">18%</td>
                      <td class="pt-info"><h4>Booking Amount</h4><p>Due immediately to secure the plot</p></td>
                      <td class="pt-price">${Math.round(downPayment).toLocaleString()}<span>PKR</span></td>
                    </tr>
                    <tr>
                      <td class="pt-pct">32%</td>
                      <td class="pt-info"><h4>Month 6 Instalment</h4><p>Second stage of land payment</p></td>
                      <td class="pt-price">${Math.round(instalment6M).toLocaleString()}<span>PKR</span></td>
                    </tr>
                    <tr>
                      <td class="pt-pct" style="color: #378add">25%</td>
                      <td class="pt-info"><h4>Month 12 Milestone</h4><p>Possession & construction starts!</p></td>
                      <td class="pt-price">${Math.round(instalment12M).toLocaleString()}<span>PKR</span></td>
                    </tr>
                    <tr>
                      <td class="pt-pct">25%</td>
                      <td class="pt-info"><h4>Month 18 Final</h4><p>Transfer & Registry completion</p></td>
                      <td class="pt-price">${Math.round(instalment18M).toLocaleString()}<span>PKR</span></td>
                    </tr>
                    <tr style="border: none; background: #fdfbf7;">
                      <td colspan="2" style="text-align: right; font-weight: 600; font-size: 11px; color: #8a8070; padding-top: 25px; text-transform: uppercase; font-family: 'Outfit', sans-serif; letter-spacing: 0.05em;">Land Plan Subtotal:</td>
                      <td style="text-align: right; font-weight: 700; font-size: 20px; color: #1b5235; padding-top: 25px; font-family: 'Outfit', sans-serif;">${totalLandCost.toLocaleString()}<span>PKR</span></td>
                    </tr>
                  </table>

                  <div class="milestone-badge">
                    <div class="mb-icon">🔑</div>
                    <div class="mb-text">
                      <h5>Possession Milestone (Month 12)</h5>
                      <p>Once 75% of the land cost is cleared, you get the keys to your plot and the foundation of your farm house is laid!</p>
                    </div>
                  </div>
                  
                  <div class="milestone-badge" style="border-color: #378add; background: #f0f7ff;">
                    <div class="mb-icon">📜</div>
                    <div class="mb-text">
                      <h5 style="color: #003366">Registry & Transfer (Month 18)</h5>
                      <p>Final ownership transfer and official registration of the land in your name upon 100% payment clearance.</p>
                    </div>
                  </div>
                </div>

                <!-- Column 2: Construction Phases -->
                <div class="column">
                  <div class="column-title"><span>2</span> OFF Grid Construction Phases</div>
                  
                  <div class="construction-step">
                    <div class="cs-icon">🧱</div>
                    <div class="cs-info">
                      <h4>Phase 1: Foundations & Earthworks</h4>
                      <div class="cs-bar-wrap"><div class="cs-bar" style="width: 100%; background: #378add;"></div></div>
                      <div class="cs-footer"><span>Months 1-4</span> <span class="cost">${Math.round(p1).toLocaleString()}<span>PKR</span></span></div>
                    </div>
                  </div>

                  <div class="construction-step">
                    <div class="cs-icon">🏠</div>
                    <div class="cs-info">
                      <h4>Phase 2: Core Grey Structure</h4>
                      <div class="cs-bar-wrap"><div class="cs-bar" style="width: 100%; background: #1e3320;"></div></div>
                      <div class="cs-footer"><span>Months 5-9</span> <span class="cost">${Math.round(p2).toLocaleString()}<span>PKR</span></span></div>
                    </div>
                  </div>

                  <div class="construction-step">
                    <div class="cs-icon">⚡</div>
                    <div class="cs-info">
                      <h4>Phase 3: MEP & Utility Installations</h4>
                      <div class="cs-bar-wrap"><div class="cs-bar" style="width: 100%; background: #8fbb92;"></div></div>
                      <div class="cs-footer"><span>Months 10-14</span> <span class="cost">${Math.round(p3).toLocaleString()}<span>PKR</span></span></div>
                    </div>
                  </div>

                  <div class="construction-step">
                    <div class="cs-icon">✨</div>
                    <div class="cs-info">
                      <h4>Phase 4: Finishing & Plantation</h4>
                      <div class="cs-bar-wrap"><div class="cs-bar" style="width: 100%; background: #c8a050;"></div></div>
                      <div class="cs-footer"><span>Months 15-24</span> <span class="cost">${Math.round(p4).toLocaleString()}<span>PKR</span></span></div>
                    </div>
                  </div>

                  <div class="subtotal-box">
                    <div class="subtotal-lbl">Construction Subtotal</div>
                    <div class="subtotal-row">
                      <div class="text">Assets & Finishing Total</div>
                      <div class="val">${Math.round(totalConst).toLocaleString()}<span>PKR</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="footer">
                <div class="brand">ARB Farms × <b>Ahmro Global</b></div>
                <div class="contact">This is a dynamic estimate based on current market rates. <br> Final cost subject to site-specific conditions.</div>
              </div>
            </body>
          </html>
        `}
        style={{ width: '100%', height: '1400px', border: 'none' }}
        title="Investment Plan"
      />
    </div>
  );
}
