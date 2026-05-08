
"use client";

export default function InvestmentPlanView({ acres }) {
  // Simple Math for Land
  const landRate = 72000;
  const totalLandCost = acres * 160 * landRate;
  
  const downPayment = totalLandCost * 0.18;
  const instalment6M = totalLandCost * 0.32;
  const instalment12M = totalLandCost * 0.25;
  const instalment18M = totalLandCost * 0.25;

  // Simple Math for Construction
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
                
                .hero { background: #1e3320; color: #fff; padding: 40px 30px; text-align: center; }
                .hero h1 { font-family: 'Cormorant Garamond', serif; font-size: 32px; margin-bottom: 10px; }
                .hero p { opacity: 0.8; font-size: 14px; letter-spacing: 0.05em; }
                
                .acres-badge { display: inline-block; background: #8fbb92; color: #1e3320; padding: 6px 16px; border-radius: 50px; font-weight: 700; font-size: 14px; margin-top: 15px; }

                .big-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 30px; }
                .big-card { background: #fff; border-radius: 20px; padding: 25px; border: 2px solid #eee; position: relative; }
                .big-card.green { border-color: #8fbb92; }
                .big-card h2 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8a8070; margin-bottom: 10px; }
                .big-card .price { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: #1e3320; }
                .big-card .emoji { position: absolute; top: 20px; right: 20px; font-size: 24px; }

                .timeline { padding: 0 30px 40px; }
                .section-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; }
                .section-title span { background: #1e3320; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-family: 'Outfit'; }

                .steps { position: relative; display: flex; flex-direction: column; gap: 15px; }
                .step { display: flex; gap: 20px; align-items: center; background: #fff; padding: 15px 20px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid #f0ede8; }
                .step-icon { width: 50px; height: 50px; background: #f5f2ec; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
                .step-info { flex: 1; }
                .step-info h3 { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
                .step-info p { font-size: 12px; color: #7a7060; }
                .step-cost { text-align: right; }
                .step-cost .val { font-weight: 700; font-size: 14px; color: #1e3320; }
                .step-cost .lbl { font-size: 10px; color: #9a8f80; text-transform: uppercase; }

                .arrow { text-align: center; color: #c8c0b0; font-size: 18px; margin: -5px 0; }

                .footer { background: #f5f2ec; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; border-radius: 0 0 24px 24px; }
                .brand { font-weight: 700; font-size: 16px; }
                .brand span { color: #8fbb92; }
                .total-box { text-align: right; }
                .total-box .total-lbl { font-size: 10px; text-transform: uppercase; color: #7a7060; }
                .total-box .total-val { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; }
              </style>
            </head>
            <body>
              <div class="hero">
                <h1>My Dream Farm Plan 🏡</h1>
                <p>Everything you need to know about buying and building your farm!</p>
                <div class="acres-badge">Size: ${acres} Acres</div>
              </div>

              <div class="big-cards">
                <div class="big-card green">
                  <div class="emoji">🗺️</div>
                  <h2>Ground Price</h2>
                  <div class="price">${totalLandCost.toLocaleString()} PKR</div>
                </div>
                <div class="big-card">
                  <div class="emoji">🏗️</div>
                  <h2>Building Cost</h2>
                  <div class="price">${Math.round(totalConst).toLocaleString()} PKR</div>
                </div>
              </div>

              <div class="timeline">
                <div class="section-title"><span>1</span> Step 1: Paying for the Land</div>
                <div class="steps">
                  <div class="step">
                    <div class="step-icon">🤝</div>
                    <div class="step-info"><h3>The Handshake (Down Payment)</h3><p>You pay this to start your journey today!</p></div>
                    <div class="step-cost"><div class="val">${Math.round(downPayment).toLocaleString()}</div><div class="lbl">18% Now</div></div>
                  </div>
                  <div class="arrow">↓</div>
                  <div class="step">
                    <div class="step-icon">⏳</div>
                    <div class="step-info"><h3>First Pocket Money</h3><p>Paid after 6 months of being a farm owner.</p></div>
                    <div class="step-cost"><div class="val">${Math.round(instalment6M).toLocaleString()}</div><div class="lbl">M6 Payment</div></div>
                  </div>
                  <div class="arrow">↓</div>
                  <div class="step" style="border-left: 4px solid #378add">
                    <div class="step-icon">🔑</div>
                    <div class="step-info"><h3>Get the Keys!</h3><p>After 12 months, you can start building your house!</p></div>
                    <div class="step-cost"><div class="val">${Math.round(instalment12M).toLocaleString()}</div><div class="lbl">M12 Payment</div></div>
                  </div>
                  <div class="arrow">↓</div>
                  <div class="step">
                    <div class="step-icon">📝</div>
                    <div class="step-info"><h3>The Final Paperwork</h3><p>The last payment. The land is officially yours forever!</p></div>
                    <div class="step-cost"><div class="val">${Math.round(instalment18M).toLocaleString()}</div><div class="lbl">M18 Finish</div></div>
                  </div>
                </div>

                <div class="section-title" style="margin-top: 40px"><span>2</span> Step 2: Building the Fun Stuff</div>
                <div class="steps">
                  <div class="step">
                    <div class="step-icon">🧱</div>
                    <div class="step-info"><h3>Strong Foundations</h3><p>Digging the ground and making it solid.</p></div>
                    <div class="step-cost"><div class="val">${Math.round(p1).toLocaleString()}</div><div class="lbl">Phase 1</div></div>
                  </div>
                  <div class="step">
                    <div class="step-icon">🏠</div>
                    <div class="step-info"><h3>Walls & Roof</h3><p>Your house and animal sheds start to look real!</p></div>
                    <div class="step-cost"><div class="val">${Math.round(p2).toLocaleString()}</div><div class="lbl">Phase 2</div></div>
                  </div>
                  <div class="step">
                    <div class="step-icon">⚡</div>
                    <div class="step-info"><h3>Power & Water</h3><p>Adding solar panels and water for the cows.</p></div>
                    <div class="step-cost"><div class="val">${Math.round(p3).toLocaleString()}</div><div class="lbl">Phase 3</div></div>
                  </div>
                  <div class="step">
                    <div class="step-icon">✨</div>
                    <div class="step-info"><h3>The Final Polish</h3><p>Painting, planting trees, and moving in!</p></div>
                    <div class="step-cost"><div class="val">${Math.round(p4).toLocaleString()}</div><div class="lbl">Phase 4</div></div>
                  </div>
                </div>
              </div>

              <div class="footer">
                <div class="brand">ARB Farms × <span>Ahmro Global</span></div>
                <div class="total-box">
                  <div class="total-lbl">Total Investment</div>
                  <div class="total-val">${Math.round(totalLandCost + totalConst).toLocaleString()} PKR</div>
                </div>
              </div>
            </body>
          </html>
        `}
        style={{ width: '100%', height: '1100px', border: 'none' }}
        title="Simple Investment Plan"
      />
    </div>
  );
}
