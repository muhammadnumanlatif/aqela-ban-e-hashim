
export const interp = (min, max, a) => {
    if (a <= 1) return min;
    if (a >= 50) return max;
    return min + (max - min) * (Math.log(a) / Math.log(50));
};

export const calcCosts = (a) => {
    // 1. Infrastructure
    const boundRft = Math.round(Math.sqrt(a * 43560) * 4);
    const wall = boundRft * 3300;
    const fancyWall = wall * 0.15;
    const gate = 850000;
    const roads = interp(500000, 4500000, a);
    const leveling = a * 120000;
    const tubewell = 1500000;
    const waterTank = 1200000;
    const rainwater = a * 85000;
    const infra = wall + fancyWall + gate + roads + leveling + tubewell + waterTank + rainwater;

    // 2. Buildings
    const house = 8500000;
    const animalShedMarla = a <= 2 ? 4 : a <= 5 ? 8 : a <= 10 ? 15 : Math.round(interp(20, 60, a));
    const animalShed = animalShedMarla * 440000;
    const fodder = interp(400000, 2000000, a);
    const greenhouse = interp(1500000, 10000000, a);
    const buildings = house + animalShed + fodder + greenhouse;

    // 3. Energy & Utilities
    const solarKW = a <= 2 ? 10 : a <= 5 ? 15 : a <= 10 ? 25 : Math.round(interp(30, 100, a));
    const solar = solarKW * 180000;
    const biogas = 600000;
    const electrification = a * 150000;
    const energy = solar + biogas + electrification;

    // 4. Irrigation
    const filtration = 450000;
    const drip = a * 250000;
    const pressureTank = 800000;
    const water = filtration + drip + pressureTank;

    // 5. Production
    const fishPond = 1200000;
    const vermi = 350000;
    const orchardTrees = Math.round(a * 40);
    const orchard = orchardTrees * 1500;
    const boundTrees = Math.round(interp(40, 200, a));
    const boundTreeCost = boundTrees * 2000;
    const vegArea = a * 150000;
    const production = fishPond + vermi + orchard + boundTreeCost + vegArea;

    // 6. Livestock
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
        items: {
            wall, fancyWall, gate, roads, leveling, tubewell, waterTank, rainwater,
            house, animalShed, fodder, greenhouse, solar, biogas, electrification,
            filtration, drip, pressureTank, fishPond, vermi, orchard, boundTreeCost, vegArea,
            cows: cowCount * 720000, buffs: buffCount * 920000, consultant, contingency
        }
    };
};

export const fmt = (num) => "PKR " + Math.round(num).toLocaleString();
export const fmtM = (num) => (num / 1000000).toFixed(2) + "M";
export const fmtRate = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return Math.round(num).toString();
};
