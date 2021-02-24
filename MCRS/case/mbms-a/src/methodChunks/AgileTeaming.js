export const AgileTeaming = {
  nameId: "AgileTeaming",
  name: "Agile Teaming",
  description:
    "A self-organizing team maximizes its performance by using a highly-collaborative teaming approach.",
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
  ],
  activitySpaces: [
    {
      nameId: "PrepareToDoTheWork",
      name: "Prepare to do the Work",
      description:
        "Set up the team and its working environment. Understand and commit to completing the work. Prepare to do the work to: Put the initial plans in place, Establish the initial way of working, Assemble and motivate the initial project team, Secure funding and resources.",
      activities: [
        {
          nameId: "TeamKickStart",
          name: "Team Kick-Start",
          description:
            "The team works together to clarify its mission, agree a strategy for achieving it and decide how they will work together as a team.",
          entryCriterions: {
            alphas: ["Team.Seeded"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Team.Formed", "WayOfWorking.PrinciplesEstablished"],
            workProducts: [
              "TeamMembership.CapacityEstablished",
              "TeamWayOfWorking.Outlined"
            ]
          },
          competencies: ["Leadership.3", "Management.2"]
        }
      ]
    },
    {
      nameId: "CoordinateActivity",
      name: "Coordinate Activity",
      description:
        "Co-ordinate and direct the team’s work. This includes all ongoing planning and re-planning of the work, and adding any additional resources needed to complete the formation of the team. Coordinate activity to: Select and prioritize work, Adapt plans to reflect results, Get the right people on the team, Ensure that objectives are met, Handle change.",
      activities: [
        {
          nameId: "CollaborateCommunicateCoordinate",
          name: "Collaborate, Communicate, Coordinate",
          description:
            "The team applies and evolves a way of working that maximizes levels of performance, communication and collaboration, and works to secure the facilities they need to do this.",
          entryCriterions: {
            alphas: ["Team.Formed", "WayOfWorking.PrinciplesEstablished"],
            workProducts: ["TeamWayOfWorking.Outlined"]
          },
          completionCriterions: {
            alphas: ["Team.Collaborating", "WayOfWorking.InPlace"],
            workProducts: ["TeamWayOfWorking.Outlined"]
          },
          competencies: ["Leadership.3", "Management.3"]
        }
      ]
    },
    {
      nameId: "SupportTheTeam",
      name: "Support the Team",
      description:
        "Help the team members to help themselves, collaborate and improve their way of working. Support the team to: Improve team working, Overcome any obstacles, Improve ways of working.",
      activities: [
        {
          nameId: "ShareKnowhow",
          name: "Share Knowhow",
          description:
            "The team uses techniques, such as pair-working and knowledge-sharing, to propagate skills across the team, and to hand over work to others when the need for this arises.",
          entryCriterions: {
            alphas: ["Team.Seeded", "WayOfWorking.PrinciplesEstablished"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Team.Performing", "WayOfWorking.WorkingWell"],
            workProducts: []
          },
          competencies: ["Leadership.2", "Management.2"]
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
      workProducts: [],
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
      workProducts: [],
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
      workProducts: [
        {
          nameId: "TestCase",
          name: "Test Case",
          description:
            "Defines test inputs and expected results to help evaluate whether a specific aspect of the system works correctly.",
          levelOfDetails: ["TestIdeasCaptured", "Scripted", "Automated"]
        }
      ],
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
      nameId: "Team",
      name: "Team",
      description:
        "A group of people actively engaged in the development, maintenance, delivery or support of a specific software system. One or more teams plan and perform the work needed to create, update and/or change the software system.",
      workProducts: [
        {
          nameId: "TeamMembership",
          name: "Team Membership",
          description:
            "Shows who is on the team and what percentage of their time is committed to the team. The people on the team are the one true source of all value, so absolute clarity regarding who is and is not dedicated to the team is crucial.",
          levelOfDetails: [
            "MembersIdentified",
            "CapacityEstablished",
            "ResponsibilitiesDefined"
          ]
        }
      ],
      states: [
        {
          nameId: "Seeded",
          name: "Seeded",
          description:
            "The team’s mission is clear and the know-how needed to grow the team is in place.",
          checklists: [
            "Mission defined",
            "Constraints known and defined",
            "Growth mechanisms in place",
            "Composition defined",
            "Responsibilities outlined",
            "Required commitment level clear",
            "Required competencies identified",
            "Size determined",
            "Governance rules defined",
            "Leadership model selected"
          ]
        },
        {
          nameId: "Formed",
          name: "Formed",
          description:
            "The team has been populated with enough committed people to start the mission.",
          checklists: [
            "Enough members recruited",
            "Roles understood",
            "How to work understood",
            "Members introduced",
            "Individual responsibilities accepted and aligned to competencies",
            "Members accepting work",
            "External collaborators identified",
            "Communication mechanisms defined",
            "Members commit to team"
          ]
        },
        {
          nameId: "Collaborating",
          name: "Collaborating",
          description: "The team members are working together as one unit.",
          checklists: [
            "Works as one unit",
            "Communication open and honest",
            "Focused on mission",
            "Members know each other"
          ]
        },
        {
          nameId: "Performing",
          name: "Performing",
          description: "The team is working effectively and efficiently.",
          checklists: [
            "Consistently meeting commitments",
            "Continuously adapting to change",
            "Addresses problems",
            "Rework and backtracking minimized",
            "Waste continuously eliminated"
          ]
        },
        {
          nameId: "Adjourned",
          name: "Adjourned",
          description:
            "The team is no longer accountable for carrying out its mission.",
          checklists: [
            "Responsibilities fulfilled",
            "Members available to other teams",
            "Mission concluded"
          ]
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
    },
    {
      nameId: "WayOfWorking",
      name: "Way of Working",
      description:
        "The tailored set of practices and tools used by a team to guide and support their work. The team evolves their way of working alongside their understanding of their mission and their working environment. As their work proceeds they continually reflect on their way of working and adapt it to their current context, if necessary.",
      workProducts: [
        {
          nameId: "TeamWayOfWorking",
          name: "Team Way of Working",
          description:
            "Captures in a clear, simple and visible way, statements from the team as to how they will work together to achieve their mission.",
          levelOfDetails: [
            "MissionClarified",
            "Outlined",
            "PracticesDescribed",
            "ProcessFullyDocumented"
          ]
        }
      ],
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
      subalphaIds: []
    }
  ],
  competencies: [
    {
      nameId: "Leadership",
      name: "Leadership",
      description:
        "The ability to inspire and motivate a group of people to achieve a successful conclusion to their work and to meet their objectives.",
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
      nameId: "Management",
      name: "Management",
      description:
        "The ability to coordinate, plan and track the work done by a team. The management competency is the administrative and organizational ability that enables the right things to be done at the right time to maximize a team’s chances of success.",
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
      name: "Cadence",
      nameId: "Cadence",
      description:
        "Cadence patterns provide guidance on how to maximize throughput by ensuring a smooth and even flow of work. Apply cadence patterns to: Use timeboxes effectively to limit work in progress and progressively complete the work in priority order, Ensure a sustainable and predictable flow of work so that past performance can be used as an accurate guide to future performance.",
      alphas: [],
      activities: [],
      competencies: [],
      subpatternIds: ["SustainablePace"]
    },
    {
      name: "Sustainable Pace",
      nameId: "SustainablePace",
      description:
        "The way of working must be sustainable over time. Adequate time must be built in for reflection and adaptation. The team is empowered to resist short-termism in the form of demands to “pull out all the stops” to achieve short-term milestones, if this is detrimental to the long-term health of the team and the endeavor, and would give a false impression of actual progress towards eventual success.",
      alphas: ["WayOfWorking"],
      activities: [],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Collaboration",
      nameId: "Collaboration",
      description:
        "Collaboration patterns provide guidance on working style, leadership and ownership. Apply collaboration patterns to: Allow teams to influence their own working style, Increase team productivity by facilitating effective communication, Enable the build-up of a high-trust environment through continuous information sharing and shared responsibilities, Maximize team communication and minimize management overhead.",
      alphas: [],
      activities: [],
      competencies: [],
      subpatternIds: [
        "SelfOrganizingTeam",
        "AgileFacilitator",
        "CollaborationSpace"
      ]
    },
    {
      name: "Self-Organizing Team",
      nameId: "SelfOrganizingTeam",
      description:
        "The team is acknowledged as the local experts who are best-placed to decide how to best go about achieving their mission, and to improve their approach over time, based on what they learn as they work together. The team is empowered to decide how it will work to achieve its goals and, in turn, takes full responsibility for striving to do what it needs to do, and to challenge whatever it needs to challenge, to maximize its performance and levels of success.",
      alphas: [],
      activities: ["ShareKnowhow", "CollaborateCommunicateCoordinate"],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Agile Facilitator",
      nameId: "AgileFacilitator",
      description:
        "Someone who helps the team apply agile values, principles and practices well to their own work context and team challenges. An Agile Facilitator has experience of applying agile in many different contexts and is skilled in helping others to think through and solve their own challenges. This role brings crucial focus and energy to ensuring that the facilities, tools and events that the team needs are well-organized.",
      alphas: [],
      activities: [
        "TeamKickStart",
        "ShareKnowhow",
        "CollaborateCommunicateCoordinate"
      ],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Collaboration Space",
      nameId: "CollaborationSpace",
      description:
        "High-performing teams need to be able to collaborate without any delays or barriers, such as a lack of places to meet and work together. One way to achieve this is to co-locate the team and stakeholder representatives, and provide dedicated work rooms, with plenty of wall-space, white-boards, etc. If physical co-location is not possible or desirable, then the challenge is to simulate this electronically, using tools, such as dedicated video-conferencing, web-cams, Wikis etc.",
      alphas: [],
      activities: ["CollaborateCommunicateCoordinate"],
      competencies: [],
      subpatternIds: []
    }
  ]
};
