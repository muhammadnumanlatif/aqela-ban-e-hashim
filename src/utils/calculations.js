
export const interp = (min, max, a) => {
    if (a <= 1) return min;
    if (a >= 50) return max;
    // Normalized to 5 acres as the mid-point/standard model
    const factor = Math.log(a) / Math.log(50);
    return min + (max - min) * factor;
};

export const calcCosts = (a) => {
    // 1. Site Infrastructure & Earthworks
    const b3 = 500; // 1-acre base Rft
    const c3 = 770; // 5-acre base Rft
    let boundRft;
    if (a <= 1) {
        boundRft = b3;
    } else if (a < 5) {
        boundRft = b3 + 67.5 * (a - 1);
    } else {
        boundRft = c3 + 67.5 * (a - 5);
    }
    boundRft = Math.round(boundRft);

    const wall = boundRft * 3300;
    const fancyWall = interp(1200000, 1848000, a);
    const gate = 850000;
    
    const b5 = 720000; // 1-acre base roads
    const c5 = 2160000; // 5-acre base roads
    let roads;
    if (a <= 1) {
        roads = b5;
    } else if (a < 5) {
        roads = b5 + 360000 * (a - 1);
    } else {
        roads = c5 + 360000 * (a - 5);
    }
    roads = Math.round(roads);
    const leveling = a * 120000;
    const tubewell = 950000;
    const waterTank = 1100000;
    const rainwater = a * 85000;
    const infraTotal = wall + fancyWall + gate + roads + leveling + tubewell + waterTank + rainwater;

    // 2. Buildings & Structures
    const house = 13575000;
    let animalShedMarla;
    if (a <= 1) {
        animalShedMarla = 8;
    } else if (a < 5) {
        animalShedMarla = 8 + 3 * (a - 1);
    } else {
        animalShedMarla = 20 + 3 * (a - 5);
    }
    animalShedMarla = Math.round(animalShedMarla);
    const animalShed = animalShedMarla * 440000;
    const b7 = 900000; // 1-acre base fodder
    const c7 = 1800000; // 5-acre base fodder
    let fodder;
    if (a <= 1) {
        fodder = b7;
    } else if (a < 5) {
        fodder = b7 + 225000 * (a - 1);
    } else {
        fodder = c7 + 225000 * (a - 5);
    }
    fodder = Math.round(fodder);
    let greenhouseMarla;
    if (a <= 1) {
        greenhouseMarla = 8;
    } else if (a < 5) {
        greenhouseMarla = 8 + 2.5 * (a - 1);
    } else {
        greenhouseMarla = 18 + 2.5 * (a - 5);
    }
    greenhouseMarla = Math.round(greenhouseMarla);

    const bGreenhouse = 1000000; // 1-acre base greenhouse
    const cGreenhouse = 2156000; // 5-acre base greenhouse
    let greenhouse;
    if (a <= 1) {
        greenhouse = bGreenhouse;
    } else if (a < 5) {
        greenhouse = bGreenhouse + 289000 * (a - 1);
    } else {
        greenhouse = cGreenhouse + 289000 * (a - 5);
    }
    greenhouse = Math.round(greenhouse);
    const buildingsTotal = house + animalShed + fodder + greenhouse;

    // 3. Energy & Utilities
    let solarKW;
    if (a <= 1) {
        solarKW = 5;
    } else if (a < 5) {
        solarKW = 5 + 2.5 * (a - 1);
    } else {
        solarKW = 15 + 2.5 * (a - 5);
    }
    solarKW = Math.round(solarKW);

    const bSolar = 1200000; // 1-acre base solar
    const cSolar = 2600000; // 5-acre base solar
    let solar;
    if (a <= 1) {
        solar = bSolar;
    } else if (a < 5) {
        solar = bSolar + 350000 * (a - 1);
    } else {
        solar = cSolar + 350000 * (a - 5);
    }
    solar = Math.round(solar);
    let biogasM3;
    if (a <= 1) {
        biogasM3 = 4;
    } else if (a < 5) {
        biogasM3 = 4 + 1.5 * (a - 1);
    } else {
        biogasM3 = 10 + 1.5 * (a - 5);
    }
    biogasM3 = Math.round(biogasM3);

    const bBiogas = 500000; // 1-acre base biogas
    const cBiogas = 950000; // 5-acre base biogas
    let biogas;
    if (a <= 1) {
        biogas = bBiogas;
    } else if (a < 5) {
        biogas = bBiogas + 112500 * (a - 1);
    } else {
        biogas = cBiogas + 112500 * (a - 5);
    }
    biogas = Math.round(biogas);
    const bElec = 600000; // 1-acre base electrification
    const cElec = 1200000; // 5-acre base electrification
    let electrification;
    if (a <= 1) {
        electrification = bElec;
    } else if (a < 5) {
        electrification = bElec + 150000 * (a - 1);
    } else {
        electrification = cElec + 150000 * (a - 5);
    }
    electrification = Math.round(electrification);

    const electrificationPct = Math.min(100, Math.round(50 + (a - 1) * 12.5));
    const energyTotal = solar + biogas + electrification;

    // 4. Irrigation & Water
    const filtration = 450000;
    const drip = a * 250000;
    const pressureTank = 300000;
    const waterTotal = filtration + drip + pressureTank;

    // 5. Production Units & Plantation
    let fishPondMarla;
    if (a <= 1) {
        fishPondMarla = 4;
    } else if (a < 5) {
        fishPondMarla = 4 + 1.5 * (a - 1);
    } else {
        fishPondMarla = 10 + 1.5 * (a - 5);
    }
    fishPondMarla = Math.round(fishPondMarla);

    const bFish = 600000; // 1-acre base fish pond
    const cFish = 1320000; // 5-acre base fish pond
    let fishPond;
    if (a <= 1) {
        fishPond = bFish;
    } else if (a < 5) {
        fishPond = bFish + 180000 * (a - 1);
    } else {
        fishPond = cFish + 180000 * (a - 5);
    }
    fishPond = Math.round(fishPond);
    const bVermi = 250000; // 1-acre base vermi
    const cVermi = 500000; // 5-acre base vermi
    let vermi;
    if (a <= 1) {
        vermi = bVermi;
    } else if (a < 5) {
        vermi = bVermi + 62500 * (a - 1);
    } else {
        vermi = cVermi + 62500 * (a - 5);
    }
    vermi = Math.round(vermi);

    const vermiPct = Math.min(100, Math.round(50 + (a - 1) * 12.5));
    const orchardTrees = Math.round(interp(80, 400, a));
    const orchard = orchardTrees * 1500;
    const boundTrees = Math.round(interp(40, 200, a));
    const boundTreeCost = boundTrees * 2000;
    const vegArea = a * 150000;
    const productionTotal = fishPond + vermi + orchard + boundTreeCost + vegArea;

    // 6. Livestock (Initial)
    const cowCount = a <= 2 ? 2 : a <= 5 ? 4 : a <= 10 ? 8 : Math.round(a * 1.2);
    const buffCount = a <= 2 ? 1 : a <= 5 ? 2 : a <= 10 ? 4 : Math.round(a * 0.5);
    const livestockTotal = cowCount * 720000 + buffCount * 900000;

    const subtotal = infraTotal + buildingsTotal + energyTotal + waterTotal + productionTotal + livestockTotal;
    const consultant = subtotal * 0.09;
    const contingency = subtotal * 0.12;
    const grand = subtotal + consultant + contingency;

    const sections = [
        {
            id: 1,
            title: "1. Site Infrastructure & Earthworks",
            items: [
                { id: "1.1", name: "Boundary Wall", spec: `${boundRft} Rft [SCALED]`, unit: "PKR 3,300 / Rft", total: wall },
                { id: "1.2", name: "Fancy Elevation (Wall)", spec: `${boundRft} Rft [SCALED]`, unit: "Proportional", total: fancyWall },
                { id: "1.3", name: "Main Gate & Security Room", spec: "1 No. [FIXED]", unit: "Lump sum", total: gate },
                { id: "1.4", name: "Internal Roads", spec: `${a} Acres [SCALED]`, unit: "Scaled rate", total: roads },
                { id: "1.5", name: "Land Leveling & Grading", spec: `${a} Acres [PER ACRE]`, unit: "PKR 120,000 / Acre", total: leveling },
                { id: "1.6", name: "Tubewell", spec: "1 No. [FIXED]", unit: "Lump sum", total: tubewell },
                { id: "1.7", name: "Main Water Tank (RCC)", spec: "1 No. [FIXED]", unit: "Lump sum", total: waterTank },
                { id: "1.8", name: "Rainwater Harvesting", spec: `${a} Acres [PER ACRE]`, unit: "PKR 85,000 / Acre", total: rainwater }
            ]
        },
        {
            id: 2,
            title: "2. Buildings & Structures",
            items: [
                { id: "2.1", name: "Farm House (10 Marla)", spec: "10 Marla [FIXED]", unit: "Lump sum", total: house },
                { id: "2.2", name: "Animal Shed", spec: `${animalShedMarla} Marla [SCALED]`, unit: "PKR 440,000 / Marla", total: animalShed },
                { id: "2.3", name: "Fodder Storage Shed", spec: `${a} Acres [SCALED]`, unit: "Scaled rate", total: fodder },
                { id: "2.4", name: "Greenhouse", spec: `${greenhouseMarla} Marla [SCALED]`, unit: "Scaled rate", total: greenhouse }
            ]
        },
        {
            id: 3,
            title: "3. Energy & Utilities",
            items: [
                { id: "3.1", name: "Solar System", spec: `${solarKW} KW [SCALED]`, unit: "Scaled rate / KW", total: solar },
                { id: "3.2", name: "Biogas Plant", spec: `${biogasM3} m³ [SCALED]`, unit: "Scaled rate / m³", total: biogas },
                { id: "3.3", name: "Complete Farm Electrification", spec: `${electrificationPct}% coverage [SCALED]`, unit: "Scaled rate / acre", total: electrification }
            ]
        },
        {
            id: 4,
            title: "4. Irrigation & Water",
            items: [
                { id: "4.1", name: "Water Filtration System", spec: "1 No. [FIXED]", unit: "Lump sum", total: filtration },
                { id: "4.2", name: "Drip & Sprinkler System", spec: `${a} Acres [PER ACRE]`, unit: "PKR 250,000 / Acre", total: drip },
                { id: "4.3", name: "Overhead Pressurization Tank", spec: "1 No. [FIXED]", unit: "Lump sum", total: pressureTank }
            ]
        },
        {
            id: 5,
            title: "5. Production Units & Plantation",
            items: [
                { id: "5.1", name: "Modern Fish Pond", spec: `${fishPondMarla} Marla [SCALED]`, unit: "Scaled rate / marla", total: fishPond },
                { id: "5.2", name: "Vermicompost Unit", spec: `${vermiPct}% capacity [SCALED]`, unit: "Scaled rate / acre", total: vermi },
                { id: "5.3", name: "Orchard Saplings", spec: `${orchardTrees} Trees [SCALED]`, unit: "PKR 1,500 / Tree", total: orchard },
                { id: "5.4", name: "Boundary Tree Belt", spec: `${boundTrees} Trees [SCALED]`, unit: "PKR 2,000 / Tree", total: boundTreeCost },
                { id: "5.5", name: "Vegetable Area Development", spec: `${a} Acres [PER ACRE]`, unit: "PKR 150,000 / Acre", total: vegArea }
            ]
        },
        {
            id: 6,
            title: "6. Livestock (Initial)",
            items: [
                { id: "6.1", name: "Sahiwal Cows", spec: `${cowCount} Cows [STEP]`, unit: "PKR 720,000 / Cow", total: cowCount * 720000 },
                { id: "6.2", name: "Nili-Ravi Buffaloes", spec: `${buffCount} Buffalo [STEP]`, unit: "PKR 900,000 / Buffalo", total: buffCount * 900000 }
            ]
        }
    ];

    return {
        infra: infraTotal, buildings: buildingsTotal, energy: energyTotal, water: waterTotal, 
        production: productionTotal, livestock: livestockTotal,
        subtotal, consultant, contingency, grand,
        animalShedMarla, solarKW, orchardTrees, boundTrees,
        cowCount, buffCount, boundRft,
        sections,
        items: {
            wall, fancyWall, gate, roads, leveling, tubewell, waterTank, rainwater,
            house, animalShed, fodder, greenhouse, solar, biogas, electrification,
            filtration, drip, pressureTank, fishPond, vermi, orchard, boundTreeCost, vegArea,
            cows: cowCount * 720000, buffs: buffCount * 900000, consultant, contingency
        }
    };
};

export const fmt = (num) => "PKR " + Math.round(num).toLocaleString();
export const fmtM = (num) => (num / 1000000).toFixed(2) + "M";
