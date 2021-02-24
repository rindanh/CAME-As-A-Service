const ORGANISATIONAL = "organisational";
const HUMAN = "human";
const APPLICATION_DOMAIN = "application-domain";
const DEVELOPMENT_STRATEGY = "development-strategy";

const CHARACTERISTICS = [
  {
    name: "Guidance",
    characteristicValues: [
      {
        ref: "predefined taxonomy/heuristics/guidelines",
        values: ["predefined taxonomy", "heuristics", "guidelines"],
        isQuantifiable: false
      }
    ]
  },
  {
    name: "Approach",
    characteristicValues: [
      {
        ref: "systemic/exploratory/explanatory",
        values: ["systemic", "exploratory", "explanatory"],
        isQuantifiable: false
      }
    ]
  },
  {
    name: "Formalism",
    characteristicValues: [
      {
        ref: "formal/semi-formal/informal",
        values: ["formal", "semi-formal", "informal"],
        isQuantifiable: false
      }
    ]
  },
  {
    name: "Management commitment",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Importance",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Impact",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Time pressure",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Shortage of resources",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      },
      {
        ref: "human/means",
        values: ["human", "means"],
        isQuantifiable: false
      },
      {
        ref: "financial/human/temporal/informational",
        values: [
          "financial resources",
          "human resources",
          "temporal resources",
          "informational resources"
        ],
        isQuantifiable: false
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Size",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Level of innovation",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      },
      {
        ref: "business/technology",
        values: ["business innovation", "technology innovation"],
        isQuantifiable: false
      }
    ],
    dimension: ORGANISATIONAL
  },
  {
    name: "Resistance and conflict",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: HUMAN
  },
  {
    name: "Expertise",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      },
      {
        ref: "tester/developer/designer/analyst",
        values: ["tester", "developer", "designer", "analyst"],
        isQuantifiable: false
      }
    ],
    dimension: HUMAN
  },
  {
    name: "Clarity and stability",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: HUMAN
  },
  {
    name: "User involvement",
    characteristicValues: [
      {
        ref: "default",
        values: ["real", "virtual"],
        isQuantifiable: false
      }
    ],
    dimension: HUMAN
  },
  {
    name: "Stakeholder number",
    characteristicValues: [
      {
        ref: "default",
        values: ["1", "5", "10", "50"],
        isQuantifiable: true
      }
    ],
    dimension: HUMAN
  },
  {
    name: "Formality",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Relationships",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Dependency",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Complexity",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "normal", "high"],
        isQuantifiable: true
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Application type",
    characteristicValues: [
      {
        ref: "default",
        values: [
          "intra-organization application",
          "inter-organization application",
          "organization-customer application"
        ],
        isQuantifiable: false
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Application technology",
    characteristicValues: [
      {
        ref: "default",
        values: [
          "application to develop includes a database",
          "application to develop is distributed",
          "application to develop includes a GUI"
        ],
        isQuantifiable: false
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Dividing project",
    characteristicValues: [
      {
        ref: "default",
        values: [
          "one single system",
          "establishing system-oriented subprojects",
          "establishing process-oriented subprojects",
          "establishing hybrid subprojects"
        ],
        isQuantifiable: false
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Repetitiveness",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "medium", "high"],
        isQuantifiable: true
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Variability",
    characteristicValues: [
      {
        ref: "default",
        values: ["low", "medium", "high"],
        isQuantifiable: true
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Variable artefacts",
    characteristicValues: [
      {
        ref: "default",
        values: ["organisational", "human", "application domain", "development strategy"],
        isQuantifiable: false
      }
    ],
    dimension: APPLICATION_DOMAIN
  },
  {
    name: "Source system",
    characteristicValues: [
      {
        ref: "default",
        values: ["code reuse", "functional domain reuse", "interface reuse"],
        isQuantifiable: false
      },
      {
        ref: "weak/medium/strong",
        values: ["weak", "medium", "strong"],
        isQuantifiable: true
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Project organization",
    characteristicValues: [
      {
        ref: "default",
        values: ["standard", "adapted"],
        isQuantifiable: false
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Development strategy",
    characteristicValues: [
      {
        ref: "default",
        values: ["outsourcing", "iterative", "prototyping", "phase-wise", "title-wise"],
        isQuantifiable: false
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Realization strategy",
    characteristicValues: [
      {
        ref: "default",
        values: ["at once", "incremental", "concurrent", "overlapping"],
        isQuantifiable: false
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Delivery strategy",
    characteristicValues: [
      {
        ref: "default",
        values: ["at once", "incremental", "evolutionary"],
        isQuantifiable: false
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Tracing project",
    characteristicValues: [
      {
        ref: "default",
        values: ["weak", "strong"],
        isQuantifiable: true
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  },
  {
    name: "Goal number",
    characteristicValues: [
      {
        ref: "default",
        values: ["one goal", "multi-goals"],
        isQuantifiable: false
      }
    ],
    dimension: DEVELOPMENT_STRATEGY
  }
];

module.exports = {
  ORGANISATIONAL,
  HUMAN,
  APPLICATION_DOMAIN,
  DEVELOPMENT_STRATEGY,
  CHARACTERISTICS
};
