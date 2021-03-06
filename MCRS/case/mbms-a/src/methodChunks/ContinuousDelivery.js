export const ContinuousDelivery = {
  nameId: "ContinuousDelivery",
  name: "Continuous Delivery",
  description:
    "Continuous delivery (CD or CDE) is a software engineering approach in which teams produce software in short cycles, ensuring that the software can be reliably released at any time and, when releasing the software, doing so manually. It aims at building, testing, and releasing software with greater speed and frequency. The approach helps reduce the cost, time, and risk of delivering changes by allowing for more incremental updates to applications in production. A straightforward and repeatable deployment process is important for continuous delivery.",
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
  ],
  activitySpaces: [
    {
      nameId: "SupportTheTeam",
      name: "Support the Team",
      description:
        "Help the team members to help themselves, collaborate and improve their way of working",
      activities: [
        {
          nameId: "DefinePipeline",
          name: "Define Pipeline",
          description:
            "Define what's needed in the pipeline. Choose CICD tools that will be used.",
          entryCriterions: {
            alphas: ["Pipeline.Initiated"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Pipeline.Defined"],
            workProducts: []
          },
          competencies: ["Development.1"]
        },
        {
          nameId: "BuildPipeline",
          name: "Build Pipeline",
          description:
            "Create scripts that define the pipeline. Script is tools specific.",
          entryCriterions: {
            alphas: ["Pipeline.Defined"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Pipeline.Running"],
            workProducts: []
          },
          competencies: ["Development.2"]
        },
        {
          nameId: "AutomatePipeline",
          name: "Automate Pipeline",
          description:
            "Use tools to define trigger to automate pipeline. Pipeline will run based on triggers.",
          entryCriterions: {
            alphas: ["Pipeline.Running"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Pipeline.Automated"],
            workProducts: []
          },
          competencies: ["Development.3"]
        }
      ]
    }
  ],
  alphas: [
    {
      nameId: "WayOfWorking",
      name: "Way of Working",
      description:
        "The tailored set of practices and tools used by a team to guide and support their work. The team evolves their way of working alongside their understanding of their mission and their working environment. As their work proceeds they continually reflect on their way of working and adapt it to their current context, if necessary.",
      workProducts: [],
      states: [
        {
          nameId: "PrinciplesEstablished",
          name: "Principles Established",
          description:
            "The principles, and constraints, that shape the way-of-working are established.",
          checklists: [
            "Team actively support principles",
            "Stakeholders agree with principles",
            "Tool needs agreed",
            "Approach recommended",
            "Operational context understood",
            "Practice & tool constraints known"
          ]
        },
        {
          nameId: "FoundationEstablished",
          name: "Foundation Established",
          description:
            "The key practices, and tools, that form the foundation of the way of working are selected and ready for use.",
          checklists: [
            "Key practices & tools selected",
            "Practices needed to start work agreed",
            "Non-negotiable practices & tools identified",
            "Gaps between available and needed way of working understood",
            "Gaps in capability understood",
            "Integrated way of working available"
          ]
        },
        {
          nameId: "InUse",
          name: "In Use",
          description:
            "Some members of the team are using, and adapting, the way-of-working.",
          checklists: [
            "Practices & tools in use",
            "Regularly inspected",
            "Adapted to context",
            "Supported by team",
            "Feedback mechanisms in place",
            "Practices & tools support collaboration"
          ]
        },
        {
          nameId: "InPlace",
          name: "In Place",
          description:
            "All team members are using the way of working to accomplish their work.",
          checklists: [
            "Used by whole team",
            "Accessible to whole team",
            "Inspected and adapted by whole team"
          ]
        },
        {
          nameId: "WorkingWell",
          name: "Working Well",
          description:
            "The team’s way of working is working well for the team.",
          checklists: [
            "Predictable progress being made",
            "Practices naturally applied",
            "Tools naturally support way-of-working",
            "Continually tuned"
          ]
        },
        {
          nameId: "Retired",
          name: "Retired",
          description: "The way of working is no longer in use by the team.",
          checklists: ["No longer in use", "Lessons learned shared"]
        }
      ],
      subalphaIds: ["Pipeline"]
    },
    {
      nameId: "Pipeline",
      name: "Pipeline",
      description:
        "Set or commands that makes up several jobs to do. A set of validations through which a piece of software must pass on its way to release. Code is compiled if necessary and then packaged by a build server every time a change is committed to a source control repository, then tested by a number of different techniques (possibly including manual testing) before it can be marked as releasable.",
      workProducts: [],
      states: [
        {
          nameId: "Initiated",
          name: "Initiated",
          description:
            "Pipeline is going to be plan and implemented. Team has realized that they need an want to implement pipelining into their project.",
          checklists: [
            "The need of pipelining is identified",
            "Tools for pipelining has been considered and chosen"
          ]
        },
        {
          nameId: "Defined",
          name: "Defined",
          description:
            "Set of commands that makes up pipeline has been identified and defined.",
          checklists: ["Set of commands for pipeline is defined"]
        },
        {
          nameId: "Running",
          name: "Running",
          description:
            "Pipeline is already running and incorporated to the project.",
          checklists: [
            "Pipeline is running and helping the project",
            "Script of pipeline has been written"
          ]
        },
        {
          nameId: "Automated",
          name: "Automated",
          description: "Pipeline is automated and run based on some triggers",
          checklists: ["Triggers has been defined and implemented"]
        }
      ],
      subalphaIds: []
    }
  ],
  competencies: [
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
  patterns: [
    {
      name: "Use Development Testing Production Environment",
      nameId: "UseDevelopmentTestingProductionEnvironment",
      description:
        "Different environments used in development, testing and production can result in undetected issues slipping to the production environment.",
      alphas: ["Pipeline"],
      activities: ["DefinePipeline", "BuildPipeline", "AutomatePipeline"],
      competencies: ["Development"],
      subpatternIds: []
    }
  ]
};
