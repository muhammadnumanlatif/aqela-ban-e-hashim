
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
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;600;700&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #fdfbf7; font-family: 'Outfit', sans-serif; color: #1e3320; }
                
                .hero { background: #1e3320; color: #fff; padding: 35px 40px; display: flex; justify-content: space-between; align-items: center; }
                .hero-left h1 { font-family: 'Cormorant Garamond', serif; font-size: 28px; }
                .hero-left p { opacity: 0.7; font-size: 13px; }
                .acres-tag { background: #8fbb92; color: #1e3320; padding: 5px 15px; border-radius: 50px; font-weight: 700; font-size: 13px; margin-top: 8px; display: inline-block; }
                
                .total-investment-bar { background: #f5f2ec; padding: 15px 40px; display: flex; justify-content: space-between; border-bottom: 1px solid #ede8df; }
                .tib-item .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #8a8070; }
                .tib-item .val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #1e3320; }

                .main-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 40px; }
                
                .column-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; margin-bottom: 25px; display: flex; align-items: center; gap: 12px; padding-bottom: 15px; border-bottom: 1.5px solid #ede8df; }
                .column-title span { background: #1e3320; color: #fff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-family: 'Outfit'; }

                .payment-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                .payment-table tr { border-bottom: 1px solid #f0ede8; }
                .payment-table td { padding: 12px 0; }
                .pt-pct { font-weight: 700; color: #2c4a2e; width: 60px; font-size: 14px; }
                .pt-info { font-size: 13px; }
                .pt-info h4 { font-size: 14px; color: #1e3320; }
                .pt-info p { color: #8a8070; font-size: 11px; }
                .pt-price { text-align: right; font-weight: 600; color: #1e3320; font-size: 14px; }
                
                .milestone-badge { background: #eaf3eb; color: #2c4a2e; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; margin-top: 10px; border: 1px dashed #8fbb92; }
                .mb-icon { font-size: 24px; }
                .mb-text h5 { font-size: 13px; font-weight: 700; }
                .mb-text p { font-size: 11px; color: #5a5040; line-height: 1.4; }

                .construction-step { display: flex; gap: 15px; margin-bottom: 20px; }
                .cs-icon { width: 40px; height: 40px; background: #fff; border: 1px solid #eee; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
                .cs-info { flex: 1; }
                .cs-info h4 { font-size: 13px; margin-bottom: 4px; }
                .cs-bar-wrap { height: 6px; background: #f0ede8; border-radius: 3px; margin: 8px 0; overflow: hidden; }
                .cs-bar { height: 100%; border-radius: 3px; }
                .cs-footer { display: flex; justify-content: space-between; font-size: 10px; color: #9a8f80; font-weight: 600; text-transform: uppercase; }

                .footer { background: #1e3320; color: #fff; padding: 25px 40px; display: flex; justify-content: space-between; align-items: center; }
                .brand { font-size: 14px; opacity: 0.8; }
                .brand b { color: #8fbb92; }
                .contact { font-size: 11px; text-align: right; opacity: 0.6; }
              </style>
            </head>
            <body>
              <div class="hero">
                <div class="hero-left">
                  <h1>Self Sustainable Farm Investment Plan</h1>
                  <p>A simple step-by-step roadmap for your agricultural future.</p>
                  <div class="acres-tag">Project Size: ${acres} Acres</div>
                </div>
                <div style="text-align: right">
                   <div style="font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.1em;">Location</div>
                   <div style="font-weight: 600; font-size: 16px;">Aqela Ban-e-Hashim</div>
                </div>
              </div>

              <div class="total-investment-bar">
                <div class="tib-item">
                  <div class="lbl">Land Subtotal</div>
                  <div class="val">${totalLandCost.toLocaleString()}</div>
                </div>
                <div class="tib-item">
                  <div class="lbl">Construction Subtotal</div>
                  <div class="val">${Math.round(totalConst).toLocaleString()}</div>
                </div>
                <div class="tib-item" style="border-left: 2px solid #8fbb92; padding-left: 30px;">
                  <div class="lbl" style="color: #2c4a2e; font-weight: 700;">Grand Total Investment</div>
                  <div class="val" style="color: #2c4a2e;">${Math.round(totalLandCost + totalConst).toLocaleString()} PKR</div>
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
                      <td class="pt-price">${Math.round(downPayment).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td class="pt-pct">32%</td>
                      <td class="pt-info"><h4>Month 6 Instalment</h4><p>Second stage of land payment</p></td>
                      <td class="pt-price">${Math.round(instalment6M).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td class="pt-pct" style="color: #378add">25%</td>
                      <td class="pt-info"><h4>Month 12 Milestone</h4><p>Possession & construction starts!</p></td>
                      <td class="pt-price">${Math.round(instalment12M).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td class="pt-pct">25%</td>
                      <td class="pt-info"><h4>Month 18 Final</h4><p>Transfer & Registry completion</p></td>
                      <td class="pt-price">${Math.round(instalment18M).toLocaleString()}</td>
                    </tr>
                    <tr style="border: none; background: #fdfbf7;">
                      <td colspan="2" style="text-align: right; font-weight: 700; font-size: 11px; color: #8a8070; padding-top: 20px; text-transform: uppercase;">Land Plan Subtotal:</td>
                      <td style="text-align: right; font-weight: 700; font-size: 16px; color: #1e3320; padding-top: 20px;">${totalLandCost.toLocaleString()}</td>
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
                      <div class="cs-footer"><span>Month 13-15</span> <span>PKR ${Math.round(p1).toLocaleString()}</span></div>
                    </div>
                  </div>

                  <div class="construction-step">
                    <div class="cs-icon">🏠</div>
                    <div class="cs-info">
                      <h4>Phase 2: Core Grey Structure</h4>
                      <div class="cs-bar-wrap"><div class="cs-bar" style="width: 100%; background: #1e3320;"></div></div>
                      <div class="cs-footer"><span>Month 16-20</span> <span>PKR ${Math.round(p2).toLocaleString()}</span></div>
                    </div>
                  </div>

                  <div class="construction-step">
                    <div class="cs-icon">⚡</div>
                    <div class="cs-info">
                      <h4>Phase 3: MEP & Utility Installations</h4>
                      <div class="cs-bar-wrap"><div class="cs-bar" style="width: 100%; background: #8fbb92;"></div></div>
                      <div class="cs-footer"><span>Month 21-24</span> <span>PKR ${Math.round(p3).toLocaleString()}</span></div>
                    </div>
                  </div>

                  <div class="construction-step">
                    <div class="cs-icon">✨</div>
                    <div class="cs-info">
                      <h4>Phase 4: Finishing & Plantation</h4>
                      <div class="cs-bar-wrap"><div class="cs-bar" style="width: 100%; background: #c8a050;"></div></div>
                      <div class="cs-footer"><span>Month 25-30</span> <span>PKR ${Math.round(p4).toLocaleString()}</span></div>
                    </div>
                  </div>

                  <div style="margin-top: 30px; padding: 20px; background: #fff; border-radius: 16px; border: 1.5px solid #1e3320;">
                    <div style="font-size: 11px; font-weight: 700; color: #8a8070; margin-bottom: 5px; text-transform: uppercase;">Construction Subtotal</div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                      <div style="font-size: 12px; color: #1e3320; font-weight: 500;">Assets & Finishing Total</div>
                      <div style="font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #1e3320;">${Math.round(totalConst).toLocaleString()}</div>
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
        style={{ width: '100%', height: '800px', border: 'none' }}
        title="Investment Plan"
      />
    </div>
  );
}
