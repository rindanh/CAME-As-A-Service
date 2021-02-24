export const AgileTimeboxing = {
  nameId: "AgileTimeboxing",
  name: "Agile Timeboxing",
  description:
    "Progress the work as a series of timeboxes, and assess and re-plan at the end of each timebox.",
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
  ],
  activitySpaces: [
    {
      nameId: "PrepareToDoTheWork",
      name: "Prepare to do the Work",
      description:
        "Set up the team and its working environment. Understand and commit to completing the work. Prepare to do the work to: Put the initial plans in place, Establish the initial way of working, Assemble and motivate the initial project team, Secure funding and resources.",
      activities: [
        {
          nameId: "ScheduletheTimeboxes",
          name: "Schedule the Timeboxes",
          description:
            "Put the dates in the diary when each timebox will start and end, typically through to the end of the project or through to the next major release or equivalent high-level milestone.",
          entryCriterions: {
            alphas: ["Work.Initiated"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Work.Prepared", "Timebox.Scheduled"],
            workProducts: []
          },
          competencies: ["Management.2"]
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
          nameId: "PlanATimebox",
          name: "Plan a Timebox",
          description:
            "The team is guided on the current priority objectives, and collaborates to plan the work and negotiate a viable and acceptable work plan.",
          entryCriterions: {
            alphas: ["Timebox.Scheduled"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Work.Prepared", "Timebox.Planned"],
            workProducts: [
              "ProgressBoard.WorkObjectivesVisible",
              "TimeboxPlan.ViablePlanOutlined"
            ]
          },
          competencies: ["Leadership.3", "Management.2"]
        }
      ]
    },
    {
      nameId: "TrackProgress",
      name: "Track Progress",
      description:
        "Measure and assess the progress made by the team. Track progress to: Evaluate the results of work done, Measure progress, Identify impediments.",
      activities: [
        {
          nameId: "ReviewATimebox",
          name: "Review a Timebox",
          description:
            "Review the outcomes of a timebox, in terms of objectives achieved, and assess progress made, so that plans can be adapted as needed.",
          entryCriterions: {
            alphas: [],
            workProducts: [
              "ProgressBoard.ProgressOfObjectivesVisible",
              "TimeboxPlan.ViablePlanOutlined"
            ]
          },
          completionCriterions: {
            alphas: ["Timebox.Reviewed", "Work.UnderControl"],
            workProducts: ["ProgressUpdate.ProgressAnalyzed"]
          },
          competencies: ["Leadership.3", "Management.2"]
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
          nameId: "In Agreement",
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
          nameId: "Satisfied for Deployment",
          name: "Satisfied for Deployment",
          description:
            "The minimal expectations of the stakeholder representatives have been achieved.",
          checklists: [
            "Stakeholder feedback provided",
            "System ready for deployment"
          ]
        },
        {
          nameId: "Satisfied in Use",
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
          nameId: "Solution Needed",
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
          nameId: "Value Established",
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
          nameId: "Benefit Accrued",
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
      nameId: "Team",
      name: "Team",
      description:
        "A group of people actively engaged in the development, maintenance, delivery or support of a specific software system. One or more teams plan and perform the work needed to create, update and/or change the software system.",
      workProducts: [],
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
      workProducts: [
        {
          nameId: "ProgressBoard",
          name: "Progress Board",
          description:
            "Makes the work to do and the progress in doing it visible, ideally as a big physical board in the area where the team works together.",
          levelOfDetails: [
            "ProgressColumnsDrawnUp",
            "WorkObjectivesVisible",
            "ProgressOfObjectivesVisible"
          ]
        },
        {
          nameId: "ProgressUpdate",
          name: "Progress Update",
          description:
            "Communicates progress made in achieving objectives and/or progressing towards milestones.",
          levelOfDetails: [
            "ProgressDataVisible",
            "ProgressAnalyzed",
            "TaskLevelEffortReported"
          ]
        }
      ],
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
      subalphaIds: ["Timebox"]
    },
    {
      nameId: "Timebox",
      name: "Timebox",
      description:
        "A short, fixed time period for which a focused plan can be built to achieve a set of specified objectives and, after which, progress can be assessed and plans adapted as needed.",
      workProducts: [
        {
          nameId: "TimeboxPlan",
          name: "Timebox Plan",
          description:
            "Describes how the team will work to achieve the timebox objectives. This might be captured as bullet points on flip-chart paper and then displayed near the Progress Board.",
          levelOfDetails: [
            "ObjectivesClear",
            "CapacityEstimated",
            "ViablePlanOutlined",
            "TasksEstimated"
          ]
        }
      ],
      states: [
        {
          nameId: "Scheduled",
          name: "Scheduled",
          description:
            "The timebox has been defined in terms of its start and end times.",
          checklists: [
            "The right timebox duration has been agreed (typically 2, 3 or 4 weeks) ",
            "Timeboxes have been scheduled into the future (typically up to a year or to an anticipated end date for the work) ",
            "Key timebox meetings are scheduled into the calendars of the required attendees "
          ]
        },
        {
          nameId: "Planned",
          name: "Planned",
          description:
            "There is a viable plan outlined for the timebox including objectives, team member availability, and what the team can commit to achieving in terms of completed work items.",
          checklists: [
            "The timebox that is starting now has been planned ",
            "The plan has been created by the people that will do the work ",
            "The plan is sufficiently detailed for it to be credible ",
            "The people doing the work genuinely believe the plan is credible and achievable "
          ]
        },
        {
          nameId: "Reviewed",
          name: "Reviewed",
          description:
            "The outcomes of the timebox have been reviewed in terms of the actual objectives achieved and work items completed.",
          checklists: [
            "The outcomes have been shown / demonstrated to the customers / accepting stakeholders ",
            "The acceptance status of the outcomes is clear ",
            "Any required changes or unacceptable aspects of the work have been flagged to factor into future plans ",
            "The proposed objectives for the next timebox have been reviewed and agreed "
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
      subpatternIds: ["RegularHeartbeart", "SMARTObjectives"]
    },
    {
      name: "Regular Heartbeat",
      nameId: "RegularHeartbeart",
      description:
        "A sequence of short (e.g. 2-to-4 weeks long), same-sized timeboxes is planned and executed. This enables the team to get into a regular work rhythm. It also simplifies progress reporting, scheduling stakeholder meetings and synchronizing with other teams. The timebox size must be right for the team and may need to be adjusted in the light of experience.",
      alphas: ["Timebox"],
      activities: [],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "SMART Objectives",
      nameId: "SMARTObjectives",
      description:
        "SMART Objectives are: Specific – it is clear what to do, Measurable – what done means, Achievable – it is seen as “doable“, Rewarding – it delivers value, Timebound – e.g. using a timebox. Agile timeboxes are planned, tracked and assessed with SMART objectives. Rewarding means meaningful and valuable to stakeholders, which in turn implies building new, releasable value into the product each and every timebox.",
      alphas: ["Timebox"],
      activities: [],
      competencies: [],
      subpatternIds: []
    }
  ]
};
