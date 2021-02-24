export const BigDesignUpFront = {
  nameId: "BigDesignUpFront",
  name: "Big Design Up Front",
  description:
    "Big Design Up Front (BDUF) is a software development approach in which the program's design is to be completed and perfected before that program's implementation is started. It is often associated with the waterfall model of software development. Proponents of waterfall model argue that time spent in designing is a worthwhile investment, with the hope that less time and effort will be spent fixing a bug in the early stages of a software product's lifecycle than when that same bug is found and must be fixed later. That is, it is much easier to fix a requirements bug in the requirements phase than to fix that same bug in the implementation phase, as to fix a requirements bug in the implementation phase requires scrapping at least some of the implementation and design work which has already been completed.",
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
  ],
  activitySpaces: [
    {
      nameId: "ShapeTheSystem",
      name: "Shape The System",
      description:
        " Shape the system so that it is easy to develop, change and maintain, and can cope with current and expected future demands. This includes the overall design and architecting of the system to be produced.",
      activities: [
        {
          nameId: "DesignTheSystemUpFront",
          name: "Design The System Up Front",
          description:
            "Understand software requirements and then design the system. Designing system consists of creating documentation and UML diagram that represents the behavior of the software. This step is done before the software implementation and only once.",
          entryCriterions: {
            alphas: [],
            workProducts: ["UMLDiagram.Planned"]
          },
          completionCriterions: {
            alphas: ["SoftwareSystem.ArchitectureSelected"],
            workProducts: ["UMLDiagram.Designed"]
          },
          competencies: ["Analysis.2", "Development.3"]
        }
      ]
    },
    {
      nameId: "ImplementTheSystem",
      name: "Implement The System",
      description:
        "Build a system by implementing, testing and integrating one or more system elements. This includes bug fixing and unit testing.",
      activities: [
        {
          nameId: "ImplementSystemUntilDone",
          name: "Implement System Until Done",
          description:
            "Implement the system based on design (functional/non-functional requirement, UML diagram, etc). Implementation phase is being worked on until the project is done.",
          entryCriterions: {
            alphas: ["SoftwareSystem.ArchitectureSelected"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["SoftwareSystem.Ready"],
            workProducts: []
          },
          competencies: ["Development.2"]
        }
      ]
    }
  ],
  alphas: [
    {
      nameId: "SoftwareSystem",
      name: "Software System",
      description:
        "A system made up of software, hardware, and data that provides its primary value by the execution of the software.",
      workProducts: [
        {
          nameId: "UMLDiagram",
          name: "UML Diagram",
          description:
            "UML is an acronym that stands for Unified Modeling Language. Simply put, UML is a modern approach to modeling and documenting software. In fact, it’s one of the most popular business process modeling techniques. It is based on diagrammatic representations of software components. As the old proverb says: “a picture is worth a thousand words”. By using visual representations, we are able to better understand possible flaws or errors in software or business processes.",
          levelOfDetails: ["Planned", "Designed"]
        }
      ],
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
    }
  ],
  patterns: []
};
