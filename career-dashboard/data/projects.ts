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
    title: "WisconsinHomeServiceGuide.com",
    org: "Self-Employed",
    role: "Founder",
    dateStart: "Jan 2026",
    dateEnd: "Present",
    nodeType: "experiment",
    snapshot: "Building a network of localized lead-gen sites for home services, alongside a sales engine to track, route, and sell leads.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Building AI-assisted lead-gen sites at scale (written + visual content engine)",
          "Building lead tracking + sales dashboard (capture → qualify → route → invoice)"
        ],
        skills: ["Service & Offering Design", "Pricing & Packaging", "Workflows & Automations", "Platform & Infrastructure", "AI-Supported Product Development", "User Flows & UX", "Requirements & Specs", "Build & Delivery"],
        tools: ["WordPress", "Node/Next.js", "Supabase", "Stripe", "Zapier", "Figma", "Claude Code"]
      },
      growth: {
        items: [
          "Finding \"cheap attention\" via keyword + SERP + CPL analysis (core + auxiliary pages)",
          "Executing SEO + LLM optimization (programmatic content, llms.txt, forum/community seeding)"
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "SEO Strategy & Architecture", "Content Strategy & Production", "Local SEO", "AI-Supported Growth"],
        tools: ["Ahrefs", "Google Keyword Planner", "Search Console"]
      },
      ops: {
        items: [
          "Building buyer pipeline (outreach → CRM follow-up → close) + lead delivery workflow",
          "Defining operating rules: onboarding, pricing, billing, disputes, refunds, quality control"
        ],
        skills: ["Operating Systems", "Customer Experience", "Unit Economics & Pricing", "Billing & Disputes", "Cross-Functional Execution", "AI-Supported Operations"],
        tools: ["HubSpot"]
      }
    },
    tradeoff: {
      chose: "Local service verticals over tech/SaaS",
      insteadOf: "High-margin digital products",
      because: "Wanted to test fundamentals of demand generation without product complexity"
    },
    learned: "I am reminded yet again of the opportunity that SEO presents for building real value to everyday, 'boring' businesses.",
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
    snapshot: "A hands-on local services experiment to test lead generation economics, conversion, and on-the-ground operations in home services.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Built a simple, conversion-focused landing page (\"digital flyer\") to route traffic",
          "Designed brand around solo-operator trust, low overhead, fast quotes, and a personal service guarantee."
        ],
        skills: ["Service & Offering Design", "Positioning & Value Proposition", "Pricing & Packaging", "User Flows & UX", "Build & Delivery"],
        tools: ["Canva"]
      },
      growth: {
        items: [
          "Researched local and auxiliary keywords (e.g. fall cleanup, leaf cleanup)",
          "Ranked ~5th organically for \"fall cleanup Chattanooga\"",
          "Optimized Google Business Profile, built extensive local citations",
          "Ran Google Ads to test paid demand and CAC",
          "~$3.80 CPC → ~11% call rate → ~40% close → ~$85 CAC / ~$400 AOV"
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "Local SEO", "Paid Search", "Performance Optimization"],
        tools: ["Google Ads", "Google Keyword Planner", "Google Search Console", "Google Business Profile"]
      },
      ops: {
        items: [
          "Handled quoting, scheduling, and on-site service delivery",
          "Closed sales face-to-face and managed customer expectations directly",
          "Learned basic home services workflows and property maintenance realities"
        ],
        skills: ["Operating Systems", "Capacity & Scheduling", "Customer Experience", "Unit Economics & Pricing"],
        tools: ["Google Voice"]
      }
    },
    tradeoff: {
      chose: "Speed over perfection in market validation",
      insteadOf: "Extended planning and market research",
      because: "Real customer conversations worth more than hypothetical modeling"
    },
    learned: "Lead quality and lead management systems matter as much as lead volume. Auxiliary/local-intent keywords are still low-hanging fruit in 2025 for niche service businesses. Simple, trust-based branding converts well for solo operators. Printed signs were not effective for lead gen even with strong placement / impressions. Paid acquisition can work quickly, but ops capacity becomes the bottleneck fast.",
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
    snapshot: "Co-founding a pediatric therapy business in support of my wife chasing her dreams. Applying everything I've learned about product, growth, and operations to build the brand, service model, and foundations of a modern OT practice from zero.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Defined service model, positioning, and offerings for a cash-pay pediatric OT practice",
          "Built brand identity, messaging, and digital presence from scratch",
          "Designed hybrid mobile + hosted care model to support premium pricing and broader geographic reach",
          "Developed unit-economics-driven service structure, including session pricing and delivery model",
          "Created scalable foundation for future therapists, locations, and service expansion"
        ],
        skills: ["Service & Offering Design", "Positioning & Value Proposition", "Pricing & Packaging", "Workflows & Automations", "Platform & Infrastructure", "AI-Supported Product Development", "User Flows & UX", "Requirements & Specs", "Build & Delivery"],
        tools: ["Webflow", "Claude Code", "Figma", "SimplePractice (EHR)"]
      },
      growth: {
        items: [
          "Designed SEO-first site architecture (goals, services, locations) to capture high-intent local demand",
          "Conducted keyword and market research to validate demand, pricing power, and geography strategy",
          "Built content strategy aligned to parent decision-making and long-tail search behavior",
          "Positioned brand as a modern alternative to inefficient, insurance-driven therapy systems",
          "Developed dual-sided messaging: families seeking better care and therapists seeking better careers"
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "SEO Strategy & Architecture", "Content Strategy & Production", "Local SEO", "Narrative & Messaging", "AI-Supported Growth"],
        tools: ["Google Search Console", "Google Keyword Planner", "Ahrefs", "Webflow CMS"]
      },
      ops: {
        items: [
          "Established core business foundations: entity structure, insurance, permitting, and compliance research",
          "Implemented SimplePractice to support scheduling, documentation, and payments",
          "Designed internal operating workflows and project tracking for early-stage execution",
          "Modeled unit economics and long-term viability of mobile + sensory gym approach",
          "Evaluated non-traditional infrastructure (converted school bus) to avoid commercial leases and improve margins",
          "Built systems with optionality to scale if demand and clinical interest support it"
        ],
        skills: ["Operating Systems", "Customer Experience", "Unit Economics & Pricing", "Cash Flow & Reporting", "Legal & Contract Coordination", "Regulatory & Platform Compliance", "AI-Supported Operations"],
        tools: ["Asana", "SimplePractice", "Google Workspace"]
      }
    },
    tradeoff: {
      chose: "Cash-pay model outside insurance system",
      insteadOf: "Traditional insurance billing path",
      because: "Faster iteration, authentic service delivery, no administrative bloat"
    },
    learned: "A strong service business is a product. When delivery, pricing, operations, and brand reinforce each other, you can escape broken industry norms and build something meaningfully better for customers and operators alike.",
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
    snapshot: "Scaled a live, player-owned game economy and decentralized marketplace with real financial assets traded on-chain. Led economic decisions and public communication as the ecosystem grew to $100M+ in trade volume across 110k+ transactions.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Directed live-service product using real-time player and trader behavior to set priorities, sequencing, and pacing",
          "Led marketplace UX and functionality improvements to support higher liquidity, faster trading, and sustained activity",
          "Co-led planning and migration of the economy infrastructure to Base (Coinbase Ethereum L2), materially reducing fees and latency while improving onboarding UX",
          "Owned day-to-day economic decisions and adjustments in a live, onchain environment",
          "Oversaw an ecosystem reaching $100M+ trade volume, 110k+ on-chain transactions, and ~$55M circulating market cap, with tens of thousands of assets held by hundreds of thousands of players",
          "Partnered closely with design, engineering, and CEO to translate market signals into evolving roadmap and shipped product updates"
        ],
        skills: ["Economics & Incentives", "Workflows & Automations", "Platform & Infrastructure", "AI-Supported Product Development", "User Flows & UX", "Requirements & Specs", "Project Management"],
        tools: ["Figma", "Asana", "Ethereum Network", "Base Network", "Solidity", "Dune", "Claude Code"]
      },
      growth: {
        items: [
          "Built and managed player and trader communities across Discord (12k+) and Telegram",
          "Designed incentive structures to drive engagement, referrals, and sustained participation",
          "Led industry partnerships with gaming guilds, trading groups, and crypto KOLs",
          "Negotiated partnership terms, managed contracts, and tracked deliverables",
          "Shaped and maintained the public narrative positioning the studio as a credible underdog worth rooting for",
          "Contributed to paid media strategy and performance analysis across Google Ads and Meta Ads",
          "Wrote and directed the majority of blogs, announcements, and social content"
        ],
        skills: ["Community Building", "Narrative & Messaging", "Influencer & KOL Campaigns", "Paid Search", "Paid Social", "Performance Optimization"],
        tools: ["Discord", "Telegram", "Google Ads", "Meta Ads", "X (Twitter)", "YouTube", "TikTok", "Hygraph (CMS)"]
      },
      ops: {
        items: [
          "Communications lead for the game economy and marketplace",
          "Delivered 20+ live stakeholder updates covering economic performance, roadmap changes, and market conditions",
          "Participated in dozens of AMAs, podcasts, panels, and public industry discussions",
          "Managed accounting across fiat and crypto revenue streams",
          "Built internal cash-flow tracking to support tax reporting and financial clarity for external professionals",
          "Coordinated cross-functional execution across product, engineering, community, and external partners"
        ],
        skills: ["Operating Systems", "Cash Flow & Reporting", "Billing & Disputes", "Risk Management", "Cross-Functional Execution", "Stakeholder Communication"],
        tools: ["QuickBooks"]
      }
    },
    tradeoff: {
      chose: "Unscripted public communication in live settings",
      insteadOf: "Scripted PR and controlled messaging",
      because: "Community valued authenticity over polish in Web3 context"
    },
    learned: "In live economies, trust compounds faster than features. Clear expectations and aligned incentives are required to scale. Treating feedback as a feature keeps you in control. Iteration beats perfection. The story you tell is often the only thing people truly understand about your brand, and everyone roots for an underdog.",
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
          "Designed the core game economy from first principles, informed by market research across blockchain gaming, virtual economies, and durable incentive systems",
          "Led securities analysis and legal coordination to structure a utility token with reasonable safeguards against securities classification",
          "Concepted a hybrid fiat + crypto system allowing players to participate together regardless of payment rail",
          "Designed the token as the backbone of the ecosystem; directed smart contract requirements including developer tax and economic controls",
          "Oversaw token deployment, initial liquidity event, and public launch",
          "Designed peer-to-peer marketplace mechanics and trading features; created initial wireframes and directed UI and development through launch",
          "Designed and shipped Konvert, a mint-and-burn onboarding mechanic that reduced crypto friction by letting players enter on-chain at their own pace",
          "Designed and oversaw Kollection, a gamified collecting and trading system with algorithmic scoring to incentivize participation, holding behavior, and trade volume",
          "Balanced multiple user incentive profiles into a cohesive economic feedback loop",
          "Built and operated a motion capture pipeline, recording hundreds of custom basketball animations with a contracted professional athlete"
        ],
        skills: ["Economics & Incentives", "Workflows & Automations", "Platform & Infrastructure", "AI-Supported Product Development", "User Flows & UX", "Requirements & Specs", "Project Management"],
        tools: ["Ethereum Network", "Base Network", "Solidity", "Figma", "Asana", "Claude Code"]
      },
      growth: {
        items: [
          "Published regular development updates during the build phase to keep the community informed and engaged",
          "Leveraged early economy features to crowdsource QA testing, creating structured feedback loops for bug reporting and iteration",
          "Shaped early asset releases with clear narratives to establish value signals and guide collector behavior",
          "Framed development as transparent, early-access collaboration to set expectations and build trust before launch"
        ],
        skills: ["Community Building", "Narrative & Messaging"]
      },
      ops: {
        items: [
          "Acted as early liaison with legal counsel to establish compliant crypto policies and scalable business foundations",
          "Coordinated drafting and rollout of Terms of Service and Privacy Policy with legal partners",
          "Worked closely with Xsolla counsel to ensure compliant language and operations across fiat payment rails",
          "Led business development and ongoing partnership management with Xsolla; primary contact for issue resolution and new product integrations",
          "Interpreted licensing and royalty requirements for Unreal Engine and MetaHuman; implemented revenue tracking and quarterly reporting to Epic Games",
          "Authored internal policies for dispute resolution and risk management",
          "Wrote public-facing player code of conduct to support community health and long-term sustainability"
        ],
        skills: ["Operating Systems", "Legal & Contract Coordination", "Regulatory & Platform Compliance", "Risk Management", "Strategic Partnerships", "Deal Structuring & Management", "Cash Flow & Reporting"]
      }
    },
    tradeoff: {
      chose: "Player-owned economy with no central marketplace fees",
      insteadOf: "Traditional take-rate model (5-15% per transaction)",
      because: "Aligned with decentralization values; created trust and adoption"
    },
    learned: "Simple systems are more durable than clever ones. When financial incentives are involved, every edge case matters. Creativity and less-than-sustainable mechanics will win short-term attention, but restraint in design and messaging are what allow an ecosystem to grow without breaking under stress.",
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
    snapshot: "Built and managed a content-driven paid acquisition and arbitrage system targeting healthcare verticals, leveraging attention pricing inefficiencies across platforms at scale.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [],
        skills: ["Build & Delivery"]
      },
      growth: {
        items: [
          "Co-built and scaled a hybrid SEO and paid social arbitrage system",
          "Directed build of SevenBars.com and wrote 60+ long-form SEO articles targeting high-CPC healthcare keywords (diabetes, dental implants, COPD)",
          "Designed and tested Facebook native ads driving traffic to content monetized via Google AdSense",
          "Rapidly tested creatives, audiences, and content formats, scaling only campaigns achieving 3x+ return",
          "Analyzed Facebook Ad Library and competitor positioning to inform creative and messaging strategy"
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "SEO Strategy & Architecture", "Content Strategy & Production", "Paid Search", "Paid Social", "Performance Optimization"],
        tools: ["Meta Ads", "Google Ads", "Ahrefs", "Google Keyword Planner"]
      },
      ops: {
        items: [
          "Tracked spend, revenue, and unit economics in Airtable to guide scaling and budget allocation",
          "Partnered closely with a teammate to coordinate content iteration, financial reporting, and optimization decisions",
          "Managed systems that scaled to six figures in monthly ad spend during peak performance periods",
          "Supported cash-flow planning and stakeholder communications to manage working capital constraints during scaling"
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
    learned: "Attention is a market. Pricing fluctuates by audience, timing, platform, and even content quality. The difference between success and failure in ads comes down to how quickly you recognize and act on opportunities to leverage attention.",
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
    snapshot: "Oversaw design and early development of a mobile application for an LA-based medical spa (Rejuve) to support on-demand, in-home treatments. Worked closely with stakeholders and developers to design a compliant, intuitive user experience.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Defined service offerings, pricing structures, and end-to-end user flows for a mobile, on-demand healthcare model",
          "Designed a two-sided mobile experience for customers and providers, including booking, service management, payments, and patient records",
          "Translated clinical, operational, and business requirements into clear product specifications for development teams",
          "Interviewed and selected outsourced development partners, owning product scope, feature requirements, and budget oversight",
          "Led early planning for EHR integration with DrChrono, including feasibility research and initial implementation work"
        ],
        skills: ["Service & Offering Design", "Pricing & Packaging", "User Flows & UX", "Requirements & Specs", "Platform & Infrastructure", "Project Management"],
        tools: ["Figma", "React Native", "DrChrono", "Asana"]
      },
      ops: {
        items: [
          "Worked directly with licensed medical providers to ensure compliant, accurate service language and workflows",
          "Coordinated with IV therapy suppliers to plan procurement strategy and operational efficiency",
          "Acted as day-to-day product liaison to the founder, providing regular updates and decision support across moving pieces"
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
    learned: "In software, individual design decisions can change feasibility by orders of magnitude. When development is outsourced, clear expectations early matter more than speed. Sometimes external forces override good planning, and you adapt.",
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
    snapshot: "Led growth marketing for an established interior design ecommerce brand, expanding into new demographics and modernizing UX for seniors while migrating to more modern digital infrastructure.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Led migration of legacy ecommerce system to Shopify to support modern checkout, attribution, and integrations",
          "Rebuilt website UX to improve online ordering for both younger digital-native buyers and older, less technical customers",
          "Implemented abandoned cart flows, email follow-ups, and on-site UX improvements including persistent cart and product recommendations",
          "Partnered with founder to restructure site hierarchy, navigation, and product presentation for clarity and conversion",
          "Oversaw complex data migration from legacy order management system, including manual cleanup and consolidation"
        ],
        skills: ["Platform & Infrastructure", "User Flows & UX", "Workflows & Automations", "Project Management", "Build & Delivery"],
        tools: ["Shopify", "MailerLite", "Google Analytics"]
      },
      growth: {
        items: [
          "Launched and managed the brand's first paid acquisition efforts on Meta",
          "Developed acquisition strategy leveraging high-quality in-house creative assets",
          "Built early social strategy encouraging customer-generated content through incentives and hashtag campaigns",
          "Tested positioning and messaging to broaden appeal beyond an aging, phone-first customer base",
          "Monitored CAC, funnel performance, and conversion behavior to guide iteration"
        ],
        skills: ["Product-Channel Fit", "Paid Search", "Paid Social", "Performance Optimization", "Community Building", "Narrative & Messaging"],
        tools: ["Meta Ads", "Google Analytics", "Instagram", "Facebook"]
      },
      ops: {
        items: [
          "Worked closely with founder to modernize ecommerce operations without disrupting existing revenue",
          "Gained hands-on exposure to order fulfillment, shipping logistics, and seasonal retail volume during holiday rush",
          "Helped align marketing initiatives with inventory, fulfillment, and customer service realities",
          "Balanced experimentation with operational constraints of a legacy business"
        ],
        skills: ["Operating Systems", "Capacity & Scheduling", "Unit Economics & Pricing"],
        tools: ["Shopify"]
      }
    },
    tradeoff: {
      chose: "Gradual platform migration with parallel systems",
      insteadOf: "Fast cutover with downtime risk",
      because: "Preserving existing customer behavior and revenue continuity mattered more than speed"
    },
    learned: "Improving something that already works well requires a different calculus. Growth needs to be approached with foresight to avoid breaking what made it successful in the first place. Building new conversion pathways is especially challenging when customers already have established routines.",
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
    snapshot: "Hands-on exposure to high-ticket sales and lead generation in a competitive San Diego real estate market.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Built and managed Google Business Profile for personal agency brand",
          "Built Youtube Channel around first-time homebuyer content and property listing videos to generate new buyer leads",
          "Designed Facebook ad creative and landing pages for lead capture campaigns"
        ],
        skills: ["Positioning & Value Proposition", "User Flows & UX"],
        tools: ["Google Business Profile", "YouTube", "Facebook"]
      },
      growth: {
        items: [
          "Ran paid media campaigns on Google (search + display) and Facebook targeting first-time homebuyers and relocation segments",
          "Executed outbound prospecting and cold outreach to build pipeline",
          "Assisted with open houses and community-based relationship building"
        ],
        skills: ["Product-Channel Fit", "Paid Search", "Paid Social", "Community Building"],
        tools: ["Google Business Profile", "YouTube Ads", "Facebook Ads"]
      },
      ops: {
        items: [
          "Worked with a top producer in the area (100+ transactions/year) to observe high-volume lead conversion systems",
          "Managed transaction coordination and CRM workflows (follow-ups, scheduling, documentation)",
          "Coordinated with lenders, inspectors, and title companies to move deals through escrow",
          "Attended team meetings and training to understand broader market strategy and operational best practices",
          "Developed and maintained listing presentations, buyer consultation materials, and comps analysis"
        ],
        skills: ["Operating Systems", "Customer Experience", "Cross-Functional Execution"]
      }
    },
    tradeoff: {
      chose: "Team-based sales system with experienced mentorship",
      insteadOf: "Solo agent model with full commission splits",
      because: "Steeper learning curve and faster exposure to high-volume systems worth lower short-term commission"
    },
    learned: "In high-ticket sales, lead volume alone is not enough. Credibility and relationships drive outcomes as much as demand generation. Southern California real estate offered firsthand exposure to a highly competitive market.",
    tags: ["Experiment"],
    relevantFor: ["growth"]
  },
  {
    id: "fitness-with-ethan",
    title: "Fitness With Ethan",
    org: "Fitness With Ethan",
    role: "Founder",
    dateStart: "June 2017",
    dateEnd: "Feb 2018",
    nodeType: "primary",
    snapshot: "Built an independent fitness and coaching business after a personal 100-pound weight loss, focused on sustainable habits and realistic expectations.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Designed coaching programs centered on sustainable weight loss through balanced nutrition and realistic exercise",
          "Offered multiple coaching tiers, including email-based check-ins and live video coaching",
          "Created educational resources including weight loss guides, recipes, and getting-started frameworks",
          "Built a content library designed to counter misinformation while meeting users at their point of search intent"
        ],
        skills: ["Service & Offering Design", "Pricing & Packaging", "User Flows & UX", "Build & Delivery"],
        tools: ["YouTube", "Facebook Groups", "ManyChat", "MailerLite", "Google Docs"]
      },
      growth: {
        items: [
          "Built a YouTube channel targeting long-tail, high-intent keywords to capture organic search traffic",
          "Produced contrarian content that addressed misleading weight loss claims by reframing expectations",
          "Ran Facebook and YouTube ads driving users into a community-first funnel",
          "Built and grew a Facebook community to ~4,500 members as the primary engagement and trust layer",
          "Grew an email list to ~2,000 subscribers through lead magnets, including a self-written weight loss ebook",
          "Ran webinar and VSL funnels inspired by direct-response frameworks to convert engaged users into coaching"
        ],
        skills: ["Market & Keyword Research", "Product-Channel Fit", "SEO Strategy & Architecture", "Content Strategy & Production", "Paid Social", "Community Building", "Narrative & Messaging"],
        tools: ["YouTube", "Facebook Ads", "YouTube Ads", "ManyChat", "MailerLite"]
      },
      ops: {
        items: [
          "Designed end-to-end funnel architecture from content → community → education → coaching",
          "Implemented automated Messenger flows to deliver structured content and guide users toward coaching evaluation",
          "Managed client onboarding, billing, scheduling, and ongoing communication",
          "Handled churn, retention challenges, and expectation-setting in a high-attrition industry",
          "Balanced scalability with personalized support in a service-heavy business model"
        ],
        skills: ["Operating Systems", "Customer Experience", "Billing & Disputes"]
      }
    },
    tradeoff: {
      chose: "Community-first trust-building before selling",
      insteadOf: "Direct paid traffic to coaching offers",
      because: "Needed credibility and trust in a market saturated with false promises"
    },
    learned: "Sustainable results are harder to sell than shortcuts, even when they work better. Education, trust, and expectation-setting matter as much as traffic and funnels, especially in industries where people are vulnerable and frustrated.",
    tags: ["Core Experience"],
    relevantFor: ["product", "growth", "operations"]
  },
  {
    id: "pct-thru-hike",
    title: "Pacific Crest Trail",
    org: "Personal",
    role: "Thru-hike",
    dateStart: "April 2015",
    dateEnd: "Oct 2015",
    nodeType: "life",
    snapshot: "Hiked the Pacific Crest Trail from Mexico to Canada, covering 2,650 miles over six months. Stepped away from routine to gain perspective, spend extended time outdoors, and experience the world at a different pace.",
    bullets: [],
    skills: [],
    sections: {
      ops: {
        items: [
          "Planned and completed a six-month, self-supported thru-hike across desert, mountain, and alpine terrain",
          "Managed daily logistics including resupply, route planning, risk mitigation, recovery, and pacing",
          "Made ongoing decisions with incomplete information, adapting plans around weather, wildfires, injury, and terrain",
          "Learned to compromise, reroute, and move forward when original plans were no longer viable"
        ],
        skills: ["Risk Management"]
      }
    },
    tradeoff: {
      chose: "Six months off-grid during career transition",
      insteadOf: "Immediate job search after previous role",
      because: "Needed to reset and prove I could finish hard things"
    },
    learned: "Humans are capable of more than they usually give themselves credit for. Consistency matters more than intensity. The experience also restored my faith in people. The hike would have been far harder, and maybe impossible, without the generosity of strangers along the way. Spending months meeting people from different backgrounds, hitchhiking into town, and sleeping under the stars reshaped how I see the world.",
    tags: ["Personal"],
    relevantFor: []
  },
  {
    id: "early-seo-roots",
    title: "Early SEO Roots (Affiliate)",
    org: "Self-Employed",
    role: "Affiliate Marketer",
    dateStart: "Jan 2014",
    dateEnd: "Feb 2018",
    nodeType: "primary",
    snapshot: "Early hands-on period learning SEO, affiliate marketing, and attention economics through self-directed experiments. Focused on understanding how traffic, content, and demand compound over time while pursuing location-independent income.",
    bullets: [],
    skills: [],
    sections: {
      product: {
        items: [
          "Built and iterated on small content and affiliate sites using WordPress",
          "Tested product-focused SEO through comparison pages, informational content, and niche sites",
          "Learned how site structure, content quality, and intent alignment affect rankings and conversions"
        ],
        skills: ["User Flows & UX", "Build & Delivery"],
        tools: ["WordPress"]
      },
      growth: {
        items: [
          "Learned keyword research, on-page SEO, and early link-building techniques through trial and error",
          "Ran small affiliate experiments using Amazon and other referral programs",
          "Provided early local SEO services to small businesses during the emergence of the Google Map Pack, including real estate niche",
          "Experienced firsthand the volatility of organic traffic and platform dependency"
        ],
        skills: ["Market & Keyword Research", "SEO Strategy & Architecture", "Content Strategy & Production", "Local SEO", "Product-Channel Fit"],
        tools: ["Google Search Console", "Ahrefs"]
      },
      ops: {
        items: [
          "Operated independently with minimal budget, optimizing for learning velocity over scale",
          "Balanced experimentation with living cheaply to extend runway",
          "Developed a bias toward building systems rather than trading time for money"
        ],
        skills: ["Risk Management"]
      }
    },
    tradeoff: {
      chose: "SEO-driven organic demand",
      insteadOf: "Direct paid advertising models",
      because: "Limited capital required building compounding traffic assets rather than buying demand"
    },
    learned: "Organic rankings felt like digital real estate on a new frontier. The promise of compounding, permissionless scale was intoxicating. I also learned how fragile \"passive\" income becomes when it relies on platforms and algorithms that constantly change. This period shaped how I think about incentives, risk, and building things that can withstand change.",
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
