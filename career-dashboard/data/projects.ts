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
  sections?: {
    product?: { items: string[]; skills?: string[]; tools?: string[] };
    growth?: { items: string[]; skills?: string[]; tools?: string[] };
    ops?: { items: string[]; skills?: string[]; tools?: string[] };
  };
  tools?: string[];
}

export const projects: Project[] = [
  // Projects ordered from most recent to oldest
  {
    id: "boring-business",
    title: "Local Service Lead Engine",
    org: "Self-Employed",
    role: "Founder",
    dateStart: "Jan 2026",
    dateEnd: "Present",
    nodeType: "experiment",
    snapshot: "Building a hub-and-spoke network of localized home-services lead-gen sites, paired with a dashboard and sales engine to track, route, and sell inbound leads.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Building localized home-services lead-gen sites using an AI-assisted content strategy and scalable site architecture.",
          "Designing a lead tracking and routing dashboard to manage inbound leads and backend operations."
        ],
        skills: ["Service & Offering Design", "Pricing & Packaging", "Workflows & Automations", "Platform & Infrastructure", "User Flows & UX", "Requirements & Specs", "Build & Delivery", "AI-Supported Product Development"],
        tools: ["Claude Code", "PayPal", "Zapier", "WordPress", "Node/Next.js", "Figma"]
      },
      growth: {
        items: [
          "Identifying low-competition, high-intent opportunities through keyword and SERP analysis.",
          "Executing SEO and LLM optimization strategies focused on page structure, keyword targeting, and local citations."
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "SEO Strategy & Architecture", "Content Strategy & Production", "Local SEO", "AI-Supported Growth"],
        tools: ["Ahrefs", "Google Keyword Planner", "Google Search Console", "WordPress", "Claude Code"]
      },
      ops: {
        items: [
          "Exploring and designing early-stage systems for lead intake, CRM tracking, and partner delivery workflows.",
          "Establishing initial policies around pricing, billing, disputes, refunds, and lead quality as the model takes shape."
        ],
        skills: ["Operating Systems", "Unit Economics & Pricing", "Billing & Disputes", "AI-Supported Operations"],
        tools: ["CRM", "PayPal", "Claude Code"]
      }
    },
    tradeoff: {
      chose: "Local service verticals over tech/SaaS",
      insteadOf: "High-margin digital products",
      because: "Wanted to test fundamentals of demand generation without product complexity"
    },
    learned: "SEO, even in 2026, continues to present a real opportunity for ranking high-intent keywords across localized home services. AI has made it possible to approach this at scale; the open question is whether authenticity can be maintained well enough to avoid long-term deranking.",
    tags: ["Experiment"],
    relevantFor: ["growth"]
  },
  {
    id: "scenic-cleanup",
    title: "Scenic City Cleanup",
    org: "Scenic City Cleanup",
    role: "Founder",
    dateStart: "Sept 2025",
    dateEnd: "Dec 2025",
    nodeType: "experiment",
    snapshot: "A hands-on local services experiment to test lead-generation economics, conversion, and real-world operations in home services.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Built a simple, conversion-focused landing page intended to function as a digital flyer and route inbound traffic.",
          "Designed a lightweight service offering centered on solo-operator trust, low overhead, fast quotes, and a personal service guarantee."
        ],
        skills: ["Service & Offering Design", "Positioning & Value Proposition", "Pricing & Packaging", "Build & Delivery"],
        tools: ["Canva"]
      },
      growth: {
        items: [
          "Researched core and auxiliary local keywords (e.g. fall cleanup, leaf cleanup) to identify low-competition demand.",
          "Ranked ~5th organically for \"fall cleanup Chattanooga\" across a range of target ZIP codes, supported by local citations designed to improve Google Business Profile and map-pack visibility.",
          "Ran Google Ads to test paid demand and CAC, producing approximately: ~$3.80 CPC, ~11% call rate, ~40% close rate, ~$85 CAC on ~$400 AOV."
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "Local SEO", "Paid Search", "Performance Optimization"],
        tools: ["Ahrefs", "Google Keyword Planner", "Google Search Console", "Google Business Profile", "Google Ads"]
      },
      ops: {
        items: [
          "Handled inbound discovery, quoting, scheduling, and on-site service delivery end to end.",
          "Closed sales face-to-face and managed customer expectations directly.",
          "Learned real-world home-services workflows and operational constraints firsthand."
        ],
        skills: ["Operating Systems", "Capacity & Scheduling", "Customer Experience", "Unit Economics & Pricing"],
        tools: ["Google Voice", "Google Sheets"]
      }
    },
    tradeoff: {
      chose: "Speed over perfection in market validation",
      insteadOf: "Extended planning and market research",
      because: "Real customer conversations worth more than hypothetical modeling"
    },
    learned: "Lead quality and efficient operations matter more than raw lead volume. Auxiliary and local-intent keywords remain low-hanging fruit for niche service businesses. Simple, trust-based branding converts well for solo operators who don't yet have review traction.",
    tags: ["Experiment"],
    relevantFor: ["growth"]
  },
  {
    id: "outpost-therapy",
    title: "Outpost Therapy",
    org: "Outpost Therapy",
    role: "Co-Founder",
    dateStart: "July 2025",
    dateEnd: "Present",
    nodeType: "primary",
    snapshot: "Co-founding a pediatric therapy practice from zero. Applying product, growth, and operational thinking to design the brand, service model, and foundations of a modern cash-pay OT business.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Defined the service model, positioning, and offerings for a cash-pay pediatric OT practice.",
          "Built the brand identity, messaging, and digital presence in close consultation with the clinical founder.",
          "Designed a hybrid mobile and hosted care model to support premium pricing and expanded geographic reach.",
          "Developed service structure, session pricing, and delivery format based on unit economics.",
          "Created a scalable foundation to support future therapists, locations, and service expansion."
        ],
        skills: ["Service & Offering Design", "Positioning & Value Proposition", "Pricing & Packaging", "Workflows & Automations", "Platform & Infrastructure", "User Flows & UX", "Build & Delivery", "AI-Supported Product Development"],
        tools: ["Webflow", "Figma", "Claude Code"]
      },
      growth: {
        items: [
          "Designed an SEO-first site architecture (goals, services, locations) to capture high-intent local demand.",
          "Conducted keyword and market research to validate demand, pricing power, and geographic strategy.",
          "Built a content strategy aligned with parent decision-making and long-tail search behavior.",
          "Positioned the brand as a modern alternative to inefficient, insurance-driven therapy models.",
          "Developed dual-sided messaging for families seeking better care and therapists seeking better careers."
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "SEO Strategy & Architecture", "Content Strategy & Production", "Local SEO", "Narrative & Messaging", "AI-Supported Growth"],
        tools: ["Ahrefs", "Google Keyword Planner", "Google Search Console", "CMS", "Google Business Profile", "Claude Code"]
      },
      ops: {
        items: [
          "Established core business foundations, including entity structure, insurance, permitting, and compliance research.",
          "Implemented SimplePractice to support scheduling, documentation, and payments.",
          "Modeled unit economics and long-term viability of a mobile and sensory-gym-based approach.",
          "Identified a non-traditional infrastructure solution (converted school bus) that avoids commercial leases while expanding service flexibility and improving margins.",
          "Built systems with optionality to scale if demand and clinical interest support expansion."
        ],
        skills: ["Operating Systems", "Unit Economics & Pricing", "Cash Flow & Reporting", "Legal & Contract Coordination", "Regulatory & Platform Compliance", "AI-Supported Operations"],
        tools: ["Google Workspace", "Google Sheets", "QuickBooks", "SimplePractice", "Claude Code"]
      }
    },
    tradeoff: {
      chose: "Cash-pay model outside insurance system",
      insteadOf: "Traditional insurance billing path",
      because: "Faster iteration, authentic service delivery, no administrative bloat"
    },
    learned: "Building from scratch allows you to focus on ideal clients and design solutions that truly serve them. In legacy industries, this approach creates room to rethink and improve outdated systems.",
    tags: ["Core Experience"],
    relevantFor: ["product", "operations"],
    links: [
      {
        label: "Outpost Therapy",
        href: "https://outposttherapy.com",
        kind: "site"
      }
    ]
  },
  {
    id: "kompete-scale",
    title: "KOMPETE (Scale)",
    org: "KOMPETE (Modernize Games)",
    role: "Founding COO",
    dateStart: "Oct 2023",
    dateEnd: "June 2025",
    nodeType: "primary",
    snapshot: "Scaled and operated a live, decentralized game economy and on-chain marketplace as trade volume across tokens and in-game assets grew past $100M.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Oversaw an ecosystem reaching $100M+ in trade volume across tokens and game assets, 110k+ on-chain transactions, and approximately $55M in circulating market cap.",
          "Directed a live-service product using real-time player and trader behavior to set priorities, sequencing, and release pacing.",
          "Owned day-to-day economic decisions and adjustments in a live, on-chain environment.",
          "Partnered closely with design, engineering, and the CEO to translate market signals into an evolving roadmap and shipped updates.",
          "Led marketplace UX and functional improvements to reduce friction through clearer supply and pricing visibility, improved UI, and features such as a bid/ask system.",
          "Co-led planning and execution of the economy infrastructure migration to Base (Ethereum L2), materially reducing fees and latency while improving onboarding UX."
        ],
        skills: ["Economics & Incentives", "Workflows & Automations", "Platform & Infrastructure", "User Flows & UX", "Requirements & Specs", "Project Management", "AI-Supported Product Development"],
        tools: ["Dune", "Claude Code", "Ethereum Network", "Base Network", "Solidity", "Figma", "Google Docs", "Asana"]
      },
      growth: {
        items: [
          "Built and managed player and trader communities across Discord (12k+) and Telegram.",
          "Implemented community incentive structures to drive engagement and sustained participation.",
          "Led industry partnerships with gaming guilds, trading groups, and crypto KOLs.",
          "Negotiated partnership terms, managed contracts, and tracked deliverables.",
          "Shaped and maintained the public narrative positioning the studio as a credible underdog.",
          "Contributed to paid media strategy and performance analysis across Google Ads and Meta Ads.",
          "Wrote and directed the majority of blogs, announcements, and social content."
        ],
        skills: ["Community Building", "Narrative & Messaging", "Influencer & KOL Campaigns", "Paid Search", "Paid Social", "Performance Optimization", "Content Strategy & Production"],
        tools: ["Discord", "Telegram", "X (Twitter)", "YouTube", "TikTok", "Google Ads", "Meta Ads", "Google Analytics", "Game Analytics", "CMS"]
      },
      ops: {
        items: [
          "Served as communications lead for the game economy and marketplace.",
          "Delivered 20+ live stakeholder updates covering economic performance, roadmap progress and changes, and market conditions.",
          "Participated in dozens of AMAs, podcasts, panels, and public industry discussions.",
          "Managed accounting across fiat and crypto revenue streams.",
          "Built internal cash-flow tracking to support tax reporting and financial clarity for external professionals.",
          "Coordinated execution across product, engineering, community, and external partners."
        ],
        skills: ["Operating Systems", "Cash Flow & Reporting", "Billing & Disputes", "Risk Management", "Cross-Functional Execution", "Stakeholder Communication"],
        tools: ["Google Workspace", "QuickBooks", "Etherscan", "Basescan", "Xsolla", "Ethereum", "Base"]
      }
    },
    tradeoff: {
      chose: "Unscripted public communication in live settings",
      insteadOf: "Scripted PR and controlled messaging",
      because: "Community valued authenticity over polish in Web3 context"
    },
    learned: "Operating a live economy is less about perfect design and more about sustained trust. Clear rules, transparent communication, and aligned incentives matter more than features once real money is involved. At scale, consistency and credibility compound faster than speed.",
    tags: ["Core Experience"],
    relevantFor: ["operations", "growth"]
  },
  {
    id: "kompete-build",
    title: "KOMPETE (Build)",
    org: "KOMPETE (Modernize Games)",
    role: "Founding COO",
    dateStart: "Feb 2021",
    dateEnd: "Oct 2023",
    nodeType: "primary",
    snapshot: "Designed and launched the foundational infrastructure for a player-owned game economy, including token design, marketplace mechanics, and crypto–fiat interoperability.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Designed the core game economy from first principles, informed by research across blockchain gaming, virtual economies, and durable incentive systems.",
          "Concepted a hybrid fiat and crypto backend inventory system that allowed players to participate together regardless of payment rail.",
          "Designed smart contract features and requirements underpinning the token, including developer tax mechanics and economic controls.",
          "Oversaw token deployment, initial liquidity event, and public launch.",
          "Designed peer-to-peer marketplace mechanics and trading features; created initial wireframes and directed UI and development through launch.",
          "Designed and shipped Konvert, a mint-and-burn mechanic allowing players to bring assets on-chain at their own pace, reducing initial onboarding friction.",
          "Designed and oversaw Kollection, a gamified collecting and trading system with algorithmic scoring to incentivize participation, ecosystem TVL, and transaction activity.",
          "Balanced multiple user incentive profiles into a cohesive economic feedback loop.",
          "Built and operated a motion-capture pipeline, recording hundreds of custom basketball animations with a contracted professional athlete."
        ],
        skills: ["Economics & Incentives", "Workflows & Automations", "Platform & Infrastructure", "User Flows & UX", "Requirements & Specs", "Project Management", "Build & Delivery", "AI-Supported Product Development"],
        tools: ["Ethereum Network", "Base Network", "Solidity", "Figma", "Google Docs", "Asana", "Claude Code"]
      },
      growth: {
        items: [
          "Published regular development updates during the build phase to position development itself as a transparent, early-access experience.",
          "Used early economy features as limited-access events that doubled as community engagement and structured QA feedback loops.",
          "Shaped early asset releases with clear narratives to establish value signals and guide collector behavior.",
          "Framed development as collaborative and transparent to set expectations and build trust ahead of launch."
        ],
        skills: ["Community Building", "Narrative & Messaging"],
        tools: ["Discord", "Telegram", "Facebook Groups", "X (Twitter)", "YouTube"]
      },
      ops: {
        items: [
          "Worked with legal counsel to inform the CEO on compliance considerations, risk profiles, and policy decisions related to crypto operations.",
          "Coordinated drafting and rollout of Terms of Service and Privacy Policy with external legal partners.",
          "Worked closely with Xsolla to support compliant fiat payment operations and partner integrations.",
          "Led partnership coordination with Xsolla and served as primary point of contact for issue resolution and platform updates.",
          "Interpreted licensing and royalty requirements for Unreal Engine and MetaHuman; implemented revenue tracking and quarterly reporting to Epic Games.",
          "Authored internal policies for dispute resolution and risk management.",
          "Wrote a public-facing player code of conduct to support community health and long-term sustainability."
        ],
        skills: ["Operating Systems", "Legal & Contract Coordination", "Regulatory & Platform Compliance", "Risk Management", "Strategic Partnerships", "Deal Structuring & Management", "Cash Flow & Reporting", "Billing & Disputes"],
        tools: ["Google Workspace", "Xsolla", "QuickBooks"]
      }
    },
    tradeoff: {
      chose: "Player-owned economy with no central marketplace fees",
      insteadOf: "Traditional take-rate model (5-15% per transaction)",
      because: "Aligned with decentralization values; created trust and adoption"
    },
    learned: "Simple systems are more durable than clever ones. When real financial incentives are involved, edge cases matter, and complexity compounds risk. Restraint in design and communication creates more long-term leverage than chasing short-term excitement.",
    tags: ["Core Experience"],
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
    id: "digitopia-media",
    title: "Digittopia (Media Buying)",
    org: "Digittopia",
    role: "Media Buyer",
    dateStart: "April 2020",
    dateEnd: "Dec 2020",
    nodeType: "primary",
    snapshot: "Built and operated a content-driven paid acquisition and arbitrage system in healthcare verticals, leveraging pricing inefficiencies across search, social, and content monetization channels.",
    bullets: [],
    skills: [],
    sections: {
      growth: {
        items: [
          "Co-built and scaled a hybrid SEO and paid social arbitrage system.",
          "Directed the build of SevenBars.com and authored 60+ long-form SEO articles targeting high-CPC healthcare keywords (e.g. diabetes, dental implants, COPD).",
          "Designed and tested Facebook native ads driving traffic to content monetized via Google AdSense.",
          "Rapidly tested creatives, audiences, and content formats, scaling only campaigns achieving 3x+ return.",
          "Analyzed Facebook Ad Library and competitor positioning to inform creative direction and messaging strategy."
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "SEO Strategy & Architecture", "Content Strategy & Production", "Paid Search", "Paid Social", "Performance Optimization"],
        tools: ["Ahrefs", "Google Keyword Planner", "WordPress", "Google Ads", "Meta Ads"]
      },
      ops: {
        items: [
          "Tracked spend, revenue, and unit economics in Airtable to guide scaling and budget allocation decisions.",
          "Partnered closely with a teammate to coordinate content iteration, financial reporting, and optimization efforts.",
          "Managed systems that scaled to six figures in monthly ad spend during peak performance periods.",
          "Supported cash-flow planning and stakeholder communication to manage working-capital constraints while scaling."
        ],
        skills: ["Unit Economics & Pricing", "Cash Flow & Reporting"],
        tools: ["Airtable"]
      }
    },
    tradeoff: {
      chose: "Facebook app install campaigns",
      insteadOf: "Google search for direct intent",
      because: "Visual storytelling resonated better with aesthetic-focused medical spa customers"
    },
    learned: "Attention behaves like a market. Pricing shifts by audience, timing, platform, and creative quality. Performance comes down to how quickly you identify inefficiencies and act on them before they disappear.",
    tags: ["Core Experience"],
    relevantFor: ["growth"]
  },
  {
    id: "digitopia-pm",
    title: "Digittopia (Product Manager)",
    org: "Digittopia",
    role: "Product Manager",
    dateStart: "April 2020",
    dateEnd: "Dec 2020",
    nodeType: "primary",
    snapshot: "Oversaw design and early development of a mobile application for an LA-based medical spa to support on-demand, in-home treatments. Worked closely with stakeholders and outsourced developers to design a compliant, intuitive healthcare experience.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Defined service offerings, pricing structures, and end-to-end user flows for a mobile, on-demand healthcare model.",
          "Designed a two-sided mobile experience for customers and providers, including booking, service management, payments, and patient records.",
          "Translated clinical, operational, and business requirements into clear product specifications for development teams.",
          "Interviewed and selected outsourced development partners, owning product scope, feature requirements, and budget oversight.",
          "Led early planning for EHR integration with DrChrono, including feasibility research and initial implementation work."
        ],
        skills: ["Service & Offering Design", "Pricing & Packaging", "User Flows & UX", "Requirements & Specs", "Platform & Infrastructure", "Project Management"],
        tools: ["Figma", "React Native", "DrChrono", "Google Docs", "Asana"]
      },
      ops: {
        items: [
          "Worked directly with licensed medical providers to ensure compliant and accurate service language and workflows.",
          "Coordinated with IV therapy suppliers to plan procurement strategy and operational efficiency.",
          "Acted as day-to-day product liaison to the founder, providing regular updates and decision support across moving pieces."
        ],
        skills: ["Operating Systems", "Legal & Contract Coordination", "Regulatory & Platform Compliance", "Cross-Functional Execution"],
        tools: ["Asana", "DrChrono"]
      }
    },
    tradeoff: {
      chose: "Agile iteration with frequent stakeholder feedback",
      insteadOf: "Waterfall approach with upfront specifications",
      because: "Medical spa market required rapid validation and pivots based on provider feedback"
    },
    learned: "This project showed how quickly external events can upend a business model. COVID introduced uncertainty around regulation and feasibility, and it was my first real exposure to how complex real product ecosystems are. Individual feature decisions can ripple outward, creating orders of magnitude more complexity across the system.",
    tags: ["Core Experience"],
    relevantFor: ["product", "operations"]
  },
  {
    id: "linnea-design",
    title: "Linnea Design",
    org: "Linnea Design",
    role: "Growth Marketing",
    dateStart: "May 2019",
    dateEnd: "April 2020",
    nodeType: "primary",
    snapshot: "Led growth marketing for an established interior design ecommerce brand, expanding into new demographics while modernizing UX and migrating the business to more modern digital infrastructure.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Led migration from a legacy ecommerce system to Shopify to support modern checkout, attribution, and integrations.",
          "Rebuilt website UX to improve online ordering for both digital-native customers and older, less technical customers.",
          "Implemented abandoned-cart flows, email follow-ups, and on-site UX improvements, including persistent cart and product recommendations.",
          "Partnered with the founder to restructure site hierarchy, navigation, and product presentation for clarity and conversion.",
          "Oversaw complex data migration from a legacy order-management system, including manual cleanup and consolidation."
        ],
        skills: ["Platform & Infrastructure", "User Flows & UX", "Workflows & Automations", "Project Management", "Build & Delivery"],
        tools: ["Shopify", "MailerLite"]
      },
      growth: {
        items: [
          "Launched and managed the brand's first paid acquisition efforts on Meta.",
          "Developed an acquisition strategy leveraging high-quality in-house creative assets.",
          "Built an early social strategy encouraging customer-generated content through incentives and hashtag campaigns.",
          "Tested positioning and messaging to broaden appeal beyond an aging customer base.",
          "Monitored CAC, funnel performance, and conversion behavior to guide iteration."
        ],
        skills: ["Product-Channel Fit", "Paid Search", "Paid Social", "Performance Optimization", "Community Building", "Narrative & Messaging"],
        tools: ["Google Ads", "Meta Ads", "Google Analytics", "Instagram", "Facebook"]
      },
      ops: {
        items: [
          "Worked closely with the founder to modernize ecommerce operations without disrupting existing revenue.",
          "Gained hands-on exposure to order fulfillment, shipping logistics, and seasonal volume during peak holiday periods.",
          "Helped align marketing initiatives with inventory, fulfillment, and customer service realities.",
          "Balanced experimentation with the operational constraints of a legacy business."
        ],
        skills: ["Operating Systems"],
        tools: ["Shopify"]
      }
    },
    tradeoff: {
      chose: "Gradual platform migration with parallel systems",
      insteadOf: "Fast cutover with downtime risk",
      because: "Preserving existing customer behavior and revenue continuity mattered more than speed"
    },
    learned: "Improving something that already works well requires a delicate touch. Growth needs to be approached with care to avoid breaking what made the business successful in the first place. Building new sales processes is especially difficult when customers already have established habits.",
    tags: ["Core Experience"],
    relevantFor: ["product", "growth", "operations"]
  },
  {
    id: "real-estate",
    title: "Real Estate (Lead Gen & Agency)",
    org: "Keller Williams Realty",
    role: "Real Estate Agent",
    dateStart: "March 2018",
    dateEnd: "April 2019",
    nodeType: "experiment",
    snapshot: "Hands-on exposure to high-ticket sales, lead generation, and deal execution in a highly competitive San Diego real estate market.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Managed a Google Business Profile for a personal real estate brand.",
          "Built a YouTube channel focused on first-time homebuyer education and property listing videos to generate inbound buyer leads.",
          "Designed Facebook ad creative and simple landing pages to support lead capture campaigns."
        ],
        skills: ["Positioning & Value Proposition", "User Flows & UX"],
        tools: ["Google Business Profile"]
      },
      growth: {
        items: [
          "Ran paid media campaigns across Google (search and display) and Facebook targeting first-time homebuyers and relocation segments.",
          "Executed hyper-local paid campaigns using geofenced targeting around listings and neighborhoods to drive open-house attendance.",
          "Executed outbound prospecting and cold outreach to build an early-stage pipeline.",
          "Assisted with open houses and community-based relationship building to support local presence and referrals."
        ],
        skills: ["Product-Channel Fit", "Paid Search", "Paid Social"],
        tools: ["Google Ads", "Facebook Ads"]
      },
      ops: {
        items: [
          "Worked alongside a top-producing agent (100+ transactions per year) to observe high-volume lead conversion systems in practice.",
          "Managed transaction coordination and CRM workflows, including follow-ups, scheduling, and documentation.",
          "Coordinated with lenders, inspectors, and title companies to move deals through escrow.",
          "Participated in team meetings and training to understand market strategy, pricing dynamics, and operational best practices.",
          "Developed and maintained listing presentations, buyer consultation materials, and comparative market analyses."
        ],
        skills: ["Operating Systems", "Customer Experience", "Cross-Functional Execution"],
        tools: ["CRM"]
      }
    },
    tradeoff: {
      chose: "Team-based sales system with experienced mentorship",
      insteadOf: "Solo agent model with full commission splits",
      because: "Steeper learning curve and faster exposure to high-volume systems worth lower short-term commission"
    },
    learned: "In high-ticket sales, leads are hard to earn and harder to keep. Credibility, trust, and relationships matter as much as effort. Working in Southern California real estate showed how competitive markets reward consistency and long-term brand building.",
    tags: ["Experiment"],
    relevantFor: ["growth"]
  },
  {
    id: "pct-thru-hike",
    title: "Pacific Crest Trail",
    org: "Mexico → Canada",
    role: "2,650 miles",
    dateStart: "April 2015",
    dateEnd: "Oct 2015",
    nodeType: "life",
    snapshot: "Completed a six-month thru-hike of the Pacific Crest Trail from Mexico to Canada, covering 2,650 miles. Stepped away from routine to gain perspective, spend extended time outdoors, and experience the world at a different pace.",
    bullets: [],
    skills: [],
    sections: {
      ops: {
        items: [
          "Planned and completed a six-month, self-supported thru-hike across desert, mountain, and alpine terrain.",
          "Managed daily logistics including resupply planning, routing decisions, risk mitigation, recovery, and pacing.",
          "Made ongoing decisions with incomplete information, adapting plans around weather, wildfires, injury, and changing terrain.",
          "Adjusted expectations, rerouted when necessary, and continued forward when original plans were no longer viable."
        ],
        skills: ["Risk Management"]
      }
    },
    tradeoff: {
      chose: "Six months off-grid during career transition",
      insteadOf: "Immediate job search after previous role",
      because: "Needed to reset and prove I could finish hard things"
    },
    learned: "As humans, we're capable of far more than we often give ourselves credit for. Consistency matters more than intensity, and sometimes luck matters most. The hike would have been far harder—maybe impossible—without the help of strangers. This experience permanently reshaped how I think about people, resilience, and my place in this beautiful, strange world.",
    tags: ["Personal"],
    relevantFor: []
  },
  {
    id: "early-seo-roots",
    title: "Early Growth Marketing",
    org: "Self-Employed",
    role: "Affiliate, Services",
    dateStart: "Jan 2014",
    dateEnd: "Feb 2018",
    nodeType: "primary",
    snapshot: "Early hands-on period of 'learning by doing' across a range projects to understand the fundamentals of building a business with the internet. This phase sparked a real fascination with marketing as a system—where attention is captured, converted, and optimized—and established many of the core principles that still guide my work today.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Built and iterated on small content and affiliate sites using WordPress to test product-focused SEO models.",
          "Tested product-focused SEO through comparison pages, informational content, and niche sites.",
          "Learned how site structure, content quality, and intent alignment affect rankings, engagement, and conversion.",
          "Designed and launched Fitness With Ethan, an independent fitness and coaching business following a personal 100-pound weight loss.",
          "Created coaching programs centered on sustainable habits, realistic expectations, and long-term behavior change.",
          "Offered multiple coaching tiers, including email-based support and live video coaching.",
          "Developed educational resources such as weight-loss guides, recipes, onboarding frameworks, and a self-written ebook.",
          "Built a content library designed to counter misinformation while meeting users at points of search intent."
        ],
        skills: ["Service & Offering Design", "Pricing & Packaging", "User Flows & UX", "Build & Delivery"],
        tools: ["ClickFunnels", "WordPress"]
      },
      growth: {
        items: [
          "Learned keyword research, on-page SEO, and early link-building through hands-on experimentation.",
          "Ran small affiliate experiments using Amazon and other referral programs to understand traffic-to-revenue mechanics.",
          "Provided early local SEO services to small businesses during the rise of the Google Map Pack, including real estate-adjacent niches.",
          "Experienced firsthand the volatility of organic traffic and platform dependency across SEO and affiliate models.",
          "Built a YouTube channel targeting long-tail, high-intent fitness and weight-loss queries to capture organic traffic.",
          "Produced contrarian content reframing misleading weight-loss claims to build trust and differentiate positioning.",
          "Ran Facebook and YouTube ads driving users into a community-first funnel.",
          "Built and grew a Facebook community to ~4,500 members as the primary engagement and trust layer.",
          "Grew an email list to ~2,000 subscribers using lead magnets and educational content.",
          "Ran webinar and VSL funnels inspired by direct-response frameworks to convert engaged users into coaching.",
          "Experienced firsthand the volatility of organic traffic and platform dependency across affiliate and content models."
        ],
        skills: ["Market & Keyword Research", "SEO Strategy & Architecture", "Content Strategy & Production", "Local SEO", "Product-Channel Fit", "Paid Social", "Community Building", "Narrative & Messaging"],
        tools: ["Ahrefs", "YouTube", "Google Search Console", "Facebook Ads", "YouTube Ads", "Facebook Groups"]
      },
      ops: {
        items: [
          "Operated independently with minimal budget, optimizing for learning velocity over scale.",
          "Designed end-to-end funnel architecture from content → community → education → coaching.",
          "Implemented automated Messenger and email flows to deliver structured content and guide users toward coaching evaluation.",
          "Managed client onboarding, billing, scheduling, and ongoing communication.",
          "Handled churn, retention challenges, and expectation-setting in a high-attrition industry.",
          "Operated independently with minimal budget, optimizing for learning velocity over scale.",
          "Developed a bias toward building systems rather than trading time for money."
        ],
        skills: ["Operating Systems", "Customer Experience", "Billing & Disputes", "Risk Management"],
        tools: ["Google Docs", "ManyChat", "MailerLite", "PayPal"]
      }
    },
    tradeoff: {
      chose: "SEO-driven organic demand",
      insteadOf: "Direct paid advertising models",
      because: "Limited capital required building compounding traffic assets rather than buying demand"
    },
    learned: "Organic results are hard to rely on because platforms change. Paid growth introduced the idea that there are levers you can pull and variables you can manage. That was a major shift in how I think about building businesses.",
    tags: ["Core Experience"],
    relevantFor: ["growth"]
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
