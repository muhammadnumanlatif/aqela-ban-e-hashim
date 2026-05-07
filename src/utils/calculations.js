
export const interp = (min, max, a) => {
    if (a <= 1) return min;
    if (a >= 50) return max;
    return min + (max - min) * (Math.log(a) / Math.log(50));
};

export const calcCosts = (a) => {
  const boundRft = Math.round(interp(500, 770, a));
  const wall = boundRft * 3300;
  const fancyWall = interp(1200000, 1848000, a);
  const gate = 850000;
  const roads = interp(720000, 2160000, a);
  const leveling = a * 120000;
  const tubewell = 950000;
  const waterTank = 1100000;
  const rainwater = a * 85000;
  const infra = wall + fancyWall + gate + roads + leveling + tubewell + waterTank + rainwater;

  const house = 13575000;
  const animalShedMarla = Math.round(interp(8, 20, a));
  const animalShed = animalShedMarla * 440000;
  const fodder = interp(900000, 1800000, a);
  const greenhouse = interp(1000000, 2156000, a);
  const buildings = house + animalShed + fodder + greenhouse;

  const solarKW = Math.round(interp(5, 15, a));
  const solar = interp(1200000, 2600000, a);
  const biogas = interp(500000, 950000, a);
  const electrification = interp(600000, 1200000, a);
  const energy = solar + biogas + electrification;

  const filtration = 450000;
  const drip = a * 250000;
  const pressureTank = 300000;
  const water = filtration + drip + pressureTank;

  const fishPond = interp(480000, 1200000, a);
  const vermi = interp(250000, 500000, a);
  const orchardTrees = Math.round(interp(80, 400, a));
  const orchard = orchardTrees * 1500;
  const boundTrees = Math.round(interp(40, 200, a));
  const boundTreeCost = boundTrees * 2000;
  const vegArea = a * 150000;
  const production = fishPond + vermi + orchard + boundTreeCost + vegArea;

  const cowCount = a <= 2 ? 2 : a <= 5 ? 4 : a <= 10 ? 8 : Math.round(a * 1.2);
  const buffCount = a <= 2 ? 1 : a <= 5 ? 2 : a <= 10 ? 4 : Math.round(a * 0.5);
  const livestock = cowCount * 720000 + buffCount * 920000;

  const subtotal = infra + buildings + energy + water + production + livestock;
  const consultant = subtotal * 0.09;
  const contingency = subtotal * 0.12;
  const grand = subtotal + consultant + contingency;

  return {
    infra, buildings, energy, water, production, livestock,
    subtotal, consultant, contingency, grand,
    animalShedMarla, solarKW, orchardTrees, boundTrees,
    cowCount, buffCount, boundRft,
    items: { wall, fancyWall, gate, roads, leveling, tubewell, waterTank, rainwater,
      house, animalShed, fodder, greenhouse, solar, biogas, electrification,
      filtration, drip, pressureTank, fishPond, vermi, orchard, boundTreeCost, vegArea,
      cows: cowCount * 720000, buffs: buffCount * 920000, consultant, contingency }
  };
};

export const fmt = (num) => "PKR " + Math.round(num).toLocaleString();
export const fmtM = (num) => (num / 1000000).toFixed(2) + "M";
