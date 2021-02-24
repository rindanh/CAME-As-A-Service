const baseUrl = "http://localhost:3001/";
const baseUrlB = "C:/Users/User/Desktop/mcrs/case/mbms-b/browse.html#";
const notExist = "notexist.com/"
const MBMS1 = "http://localhost:8080/method-chunk/"
const MBMS2 = "http://localhost:8081/method-chunk/"

const METHOD_CHUNKS = [
  {
    name: "NFR Framework",
    description: "NFR Framework for IS Security",
    url: notExist + "NFR-framework",
    characteristics: [
      {
        id: "impact",
        value: "high"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "normal"
      },
      {
        id: "guidance",
        value: "predefined taxonomy",
        ref: "predefined taxonomy/heuristics/guidelines"
      },
      {
        id: "approach",
        value: "explanatory",
        ref: "systemic/exploratory/explanatory"
      },
      {
        id: "formalism",
        value: "semi-formal",
        ref: "formal/semi-formal/informal"
      }
    ]
  },
  {
    name: "KAOS",
    description: "KAOS for IS Security",
    url: notExist + "KAOS",
    characteristics: [
      {
        id: "impact",
        value: "low"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "high"
      },
      {
        id: "guidance",
        value: "heuristics",
        ref: "predefined taxonomy/heuristics/guidelines"
      },
      {
        id: "approach",
        value: "exploratory",
        ref: "systemic/exploratory/explanatory"
      },
      {
        id: "formalism",
        value: "formal",
        ref: "formal/semi-formal/informal"
      }
    ]
  },
  {
    name: "Secure Tropos",
    description: "Secure Tropos for IS Security",
    url: notExist + "secure-tropos",
    characteristics: [
      {
        id: "impact",
        value: "high"
      },
      {
        id: "level-of-innovation",
        value: "low"
      },
      {
        id: "expertise",
        value: "high"
      },
      {
        id: "approach",
        value: "systemic",
        ref: "systemic/exploratory/explanatory"
      },
      {
        id: "formalism",
        value: "formal",
        ref: "formal/semi-formal/informal"
      }
    ]
  },
  {
    name: "GBRAM",
    description: "GBRAM for IS Security",
    url: notExist + "gbram",
    characteristics: [
      {
        id: "impact",
        value: "low"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "normal"
      },
      {
        id: "guidance",
        value: "heuristics",
        ref: "predefined taxonomy/heuristics/guidelines"
      },
      {
        id: "formalism",
        value: "informal",
        ref: "formal/semi-formal/informal"
      }
    ]
  },
  {
    name: "Misuse Cases",
    description: "Misuse Cases for IS Security",
    url: notExist + "misusecases",
    characteristics: [
      {
        id: "impact",
        value: "normal"
      },
      {
        id: "level-of-innovation",
        value: "high"
      },
      {
        id: "expertise",
        value: "low"
      },
      {
        id: "guidance",
        value: "guidelines",
        ref: "predefined taxonomy/heuristics/guidelines"
      },
      {
        id: "approach",
        value: "explanatory",
        ref: "systemic/exploratory/explanatory"
      },
      {
        id: "formalism",
        value: "informal",
        ref: "formal/semi-formal/informal"
      }
    ]
  }
];

