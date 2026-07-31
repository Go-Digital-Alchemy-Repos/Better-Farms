export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  isoDate: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  featured?: boolean;
  introduction: string[];
  takeaways: string[];
  quote?: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "farm-projects-that-build-resilience",
    title: "Five Farm Projects That Build Resilience Before the Next Season",
    excerpt:
      "Practical infrastructure can help a farm handle weather, labor, and market pressure without changing what makes the operation unique.",
    category: "Farm Resilience",
    tags: ["Infrastructure", "Climate", "Farm Planning"],
    publishedAt: "July 24, 2026",
    isoDate: "2026-07-24",
    readTime: "6 min read",
    author: "Better Farms Editorial Team",
    image: "/sourcePhotos/blog/farm-resilience-water-infrastructure.jpg",
    imageAlt:
      "Farmer adjusting a water storage and irrigation system beside healthy crop rows",
    imageWidth: 1536,
    imageHeight: 1024,
    featured: true,
    introduction: [
      "Resilience is rarely one dramatic investment. More often, it is a series of practical improvements that give a farm more options when conditions change.",
      "The strongest projects solve a problem the farm is already experiencing, fit the operation's long-term plan, and create results that can be measured after installation.",
    ],
    takeaways: [
      "Start with the farm's most persistent operational constraint.",
      "Favor projects that reduce recurring risk or cost.",
      "Define success before construction begins.",
    ],
    quote:
      "A resilient project does more than survive one difficult season. It gives the farm more choices in every season that follows.",
    sections: [
      {
        heading: "1. Water systems that improve control",
        paragraphs: [
          "Water-smart infrastructure can range from drip irrigation and improved storage to better drainage and monitoring. The right choice depends on the crop, soil, weather patterns, and existing equipment.",
          "A useful project plan identifies what is being conserved, how the system will be maintained, and which measurements will show whether the investment is working.",
        ],
      },
      {
        heading: "2. Infrastructure that protects the work already happening",
        paragraphs: [
          "Aging barns, unreliable fencing, wash-pack areas, and storage constraints can quietly limit an otherwise healthy operation. Addressing those bottlenecks can protect livestock, reduce losses, and make daily work safer.",
          "These projects may not look revolutionary, but they often create immediate operational value and remain useful for decades.",
        ],
      },
      {
        heading: "3. Energy and equipment improvements",
        paragraphs: [
          "Energy projects are most effective when they begin with the farm's actual load and operating schedule. Solar, efficient pumps, ventilation, and upgraded controls can all reduce exposure to rising costs.",
          "The assessment should include maintenance requirements, expected lifespan, and a realistic baseline for comparing future performance.",
        ],
      },
      {
        heading: "4. Soil and field improvements",
        paragraphs: [
          "Soil-building work can support water retention, crop health, and long-term productivity, but it requires a plan suited to the farm rather than a generic prescription.",
          "Clear field records, a baseline, and regular observation make it possible to understand what is changing and why.",
        ],
      },
      {
        heading: "5. Systems that make labor more sustainable",
        paragraphs: [
          "A project can also build resilience by making essential work easier to complete. Thoughtful layouts, safer handling systems, and better post-harvest workflows reduce friction for owners and employees.",
          "The best investment is the one a farm can operate, maintain, and continue using after outside support has ended.",
        ],
      },
    ],
  },
  {
    slug: "what-belongs-in-a-farm-impact-report",
    title: "What Belongs in a Useful Farm Impact Report?",
    excerpt:
      "Good reporting connects dollars to completed work, measurable change, and the people responsible for maintaining the result.",
    category: "Impact & Reporting",
    tags: ["Reporting", "Donors", "Measurement"],
    publishedAt: "July 17, 2026",
    isoDate: "2026-07-17",
    readTime: "5 min read",
    author: "Better Farms Editorial Team",
    image: "/sourcePhotos/homepage/computer.webp",
    imageAlt: "Farmer reviewing project information on a laptop",
    imageWidth: 470,
    imageHeight: 432,
    introduction: [
      "An impact report should help a reader understand what changed on the farm and how confidently that change can be connected to the funded project.",
      "The most useful reports are specific enough for accountability and clear enough for people outside agriculture to understand.",
    ],
    takeaways: [
      "Document the baseline before work starts.",
      "Separate completed activities from measured outcomes.",
      "Explain limitations and next steps in plain language.",
    ],
    quote:
      "Transparency is not a pile of numbers. It is a clear line between the need, the work, and the result.",
    sections: [
      {
        heading: "Begin with the original need",
        paragraphs: [
          "Every report should restate the operational problem the project was designed to address. This gives the budget, timeline, and measurements a shared context.",
          "Photos, site notes, and baseline data make later comparisons more useful and reduce reliance on memory.",
        ],
      },
      {
        heading: "Show what was delivered",
        paragraphs: [
          "A completion record should describe the installed system or finished work, note material changes from the plan, and identify who completed and accepted the project.",
          "Budgets are more meaningful when they are connected to tangible deliverables rather than presented as isolated totals.",
        ],
      },
      {
        heading: "Measure what matters to the farm",
        paragraphs: [
          "Not every result is captured by the same metric. Water use, energy cost, animal health, labor hours, yield stability, and avoided losses may all be relevant depending on the project.",
          "A strong report uses a small number of defensible measures and explains how they were collected.",
        ],
      },
    ],
  },
  {
    slug: "how-a-farm-project-is-evaluated",
    title: "From Application to Acre: How a Farm Project Is Evaluated",
    excerpt:
      "A strong project starts with listening, a field-level assessment, and a scope that the farm can realistically operate.",
    category: "Behind the Work",
    tags: ["Assessment", "Project Management", "Farmers"],
    publishedAt: "July 10, 2026",
    isoDate: "2026-07-10",
    readTime: "7 min read",
    author: "Better Farms Editorial Team",
    image: "/sourcePhotos/how-it-works/farmers-inspecting-field.jpg",
    imageAlt: "Two farmers inspecting crops together in a field",
    imageWidth: 972,
    imageHeight: 1619,
    introduction: [
      "A farm project may begin with a straightforward request, but responsible funding requires a closer look at the operation, the constraints, and the expected result.",
      "Evaluation is not about making the project more complicated. It is about making the path to completion clearer.",
    ],
    takeaways: [
      "The farmer's priorities establish the project direction.",
      "Site conditions determine what is feasible.",
      "Scope, budget, ownership, and measurement should agree before funding.",
    ],
    sections: [
      {
        heading: "Listen before prescribing",
        paragraphs: [
          "The first conversation should establish why the project matters now, what has already been tried, and what success would change for the operation.",
          "This context prevents a technically impressive solution from becoming a poor operational fit.",
        ],
      },
      {
        heading: "Translate the need into a workable scope",
        paragraphs: [
          "A field assessment brings together dimensions, existing systems, site access, seasonal timing, vendors, and maintenance expectations.",
          "The result should be a scope that a contractor can price, a funder can understand, and the farmer can confidently own.",
        ],
      },
      {
        heading: "Agree on evidence before work begins",
        paragraphs: [
          "Project teams should decide which records, measurements, and photographs will demonstrate completion and performance.",
          "When evidence requirements are added at the end, important baseline information has often already been lost.",
        ],
      },
    ],
  },
  {
    slug: "soil-health-needs-a-practical-plan",
    title: "Why Soil Health Needs More Than Good Intentions",
    excerpt:
      "Soil-building practices work best when they are tied to field conditions, farm economics, and a measurement plan.",
    category: "Sustainable Practices",
    tags: ["Soil Health", "Conservation", "Measurement"],
    publishedAt: "July 3, 2026",
    isoDate: "2026-07-03",
    readTime: "5 min read",
    author: "Better Farms Editorial Team",
    image: "/sourcePhotos/homepage/crops.webp",
    imageAlt: "Rows of healthy crops stretching across a field",
    imageWidth: 406,
    imageHeight: 392,
    introduction: [
      "Soil health is a long-term objective, but farm decisions happen season by season. A useful plan connects the two.",
      "That means selecting practices for a specific field, understanding the management change involved, and deciding how progress will be observed.",
    ],
    takeaways: [
      "Use field history and current constraints to choose practices.",
      "Account for labor, equipment, timing, and cash flow.",
      "Combine laboratory results with practical field observations.",
    ],
    sections: [
      {
        heading: "There is no universal field prescription",
        paragraphs: [
          "The same practice can produce different results across soil types, climates, rotations, and management systems. Local knowledge and baseline conditions matter.",
          "The plan should explain why a particular practice fits the field instead of treating adoption as the outcome by itself.",
        ],
      },
      {
        heading: "Operational feasibility matters",
        paragraphs: [
          "A practice that conflicts with planting windows, available equipment, or labor capacity is unlikely to last. Funding should account for the transition, not only the final input.",
          "Practical support may include technical guidance, equipment access, seed, monitoring, and time for adjustment.",
        ],
      },
      {
        heading: "Measurement should support decisions",
        paragraphs: [
          "Testing is most useful when results can inform the next management choice. Consistent sampling, field notes, infiltration observations, and crop performance can provide a fuller picture together.",
          "The objective is not perfect certainty. It is better evidence for what the farm should do next.",
        ],
      },
    ],
  },
  {
    slug: "keeping-independent-farms-independent",
    title: "The Case for Keeping Independent Farms Independent",
    excerpt:
      "Targeted project support can strengthen a farm without asking its owners to give up the identity, knowledge, or control that made it valuable.",
    category: "Food Systems",
    tags: ["Independent Farms", "Local Food", "Rural Communities"],
    publishedAt: "June 26, 2026",
    isoDate: "2026-06-26",
    readTime: "6 min read",
    author: "Better Farms Editorial Team",
    image: "/sourcePhotos/about/man-feeding-cows.webp",
    imageAlt: "Farmer working with cattle inside a barn",
    imageWidth: 1248,
    imageHeight: 1204,
    introduction: [
      "Independent farms carry more than acreage and equipment. They carry local knowledge, business relationships, stewardship decisions, and a way of working shaped over time.",
      "When a solvable infrastructure problem threatens that continuity, project-based support can create room for the next decision and the next generation.",
    ],
    takeaways: [
      "Farm independence depends on practical operating capacity.",
      "Project support should strengthen—not replace—farmer decision-making.",
      "Durable local farms contribute to durable local food systems.",
    ],
    sections: [
      {
        heading: "Small constraints can have large consequences",
        paragraphs: [
          "A failing system, storage bottleneck, or unsafe facility can limit production and consume cash that would otherwise support the operation.",
          "Targeted capital can address that constraint without requiring a complete change in ownership or direction.",
        ],
      },
      {
        heading: "Control belongs with the people doing the work",
        paragraphs: [
          "The farmer should shape the scope, understand the obligations, and own the completed result. Outside expertise is most useful when it increases the farm's ability to make informed decisions.",
          "That principle applies from the first assessment through final reporting.",
        ],
      },
      {
        heading: "Farm continuity benefits more than one business",
        paragraphs: [
          "Independent farms support employees, vendors, processors, customers, and communities. Their continuity preserves relationships that cannot be recreated quickly after they disappear.",
          "A well-chosen project can therefore create value beyond the boundaries of a single property.",
        ],
      },
    ],
  },
  {
    slug: "funding-water-smart-infrastructure",
    title: "A Practical Guide to Funding Water-Smart Infrastructure",
    excerpt:
      "Before funding irrigation, storage, or drainage, define the water problem, the operating plan, and the evidence that will show improvement.",
    category: "Farmer Resources",
    tags: ["Water", "Infrastructure", "Funding"],
    publishedAt: "June 19, 2026",
    isoDate: "2026-06-19",
    readTime: "8 min read",
    author: "Better Farms Editorial Team",
    image: "/sourcePhotos/for-farmers/solar.webp",
    imageAlt: "Farm field infrastructure under a clear sky",
    imageWidth: 884,
    imageHeight: 382,
    introduction: [
      "Water projects can protect productivity and reduce risk, but they are also highly site-specific. The funding request should explain the system as clearly as the need.",
      "A complete proposal connects water availability, delivery, storage, drainage, energy use, maintenance, and farm management.",
    ],
    takeaways: [
      "Quantify the current constraint before choosing equipment.",
      "Include installation, controls, maintenance, and training.",
      "Measure both resource use and operational outcomes.",
    ],
    sections: [
      {
        heading: "Define the problem in operational terms",
        paragraphs: [
          "Is the farm short on supply, limited by pressure, losing water in delivery, or unable to apply it at the right time? Each problem suggests a different project.",
          "The proposal should use field observations and available records to show the size and timing of the constraint.",
        ],
      },
      {
        heading: "Scope the whole working system",
        paragraphs: [
          "A pump or irrigation line does not operate alone. Power, filtration, controls, storage, access, winterization, and repairs can determine whether the investment succeeds.",
          "Including those elements early produces a more realistic budget and reduces costly changes during installation.",
        ],
      },
      {
        heading: "Plan for proof and maintenance",
        paragraphs: [
          "Flow meters, energy records, maintenance logs, crop observations, and labor records can help explain the result after the project is operating.",
          "The farm should also know who will inspect the system, perform routine maintenance, and respond when conditions change.",
        ],
      },
    ],
  },
];

export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
);

export const blogTags = Array.from(
  new Set(blogPosts.flatMap((post) => post.tags)),
).sort((a, b) => a.localeCompare(b));

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
