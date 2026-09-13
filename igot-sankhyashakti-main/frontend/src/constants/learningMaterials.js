/**
 * PROTOTYPE LEARNING MATERIAL MAPPING
 * ------------------------------------
 * Maps iGOT course IDs to prototype learning material content.
 *
 * IMPORTANT: These are PROTOTYPE / SIMULATED learning materials based on
 * course metadata. They are NOT official iGOT course content and were NOT
 * downloaded from the iGOT platform.
 *
 * Data source: iGOT Course Catalogue (MOSPI-C001..C006)
 * Purpose: Prototype content-grounded assessment generation pipeline.
 *
 * To add a future learning material, add a new entry with:
 *   courseId: { title, courseId, domain, level, duration, provider, sections[] }
 */

export const LEARNING_MATERIALS = {

  'MOSPI-C001': {
    courseId: 'MOSPI-C001',
    pdfUrl: '/materials/MOSPI-C001.pdf',
    title: 'Fundamentals of National Income Accounting',
    domain: 'National Accounts',
    level: 'Advanced',
    duration: '4 hours',
    provider: 'IIPS',
    version: 'Prototype v1.0 · September 2026',
    disclaimer: 'Prototype learning material · Not official iGOT content',
    sections: [
      {
        heading: 'Introduction',
        content: `National Income Accounting (NIA) is the systematic process of measuring an economy's overall economic activity. It provides a comprehensive statistical framework to quantify production, income, and expenditure flows within a country over a defined period—typically a quarter or a year. For official statisticians in India, NIA forms the bedrock of macroeconomic policy formulation, fiscal planning, and international comparisons.

The Central Statistics Office (CSO), now under MoSPI, has been compiling national income estimates since 1956. The current methodology aligns with the System of National Accounts (SNA) 2008—the international standard endorsed by the United Nations, IMF, World Bank, OECD, and Eurostat.`,
      },
      {
        heading: 'Key Concepts',
        subsections: [
          {
            title: 'Gross Domestic Product (GDP)',
            body: 'GDP measures the total monetary value of all final goods and services produced within a country\'s geographic boundary during a specific period, regardless of the nationality of the producers. It excludes intermediate goods to avoid double-counting.',
          },
          {
            title: 'Gross National Product (GNP) / GNI',
            body: 'GNP (now called Gross National Income, GNI) adjusts GDP by adding income earned by residents abroad and subtracting income earned by non-residents within the country. GNI = GDP + Primary income receivable from non-residents − Primary income payable to non-residents.',
          },
          {
            title: 'Net Domestic Product (NDP)',
            body: 'NDP = GDP − Consumption of Fixed Capital (CFC). CFC represents the depreciation of produced assets used in production. NDP provides a better measure of sustainable economic activity than GDP.',
          },
          {
            title: 'National Income (NI)',
            body: 'National Income = NNP at factor cost = GNI − CFC − Net taxes on production and imports. It represents the total income earned by all factors of production (labour and capital) owned by residents.',
          },
          {
            title: 'Per Capita Income',
            body: 'Per Capita National Income = National Income / Mid-year Population. It is used as an indicator of average living standards and for inter-state and international comparisons.',
          },
        ],
      },
      {
        heading: 'Three Approaches to Measuring GDP',
        subsections: [
          {
            title: '1. Production / Output Approach',
            body: 'GDP = Sum of Gross Value Added (GVA) of all resident producer units + Taxes on products − Subsidies on products.\n\nGVA for each industry = Value of output − Value of intermediate consumption.\n\nIn India, GDP is estimated using this approach across 8 broad sectors: Agriculture, Forestry & Fishing; Mining & Quarrying; Manufacturing; Electricity, Gas & Water Supply; Construction; Trade, Hotels, Transport & Communication; Financial Services; and Public Administration & Defence.',
          },
          {
            title: '2. Income Approach',
            body: 'GDP (at factor cost) = Compensation of Employees + Gross Operating Surplus + Gross Mixed Income + Taxes on production (net of subsidies).\n\nCompensation of Employees includes wages, salaries, and social contributions. Gross Operating Surplus is the surplus accruing to corporations. Gross Mixed Income accrues to unincorporated enterprises where the owner and labour are not separately identified.',
          },
          {
            title: '3. Expenditure Approach',
            body: 'GDP = Private Final Consumption Expenditure (PFCE) + Government Final Consumption Expenditure (GFCE) + Gross Fixed Capital Formation (GFCF) + Change in Stocks (CIS) + Valuables + Net Exports (Exports − Imports).\n\nIndia uses this approach primarily for checking GDP estimates and for compiling use-side accounts in the SNA framework.',
          },
        ],
      },
      {
        heading: 'Relevant Statistical Methods',
        content: `
**Base Year and Price Indices**: GDP estimates in India are published at both current prices (nominal GDP) and constant prices (real GDP). The current base year is 2011-12. The GDP deflator—derived as the ratio of nominal to real GDP—is used to measure economy-wide price changes.

**Chain-linking**: Under the SNA 2008 framework, volume measures should ideally use chain-linked indices that update weights annually. India uses a fixed-base approach but is transitioning toward chain-linking.

**Benchmarking and Indicator Methods**: For sectors where comprehensive annual surveys are not available, GDP is estimated using indicator methods. An indicator variable (e.g., Index of Industrial Production for manufacturing) is used to extrapolate from a benchmark year estimate.

**Quarterly GDP Estimation**: Advance estimates use available indicators; revised estimates incorporate more complete data. India publishes:
- First Advance Estimate (January, same fiscal year)
- Second Advance Estimate (February)
- Provisional Estimate (May, following year)
- First Revised Estimate (January, +1 year)
- Second and Third Revised Estimates in subsequent years
`,
      },
      {
        heading: 'Practical Examples',
        subsections: [
          {
            title: 'Example 1: Computing GVA for Agriculture',
            body: 'Suppose the value of agricultural output (crops, livestock, forestry, fishing) = ₹18,00,000 crore. Intermediate consumption (seeds, fertilisers, pesticides, irrigation, feed) = ₹5,00,000 crore.\n\nGVA (Agriculture) = 18,00,000 − 5,00,000 = ₹13,00,000 crore.',
          },
          {
            title: 'Example 2: GDP from Expenditure Side',
            body: 'PFCE = ₹85,00,000 cr; GFCE = ₹15,00,000 cr; GFCF = ₹55,00,000 cr; CIS = ₹2,00,000 cr; Valuables = ₹1,00,000 cr; Exports = ₹30,00,000 cr; Imports = ₹35,00,000 cr.\n\nGDP = 85 + 15 + 55 + 2 + 1 + (30 − 35) = ₹1,53,00,000 crore.',
          },
        ],
      },
      {
        heading: 'Data Quality Considerations',
        content: `
- **Coverage gaps**: Informal/unorganised sector activity is difficult to enumerate. Enterprise surveys cover registered units but miss a significant share of economic activity.
- **Revisions policy**: GDP estimates undergo multiple rounds of revision as source data become available. Users must note the vintage of estimates.
- **Deflation accuracy**: Incorrect price deflators can distort real GDP trends. The choice of deflator for each sub-sector is critical.
- **Double-counting risk**: When using value-added approach, careful delineation of production boundaries and intermediate vs. final consumption is essential.
- **Non-market production**: Household production (e.g., domestic services) is largely excluded from the SNA production boundary, affecting comparability across countries.
`,
      },
      {
        heading: 'Key Learning Points',
        content: `
1. GDP can be measured from three equivalent approaches: production, income, and expenditure.
2. GVA at basic prices + Net taxes on products = GDP at market prices.
3. NDP adjusts for capital depreciation; NNI adjusts for cross-border factor incomes.
4. Real GDP uses constant prices; the GDP deflator converts nominal to real.
5. India's national accounts follow SNA 2008 with base year 2011-12.
6. Quarterly estimates use advance indicators; annual revisions incorporate census/survey data.
`,
      },
      {
        heading: 'Learning Outcomes',
        content: `On completing this material, you should be able to:
- Define GDP, GNP/GNI, NDP, NNP, and National Income and explain the conceptual differences.
- Apply the three approaches to measure GDP and reconcile them.
- Distinguish between nominal and real GDP and use the GDP deflator.
- Identify data sources and indicator methods used in India's national accounts.
- Recognise common data-quality risks and documentation requirements in national income compilation.`,
      },
    ],
  },

  'MOSPI-C002': {
    courseId: 'MOSPI-C002',
    pdfUrl: '/materials/MOSPI-C002.pdf',
    title: 'GDP Estimation Methodology (GVA Approach)',
    domain: 'National Accounts',
    level: 'Advanced',
    duration: '3 hours',
    provider: 'NSSTA',
    version: 'Prototype v1.0 · September 2026',
    disclaimer: 'Prototype learning material · Not official iGOT content',
    sections: [
      {
        heading: 'Introduction',
        content: `Gross Value Added (GVA) is the primary building block of India's GDP estimates. The GVA approach—also called the production or output approach—measures the value created by each sector of the economy by subtracting the cost of inputs (intermediate consumption) from the value of output produced.

This course focuses on the operational methodology used by MoSPI to compile GVA estimates at the industry level, aligned with SNA 2008. Understanding GVA compilation is essential for statisticians involved in national accounts, state accounts, and sector-level economic analysis.`,
      },
      {
        heading: 'Key Concepts',
        subsections: [
          {
            title: 'Gross Value Added (GVA)',
            body: 'GVA = Value of Output − Value of Intermediate Consumption\n\nGVA measures the contribution of each producer, industry, or sector to the economy. It is valued at "basic prices"—the amount receivable by the producer excluding taxes on products but including subsidies on products.',
          },
          {
            title: 'GDP at Market Prices',
            body: 'GDP (market prices) = GVA (basic prices) + Taxes on products − Subsidies on products\n\nTaxes on products include GST, import duties, and excise not classified as taxes on production. Subsidies on products include food, fertiliser, and fuel subsidies passed to producers.',
          },
          {
            title: 'Intermediate Consumption',
            body: 'Intermediate consumption is the value of goods and services consumed as inputs in the production process, excluding fixed assets (which are treated as capital formation). It includes raw materials, energy, business services, and other intermediate inputs.',
          },
          {
            title: 'Gross Output vs. Net Output',
            body: 'Gross output (value of production) includes the full value of goods produced. GVA (net output) removes intermediate inputs. Using gross output to sum sectoral contributions leads to double-counting because outputs of one sector are inputs of another.',
          },
        ],
      },
      {
        heading: 'Sector-wise GVA Estimation in India',
        subsections: [
          {
            title: 'Agriculture, Forestry & Fishing',
            body: 'GVA = Production estimates (area × yield × farm harvest price) − Intermediate consumption.\nData sources: Agriculture Census, Crop Cutting Experiments (CCE), Livestock Census, Fisheries surveys.\nIntermediate consumption ratio estimated from NSSO/NFHS surveys and periodic revisions.',
          },
          {
            title: 'Mining & Quarrying',
            body: 'GVA estimated using output of principal minerals (coal, petroleum, iron ore, etc.) valued at pit-head prices. Intermediate consumption ratios from Annual Survey of Industries (ASI) and enterprise surveys.\nIBM (Indian Bureau of Mines) data used for minerals.',
          },
          {
            title: 'Manufacturing',
            body: 'Organised manufacturing: ASI provides value of output, input costs, and NVA directly.\nUnorganised manufacturing: NSSO Unorganised Manufacturing Enterprise Survey used for benchmarks; Index of Industrial Production (IIP) used as extrapolator for in-between years.\nGVA = NVA (from ASI) adjusted for CFC and mixed income.',
          },
          {
            title: 'Electricity, Gas & Water Supply',
            body: 'GVA estimated from sales of electricity (units × average realisation per unit), gas, and water supply revenues. Intermediate consumption (fuel costs, transmission losses) deducted. Data from CEA, PPAC, and public utility accounts.',
          },
          {
            title: 'Construction',
            body: 'GVA estimated using the commodity flow method: value of construction output proxied by expenditure on materials (cement, steel, bricks) + labour costs, adjusted by a margin for gross output. No direct survey; relies on DIPP, production data, and GFCF estimates.',
          },
          {
            title: 'Trade, Hotels, Transport & Communication',
            body: 'Trade GVA = Trade margins on commodities passing through distributive channels. Estimated using wholesale + retail trade margins.\nTransport estimated from fuel consumption, freight, and passenger traffic data.\nCommunication from DoT data on subscriber base and average revenue per user.',
          },
          {
            title: 'Financial Services',
            body: 'Includes banking, insurance, real estate, and business services.\nFinancial Intermediation Services Indirectly Measured (FISIM) allocated between intermediate and final consumption.\nInsurance GVA = net premiums + investment income − claims.\nReal estate: owner-occupied dwellings imputed using rental equivalence method.',
          },
          {
            title: 'Public Administration, Defence & Other Services',
            body: 'Non-market output valued at cost of production (compensation of employees + CFC + intermediate consumption). Data from Central and State government budget documents and accounts.',
          },
        ],
      },
      {
        heading: 'Methodology Steps',
        content: `
**Step 1 — Identify the production boundary**: Determine which activities fall within the SNA 2008 production boundary for each sector.

**Step 2 — Collect source data**: Identify primary data sources (surveys, administrative records, price data) for each sector.

**Step 3 — Estimate value of output**: Multiply quantities produced by appropriate prices (farm harvest price, ex-factory price, wholesale price).

**Step 4 — Estimate intermediate consumption**: Apply IC ratios from benchmark surveys or use direct data where available.

**Step 5 — Compute GVA at basic prices**: GVA = Output − Intermediate consumption.

**Step 6 — Apply deflators**: Divide current-price GVA by an appropriate price index (WPI, PPI, or sector-specific deflator) to obtain constant-price GVA.

**Step 7 — Aggregate**: Sum GVA across all 8 sectors to get total GVA. Add net taxes on products to obtain GDP.

**Step 8 — Reconcile**: Cross-check with expenditure-side estimates; resolve discrepancies through the statistical discrepancy item.
`,
      },
      {
        heading: 'Practical Example: Organised Manufacturing GVA',
        content: `From ASI (hypothetical year):
- Value of output: ₹45,00,000 crore
- Value of inputs (intermediate consumption): ₹30,00,000 crore
- Net Value Added (NVA): ₹15,00,000 crore
- Add: Consumption of Fixed Capital (CFC): ₹2,00,000 crore
- GVA (Organised Manufacturing) = NVA + CFC = ₹17,00,000 crore

At constant prices (2011-12), apply WPI for manufactured products as deflator. If WPI index = 118 (base = 100):
- Real GVA = 17,00,000 / 1.18 = ₹14,40,678 crore (approx.)`,
      },
      {
        heading: 'Data Quality Considerations',
        content: `
- **Time lag in source data**: ASI results are available with a 2–3 year lag; IIP is used as proxy, introducing approximation error.
- **Unorganised sector coverage**: NSSO surveys of unorganised enterprises are conducted infrequently; extrapolation between benchmark years introduces structural change bias.
- **Price deflation**: Availability of sector-specific price indices (PPIs) is limited; WPI is used as proxy, which may not reflect actual producer price changes.
- **FISIM allocation**: FISIM estimation is methodologically complex and the allocation between sectors affects GVA distribution.
- **Informal activity**: Home-based production and informal services are under-measured in GVA.
`,
      },
      {
        heading: 'Key Learning Points',
        content: `
1. GVA = Output − Intermediate Consumption, valued at basic prices.
2. GDP (market prices) = Sum of GVA + Net taxes on products.
3. India estimates GVA for 8 broad sectors; each uses sector-specific data sources.
4. Organised sector uses ASI; unorganised sector uses NSSO surveys + IIP extrapolation.
5. Constant-price GVA requires appropriate price deflators for each sector.
6. Statistical discrepancy reconciles production-side and expenditure-side GDP estimates.
`,
      },
      {
        heading: 'Learning Outcomes',
        content: `On completing this material, you should be able to:
- Explain the GVA approach to GDP estimation and its conceptual foundations.
- Identify primary data sources for each of the 8 NAS sectors in India.
- Apply the step-by-step methodology to estimate GVA at current and constant prices.
- Recognise key data limitations and quality considerations in GVA compilation.
- Interpret revisions in GVA estimates across different release vintages.`,
      },
    ],
  },

  'MOSPI-C003': {
    courseId: 'MOSPI-C003',
    pdfUrl: '/materials/MOSPI-C003.pdf',
    title: 'Compiling State-Level GSDP Estimates',
    domain: 'National Accounts',
    level: 'Intermediate',
    duration: '5 hours',
    provider: 'MoSPI Academy',
    version: 'Prototype v1.0 · September 2026',
    disclaimer: 'Prototype learning material · Not official iGOT content',
    sections: [
      {
        heading: 'Introduction',
        content: `Gross State Domestic Product (GSDP) is the state-level counterpart of GDP. It measures the total value of all final goods and services produced within a state's geographic boundary during a given year. GSDP is compiled by each State's Directorate of Economics and Statistics (DES) following the methodology guidelines issued by MoSPI/CSO.

GSDP estimates are critical for:
- State-level fiscal planning and budgeting
- Determining states' share of Central taxes and grants (Finance Commission)
- Calculating per capita income for inter-state comparisons
- Formulating state economic policies and planning
- Monitoring sustainable development goals at the state level`,
      },
      {
        heading: 'Key Concepts',
        subsections: [
          {
            title: 'GSDP vs. GDP',
            body: 'GSDP follows the same conceptual framework as GDP but is geographically bounded to a state. The sum of GSDPs across all states does not exactly equal national GDP because of statistical discrepancies, treatment of centrally-administered activities, and the problem of allocating multi-location enterprises.',
          },
          {
            title: 'Net State Domestic Product (NSDP)',
            body: 'NSDP = GSDP − Consumption of Fixed Capital (depreciation). NSDP at factor cost minus indirect taxes (net of subsidies) gives State Domestic Product at factor cost, which approximates income accruing to state residents from state-based production.',
          },
          {
            title: 'Per Capita GSDP',
            body: 'Per Capita GSDP = GSDP / Mid-year population of state. Used for inter-state comparisons but must be interpreted carefully since it does not capture income inequality within the state.',
          },
          {
            title: 'District Domestic Product (DDP)',
            body: 'Many states now compile DDP at the district level, extending GSDP methodology downward. This supports district-level planning and identification of lagging regions.',
          },
        ],
      },
      {
        heading: 'Institutional Framework',
        content: `**Responsibility**: Each State/UT Directorate of Economics and Statistics (DES) is responsible for compiling and publishing GSDP estimates.

**Coordination**: MoSPI/CSO issues Handbook of Instructions on compilation of District Domestic Product and provides methodological guidance for GSDP.

**Publication**: States are expected to publish GSDP estimates annually, but timeliness varies. MoSPI compiles GSDP data from all states and publishes national aggregates.

**Base Year**: States are expected to align with the national base year (currently 2011-12) for comparability. Base year revision requires re-basing the entire series.`,
      },
      {
        heading: 'Sector-wise Methodology for State Accounts',
        subsections: [
          {
            title: 'Agriculture & Allied Activities',
            body: 'State-level crop production data (area under cultivation × yield × state harvest price) compiled by the Directorate of Agriculture. For livestock, data from Livestock Census and state animal husbandry departments. Intermediate consumption ratios applied from national benchmarks or state-specific surveys.\n\nKey challenge: Irrigation and soil conditions vary widely; national IC ratios may not apply uniformly.',
          },
          {
            title: 'Mining & Quarrying',
            body: 'Data from state geology & mining departments, IBM returns, and royalty collection records. States with major mineral deposits (Chhattisgarh, Jharkhand, Odisha) have well-developed mineral output data. Minor minerals (sand, gravel, stone) are often under-reported.',
          },
          {
            title: 'Manufacturing',
            body: 'Organised: ASI data disaggregated by state using NIC codes and state codes. Unorganised: State-level NSSO data (often small sample; requires careful use). IIP not available at state level for most states; alternative indicators (power consumption, production indices) used as extrapolators.',
          },
          {
            title: 'Construction',
            body: 'State-level commodity flow estimates using state-specific cement consumption, steel dispatches, and building permit data (from local bodies). Public sector construction directly estimated from plan expenditure data.',
          },
          {
            title: 'Services',
            body: 'Trade: State-level trade turnover from commercial tax/GST records. Transport: Vehicle registration data, petrol/diesel sales, and railway data apportioned to states. Financial services: Branch-wise deposit/credit data from RBI allocated to states. Public administration: State budget expenditure data (compensation of employees + intermediate consumption).',
          },
        ],
      },
      {
        heading: 'Allocation of Centrally Administered Sectors',
        content: `Several activities are centrally administered and cannot be directly allocated to states:
- Railways (allocated by originating traffic/route miles)
- Central government administration (allocated by employee location or population share)
- Post & telecommunications (allocated by subscriber location)
- Defense establishments (not allocated to individual states; counted in national GDP only)
- Central Public Sector Undertakings (allocated by plant/establishment location)

This allocation involves judgment calls and approximations that contribute to discrepancies between the sum of GSDPs and national GDP.`,
      },
      {
        heading: 'Common Challenges in GSDP Compilation',
        content: `
**1. Data availability and timeliness**: State-level data sources are often less timely than national sources. This leads to longer revision cycles for GSDP.

**2. Multi-location enterprises**: A firm operating in multiple states poses an allocation problem. Output should be allocated to the state where production occurs, not where the head office is registered.

**3. Base year revision**: When the national base year changes, states must revise their entire GSDP series. Capacity constraints in state DES offices can delay revision.

**4. Inconsistent methodology**: Different states may use different IC ratios or extrapolators, reducing inter-state comparability.

**5. Informal sector**: Informal and household enterprises are particularly difficult to enumerate at the state level given limited NSSO sample sizes.

**6. Price indices**: State-level price deflators are often unavailable; national WPI/CPI applied uniformly, which may not reflect state-level price dynamics.
`,
      },
      {
        heading: 'Quality Assurance Steps',
        content: `
1. **Internal consistency checks**: Verify that current-price and constant-price GSDP growth rates are plausible given state economic conditions.
2. **Cross-sector checks**: Ensure that agricultural output estimates are consistent with rainfall, cropped area, and procurement data.
3. **National comparison**: GSDP growth rates should be broadly consistent with national GDP trends unless state-specific factors justify divergence.
4. **Revision analysis**: Document and explain major revisions between estimates. Unexplained large revisions signal data or methodology problems.
5. **Peer review**: CSO technical workshops provide a platform for state DES officers to discuss methodology and resolve inter-state comparability issues.
`,
      },
      {
        heading: 'Practical Example: Computing Agriculture GVA for a State',
        content: `Suppose State X has the following data for paddy:
- Area under cultivation: 15 lakh hectares
- Yield: 2.5 tonnes/hectare
- State harvest price: ₹1,800/quintal (= ₹18,000/tonne)

Value of paddy output = 15 × 2.5 × 18,000 = ₹6,75,000 lakh = ₹6,750 crore

Intermediate consumption ratio (seeds, fertiliser, pesticides, irrigation) = 30% of output

IC = 0.30 × 6,750 = ₹2,025 crore

GVA from paddy = 6,750 − 2,025 = ₹4,725 crore

Repeat for all crops, livestock, forestry, and fishing; sum to get state Agriculture & Allied GVA.`,
      },
      {
        heading: 'Key Learning Points',
        content: `
1. GSDP follows the same conceptual framework as national GDP but is geographically bounded.
2. State DES offices compile GSDP; MoSPI provides methodological guidance and quality oversight.
3. Centrally-administered sectors require allocation to states using proxy indicators.
4. Multi-location enterprises, informal sector coverage, and limited price data are key challenges.
5. Quality assurance involves internal consistency, cross-sector, and national comparison checks.
6. The sum of GSDPs differs from national GDP due to statistical discrepancies and boundary issues.
`,
      },
      {
        heading: 'Learning Outcomes',
        content: `On completing this material, you should be able to:
- Explain the GSDP framework and its institutional context in India.
- Apply sector-wise methodology to compile state-level GVA estimates.
- Identify and address common challenges in state accounts compilation.
- Describe the treatment of centrally-administered sectors in state accounts.
- Design and conduct quality assurance checks on GSDP estimates.`,
      },
    ],
  },

  'MOSPI-C004': {
    courseId: 'MOSPI-C004',
    pdfUrl: '/materials/MOSPI-C004.pdf',
    title: 'System of National Accounts (SNA) 2008 Framework',
    domain: 'National Accounts',
    level: 'Beginner',
    duration: '12 hours',
    provider: 'IIPS',
    version: 'Prototype v1.0 · September 2026',
    disclaimer: 'Prototype learning material · Not official iGOT content',
    sections: [
      {
        heading: 'Introduction',
        content: `The System of National Accounts 2008 (SNA 2008) is the internationally agreed standard for compiling and disseminating national accounts statistics. It was developed jointly by the United Nations, IMF, World Bank, OECD, and Eurostat and replaced the earlier SNA 1993.

The SNA provides a coherent, consistent, and integrated set of macroeconomic accounts that can be used to analyse the performance of an economy, determine economic policy, and make comparisons across countries and over time. India adopted the SNA 2008 framework with the base year revision to 2011-12, published in January 2015.

The SNA is organised as an integrated sequence of accounts covering:
- Production
- Income generation and distribution
- Accumulation (capital)
- Financial flows
- Balance sheets (stocks)`,
      },
      {
        heading: 'Key Concepts',
        subsections: [
          {
            title: 'Institutional Sectors',
            body: 'The SNA classifies all resident economic units into five institutional sectors:\n1. Non-financial corporations\n2. Financial corporations\n3. General government\n4. Households\n5. Non-profit institutions serving households (NPISH)\n\nAll transactions are recorded between these sectors and with the rest of the world.',
          },
          {
            title: 'Production Boundary',
            body: 'The SNA production boundary defines what is and is not counted as economic production. It includes:\n- All market production (goods and services produced for sale)\n- Production for own final use (e.g., subsistence farming, own-account construction)\n- Non-market production by government and NPISHs\n\nIt excludes: household domestic services (cooking, cleaning for own use), volunteer services, and illegal activities (though these are recommended for inclusion if significant).',
          },
          {
            title: 'Asset Boundary',
            body: 'Assets are entities owned or controlled by institutional units from which economic benefits are expected to flow in the future. The SNA 2008 expanded the asset boundary to include:\n- Intellectual property products (R&D, software, databases)\n- Land improvements\n- Biological resources\n- Financial assets and liabilities',
          },
          {
            title: 'Residence',
            body: 'Residence in the SNA is determined by the "centre of predominant economic interest" rule—an economic unit is resident in the territory where it engages in economic activities for one year or more, regardless of nationality. This is distinct from citizenship.',
          },
          {
            title: 'Valuation Principles',
            body: 'SNA 2008 uses consistent valuation principles:\n- Outputs valued at basic prices (excluding taxes on products, including subsidies)\n- Uses (intermediate/final) valued at purchasers\' prices (including taxes, excluding subsidies)\n- GDP at market prices reconciles the two via taxes minus subsidies on products',
          },
        ],
      },
      {
        heading: 'The Sequence of Accounts',
        subsections: [
          {
            title: '1. Production Account',
            body: 'Records the production of goods and services. Resources: Output. Uses: Intermediate Consumption. Balancing item: GVA (or NVA after deducting CFC).',
          },
          {
            title: '2. Generation of Income Account',
            body: 'Shows how GVA is distributed among factors of production. Resources: GVA. Uses: Compensation of employees, Other taxes on production (net). Balancing item: Gross Operating Surplus/Gross Mixed Income.',
          },
          {
            title: '3. Allocation of Primary Income Account',
            body: 'Extends to include property income flows (interest, dividends, rent) between sectors and with the rest of the world. Balancing item: Gross National Income (GNI).',
          },
          {
            title: '4. Secondary Distribution of Income Account',
            body: 'Records redistribution via current transfers (income taxes, social contributions, social benefits). Balancing item: Gross Disposable Income (GDI).',
          },
          {
            title: '5. Use of Disposable Income Account',
            body: 'Shows how GDI is split between final consumption expenditure and saving. Balancing item: Gross Saving.',
          },
          {
            title: '6. Capital Account',
            body: 'Records non-financial capital transactions. Resources: Gross Saving + Capital transfers received. Uses: Gross Fixed Capital Formation, Change in inventories, acquisitions less disposals of valuables. Balancing item: Net lending/borrowing.',
          },
          {
            title: '7. Financial Account',
            body: 'Records transactions in financial assets and liabilities. Net lending/borrowing from capital account should equal net acquisition of financial assets minus net incurrence of liabilities. Discrepancy indicates statistical error.',
          },
          {
            title: '8. Balance Sheets',
            body: 'Record stocks of assets and liabilities at beginning and end of each period. Changes in balance sheets explained by: transactions (from capital/financial accounts), other changes in volume, and holding gains/losses.',
          },
        ],
      },
      {
        heading: 'Key Changes: SNA 1993 to SNA 2008',
        content: `
| Concept | SNA 1993 | SNA 2008 |
|---|---|---|
| R&D expenditure | Intermediate consumption | Capitalised (GFCF) |
| Military weapons | Not capitalised | Capitalised if used >1 year |
| Software | Partially capitalised | Fully capitalised |
| Defined-benefit pension | Off-balance-sheet | On employer's balance sheet |
| Financial intermediation (FISIM) | Narrow allocation | Broader allocation |
| Non-performing loans | At face value | At market/fair value |

India's adoption of SNA 2008 (with 2011-12 base year) resulted in higher GDP estimates primarily due to capitalisation of R&D expenditure and improved coverage of financial services.
`,
      },
      {
        heading: 'Application in India',
        content: `India implements SNA 2008 with country-specific adaptations:

**Agriculture**: Owner-occupied farmhouses and subsistence production included. Imputed rent of owner-occupied dwellings included in housing services.

**Financial Services**: FISIM estimated using a reference rate approach; allocated between intermediate and final consumers.

**R&D**: Included as GFCF from 2011-12 base. Data sourced from DSIR survey of R&D expenditure.

**Government**: Non-market output valued at cost; includes central and state governments, panchayats, and urban local bodies.

**Rest of World Account**: Compiled using RBI Balance of Payments data; GNI derived from GDP by adding net primary income from abroad.`,
      },
      {
        heading: 'Practical Example: The Sequence of Accounts in Action',
        content: `Consider a simplified economy with one sector (households running farms):

**Production Account**:
- Output: ₹1,000
- Intermediate Consumption: ₹300
- GVA: ₹700

**Generation of Income**:
- Compensation of Employees: ₹200
- Gross Mixed Income (farmer's income): ₹500

**Allocation of Primary Income**:
- GNI = GVA + Net primary income from abroad = 700 + 50 = ₹750

**Use of Disposable Income** (assuming no transfers):
- Gross Disposable Income = ₹750
- Final Consumption: ₹600
- Gross Saving: ₹150

**Capital Account**:
- Gross Saving: ₹150
- GFCF (new farm equipment): ₹180
- Net Lending: ₹150 − ₹180 = −₹30 (net borrower)`,
      },
      {
        heading: 'Data Quality Considerations',
        content: `
- **Consistency across accounts**: The integrated nature of SNA means errors in one account propagate to others. Cross-checking balancing items across accounts is essential.
- **Institutional sector classification**: Misclassification of entities (e.g., public enterprises as government vs. corporations) affects the sectoral distribution of accounts.
- **Valuation**: Moving between market prices and basic prices requires accurate data on taxes and subsidies on products, which may be incomplete for sub-sectors.
- **Financial account reconciliation**: The discrepancy between net lending/borrowing from capital account and financial account is a measure of overall statistical quality.
- **Balance sheet data**: Asset stock data (especially for produced fixed assets) requires perpetual inventory models and assumptions about asset lifetimes and depreciation patterns.
`,
      },
      {
        heading: 'Key Learning Points',
        content: `
1. SNA 2008 is the internationally agreed framework for national accounts; India adopted it with base year 2011-12.
2. The SNA classifies resident units into 5 institutional sectors and the rest of the world.
3. The production boundary defines what is included in GDP; the asset boundary defines what is capitalised.
4. The sequence of accounts links production through income distribution, saving, and capital formation to balance sheets.
5. Key SNA 2008 changes: capitalisation of R&D, military weapons, and software; improved FISIM; pension treatment.
6. Consistency across the sequence of accounts is a key quality indicator.
`,
      },
      {
        heading: 'Learning Outcomes',
        content: `On completing this material, you should be able to:
- Describe the structure, purpose, and international status of SNA 2008.
- Identify the five institutional sectors and explain the production and asset boundaries.
- Trace the sequence of accounts from production to balance sheets.
- Identify the key changes between SNA 1993 and SNA 2008 and their implications.
- Apply SNA 2008 concepts to India's national accounts compilation context.`,
      },
    ],
  },

  'MOSPI-C005': {
    courseId: 'MOSPI-C005',
    pdfUrl: '/materials/MOSPI-C005.pdf',
    title: 'Periodic Labour Force Survey (PLFS) Concepts',
    domain: 'Labour Statistics',
    level: 'Beginner',
    duration: '6 hours',
    provider: 'IGNOU',
    version: 'Prototype v1.0 · September 2026',
    disclaimer: 'Prototype learning material · Not official iGOT content',
    sections: [
      {
        heading: 'Introduction',
        content: `The Periodic Labour Force Survey (PLFS) is India's flagship household survey for measuring labour market indicators. Launched by the National Statistical Office (NSO), MoSPI in April 2017, PLFS replaced the earlier quinquennial Employment-Unemployment Surveys (EUS) conducted by the erstwhile NSSO.

PLFS provides estimates of key labour force indicators on two time frequencies:
- **Annual estimates**: For both rural and urban areas (July–June reference period)
- **Quarterly estimates**: For urban areas only (January–March, April–June, July–September, October–December)

This dual-frequency design enables timely monitoring of urban labour markets while maintaining comprehensive annual coverage of both rural and urban areas.`,
      },
      {
        heading: 'Survey Design',
        subsections: [
          {
            title: 'Sample Design',
            body: 'PLFS uses a stratified multi-stage design:\n- First Stage Units (FSUs): Census villages (rural) and Urban Frame Survey (UFS) blocks (urban)\n- Second Stage Units: Households\n- Stratification: Rural areas stratified by 4 MPCE classes; Urban areas stratified by town size class.\n\nSample size: ~1.02 lakh households per year (about 7,200 FSUs, with urban FSUs revisited quarterly for the panel design).',
          },
          {
            title: 'Rotating Panel in Urban Areas',
            body: 'Urban FSUs are divided into 4 sub-samples (rotation groups). Each sub-sample is surveyed in one quarter and then re-surveyed in the same quarter of the following year. This panel structure enables quarter-on-quarter and year-on-year comparison for urban labour market dynamics.',
          },
          {
            title: 'Reference Period for Employment',
            body: 'PLFS uses multiple reference periods:\n- **Usual Activity (Principal + Subsidiary)**: 365 days preceding the date of survey\n- **Current Weekly Status (CWS)**: 7 days preceding the date of survey\n- **Current Daily Status (CDS)**: Each day of the reference week (7 days)\n\nThe choice of reference period affects measured employment and unemployment rates significantly.',
          },
        ],
      },
      {
        heading: 'Key Concepts and Definitions',
        subsections: [
          {
            title: 'Labour Force',
            body: 'The labour force comprises all persons who are either employed or unemployed (seeking and available for work) during the reference period. Labour Force = Employed + Unemployed.',
          },
          {
            title: 'Worker Population Ratio (WPR)',
            body: 'WPR = (Number of persons employed / Population) × 100\n\nAlso called Employment Rate. Measures the proportion of the population that is employed. A high WPR can reflect both genuine employment and necessity-driven employment (e.g., distress employment in agriculture).',
          },
          {
            title: 'Labour Force Participation Rate (LFPR)',
            body: 'LFPR = (Labour Force / Population) × 100\n\nMeasures the proportion of the population that is either employed or actively seeking employment. Low LFPR among women and youth is a key structural feature of India\'s labour market.',
          },
          {
            title: 'Unemployment Rate (UR)',
            body: 'UR = (Unemployed / Labour Force) × 100\n\nMeasures the proportion of the labour force that is without work but seeking and available for work. India\'s unemployment rate is relatively low by international standards but disguised unemployment (underemployment) is significant.',
          },
          {
            title: 'Usual Principal Activity (UPS)',
            body: 'The activity in which a person spent the major time during the 365 days preceding the survey date. Used for classifying persons into broad categories: workers, unemployed, and out-of-labour-force (students, domestic duties, etc.).',
          },
          {
            title: 'Usual Subsidiary Activity (USS)',
            body: 'Activity pursued for a minor part of the year in addition to the principal activity. Adding USS to UPS gives the "usual activity (principal + subsidiary)" or UPSS measure, which captures a broader segment of workers, particularly seasonal agricultural workers.',
          },
          {
            title: 'Current Weekly Status (CWS)',
            body: 'Employment status determined based on activities during the 7 days preceding the survey date. A person is employed (CWS) if they worked for at least one hour on at least one day during the reference week.',
          },
          {
            title: 'Current Daily Status (CDS)',
            body: 'Determined for each day of the reference week. A person can be employed for part of a day and unemployed for the rest. CDS measures person-days of work and unemployment. CDS unemployment rate is highest among the three measures as it captures underemployment.',
          },
          {
            title: 'Industry and Occupation Classification',
            body: 'Industries classified using National Industrial Classification (NIC) 2008 (aligned with ISIC Rev. 4). Occupations classified using National Classification of Occupations (NCO) 2015 (aligned with ISCO-08).',
          },
        ],
      },
      {
        heading: 'Key Indicators Produced by PLFS',
        content: `
| Indicator | Definition | Reference Period |
|---|---|---|
| LFPR | Labour Force / Population × 100 | UPS, CWS, CDS |
| WPR | Employed / Population × 100 | UPS, CWS, CDS |
| Unemployment Rate | Unemployed / LF × 100 | UPS, CWS, CDS |
| Employment by industry | Distribution across NIC sectors | Usual activity |
| Employment by occupation | Distribution across NCO categories | Usual activity |
| Employment by status | Self-employed, regular/salaried, casual | Usual activity |
| Wages | Wage/earnings by category, sex, sector | Current status |
`,
      },
      {
        heading: 'Comparison: PLFS vs. Earlier EUS',
        content: `
| Feature | Earlier NSSO EUS | PLFS |
|---|---|---|
| Frequency | Quinquennial (every 5 years) | Annual (rural+urban) + Quarterly (urban) |
| Design | Cross-sectional | Rotating panel (urban) |
| Sample size | ~1 lakh HHs (large round) | ~1 lakh HHs/year (continuous) |
| Urban quarterly data | Not available | Available from PLFS |
| Reference period | UPS, CWS, CDS | UPS, CWS, CDS (same) |
| Latest base | 2011-12 | 2017-18 (first full year) |
`,
      },
      {
        heading: 'Practical Example: Computing Unemployment Rate',
        content: `From a hypothetical PLFS sample for urban areas (CWS reference period):

Population (15+ years): 1,00,000 persons
Employed (CWS): 42,000
Unemployed (seeking + available): 3,000
Out of Labour Force (students, domestic duties, etc.): 55,000

Labour Force = 42,000 + 3,000 = 45,000
LFPR = (45,000 / 1,00,000) × 100 = 45.0%
WPR = (42,000 / 1,00,000) × 100 = 42.0%
Unemployment Rate = (3,000 / 45,000) × 100 = 6.7%`,
      },
      {
        heading: 'Data Quality Considerations',
        content: `
- **Reporting bias**: Respondents may under-report casual or part-time work, especially women's work in domestic enterprises.
- **Reference period sensitivity**: UPS, CWS, and CDS measures give different results; comparisons across surveys must use the same reference period.
- **Seasonal variation**: Labour market conditions in agriculture vary significantly by season; annual averages may mask within-year fluctuations.
- **Urban-rural comparability**: The rotating panel design is only for urban areas; rural estimates are cross-sectional only.
- **Non-response**: Non-response in follow-up rounds of the panel can introduce attrition bias.
- **Informal employment**: Self-employed and casual workers are harder to classify; "contributing family workers" are counted as employed even with zero earnings.
`,
      },
      {
        heading: 'Key Learning Points',
        content: `
1. PLFS replaced the quinquennial NSSO EUS from 2017-18; provides annual (rural+urban) and quarterly (urban) estimates.
2. The three reference periods (UPS/UPSS, CWS, CDS) give different employment and unemployment rates.
3. Labour force = employed + unemployed (seeking + available).
4. LFPR measures labour market participation; WPR measures employment; UR measures unemployment among the labour force.
5. Urban quarterly estimates use a rotating panel; rural estimates are cross-sectional.
6. CDS unemployment rate is highest as it captures part-day underemployment.
`,
      },
      {
        heading: 'Learning Outcomes',
        content: `On completing this material, you should be able to:
- Describe the PLFS survey design, including sample design and rotating panel for urban areas.
- Define and compute LFPR, WPR, and unemployment rate under different reference periods.
- Distinguish between UPS, UPSS, CWS, and CDS measures and explain when each is appropriate.
- Compare PLFS with the earlier NSSO Employment-Unemployment Survey.
- Identify data quality considerations in interpreting PLFS estimates.`,
      },
    ],
  },

  'MOSPI-C006': {
    courseId: 'MOSPI-C006',
    pdfUrl: '/materials/MOSPI-C006.pdf',
    title: 'Employment-Unemployment Indicator Estimation',
    domain: 'Labour Statistics',
    level: 'Intermediate',
    duration: '4 hours',
    provider: 'IGNOU',
    version: 'Prototype v1.0 · September 2026',
    disclaimer: 'Prototype learning material · Not official iGOT content',
    sections: [
      {
        heading: 'Introduction',
        content: `Employment and unemployment indicators are among the most closely watched economic statistics, directly informing labour policy, social protection design, and macroeconomic management. In India, the primary source for these indicators is the Periodic Labour Force Survey (PLFS), supplemented by administrative data from EPFO, ESIC, NPS, and payroll-based estimates.

This course focuses on the estimation methodology for employment-unemployment indicators: how they are computed from survey data, how they are validated, and how they are interpreted in the Indian context. It also covers the internationally recommended definitions from ILO's Resolution on Statistics of Work, Employment and Labour Underutilisation (2013 ICLS).`,
      },
      {
        heading: 'Key Concepts',
        subsections: [
          {
            title: 'ILO / ICLS 2013 Definitions',
            body: 'The 19th International Conference of Labour Statisticians (ICLS, 2013) redefined key concepts:\n\n**Employment**: Persons who, during the reference period, worked for at least one hour in exchange for pay or profit, or worked in a job regardless of any pay (contributing family worker).\n\n**Unemployment**: Persons who: (a) are not in employment, (b) are available for employment, and (c) are seeking employment. All three conditions must be met simultaneously.\n\n**Labour underutilisation**: A broader concept covering unemployment + time-related underemployment + potential labour force (discouraged workers).',
          },
          {
            title: 'Usual Activity Status (UAS)',
            body: 'Determined on the basis of the major time criterion over a 365-day reference period. Categories:\n- Workers (self-employed: own account, employer, contributing family worker; salaried/regular; casual wage)\n- Unemployed (seeking and available)\n- Out of labour force (students, domestic duties, pensioners, disabled)',
          },
          {
            title: 'Employment Status Categories',
            body: '**Self-employed**: Own-account workers (work alone), Employers (hire others), Contributing family workers (unpaid work in family enterprise).\n\n**Regular/Salaried employees**: Work for others on a regular basis and receive salary/wage.\n\n**Casual wage labourers**: Work on a day-to-day or casual basis; do not have regular/long-term work contract.',
          },
          {
            title: 'Formal vs. Informal Employment',
            body: 'Informal employment encompasses all jobs lacking basic social or legal protections or employment benefits—whether in formal or informal sector enterprises. Estimated using PLFS variables on job contract type, social security coverage, and written job contract. India has a very high share (~90%) of informal employment.',
          },
        ],
      },
      {
        heading: 'Estimation Methodology',
        subsections: [
          {
            title: 'Step 1: Weight Assignment',
            body: 'Each sampled household is assigned a design weight = inverse of the probability of selection. Weights are calibrated to known population totals (from Census/population projections) by state, sector (rural/urban), age group, and sex. This corrects for differential non-response and improves precision.',
          },
          {
            title: 'Step 2: Activity Classification',
            body: 'Each person 15+ years is classified into activity status categories (worker/unemployed/OOLF) based on:\n- Usual Principal Activity (UPA): Major time in 365 days\n- Usual Subsidiary Activity (USA): Minor time in 365 days\n- Current Weekly Status (CWS): Activity in past 7 days\n- Current Daily Status (CDS): Activity each day of reference week',
          },
          {
            title: 'Step 3: Indicator Computation',
            body: 'Weighted estimates of employed, unemployed, and labour force are computed by summing person-weights across relevant categories:\n\nEstimated Employed = Σ (weight_i × employed_indicator_i)\n\nLFPR = (Estimated Labour Force / Estimated Population 15+) × 100\nWPR = (Estimated Employed / Estimated Population 15+) × 100\nUR = (Estimated Unemployed / Estimated Labour Force) × 100',
          },
          {
            title: 'Step 4: Standard Error Estimation',
            body: 'Given the complex multi-stage stratified design, standard errors cannot be computed using simple random sampling formulas. Methods used:\n- Taylor linearisation (approximate variance estimation)\n- Jackknife replication\n- Bootstrap methods\n\nPublished estimates include standard errors and coefficients of variation (CV) to indicate reliability.',
          },
          {
            title: 'Step 5: Disaggregation',
            body: 'Indicators are published by:\n- Sex (male/female)\n- Sector (rural/urban)\n- Age group (15-29, 30-59, 60+)\n- State/UT (for annual estimates, sample permitting)\n- Industry (NIC 2008 sections)\n- Occupation (NCO 2015 major groups)\n- Employment status (self-employed/regular/casual)',
          },
        ],
      },
      {
        heading: 'Administrative Data Sources for Employment Estimation',
        content: `PLFS household survey data is supplemented and validated against administrative data:

**EPFO (Employees\' Provident Fund Organisation)**: Monthly payroll data for organised-sector formal employment. EPFO net new subscribers is used as a high-frequency indicator of formal employment creation.

**ESIC (Employees\' State Insurance Corporation)**: Covers workers in establishments with 10+ employees in notified sectors. Net new ESIC registrations indicate formal employment trends.

**NPS (National Pension System)**: Subscriber data from PFRDA for government and private sector formal employees.

**Payroll-based employment estimates**: MoSPI compiles quarterly employment estimates for 8 key sectors using enterprise-level administrative data. This provides a supply-side (employer) perspective complementing the demand-side PLFS.

**CMIE (Centre for Monitoring Indian Economy)**: Consumer Pyramids Household Survey provides monthly labour market data; used for comparison and validation but not official estimates.`,
      },
      {
        heading: 'Interpretation and Common Pitfalls',
        content: `
**Pitfall 1 — Comparing across reference periods**: LFPR based on UPS ≠ LFPR based on CWS ≠ LFPR based on CDS. Always state the reference period clearly.

**Pitfall 2 — Female LFPR in India**: India's female LFPR appears low by international standards but household work and subsistence activity are excluded. Using UPSS (principal + subsidiary) gives higher female WPR than UPS alone.

**Pitfall 3 — Low unemployment ≠ full employment**: In the absence of social protection, people cannot afford to be unemployed; they accept low-quality, low-wage casual work. This is reflected in high CDS unemployment (capturing underemployment).

**Pitfall 4 — Urban vs. rural structural differences**: Urban labour markets are more formalised with higher WPR among educated youth; rural labour markets have higher agricultural self-employment. Conflating the two distorts policy conclusions.

**Pitfall 5 — CV-based reliability**: Sub-group estimates (e.g., by state and industry simultaneously) may have high CVs due to small cell sizes. Treat such estimates with caution and report standard errors alongside point estimates.
`,
      },
      {
        heading: 'Practical Example: Computing State-level LFPR',
        content: `Hypothetical State Y, Annual PLFS data, UPS reference period, persons aged 15+:

| Category | Persons (weighted, '000s) |
|---|---|
| Own-account workers | 8,500 |
| Employers | 400 |
| Contributing family workers | 3,200 |
| Regular/salaried employees | 6,100 |
| Casual wage labourers | 4,800 |
| **Total Employed** | **23,000** |
| Unemployed (seeking + available) | 1,800 |
| **Labour Force** | **24,800** |
| Out of Labour Force (students, domestic duties, etc.) | 15,200 |
| **Population 15+** | **40,000** |

LFPR = (24,800 / 40,000) × 100 = **62.0%**
WPR = (23,000 / 40,000) × 100 = **57.5%**
Unemployment Rate = (1,800 / 24,800) × 100 = **7.3%**`,
      },
      {
        heading: 'Data Quality Considerations',
        content: `
- **Proxy reporting**: In PLFS, household head or one informed member may report for all household members, causing classification errors for women and youth.
- **Misclassification of contributing family workers**: Workers in family enterprises may be reported as homemakers if they don't perceive their work as "employment."
- **Seasonal bias**: If fieldwork is concentrated in a particular season, annual estimates may not be representative of the full year.
- **Response burden**: Quarterly follow-up for panel households can lead to respondent fatigue and attrition.
- **Comparability over time**: Changes in survey design, questionnaire, or processing can break time series. Document methodological changes in metadata.
`,
      },
      {
        heading: 'Key Learning Points',
        content: `
1. Employment-unemployment indicators are estimated from PLFS using weighted survey data with complex design adjustments.
2. The three reference periods (UPS, CWS, CDS) produce different indicator values; CDS gives the broadest measure of underemployment.
3. ILO/ICLS 2013 definitions require all three conditions (without work, available, seeking) for unemployment classification.
4. Standard errors must be computed using methods appropriate for complex survey designs (Taylor linearisation, jackknife, bootstrap).
5. Administrative data (EPFO, ESIC, NPS) supplement survey estimates for high-frequency formal employment monitoring.
6. Low unemployment rates in India often reflect disguised underemployment rather than full employment.
`,
      },
      {
        heading: 'Learning Outcomes',
        content: `On completing this material, you should be able to:
- Apply ILO/ICLS 2013 definitions to classify persons into employment status categories.
- Explain the step-by-step methodology for estimating LFPR, WPR, and unemployment rate from PLFS data.
- Compute employment indicators from survey data using appropriate weights.
- Identify and account for complex survey design in standard error estimation.
- Describe administrative data sources used to validate and supplement PLFS-based estimates.
- Avoid common pitfalls in interpreting India's employment-unemployment statistics.`,
      },
    ],
  },
};

/**
 * Returns true if a prototype learning material exists for the given course ID.
 * @param {string} courseId
 * @returns {boolean}
 */
export const hasLearningMaterial = (courseId) => courseId in LEARNING_MATERIALS;

/**
 * Returns the learning material for a given course ID, or null if not found.
 * @param {string} courseId
 * @returns {object|null}
 */
export const getLearningMaterial = (courseId) => LEARNING_MATERIALS[courseId] || null;
