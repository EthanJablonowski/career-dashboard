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
    description: "Driving what gets built, how it works, and why it delivers value.",
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
            tools: ["Google Business Profile"]
          },
          "pricing-packaging": {
            name: "Pricing & Packaging",
            description: "Structuring how offerings are priced, bundled, and presented to align with value and demand.",
            tools: ["PayPal"]
          }
        }
      },
      "system-design": {
        name: "System Design",
        description: "Structuring infrastructure, incentives, and workflows that scale.",
        skills: {
          "economic-incentive-design": {
            name: "Economics & Incentives",
            description: "Designing economic systems, incentive structures, and token models that align user behavior with business goals.",
            tools: ["Ethereum Network", "Base Network", "Solidity", "Dune"]
          },
          "workflow-automation-design": {
            name: "Workflows & Automations",
            description: "Establishing pipelines and automated systems to improve operational efficiency and reduce manual work.",
            tools: ["Zapier", "ManyChat", "MailerLite"]
          },
          "platform-infrastructure": {
            name: "Platform & Infrastructure",
            description: "Choosing platforms, rails, and infrastructure that shape performance, cost, and UX.",
            tools: ["WordPress", "Node/Next.js", "Webflow", "Shopify", "SimplePractice", "DrChrono", "React Native", "Ethereum Network", "Base Network", "Solidity"]
          },
          "user-flows-ux": {
            name: "User Flows & UX",
            description: "Designing intuitive user experiences, flows, and interfaces that guide users through product interactions.",
            tools: ["Figma", "Canva"]
          }
        }
      },
      "product-execution": {
        name: "Product Execution",
        description: "Turning ideas into shipped, usable systems.",
        skills: {
          "requirements-product-specs": {
            name: "Requirements & Specs",
            description: "Translating product requirements and features into clear, actionable specifications for development.",
            tools: ["Google Docs", "Claude Code"]
          },
          "project-management": {
            name: "Project Management",
            description: "Coordinating timelines, resources, and dependencies to ship products on schedule.",
            tools: ["Asana"]
          },
          "development": {
            name: "Build & Delivery",
            description: "Shipping websites, internal tools, and lightweight apps, often using AI-assisted development to move faster.",
            tools: ["WordPress", "Webflow", "Shopify", "Node/Next.js", "Solidity", "Canva", "ClickFunnels"]
          }
        }
      },
      "ai-supported-product": {
        name: "AI-Supported Product Development",
        description: "Using AI to speed up analysis, iteration, and build quality across product work.",
        skills: {
          "ai-supported-product-development": {
            name: "AI-Supported Product Development",
            description: "Using AI to speed up analysis, iteration, and build quality across product work.",
            tools: ["Claude Code"]
          }
        }
      }
    }
  },
  growth: {
    name: "Growth",
    description: "Creating, capturing, and converting demand through systems, channels, and narrative.",
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
            tools: ["Ahrefs", "Google Search Console"]
          },
          "content-strategy-production-systems": {
            name: "Content Strategy & Production",
            description: "Creating scalable systems for content planning, production, distribution, and optimization.",
            tools: ["WordPress", "CMS", "YouTube", "Claude Code"]
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
            description: "Running search advertising campaigns to capture high-intent demand.",
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
            tools: ["Google Analytics", "Google Ads", "Meta Ads", "Game Analytics"]
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
        description: "Building trust, identity, and loyalty around products and brands.",
        skills: {
          "community-building": {
            name: "Community Building",
            description: "Creating and nurturing engaged communities around products, brands, or shared interests.",
            tools: ["Discord", "Telegram", "Facebook Groups", "Instagram", "Facebook"]
          },
          "narrative-messaging": {
            name: "Narrative & Messaging",
            description: "Crafting compelling stories and messaging that resonate with audiences and shape perception.",
            tools: ["X (Twitter)", "YouTube", "TikTok", "Instagram", "Facebook"]
          }
        }
      },
      "partnerships-bd": {
        name: "Partnerships & Business Development",
        description: "Building strategic relationships that create leverage and unlock new opportunities.",
        skills: {
          "strategic-partnerships": {
            name: "Strategic Partnerships",
            description: "Identifying and building mutually beneficial relationships that create strategic value.",
            tools: ["Xsolla"]
          },
          "deal-structuring-management": {
            name: "Deal Structuring & Management",
            description: "Crafting, negotiating, and managing partnership agreements and commercial relationships.",
            tools: ["Xsolla"]
          }
        }
      },
      "ai-supported-growth": {
        name: "AI-Supported Growth",
        description: "Using AI to accelerate research, content production, and optimization across efforts.",
        skills: {
          "ai-supported-growth": {
            name: "AI-Supported Growth",
            description: "Using AI to accelerate research, content production, and optimization across efforts.",
            tools: ["Claude Code"]
          }
        }
      }
    }
  },
  ops: {
    name: "Ops & Strategy",
    description: "Driving execution across teams, systems, and constraints.",
    skillGroups: {
      "business-operations": {
        name: "Business Operations",
        description: "Designing and running the day-to-day systems that keep businesses functioning.",
        skills: {
          "operating-systems": {
            name: "Operating Systems",
            description: "Building internal processes, workflows, and systems that enable consistent execution.",
            tools: ["Google Workspace", "Asana", "Shopify", "CRM", "Google Voice", "Google Docs"]
          },
          "capacity-scheduling": {
            name: "Capacity & Scheduling",
            description: "Managing resource allocation, scheduling, and operational capacity constraints.",
            tools: ["Google Voice", "SimplePractice"]
          },
          "customer-experience": {
            name: "Customer Experience",
            description: "Designing and managing customer touchpoints, support, and satisfaction systems.",
            tools: []
          }
        }
      },
      "financial-operations": {
        name: "Financial Operations",
        description: "Managing unit economics, cash flow, and financial sustainability.",
        skills: {
          "unit-economics-pricing-models": {
            name: "Unit Economics & Pricing",
            description: "Modeling profitability per customer, transaction, or unit to guide pricing and growth decisions.",
            tools: ["Google Sheets", "Airtable", "PayPal"]
          },
          "cash-flow-reporting": {
            name: "Cash Flow & Reporting",
            description: "Tracking revenue, expenses, and financial health to support decision-making and ensure accurate reports.",
            tools: ["QuickBooks", "Airtable", "Xsolla", "Etherscan", "Basescan"]
          },
          "billing-disputes": {
            name: "Billing & Disputes",
            description: "Managing payment invoicing, processing, and customer billing issues.",
            tools: ["PayPal", "Xsolla", "Ethereum", "Base"]
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
            tools: ["SimplePractice", "DrChrono"]
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
            description: "Coordinating across product, engineering, marketing, and operations to drive results.",
            tools: []
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
        description: "Using AI to reduce overhead through automation, documentation, and decision support.",
        skills: {
          "ai-supported-operations": {
            name: "AI-Supported Operations",
            description: "Using AI to reduce overhead through automation, documentation, and decision support.",
            tools: ["Claude Code"]
          }
        }
      }
    }
  }
};
