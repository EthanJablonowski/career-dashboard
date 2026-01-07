export interface Project {
  id: string;
  title: string;
  org: string;
  role: string;
  dateStart: string;
  dateEnd: string;
  nodeType: "primary" | "experiment" | "cert" | "life";
  snapshot: string;
  bullets: string[];
  skills: string[];
  primaryMetric?: {
    value: string;
    label: string;
    context?: string;
  };
  tradeoff: {
    chose: string;
    insteadOf: string;
    because: string;
  };
  learned?: string;
  metrics?: { label: string; value: string; note?: string }[];
  links?: { label: string; href: string; kind?: "proof" | "press" | "site" }[];
  media?: { src: string; alt: string; caption?: string }[];
  tags: string[];
  relevantFor?: string[];
}

export const projects: Project[] = [
  // PRIMARY WORK NODES
  {
    id: "fitness-with-ethan",
    title: "FitnessWithEthan",
    org: "Self-Employed",
    role: "Founder",
    dateStart: "Q1 2016",
    dateEnd: "Q2 2018",
    nodeType: "primary",
    snapshot: "Built initial revenue through fitness coaching and content. Learned fundamentals of customer acquisition and service delivery.",
    bullets: [
      "Created and sold fitness programs and coaching services",
      "Built audience through content marketing",
      "Managed client relationships and program delivery",
      "Developed early marketing and sales skills"
    ],
    skills: ["Funnel building", "Offer design", "Paid acquisition", "Customer delivery", "Iteration"],
    tradeoff: {
      chose: "Direct service delivery and coaching",
      insteadOf: "Scalable digital products only",
      because: "Needed to understand customer pain points and build trust through direct interaction"
    },
    learned: "Customer trust is built through consistent delivery and genuine expertise.",
    tags: ["Coaching", "Marketing", "Service"],
    relevantFor: ["growth"]
  },
  {
    id: "linnea-design",
    title: "Linnea Design",
    org: "Linnea Design",
    role: "Growth Marketing",
    dateStart: "Q2 2017",
    dateEnd: "Q2 2018",
    nodeType: "primary",
    snapshot: "Drove customer acquisition for luxury interior design firm. Built and optimized paid acquisition systems.",
    bullets: [
      "Managed Google Ads and Facebook ad campaigns",
      "Optimized conversion funnels and landing pages",
      "Analyzed customer acquisition costs and lifetime value",
      "Collaborated with design team on positioning and messaging"
    ],
    skills: ["Performance marketing", "CAC/LTV analysis", "Conversion optimization", "Landing pages", "Paid media"],
    tradeoff: {
      chose: "High-intent search traffic over broad awareness",
      insteadOf: "Brand campaigns and display advertising",
      because: "Limited budget required focus on direct-response channels with clear ROI"
    },
    learned: "Luxury services require longer sales cycles and relationship-based conversion paths.",
    tags: ["Marketing", "Paid Ads", "Conversion"],
    relevantFor: ["growth"]
  },
  {
    id: "digitopia-pm",
    title: "Digitopia — Project Management",
    org: "Digitopia",
    role: "Project Manager",
    dateStart: "Q4 2019",
    dateEnd: "Q3 2020",
    nodeType: "primary",
    snapshot: "Coordinated cross-functional teams for medical spa app startup. Managed product roadmap and stakeholder alignment.",
    bullets: [
      "Led product development cycles and sprint planning",
      "Coordinated between engineering, design, and business teams",
      "Managed stakeholder communication and expectations",
      "Created project documentation and requirement specifications"
    ],
    skills: ["Requirements", "Wireframing", "Vendor sourcing", "Compliance coordination", "Project delivery", "Stakeholder management"],
    tradeoff: {
      chose: "Agile iteration with frequent stakeholder feedback",
      insteadOf: "Waterfall approach with upfront specifications",
      because: "Medical spa market required rapid validation and pivots based on provider feedback"
    },
    learned: "Clear communication structures prevent misalignment in cross-functional teams.",
    tags: ["Product", "PM", "Coordination"],
    relevantFor: ["product", "operations"]
  },
  {
    id: "digitopia-media",
    title: "Digitopia — Media Buying",
    org: "Digitopia",
    role: "Media Buyer",
    dateStart: "Q4 2019",
    dateEnd: "Q3 2020",
    nodeType: "primary",
    snapshot: "Managed paid acquisition for healthcare app. Optimized CAC and tested messaging across channels.",
    bullets: [
      "Ran Facebook and Google ad campaigns for app installs",
      "Tested messaging and creative variations",
      "Tracked and optimized customer acquisition costs",
      "Analyzed channel performance and allocation"
    ],
    skills: ["Performance marketing", "Arbitrage", "CAC/LTV", "Conversion tracking", "Creative testing", "Budget pacing"],
    tradeoff: {
      chose: "Facebook app install campaigns",
      insteadOf: "Google search for direct intent",
      because: "Visual storytelling resonated better with aesthetic-focused medical spa customers"
    },
    learned: "Healthcare marketing requires careful messaging to balance aspiration with trust.",
    tags: ["Marketing", "Media Buying", "Healthcare"],
    relevantFor: ["growth"]
  },
  {
    id: "kompete-build",
    title: "KOMPETE — Build",
    org: "KOMPETE (Modernize Games)",
    role: "Founding COO",
    dateStart: "Q1 2021",
    dateEnd: "Q1 2022",
    nodeType: "primary",
    snapshot: "Built a player-owned marketplace from zero. Designed tokenomics and trading systems. $100M+ traded on-chain.",
    bullets: [
      "Designed economy to prevent inflationary collapse in decentralized system",
      "Owned marketplace product strategy and trading mechanics",
      "Directed feature decisions across pricing, risk, and UX",
      "Led rollout planning across product, community, and marketing",
      "Defined KPI framing and stakeholder narrative"
    ],
    skills: ["Product strategy", "Economy design", "Marketplace systems", "Token mechanics", "UX flows", "Release planning", "KPI framing"],
    primaryMetric: {
      value: "$100M+",
      label: "Cumulative trade volume",
      context: "verified on-chain"
    },
    tradeoff: {
      chose: "Player-owned economy with no central marketplace fees",
      insteadOf: "Traditional take-rate model (5-15% per transaction)",
      because: "Aligned with decentralization values; created trust and adoption"
    },
    learned: "Decentralization is a design constraint, not a philosophy. Systems need clear rules even when control is distributed.",
    tags: ["Product", "Web3", "Marketplace", "Economy Design"],
    relevantFor: ["product", "operations"],
    links: [
      {
        label: "On-chain volume (Dune Analytics)",
        href: "#",
        kind: "proof"
      }
    ]
  },
  {
    id: "kompete-scale",
    title: "KOMPETE — Scale",
    org: "KOMPETE (Modernize Games)",
    role: "Founding COO",
    dateStart: "Q1 2022",
    dateEnd: "Q2 2025",
    nodeType: "primary",
    snapshot: "Scaled operations to 350k+ players. Primary public spokesperson with 100+ unscripted talks. Built live-service delivery systems.",
    bullets: [
      "Primary public spokesperson: 100+ talks, panels, AMAs",
      "Owned cross-functional alignment across product, ops, community",
      "Supported 350k+ active players with clear release cadence",
      "Built operational systems for live-service delivery",
      "Managed partnerships with Epic Games, Xsolla, and platform providers"
    ],
    skills: ["Operations", "Live-service delivery", "Stakeholder comms", "Public speaking", "Community leadership", "Partnerships", "Cross-functional alignment"],
    primaryMetric: {
      value: "350k+",
      label: "Active players supported",
      context: "peak concurrent"
    },
    tradeoff: {
      chose: "Unscripted public communication in live settings",
      insteadOf: "Scripted PR and controlled messaging",
      because: "Community valued authenticity over polish in Web3 context"
    },
    learned: "Live-service operations require ruthless prioritization and clear communication rhythms.",
    tags: ["Operations", "Community", "Live Ops", "Web3", "Partnerships"],
    relevantFor: ["operations", "growth"]
  },
  {
    id: "outpost-therapy",
    title: "Outpost Therapy — Build",
    org: "Outpost Therapy",
    role: "Co-Founder",
    dateStart: "Q2 2025",
    dateEnd: "Present",
    nodeType: "primary",
    snapshot: "Building mobile pediatric OT practice with product-quality systems. Cash-pay model outside insurance. Complete GTM and operations buildout.",
    bullets: [
      "Owned brand, website, and conversion flows",
      "Designed intake, scheduling, and compliance workflows",
      "Built GTM foundation: messaging, service model, customer research",
      "Established operational systems for consistent delivery",
      "Managing vehicle conversion to mobile sensory gym"
    ],
    skills: ["GTM foundations", "Messaging", "Ops design", "Intake workflows", "Service model", "Brand systems"],
    tradeoff: {
      chose: "Cash-pay model outside insurance system",
      insteadOf: "Traditional insurance billing path",
      because: "Faster iteration, authentic service delivery, no administrative bloat"
    },
    learned: "Healthcare requires systems thinking and compliance rigor, but innovation happens at edges of traditional models.",
    tags: ["Product", "Healthcare", "GTM", "Systems", "Operations"],
    relevantFor: ["product", "operations"],
    links: [
      {
        label: "Outpost Therapy",
        href: "https://outposttherapy.com",
        kind: "site"
      }
    ]
  },

  // EXPERIMENT NODES
  {
    id: "early-seo-roots",
    title: "Early SEO Roots (Affiliate & Product Experiments)",
    org: "Self-Employed",
    role: "Affiliate Marketer",
    dateStart: "Q1 2014",
    dateEnd: "Q2 2015",
    nodeType: "experiment",
    snapshot: "Early trial-by-fire period learning SEO, affiliate marketing, and attention economics through small product and content experiments.",
    bullets: [
      "Built and tested early SEO-driven affiliate and product sites",
      "Learned how rankings, attention, and demand compound over time",
      "Experienced firsthand volatility from Google algorithm changes",
      "Worked under a mentor focused on leverage through distribution (later became CEO of KOMPETE)"
    ],
    skills: ["SEO fundamentals", "Keyword research", "Content strategy", "Traffic volatility management", "Incentive alignment", "Attention economics"],
    tradeoff: {
      chose: "Organic search traffic over paid acquisition",
      insteadOf: "Direct paid advertising models",
      because: "Limited capital required building compounding traffic assets rather than buying demand"
    },
    learned: "Distribution leverage compounds over time, but platform dependency creates fragility. Algorithm changes can erase months of work overnight.",
    tags: ["Experiment", "SEO", "Affiliate", "Marketing"],
    relevantFor: ["growth"]
  },
  {
    id: "real-estate",
    title: "Real Estate — Lead Gen & Agency",
    org: "Self-Employed",
    role: "Real Estate Agent",
    dateStart: "Q2 2018",
    dateEnd: "Q2 2019",
    nodeType: "experiment",
    snapshot: "Entered residential real estate to understand lead economics and transaction mechanics firsthand, using agency work to test demand generation.",
    bullets: [
      "Explored real estate lead generation and conversion dynamics",
      "Operated as residential agent to observe transactions end-to-end",
      "Worked within CRM-driven pipelines and commission incentives",
      "Identified where leverage exists in real estate leads—and where it breaks down"
    ],
    skills: ["Lead gen economics", "CRM/pipeline", "Client comms", "Transaction process", "Sales ops"],
    tradeoff: {
      chose: "Direct agent work within established team",
      insteadOf: "Building independent lead generation business first",
      because: "Needed to understand transaction mechanics before optimizing acquisition"
    },
    learned: "Real estate transaction complexity creates friction that limits pure lead arbitrage models.",
    tags: ["Experiment", "Real Estate", "Lead Gen"],
    relevantFor: ["growth"]
  },
  {
    id: "scenic-cleanup",
    title: "Scenic City Cleanup",
    org: "Scenic City Cleanup",
    role: "Founder",
    dateStart: "Q3 2025",
    dateEnd: "Present",
    nodeType: "experiment",
    snapshot: "Fast local demand test. Validated CAC and channel strategy through Google Ads. Learned pricing reality through real estimates.",
    bullets: [
      "Built and launched Google Ads funnel for seasonal cleanup",
      "Achieved ~$25–$50 cost per booked customer (with credits)",
      "Learned estimating/bidding gaps and corrected assumptions",
      "Validated Google Ads as strong channel; deprioritized print"
    ],
    skills: ["Local SEO/Ads", "CAC testing", "Ops execution", "Pricing iteration", "Service delivery"],
    tradeoff: {
      chose: "Speed over perfection in market validation",
      insteadOf: "Extended planning and market research",
      because: "Real customer conversations worth more than hypothetical modeling"
    },
    learned: "Local service businesses require operational precision that limits pure marketing arbitrage.",
    tags: ["Experiment", "Marketing", "CAC", "Local"],
    relevantFor: ["growth"]
  },
  {
    id: "boring-business",
    title: "Boring Business Leads",
    org: "Self-Employed",
    role: "Founder",
    dateStart: "Q4 2025",
    dateEnd: "Present",
    nodeType: "experiment",
    snapshot: "Testing lead generation for unsexy, essential services. Validating channel economics and conversion paths.",
    bullets: [
      "Building demand generation systems for local services",
      "Testing Google Ads and conversion funnel optimization",
      "Validating customer acquisition economics",
      "Learning operational requirements of lead fulfillment"
    ],
    skills: ["Prospecting systems", "Lead qualification", "Offer packaging", "Automation", "Sales pipeline"],
    tradeoff: {
      chose: "Local service verticals over tech/SaaS",
      insteadOf: "High-margin digital products",
      because: "Wanted to test fundamentals of demand generation without product complexity"
    },
    learned: "Lead quality and fulfillment capacity are equally important to acquisition efficiency.",
    tags: ["Experiment", "Lead Gen", "Marketing"],
    relevantFor: ["growth"]
  },

  // LIFE NODE
  {
    id: "pct-thru-hike",
    title: "PCT Thru-hike",
    org: "Personal",
    role: "Thru-hiker",
    dateStart: "Q2 2015",
    dateEnd: "Q4 2015",
    nodeType: "life",
    snapshot: "2,650 miles. Six months. Built endurance for uncertainty and disciplined decision-making under long constraints.",
    bullets: [
      "Completed Pacific Crest Trail thru-hike (Mexico to Canada)",
      "Managed logistics, resupply, risk, and recovery for 6 months",
      "Built resilience and follow-through under sustained difficulty",
      "Learned to make good decisions with incomplete information"
    ],
    skills: ["Endurance", "Risk management", "Resource planning", "Decision-making", "Self-reliance"],
    tradeoff: {
      chose: "Six months off-grid during career transition",
      insteadOf: "Immediate job search after previous role",
      because: "Needed to reset and prove I could finish hard things"
    },
    learned: "Endurance is about sustainable systems, not heroic effort. Consistency beats intensity.",
    tags: ["Life", "Endurance", "Resilience"],
    relevantFor: []
  }
];

// Certifications data (will be displayed as grouped cluster)
export const certifications = [
  {
    id: "google-ads-cert",
    name: "Google Ads Certification",
    year: "2019",
    issuer: "Google",
    relevance: "Validated paid acquisition fundamentals"
  },
  {
    id: "scrum-cert",
    name: "Certified ScrumMaster (CSM)",
    year: "2019",
    issuer: "Scrum Alliance",
    relevance: "Formalized agile project management approach"
  }
];