const METHOD_CHUNKS_ADDITIONAL = [
  {
    name: "Acceptance Test Driven Development",
    description:
      "Acceptance test–driven development (ATDD) is a development methodology based on communication between the business customers, the developers, and the testers. ATDD encompasses many of the same practices as specification by example (SBE),[2][3] behavior-driven development (BDD),[4] example-driven development (EDD), and support-driven development also called story test–driven development (SDD). All these processes aid developers and testers in understanding the customer's needs prior to implementation and allow customers to be able to converse in their own domain language. ATDD is closely related to test-driven development (TDD). It differs by the emphasis on developer-tester-business customer collaboration. ATDD encompasses acceptance testing, but highlights writing acceptance tests before developers begin coding.",
    provider: "mbms1",
    url: MBMS1 + "AcceptanceTestDrivenDevelopment",
    characteristics: [
      {
        id: "management-commitment",
        value: "low"
      },
      {
        id: "importance",
        value: "normal"
      },
      {
        id: "expertise",
        value: "high"
      },
      {
        id: "user-involvement",
        value: "real"
      },
      {
        id: "impact",
        value: "high"
      }
    ]
  },
  {
    name: "Agile Development",
    description:
      "Add value to a product by incrementally extending it, ensuring it is usable, releasable and maintainable.",
    provider: "mbms1",
    url: MBMS1 + "AgileDevelopment",
    characteristics: [
      {
        id: "management-commitment",
        value: "high"
      },
      {
        id: "user-involvement",
        value: "real"
      },
      {
        id: "goal-number",
        value: "multi-goals"
      },
      {
        id: "development-strategy",
        value: "iterative"
      },
      {
        id: "delivery-strategy",
        value: "incremental"
      }
    ]
  },
  {
    name: "Agile Retrospective",
    description:
      "Make incremental improvements to the way of working through regular, repeated retrospectives.",
    provider: "mbms1",
    url: MBMS1 + "AgileRetrospective",
    characteristics: [
      {
        id: "impact",
        value: "high"
      },
      {
        id: "resistance-and-conflict",
        value: "high"
      },
      {
        id: "formality",
        value: "low"
      },
      {
        id: "Variability",
        value: "high"
      },
      {
        id: "tracing-project",
        value: "strong"
      }
    ]
  },
  {
    name: "Agile Teaming",
    description:
      "A self-organizing team maximizes its performance by using a highly-collaborative teaming approach.",
    provider: "mbms1",
    url: MBMS1 + "AgileTeaming",
    characteristics: [
      {
        id: "management-commitment",
        value: "normal"
      },
      {
        id: "expertise",
        value: "high"
      },
      {
        id: "resistance-and-conflict",
        value: "high"
      },
      {
        id: "formality",
        value: "low"
      }
    ]
  },
  {
    name: "Agile Timeboxing",
    description:
      "Progress the work as a series of timeboxes, and assess and re-plan at the end of each timebox.",
    provider: "mbms1",
    url: MBMS1 + "AgileTimeboxing",
    characteristics: [
      {
        id: "management-commitment",
        value: "high"
      },
      {
        id: "time-pressure",
        value: "high"
      },
      {
        id: "development-strategy",
        value: "iterative"
      },
      {
        id: "delivery-strategy",
        value: "incremental"
      },
      {
        id: "tracing-project",
        value: "strong"
      },
      {
        id: "goal-number",
        value: "multi-goals"
      }
    ]
  },
  {
    name: "Behavior Driven Development",
    description:
      "In software engineering, behavior-driven development (BDD) is an Agile software development process that encourages collaboration between developers, QA and non-technical or business participants in a software project. It encourages teams to use conversation and concrete examples to formalize a shared understanding of how the application should behave. Although BDD is principally an idea about how software development should be managed by both business interests and technical insight, the practice of BDD does assume the use of specialized software tools to support the development process. BDD is largely facilitated through the use of a simple domain-specific language (DSL) using natural language constructs (e.g., English-like sentences) that can express the behavior and the expected outcomes. BDD helps to focus on the user’s needs and the system’s expected behavior rather than focusing too much on testing the implementation.",
    provider: "mbms2",
    url: MBMS2 + "BehaviorDrivenDevelopment",
    characteristics: [
      {
        id: "management-commitment",
        value: "high"
      },
      {
        id: "importance",
        value: "high"
      },
      {
        id: "clarity-and-stability",
        value: "high"
      },
      {
        id: "user-involvement",
        value: "real"
      },
      {
        id: "impact",
        value: "high"
      }
    ]
  },
  {
    name: "Big Design Up Front",
    description:
      "Big Design Up Front (BDUF) is a software development approach in which the program's design is to be completed and perfected before that program's implementation is started. It is often associated with the waterfall model of software development. Proponents of waterfall model argue that time spent in designing is a worthwhile investment, with the hope that less time and effort will be spent fixing a bug in the early stages of a software product's lifecycle than when that same bug is found and must be fixed later. That is, it is much easier to fix a requirements bug in the requirements phase than to fix that same bug in the implementation phase, as to fix a requirements bug in the implementation phase requires scrapping at least some of the implementation and design work which has already been completed.",
    provider: "mbms2",
    url: MBMS2 + "BigDesignUpFront",
    characteristics: [
      {
        id: "management-commitment",
        value: "high"
      },
      {
        id: "importance",
        value: "high"
      },
      {
        id: "clarity-and-stability",
        value: "high"
      },
      {
        id: "user-involvement",
        value: "real"
      },
      {
        id: "impact",
        value: "high"
      }
    ]
  },
  {
    name: "Continuous Delivery",
    description:
      "Continuous delivery (CD or CDE) is a software engineering approach in which teams produce software in short cycles, ensuring that the software can be reliably released at any time and, when releasing the software, doing so manually. It aims at building, testing, and releasing software with greater speed and frequency. The approach helps reduce the cost, time, and risk of delivering changes by allowing for more incremental updates to applications in production. A straightforward and repeatable deployment process is important for continuous delivery.",
    provider: "mbms2",
    url: MBMS2 + "ContinuousDelivery",
    characteristics: [
      {
        id: "time-pressure",
        value: "high"
      },
      {
        id: "expertise",
        value: "high"
      },
      {
        id: "tracing-project",
        value: "strong"
      },
      {
        id: "complexity",
        value: "high"
      },
      {
        id: "impact",
        value: "high"
      }
    ]
  },
  {
    name: "Continuous Integration",
    description:
      "Continuous integration (CI) is the practice of merging all developer working copies to a shared mainline several times a day. Continuous integration involves integrating early and often, so as to avoid the pitfalls of 'integration hell'.",
    provider: "mbms2",
    url: MBMS2 + "ContinuousIntegration",
    characteristics: [
      {
        id: "time-pressure",
        value: "high"
      },
      {
        id: "expertise",
        value: "high"
      },
      {
        id: "tracing-project",
        value: "strong"
      },
      {
        id: "complexity",
        value: "high"
      },
      {
        id: "impact",
        value: "high"
      }
    ]
  },
  {
    name: "Daily Stand-Up",
    description:
      "Use short, daily whole-team meetings to coordinate the work of the team and raise impediments.",
    provider: "mbms2",
    url: MBMS2 + "DailyStandUp",
    characteristics: [
      {
        id: "management-commitment",
        value: "high"
      },
      {
        id: "time-pressure",
        value: "high"
      },
      {
        id: "impact",
        value: "high"
      },
      {
        id: "clarity-and-stability",
        value: "high"
      },
      {
        id: "expertise",
        value: "low"
      },
      {
        id: "formality",
        value: "low"
      },
      {
        id: "tracing-project",
        value: "strong"
      }
    ]
  },
  {
    name: "Pair Programming",
    description:
      "Agile software development technique in which two programmers work together at one workstation. One, the driver, writes code while the other, the observer or navigator,reviews each line of code as it is typed in. The two programmers switch roles frequently. While reviewing, the observer also considers the strategic direction of the work, coming up with ideas for improvements and likely future problems to address. This is intended to free the driver to focus all of their attention on the tactical aspects of completing the current task, using the observer as a safety net and guide. Pair programming increases the man-hours required to deliver code compared to programmers working individually. Experiments yielded diverse results, suggesting increases of between 15% and 100%. However, the resulting code has about 15% fewer defects. Along with code development time, other factors like field support costs and quality assurance also figure in to the return on investment.",
    provider: "mbms2",
    url: MBMS2 + "PairProgramming",
    characteristics: [
      {
        id: "resistance-and-conflict",
        value: "high"
      },
      {
        id: "expertise",
        value: "low"
      },
      {
        id: "tracing-project",
        value: "strong"
      },
      {
        id: "complexity",
        value: "normal"
      },
      {
        id: "impact",
        value: "high"
      }
    ]
  },
  {
    name: "Product Backlog",
    description:
      "Capture what the users of a system want it to do as a priority-ranked list of independently buildable items.",
    provider: "mbms1",
    url: MBMS1 + "ProductBacklog",
    characteristics: [
      {
        id: "importance",
        value: "high"
      },
      {
        id: "user-involvement",
        value: "real"
      },
      {
        id: "clarity-and-stability",
        value: "high"
      },
      {
        id: "dependency",
        value: "low"
      },
      {
        id: "realization-strategy",
        value: "incremental"
      }
    ]
  },
  {
    name: "Product Ownership",
    description:
      "Own, evolve and communicate the vision, and guide the evolution of the product to achieve the vision.",
    provider: "mbms2",
    url: MBMS2 + "ProductOwnership",
    characteristics: [
      {
        id: "management-commitment",
        value: "high"
      },
      {
        id: "importance",
        value: "normal"
      },
      {
        id: "impact",
        value: "high"
      },
      {
        id: "tracing-project",
        value: "strong"
      }
    ]
  },
  {
    name: "Specification By Example",
    description:
      "Specification by example (SBE) is a collaborative approach to defining requirements and business-oriented functional tests for software products based on capturing and illustrating requirements using realistic examples instead of abstract statements. It is applied in the context of agile software development methods, in particular behavior-driven development. This approach is particularly successful for managing requirements and functional tests on large-scale projects of significant domain and organisational complexity.",
    provider: "mbms1",
    url: MBMS1 + "SpecificationByExample",
    characteristics: [
      {
        id: "management-commitment",
        value: "high"
      },
      {
        id: "importance",
        value: "high"
      },
      {
        id: "clarity-and-stability",
        value: "high"
      },
      {
        id: "user-involvement",
        value: "real"
      },
      {
        id: "impact",
        value: "high"
      }
    ]
  },
  {
    name: "Test Driven Development",
    description:
      "Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. This is opposed to software development that allows software to be added that is not proven to meet requirements. Writing the tests first: The tests should be written before the functionality that is to be tested. This has been claimed to have many benefits. It helps ensure that the application is written for testability, as the developers must consider how to test the application from the outset rather than adding it later. It also ensures that tests for every feature get written. Additionally, writing the tests first leads to a deeper and earlier understanding of the product requirements, ensures the effectiveness of the test code, and maintains a continual focus on software quality.",
    provider: "mbms1",
    url: MBMS1 + "TestDrivenDevelopment",
    characteristics: [
      {
        id: "dependency",
        value: "high"
      },
      {
        id: "expertise",
        value: "high"
      },
      {
        id: "tracing-project",
        value: "strong"
      },
      {
        id: "complexity",
        value: "high"
      },
      {
        id: "impact",
        value: "high"
      }
    ]
  }
];

module.exports = { METHOD_CHUNKS, METHOD_CHUNKS_ADDITIONAL };
