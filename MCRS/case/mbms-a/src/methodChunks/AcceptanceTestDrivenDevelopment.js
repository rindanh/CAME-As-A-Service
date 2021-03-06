export const AcceptanceTestDrivenDevelopment = {
  nameId: "AcceptanceTestDrivenDevelopment",
  name: "Acceptance Test Driven Development",
  description:
    "Acceptance test–driven development (ATDD) is a development methodology based on communication between the business customers, the developers, and the testers. ATDD encompasses many of the same practices as specification by example (SBE),[2][3] behavior-driven development (BDD),[4] example-driven development (EDD), and support-driven development also called story test–driven development (SDD). All these processes aid developers and testers in understanding the customer's needs prior to implementation and allow customers to be able to converse in their own domain language. ATDD is closely related to test-driven development (TDD). It differs by the emphasis on developer-tester-business customer collaboration. ATDD encompasses acceptance testing, but highlights writing acceptance tests before developers begin coding.",
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
  ],
  activitySpaces: [
    {
      nameId: "Test the System",
      name: "TestTheSystem",
      description:
        "Verify that the system produced meets the stakeholders’ requirements.",
      activities: [
        {
          nameId: "DefineTestFormat",
          name: "Define Test Format",
          description:
            "Acceptance criteria are a description of what would be checked by a test. Given a requirement such as “As a user, I want to check out a book from the library”, an acceptance criterion might be 'Verify the book is marked as checked out.' An acceptance test for this requirement gives the details so that the test can be run with the same effect each time.",
          entryCriterions: {
            alphas: [],
            workProducts: ["TestFormat.Planned"]
          },
          completionCriterions: {
            alphas: [],
            workProducts: ["TestFormat.Defined"]
          },
          competencies: ["Test.2"]
        },
        {
          nameId: "CreateAcceptanceTest",
          name: "Create Acceptance Test",
          description:
            "Acceptance tests are created when the requirements are analyzed and prior to coding. They can be developed collaboratively by requirement requester (product owner, business analyst, customer representative, etc.), developer, and tester. Developers implement the system using the acceptance tests. Failing tests provide quick feedback that the requirements are not being met. The tests are specified in business domain terms. The terms then form a ubiquitous language that is shared between the customers, developers, and testers. Tests and requirements are interrelated. A requirement that lacks a test may not be implemented properly. A test that does not refer to a requirement is an unneeded test. An acceptance test that is developed after implementation begins represents a new requirement.",
          entryCriterions: {
            alphas: ["Requirements.Conceived", "AcceptanceTest.Planned"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Requirements.Coherent", "AcceptanceTest.Created"],
            workProducts: []
          },
          competencies: ["Analysis.2", "Test.3"]
        },
        {
          nameId: "EnsureProjectIsDone",
          name: "Ensure Project Is Done",
          description:
            "Decide whether project is done by applying the defined acceptance test by user.",
          entryCriterions: {
            alphas: ["AcceptanceTest.Created", "Work.UnderControl"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["AcceptanceTest.Implemented", "Work.Concluded"],
            workProducts: []
          },
          competencies: ["Analysis.2", "Test.2"]
        }
      ]
    }
  ],
  alphas: [
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
      subalphaIds: ["AcceptanceTest"]
    },
    {
      nameId: "AcceptanceTest",
      name: "Acceptance Test",
      description:
        "Acceptance tests are from the user's point of view – the external view of the system. They examine externally visible effects, such as specifying the correct output of a system given a particular input. Acceptance tests can verify how the state of something changes, such as an order that goes from 'paid' to 'shipped'. They also can check the interactions with interfaces of other systems, such as shared databases or web services. In general, they are implementation independent, although automation of them may not be.",
      workProducts: [
        {
          nameId: "TestFormat",
          name: "Test Format",
          description:
            "Domain specific language that defines the test. Acceptance tests usually follow this form: Given - A specified state of a system, When - An action or event occurs, Then - The state of the system has changed or an output has been produced.",
          levelOfDetails: ["Planned", "Defined"]
        }
      ],
      states: [
        {
          nameId: "Planned",
          name: "Planned",
          description:
            "Involved stakeholders are gathered in a meeting. They work together to define acceptance test",
          checklists: ["Involved stakeholders gathered", "Test Format defined"]
        },
        {
          nameId: "Created",
          name: "Created",
          description: "Acceptance test are created",
          checklists: ["Test Cases are defined"]
        },
        {
          nameId: "Implemented",
          name: "Implemented",
          description:
            "Acceptance test are used to define whether a feature or an application is completed or finished.",
          checklists: ["Acceptance Test implemented"]
        }
      ],
      subalphaIds: []
    },
    {
      nameId: "Work",
      name: "Work",
      description:
        "Activity involving mental or physical effort done in order to achieve a result. In the context of software engineering, work is everything that the team does to meet the goals of producing a software system matching the requirements and addressing the opportunity presented by the stakeholders. The work is guided by the practices that make up the team’s way-of-working.",
      workProducts: [],
      states: [
        {
          nameId: "Initiated",
          name: "Initiated",
          description: "The work has been requested.",
          checklists: [
            "Required result clear",
            "Constraints clear",
            "Funding stakeholders known",
            "Initiator identified",
            "Accepting stakeholders known",
            "Source of funding clear",
            "Priority clear"
          ]
        },
        {
          nameId: "Prepared",
          name: "Prepared",
          description:
            "All pre-conditions for starting the work have been met.",
          checklists: [
            "Commitment made",
            "Cost and effort estimated",
            "Resource availability understood",
            "Risk exposure understood",
            "Acceptance criteria established",
            "Sufficiently broken down to start",
            "Tasks identified and prioritized",
            "Credible plan in place",
            "Funding in place",
            "At least one team member ready",
            "Integration points defined"
          ]
        },
        {
          nameId: "Started",
          name: "Started",
          description: "The work is proceeding.",
          checklists: [
            "Development started",
            "Progress monitored",
            "Definition of done in place",
            "Tasks being progressed"
          ]
        },
        {
          nameId: "UnderControl",
          name: "Under Control",
          description:
            "The work is going well, risks are under control, and productivity levels are sufficient to achieve a satisfactory result.",
          checklists: [
            "Tasks being completed",
            "Unplanned work under control",
            "Risks under control",
            "Estimates revised to reflect performance",
            "Progress measured",
            "Re-work under control",
            "Commitments consistently met"
          ]
        },
        {
          nameId: "Concluded",
          name: "Concluded",
          description: "The work to produce the results has been concluded.",
          checklists: [
            "Only admin tasks left",
            "Results achieved",
            "Resulting system accepted"
          ]
        },
        {
          nameId: "Closed",
          name: "Closed",
          description:
            "All remaining housekeeping tasks have been completed and the work has been officially closed.",
          checklists: [
            "Lessons learned",
            "Metrics available",
            "Everything archived",
            "Budget reconciled & closed",
            "Team released",
            "No outstanding, uncompleted tasks"
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
        "This competency encapsulates the ability to understand opportunities and their related stakeholder needs, and transform them into an agreed and consistent set of requirements.",
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
        "This competency encapsulates the ability to test a system, verifying that it is usable and that it meets the requirements.",
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
