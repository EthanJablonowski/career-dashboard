export interface Skill {
  name: string;
  description: string;
  tools: string[];
}

export interface SkillGroup {
  name: string;
  description: string;
  skills: Record<string, Skill>;
}

export interface Branch {
  name: string;
  description: string;
  skillGroups: Record<string, SkillGroup>;
}

export const skillGraph: Record<string, Branch> = {
  product: {
    name: "Product",
    description: "Designing what gets built, how it works, and why it delivers value.",
    skillGroups: {
      "product-strategy": {
        name: "Product Strategy",
        description: "Deciding what to build, who it's for, and how it sustains itself.",
        skills: {
          "service-offering-design": {
            name: "Service & Offering Design",
            description: "Defining the core offering, scope, and structure of what gets delivered to users or customers.",
            tools: []
          },
          "positioning-value-proposition": {
            name: "Positioning & Value Proposition",
            description: "Articulating who the product is for, what problem it solves, and why it matters.",
            tools: []
          },
          "pricing-packaging": {
            name: "Pricing & Packaging",
            description: "Structuring how offerings are priced, bundled, and presented to align with value and demand.",
            tools: []
          }
        }
      },
      "system-design": {
        name: "System Design",
        description: "Designing incentives, workflows, and infrastructure that scale.",
        skills: {
          "economic-incentive-design": {
            name: "Economic & Incentive Design",
            description: "Designing economic systems, token models, and incentive structures that align user behavior with business goals.",
            tools: ["Ethereum Network", "Base Network", "Solidity", "Dune"]
          },
          "workflow-automation-design": {
            name: "Workflow & Automation Design",
            description: "Building automated systems and workflows to reduce manual work and improve operational efficiency.",
            tools: ["Zapier", "Supabase", "Stripe", "HubSpot"]
          },
          "platform-infrastructure": {
            name: "Platform & Infrastructure",
            description: "Choosing platforms, rails, and infrastructure that shape performance, cost, and UX.",
            tools: ["Node/Next.js", "Supabase", "Stripe", "Webflow", "Shopify", "SimplePractice (EHR)", "DrChrono"]
          },
          "ai-supported-product-development": {
            name: "AI-Supported Product Development",
            description: "Using AI to speed up analysis, iteration, and build quality across product work.",
            tools: ["Claude Code"]
          }
        }
      },
      "product-execution": {
        name: "Product Execution",
        description: "Turning ideas into shipped, usable systems.",
        skills: {
          "user-flows-ux": {
            name: "User Flows & UX",
            description: "Designing intuitive user experiences, flows, and interfaces that guide users through product interactions.",
            tools: ["Figma", "Canva"]
          },
          "requirements-product-specs": {
            name: "Requirements & Product Specs",
            description: "Translating goals into clear, actionable specifications for development and execution.",
            tools: ["Asana", "Google Docs"]
          },
          "project-management": {
            name: "Project Management",
            description: "Coordinating timelines, resources, and dependencies to ship products on schedule.",
            tools: ["Asana"]
          },
          "development": {
            name: "Development",
            description: "Shipping websites, internal tools, and lightweight apps, often using AI-assisted development to move faster.",
            tools: ["WordPress", "Webflow", "Webflow CMS", "Shopify", "Hygraph (CMS)", "React Native"]
          }
        }
      }
    }
  },
  growth: {
    name: "Growth",
    description: "Creating and capturing demand through systems, channels, and narrative.",
    skillGroups: {
      "demand-discovery": {
        name: "Demand Discovery",
        description: "Finding where attention, intent, and opportunity exist in the market.",
        skills: {
          "market-keyword-research": {
            name: "Market & Keyword Research",
            description: "Identifying high-value search terms, market segments, and demand signals to guide growth strategy.",
            tools: ["Ahrefs", "Google Keyword Planner", "Google Search Console"]
          },
          "product-channel-fit": {
            name: "Product-Channel Fit",
            description: "Matching products to the right acquisition channels based on audience behavior and channel economics.",
            tools: ["Google Analytics"]
          }
        }
      },
      "organic-growth": {
        name: "Organic Growth",
        description: "Building compounding traffic and attention through content and search.",
        skills: {
          "seo-strategy-architecture": {
            name: "SEO Strategy & Architecture",
            description: "Designing site structure, content strategy, and technical foundations to capture organic search traffic.",
            tools: ["Ahrefs", "Google Search Console", "WordPress", "Webflow CMS"]
          },
          "content-strategy-production-systems": {
            name: "Content Strategy & Production Systems",
            description: "Creating scalable systems for content production, distribution, and optimization.",
            tools: ["WordPress", "Webflow", "Hygraph (CMS)", "YouTube"]
          },
          "local-seo": {
            name: "Local SEO",
            description: "Optimizing for local search visibility and geographic-specific demand.",
            tools: ["Google Business Profile", "Google Search Console"]
          }
        }
      },
      "paid-growth": {
        name: "Paid Growth",
        description: "Acquiring attention and customers through paid media channels.",
        skills: {
          "paid-search": {
            name: "Paid Search",
            description: "Running search advertising campaigns to capture high-intent demand at scale.",
            tools: ["Google Ads", "Google Keyword Planner"]
          },
          "paid-social": {
            name: "Paid Social",
            description: "Designing and managing social media advertising campaigns to reach targeted audiences.",
            tools: ["Meta Ads", "Facebook Ads", "YouTube Ads"]
          },
          "performance-optimization": {
            name: "Performance Optimization",
            description: "Analyzing and improving campaign performance, conversion rates, and return on ad spend.",
            tools: ["Google Analytics", "Airtable"]
          },
          "influencer-kol-campaigns": {
            name: "Influencer & KOL Campaigns",
            description: "Partnering with influencers and key opinion leaders to amplify reach and credibility.",
            tools: ["X (Twitter)", "YouTube", "TikTok", "Discord", "Telegram"]
          }
        }
      },
      "community-brand": {
        name: "Community & Brand",
        description: "Building trust, identity, and belonging around products and missions.",
        skills: {
          "community-building": {
            name: "Community Building",
            description: "Creating and nurturing engaged communities around products, brands, or shared interests.",
            tools: ["Discord", "Telegram", "Facebook Groups"]
          },
          "narrative-messaging": {
            name: "Narrative & Messaging",
            description: "Crafting compelling stories and messaging that resonate with audiences and shape perception.",
            tools: ["YouTube", "X (Twitter)", "TikTok"]
          }
        }
      },
      "partnerships-bd": {
        name: "Partnerships & Business Development",
        description: "Building strategic relationships that create leverage and unlock new opportunities.",
        skills: {
          "strategic-partnerships": {
            name: "Strategic Partnerships",
            description: "Identifying and building mutually beneficial partnerships that create strategic value.",
            tools: []
          },
          "deal-structuring-management": {
            name: "Deal Structuring & Management",
            description: "Negotiating, structuring, and managing partnership agreements and commercial relationships.",
            tools: []
          }
        }
      },
      "ai-supported-growth": {
        name: "AI-Supported Growth",
        description: "Using AI to accelerate research, content production, and optimization across growth efforts.",
        skills: {
          "ai-supported-growth": {
            name: "AI-Supported Growth",
            description: "Using AI to accelerate research, content production, and optimization across growth efforts.",
            tools: ["Claude Code"]
          }
        }
      }
    }
  },
  ops: {
    name: "Ops & Strategy",
    description: "Making work durable through coordination, finance, risk, and execution.",
    skillGroups: {
      "business-operations": {
        name: "Business Operations",
        description: "Designing and running the day-to-day systems that keep businesses functioning.",
        skills: {
          "operating-systems": {
            name: "Operating Systems",
            description: "Building internal processes, workflows, and systems that enable consistent execution.",
            tools: ["Google Workspace"]
          },
          "capacity-scheduling": {
            name: "Capacity & Scheduling",
            description: "Managing resource allocation, scheduling, and operational capacity constraints.",
            tools: ["Google Voice", "SimplePractice (EHR)"]
          },
          "customer-experience": {
            name: "Customer Experience",
            description: "Designing and managing customer touchpoints, support, and satisfaction systems.",
            tools: ["HubSpot", "Google Voice"]
          }
        }
      },
      "financial-operations": {
        name: "Financial Operations",
        description: "Managing unit economics, cash flow, and financial sustainability.",
        skills: {
          "unit-economics-pricing-models": {
            name: "Unit Economics & Pricing Models",
            description: "Modeling profitability per customer, transaction, or unit to guide pricing and growth decisions.",
            tools: ["Airtable"]
          },
          "cash-flow-reporting": {
            name: "Cash Flow & Reporting",
            description: "Tracking revenue, expenses, and financial health to support decision-making and compliance.",
            tools: ["QuickBooks", "Airtable"]
          },
          "billing-disputes": {
            name: "Billing & Disputes",
            description: "Managing payment processing, invoicing, and customer billing issues.",
            tools: ["Stripe", "QuickBooks"]
          }
        }
      },
      "risk-compliance": {
        name: "Risk, Compliance & Constraints",
        description: "Navigating legal, regulatory, and operational risks.",
        skills: {
          "legal-contract-coordination": {
            name: "Legal & Contract Coordination",
            description: "Managing contracts, terms of service, and legal coordination with counsel and partners.",
            tools: []
          },
          "regulatory-platform-compliance": {
            name: "Regulatory & Platform Compliance",
            description: "Ensuring compliance with industry regulations, platform policies, and legal requirements.",
            tools: ["SimplePractice (EHR)", "DrChrono"]
          },
          "risk-management": {
            name: "Risk Management",
            description: "Identifying, assessing, and mitigating operational, financial, and strategic risks.",
            tools: []
          }
        }
      },
      "leadership-coordination": {
        name: "Leadership & Coordination",
        description: "Aligning teams, stakeholders, and execution across complex environments.",
        skills: {
          "cross-functional-execution": {
            name: "Cross-Functional Execution",
            description: "Coordinating across product, engineering, marketing, and operations to ship results.",
            tools: ["Asana"]
          },
          "stakeholder-communication": {
            name: "Stakeholder Communication",
            description: "Managing communication with investors, partners, customers, and internal stakeholders.",
            tools: ["Google Workspace"]
          }
        }
      },
      "ai-supported-ops": {
        name: "AI-Supported Operations",
        description: "Using AI to reduce operational overhead through planning support, automation, and documentation.",
        skills: {
          "ai-supported-operations": {
            name: "AI-Supported Operations",
            description: "Using AI to reduce operational overhead through planning support, automation, and documentation.",
            tools: ["Claude Code"]
          }
        }
      }
    }
  }
};
