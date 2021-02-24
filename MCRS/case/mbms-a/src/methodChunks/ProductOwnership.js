export const ProductOwnership = {
  nameId: "ProductOwnership",
  name: "Product Ownership",
  description:
    "Own, evolve and communicate the vision, and guide the evolution of the product to achieve the vision.",
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
  ],
  activitySpaces: [
    {
      nameId: "ExplorePossibilities",
      name: "Explore Possibilities",
      description:
        "Explore the possibilities presented by the creation of a new or improved software system. This includes the analysis of the opportunity to be addressed and the identification of the stakeholders. Explore possibilities to: Enable the right stakeholders to be involved, Understand the stakeholders’ needs, Identify opportunities for the use of the software system, Understand why the software system is needed, Establish the value offered by the software system.",
      activities: [
        {
          nameId: "EvolveTheProductVision",
          name: "Evolve the Product Vision",
          description:
            "Agree and communicate the goals and return-on-investment case for the product to drive and inform ongoing decisions about the product.",
          entryCriterions: {
            alphas: [],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Opportunity.ValueEstablished"],
            workProducts: ["ProductVision.ValueReleaseStrategyOutlined"]
          },
          competencies: [
            "StakeholderRepresentation.3",
            "Analysis.3",
            "Development.3"
          ]
        }
      ]
    },
    {
      nameId: "UnderstandStakeholderNeeds",
      name: "Understand Stakeholder Needs",
      description:
        "Engage with the stakeholders to understand their needs and ensure that the right results are produced. This includes identifying and working with the stakeholder representatives to progress the opportunity. Understand stakeholder needs to: Ensure the right solution is created, Align expectations, Collect feedback and generate input, Ensure that the solution produced provides benefit to the stakeholders.",
      activities: [
        {
          nameId: "BuildStakeholderNetwork",
          name: "Build Stakeholder Network",
          description:
            "Actively engage all stakeholders with a legitimate and material interest in the endeavor, including eliciting feedback and negotiating compromises as required.",
          entryCriterions: {
            alphas: [],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Stakeholders.Involved"],
            workProducts: ["StakeholderNetwork.RepresentativesNamed"]
          },
          competencies: ["StakeholderRepresentation.3", "Analysis.2"]
        },
        {
          nameId: "DemonstrateTheProduct",
          name: "Demonstrate the Product",
          description:
            "Show the evolving product to stakeholders and elicit feedback as frequently as possible to converge on an optimal solution.",
          entryCriterions: {
            alphas: ["Stakeholders.Involved", "Opportunity.ValueEstablished"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Stakeholders.InAgreement", "Opportunity.Viable"],
            workProducts: []
          },
          competencies: ["StakeholderRepresentation.3", "Testing.3"]
        }
      ]
    },
    {
      nameId: "EnsureStakeholderSatisfaction",
      name: "Ensure Stakeholder Satisfaction",
      description:
        "Share the results of the development work with the stakeholders to gain their acceptance of the system produced and verify that the opportunity has been successfully addressed. Ensure the satisfaction of the stakeholders to: Get approval for the deployment of the system, Validate that the system is of benefit to the stakeholders, Validate that the system is acceptable to the stakeholders, Independently verify that the system delivered is the one required, Confirm the expected benefit that the system will provide.",
      activities: [
        {
          nameId: "AchieveAcceptance",
          name: "Achieve Acceptance",
          description:
            "The product is accepted for release. Progressively accepting the product enables frequent releases to be made to maximize return-on-investment.",
          entryCriterions: {
            alphas: ["Stakeholders.InAgreement", "Opportunity.Viable"],
            workProducts: []
          },
          completionCriterions: {
            alphas: [
              "Stakeholders.SatisfiedForDeployment",
              "Opportunity.Addressed"
            ],
            workProducts: []
          },
          competencies: ["StakeholderRepresentation.3", "Testing.3"]
        }
      ]
    }
  ],
  alphas: [
    {
      nameId: "Stakeholders",
      name: "Stakeholders",
      description:
        "The people, groups, or organizations who affect or are affected by a software system. The stakeholders provide the opportunity, and are the source of the requirements for the software system. They are involved throughout the software engineering endeavor to support the team and ensure that an acceptable software system is produced.",
      workProducts: [
        {
          nameId: "StakeholderNetwork",
          name: "Stakeholder Network",
          description:
            "Who the stakeholder representatives are, and how we will engage with them throughout the endeavor.",
          levelOfDetails: [
            "StakeholderTypesDescribed",
            "RepresentativesNamed",
            "CommunicationPlansOutlined"
          ]
        }
      ],
      states: [
        {
          nameId: "Recognized",
          name: "Recognized",
          description: "Stakeholders have been identified.",
          checklists: [
            "Stakeholder groups identified",
            "Key stakeholder groups represented",
            "Responsibilities defined"
          ]
        },
        {
          nameId: "Represented",
          name: "Represented",
          description:
            "The mechanisms for involving the stakeholders are agreed and the stakeholder representatives have been appointed.",
          checklists: [
            "Responsibilities agreed",
            "Representatives authorized",
            "Collaboration approach agreed",
            "Way of working supported & respected"
          ]
        },
        {
          nameId: "Involved",
          name: "Involved",
          description:
            "The stakeholder representatives are actively involved in the work and fulfilling their responsibilities.",
          checklists: [
            "Representatives assist the team",
            "Timely feedback and decisions provided",
            "Changes promptly communicated"
          ]
        },
        {
          nameId: "InAgreement",
          name: "In Agreement",
          description: "The stakeholder representatives are in agreement.",
          checklists: [
            "Minimal expectations agreed",
            "Rep's happy with their involvement",
            "Rep's input valued",
            "Team's input valued",
            "Priorities clear & perspectives balanced"
          ]
        },
        {
          nameId: "SatisfiedForDeployment",
          name: "Satisfied for Deployment",
          description:
            "The minimal expectations of the stakeholder representatives have been achieved.",
          checklists: [
            "Stakeholder feedback provided",
            "System ready for deployment"
          ]
        },
        {
          nameId: "SatisfiedInUse",
          name: "Satisfied in Use",
          description:
            "The system has met or exceeds the minimal stakeholder expectations.",
          checklists: [
            "Feedback on system use available",
            "System meets expectations"
          ]
        }
      ],
      subalphaIds: []
    },
    {
      nameId: "Opportunity",
      name: "Opportunity",
      description:
        "The set of circumstances that makes it appropriate to develop or change a software system. The opportunity articulates the reason for the creation of the new, or changed, software system. It represents the team’s shared understanding of the stakeholders’ needs, and helps shape the requirements for the new software system by providing justification for its development.",
      workProducts: [
        {
          nameId: "ProductVision",
          name: "Product Vision",
          description:
            "Communicates what is ultimately wanted or needed from the product, as well as how value will be progressively realized.",
          levelOfDetails: [
            "NeedIdentified",
            "SolutionEnvisaged",
            "ValueReleaseStrategyOutlined",
            "ROIProjected"
          ]
        }
      ],
      states: [
        {
          nameId: "Identified",
          name: "Identified",
          description:
            "A commercial, social or business opportunity has been identified that could be addressed by a software-based solution.",
          checklists: [
            "Idea behind opportunity identified",
            "At least one investing stakeholder interested",
            "Other stakeholders identified"
          ]
        },
        {
          nameId: "SolutionNeeded",
          name: "Solution Needed",
          description:
            "The need for a software-based solution has been confirmed.",
          checklists: [
            "Solution identified",
            "Stakeholders' needs established",
            "Problems and root causes identified",
            "Need for a solution confirmed",
            "At least one solution proposed"
          ]
        },
        {
          nameId: "ValueEstablished",
          name: "Value Established",
          description:
            "The value of a successful solution has been established.",
          checklists: [
            "Opportunity value quantified",
            "Solution impact understood",
            "System value understood",
            "Success criteria clear",
            "Outcomes clear and quantified"
          ]
        },
        {
          nameId: "Viable",
          name: "Viable",
          description:
            "It is agreed that a solution can be produced quickly and cheaply enough to successfully address the opportunity.",
          checklists: [
            "Solution outlined",
            "Solution possible within constraints",
            "Risks acceptable & manageable",
            "Solution profitable",
            "Reasons to develop solution understood",
            "Pursuit viable"
          ]
        },
        {
          nameId: "Addressed",
          name: "Addressed",
          description:
            "A solution has been produced that demonstrably addresses the opportunity.",
          checklists: [
            "Opportunity addressed",
            "Solution worth deploying",
            "Stakeholders satisfied"
          ]
        },
        {
          nameId: "BenefitAccrued",
          name: "Benefit Accrued",
          description:
            "The operational use or sale of the solution is creating tangible benefits.",
          checklists: ["Solution accrues benefits", "ROI acceptable"]
        }
      ],
      subalphaIds: []
    },
    {
      nameId: "Requirements",
      name: "Requirements",
      description:
        "What the software system must do to address the opportunity and satisfy the stakeholders.",
      workProducts: [],
      states: [
        {
          nameId: "Conceived",
          name: "Conceived",
          description: "The need for a new system has been agreed.",
          checklists: [
            "Stakeholders agree system is to be produced",
            "Users identified",
            "Funding stakeholders identified",
            "Opportunity clear"
          ]
        },
        {
          nameId: "Bounded",
          name: "Bounded",
          description: "The purpose and theme of the new system are clear.",
          checklists: [
            "Development stakeholders identified",
            "System purpose agreed",
            "System success clear",
            "Shared solution understanding exists",
            "Requirement's format agreed",
            "Requirements management in place",
            "Prioritization scheme clear",
            "Constraints identified & considered",
            "Assumptions clear"
          ]
        },
        {
          nameId: "Coherent",
          name: "Coherent",
          description:
            "The requirements provide a coherent description of the essential characteristics of the new system.",
          checklists: [
            "Requirements shared",
            "Requirements' origin clear",
            "Rationale clear",
            "Conflicts addressed",
            "Essential characteristics clear",
            "Requirements management in place",
            "Key usage scenarios explained",
            "Priorities clear",
            "Impact understood",
            "Team knows & agrees on what to deliver"
          ]
        },
        {
          nameId: "Acceptable",
          name: "Acceptable",
          description:
            "The requirements describe a system that is acceptable to the stakeholders.",
          checklists: [
            "Acceptable solution described",
            "Change under control",
            "Value to be realized clear",
            "Clear how opportunity addressed",
            "Testable"
          ]
        },
        {
          nameId: "Addressed",
          name: "Addressed",
          description:
            "Enough of the requirements have been addressed to satisfy the need for a new system in a way that is acceptable to the stakeholders.",
          checklists: [
            "Enough addressed to be acceptable",
            "Requirements and system match",
            "Value realized clear",
            "System worth making operational"
          ]
        },
        {
          nameId: "Fulfilled",
          name: "Fulfilled",
          description:
            "The requirements that have been addressed fully satisfy the need for a new system.",
          checklists: [
            "Stakeholders accept requirements",
            "No hindering requirements",
            "Requirements fully satisfied"
          ]
        }
      ],
      subalphaIds: []
    },
    {
      nameId: "SoftwareSystem",
      name: "Software System",
      description:
        "A system made up of software, hardware, and data that provides its primary value by the execution of the software.",
      workProducts: [],
      states: [
        {
          nameId: "ArchitectureSelected",
          name: "Architecture Selected",
          description:
            "An architecture has been selected that addresses the key technical risks and any applicable organizational constraints.",
          checklists: [
            "Architecture selection criteria agreed",
            "HW platforms identified",
            "Technologies selected",
            "System boundary known",
            "Decisions on system organization made",
            "Buy, build, reuse decisions made",
            "Key technical risks agreed to"
          ]
        },
        {
          nameId: "Demonstrable",
          name: "Demonstrable",
          description:
            "An executable version of the system is available that demonstrates the architecture is fit for purpose and supports functional and non-functional testing.",
          checklists: [
            "Key architectural characteristics demonstrated",
            "System exercised & performance measured",
            "Critical HW configurations demonstrated",
            "Critical interfaces demonstrated",
            "Integration with environment demonstrated",
            "Architecture accepted as fit-for-purpose"
          ]
        },
        {
          nameId: "Usable",
          name: "Usable",
          description:
            "The system is usable and demonstrates all of the quality characteristics of an operational system.",
          checklists: [
            "System can be operated",
            "System functionality tested",
            "System performance acceptable",
            "Defect levels acceptable",
            "System fully documented",
            "Release content known",
            "Added value clear"
          ]
        },
        {
          nameId: "Ready",
          name: "Ready",
          description:
            "The system (as a whole) has been accepted for deployment in a live environment.",
          checklists: [
            "User documentation available",
            "System accepted as fit-for-purpose",
            "Stakeholders want the system",
            "Operational support in place"
          ]
        },
        {
          nameId: "Operational",
          name: "Operational",
          description: "The system is in use in an operational environment.",
          checklists: [
            "System available for use  ",
            "System live",
            "Agreed service levels supported"
          ]
        },
        {
          nameId: "Retired",
          name: "Retired",
          description: "The system is no longer supported.",
          checklists: [
            "Replaced or discontinued",
            "No longer supported",
            "No authorized users",
            "Updates stopped"
          ]
        }
      ],
      subalphaIds: []
    }
  ],
  competencies: [
    {
      nameId: "StakeholderRepresentation",
      name: "Stakeholder Representation",
      description:
        "The ability to gather, communicate and balance the needs of other stakeholders, and accurately represent their views. The stakeholder representation competency is the empathic ability to stand in for and accurately reflect the opinions, rights and obligations of other stakeholders.",
      levels: [
        {
          name: "Assists",
          description:
            "Demonstrates a basic understanding of the concepts and can follow instructions."
        },
        {
          name: "Applies",
          description:
            "Able to apply the concepts in simple contexts by routinely applying the experience gained so far."
        },
        {
          name: "Masters",
          description:
            "Able to apply the concepts in most contexts and has the experience to work without supervision."
        },
        {
          name: "Adapts",
          description:
            "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts."
        },
        {
          name: "Innovates",
          description:
            "A recognized expert, able to extend the concepts to new contexts and inspire others."
        }
      ]
    },
    {
      nameId: "Analysis",
      name: "Analysis",
      description:
        "The ability to understand opportunities and their related stakeholder needs, and transform them into an agreed and consistent set of requirements. The analysis competency is the deductive ability to understand the situation, context, concepts and problems, identify appropriate high-level solutions, and evaluate and draw conclusions by applying logical thinking.",
      levels: [
        {
          name: "Assists",
          description:
            "Demonstrates a basic understanding of the concepts and can follow instructions."
        },
        {
          name: "Applies",
          description:
            "Able to apply the concepts in simple contexts by routinely applying the experience gained so far."
        },
        {
          name: "Masters",
          description:
            "Able to apply the concepts in most contexts and has the experience to work without supervision."
        },
        {
          name: "Adapts",
          description:
            "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts."
        },
        {
          name: "Innovates",
          description:
            "A recognized expert, able to extend the concepts to new contexts and inspire others."
        }
      ]
    },
    {
      nameId: "Development",
      name: "Development",
      description:
        "The ability to design and program effective software systems following the standards and norms agreed by the team. The development competency is the mental ability to conceive and produce a software system, or one of its elements, for a specific function or end. It enables a team to produce software systems that meet the requirements.",
      levels: [
        {
          name: "Assists",
          description:
            "Demonstrates a basic understanding of the concepts and can follow instructions."
        },
        {
          name: "Applies",
          description:
            "Able to apply the concepts in simple contexts by routinely applying the experience gained so far."
        },
        {
          name: "Masters",
          description:
            "Able to apply the concepts in most contexts and has the experience to work without supervision."
        },
        {
          name: "Adapts",
          description:
            "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts."
        },
        {
          name: "Innovates",
          description:
            "A recognized expert, able to extend the concepts to new contexts and inspire others."
        }
      ]
    },
    {
      nameId: "Testing",
      name: "Testing",
      description:
        "The ability to test a system, verifying that it is usable and that it meets the requirements. The testing competency is an observational, comparative, detective and destructive ability that enables the system to be tested.",
      levels: [
        {
          name: "Assists",
          description:
            "Demonstrates a basic understanding of the concepts and can follow instructions."
        },
        {
          name: "Applies",
          description:
            "Able to apply the concepts in simple contexts by routinely applying the experience gained so far."
        },
        {
          name: "Masters",
          description:
            "Able to apply the concepts in most contexts and has the experience to work without supervision."
        },
        {
          name: "Adapts",
          description:
            "Able to apply judgment on when and how to apply the concepts to more complex contexts. Can enable others to apply the concepts."
        },
        {
          name: "Innovates",
          description:
            "A recognized expert, able to extend the concepts to new contexts and inspire others."
        }
      ]
    }
  ],
  patterns: [
    {
      name: "Customer Engagement",
      nameId: "CustomerEngagement",
      description:
        "Customer Engagement patterns focus on the interface between the solution development endeavor and the customer space, such as roles and responsibilities. Apply customer engagement patterns to ensure: The “voice of the customer” drives solution priorities, End-user expertise is collaboratively engaged to help develop the solution, All key stakeholder representatives are actively and appropriately engaged.",
      alphas: [],
      activities: [],
      competencies: [],
      subpatternIds: ["ProductOwnership"]
    },
    {
      name: "Product Ownership",
      nameId: "ProductOwnership",
      description:
        "A single point of ownership for a product that provides rapid, empowered decisions and dispute arbitration regarding what should be built into the product. Having one person play this role (the “Product Owner”) provides the responsiveness needed for agile delivery, but this person must be able to represent all stakeholders and will need support from others in the team.",
      alphas: ["Stakeholders", "Opportunity"],
      activities: [],
      competencies: [],
      subpatternIds: []
    }
  ]
};
