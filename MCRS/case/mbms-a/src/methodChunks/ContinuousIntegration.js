export const ContinuousIntegration = {
  nameId: "ContinuousIntegration",
  name: "Continuous Integration",
  description:
    "Continuous integration (CI) is the practice of merging all developer working copies to a shared mainline several times a day. Continuous integration involves integrating early and often, so as to avoid the pitfalls of 'integration hell'.",
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
      nameId: "TrackProgress",
      name: "Track Progress",
      description: "Measure and assess the progress made by the team.",
      activities: [
        {
          nameId: "RegularlyCommit",
          name: "Regularly Commit",
          description:
            "By committing regularly, every committer can reduce the number of conflicting changes. Checking in a week's worth of work runs the risk of conflicting with other features and can be very difficult to resolve. Early, small conflicts in an area of the system cause team members to communicate about the change they are making.[1] Committing all changes at least once a day (once per feature built) is generally considered part of the definition of Continuous Integration. In addition performing a nightly build is generally recommended.[citation needed] These are lower bounds; the typical frequency is expected to be much higher.",
          entryCriterions: {
            alphas: ["CodeRepository.Initiated"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["CodeRepository.Progressed"],
            workProducts: []
          },
          competencies: ["Development.2"]
        }
      ]
    },
    {
      nameId: "OperateTheSystem",
      name: "Operate The System",
      description:
        "Support the use of the software system in the live environment.",
      activities: [
        {
          nameId: "AutomateBuild",
          name: "Automate Build",
          description:
            "A single command should have the capability of building the system. Many build tools, such as make, have existed for many years. Other more recent tools are frequently used in continuous integration environments. Automation of the build should include automating the integration, which often includes deployment into a production-like environment. In many cases, the build script not only compiles binaries, but also generates documentation, website pages, statistics and distribution media (such as Debian DEB, Red Hat RPM or Windows MSI files).",
          entryCriterions: {
            alphas: [],
            workProducts: ["Build.Setup"]
          },
          completionCriterions: {
            alphas: [],
            workProducts: ["Build.AutomatedlyBuilt"]
          },
          competencies: ["Development.2"]
        }
      ]
    },
    {
      nameId: "TestTheSystem",
      name: "Test The System",
      description:
        "Verify that the system produced meets the stakeholders’ requirements.",
      activities: [
        {
          nameId: "AutomateTest",
          name: "Automate Test",
          description:
            "Once the code is built, all tests should run to confirm that it behaves as the developers expect it to behave.[",
          entryCriterions: {
            alphas: [],
            workProducts: ["Build.Setup"]
          },
          completionCriterions: {
            alphas: [],
            workProducts: ["Build.AutomatedlyTested"]
          },
          competencies: ["Development.2", "Testing.2"]
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
      subalphaIds: ["CodeRepository"]
    },
    {
      nameId: "CodeRepository",
      name: "Code Repository",
      description:
        "A source-code repository is a file archive and web hosting facility where a large amount of source code, for software or for web pages, is kept, either publicly or privately. They are often used by open-source software projects and other multi-developer projects to handle various versions.",
      workProducts: [
        {
          nameId: "Build",
          name: "Build",
          description:
            "Working functional bundle of program from the code repository.",
          levelOfDetails: [
            "Setup",
            "AutomatedlyBuilt",
            "AutomatedlyTested",
            "AutomatedlyDeployed"
          ]
        }
      ],
      states: [
        {
          nameId: "Initiated",
          name: "Initiated",
          description:
            "Repository is initiated using an existing tools of version controls. Contributors have joined. Branch and workflow have been defined.",
          checklists: [
            "Tools has chosen and setup",
            "Contribotrs have joined",
            "Workflow have been defined"
          ]
        },
        {
          nameId: "Progressed",
          name: "Progressed",
          description: "Repository is moving with newer version each times.",
          checklists: [
            "Many new commits are made",
            "Pull requests are merged",
            "New branches are created"
          ]
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
      name: "Test In Clone of Production Environment",
      nameId: "TestInCloneOfProductionEnvironment",
      description:
        "Having a test environment can lead to failures in tested systems when they deploy in the production environment because the production environment may differ from the test environment in a significant way. However, building a replica of a production environment is cost prohibitive. Instead, the test environment, or a separate pre-production environment ('staging') should be built to be a scalable version of the production environment to alleviate costs while maintaining technology stack composition and nuances. Within these test environments, service virtualisation is commonly used to obtain on-demand access to dependencies (e.g., APIs, third-party applications, services, mainframes, etc.) that are beyond the team's control, still evolving, or too complex to configure in a virtual test lab.",
      alphas: ["Build"],
      activities: ["AutomateTest"],
      competencies: ["Testing"],
      subpatternIds: []
    }
  ]
};
