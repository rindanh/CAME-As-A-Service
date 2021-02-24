export const DailyStandUp = {
  nameId: "DailyStandUp",
  name: "Daily Stand-Up",
  description:
    "Use short, daily whole-team meetings to coordinate the work of the team and raise impediments.",
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
  ],
  activitySpaces: [
    {
      nameId: "CoordinateActivity",
      name: "Coordinate Activity",
      description:
        "Co-ordinate and direct the team’s work. This includes all ongoing planning and re-planning of the work, and adding any additional resources needed to complete the formation of the team. Coordinate activity to: Select and prioritize work, Adapt plans to reflect results, Get the right people on the team, Ensure that objectives are met, Handle change.",
      activities: [
        {
          nameId: "HoldADailyStandUp",
          name: "Hold a Daily Stand-Up",
          description:
            "The team meets every day, same time and place, to assess progress, coordinate activity, and raise and action impediments. The meeting is timeboxed, typically to 15 minutes.",
          entryCriterions: {
            alphas: ["Impediment.Raised"],
            workProducts: []
          },
          completionCriterions: {
            alphas: ["Work.UnderControl", "Impediment.Owned"],
            workProducts: []
          },
          competencies: ["Leadership.2", "Management.2"]
        }
      ]
    }
  ],
  alphas: [
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
      subalphaIds: ["Impediment"]
    },
    {
      nameId: "Impediment",
      name: "Impediment",
      description:
        "Something that is preventing or slowing productive progress.",
      workProducts: [],
      states: [
        {
          nameId: "Raised",
          name: "Raised",
          description:
            "The impediment has been identified, surfaced, verbalized or otherwise communicated.",
          checklists: [
            "An impediment has been identified that is slowing or preventing progress ",
            "The impediment has been shared, communciated or flagged for discussion "
          ]
        },
        {
          nameId: "Owned",
          name: "Owned",
          description:
            "There is clear ownership of the impediment in terms of an individual or sub-team that has taken primary responsibility for its removal.",
          checklists: [
            "It has been agreed which team member of members should take ownership of the task of removing the impediment "
          ]
        },
        {
          nameId: "Resolved",
          name: "Resolved",
          description:
            "The impediment has been cleared or removed so that the work that was being impeded can now be moved forward again efficiently and effectively.",
          checklists: [
            "The impediment has been removed such that it is no longer blocking or slowing progress "
          ]
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
      name: "Collaboration",
      nameId: "Collaboration",
      description:
        "Collaboration patterns provide guidance on working style, leadership and ownership. Apply collaboration patterns to: Allow teams to influence their own working style, Increase team productivity by facilitating effective communication, Enable the build-up of a high-trust environment through continuous information sharing and shared responsibilities, Maximize team communication and minimize management overhead.",
      alphas: [],
      activities: [],
      competencies: [],
      subpatternIds: ["RoundRobinStandUp", "BoardDrivenStandUp"]
    },
    {
      name: "Round-Robin Stand-Up",
      nameId: "RoundRobinStandUp",
      description:
        "A round-robin approach ensures that everyone has a chance to speak. The team usually gathers around the progress board. Each team member speaks in turn and answers three questions: What did I do yesterday? What am I doing today? What are my impediments?. Actions to remove Impediments are agreed and owned, but longer discussion points are off-lined until after the whole-team meeting.",
      alphas: [],
      activities: ["HoldADailyStandUp"],
      competencies: [],
      subpatternIds: []
    },
    {
      name: "Board-Driven Stand-Up",
      nameId: "BoardDrivenStandUp",
      description:
        "Use the progress board to drive the stand-up. Visit in-progress items in priority order, starting with the top priority ones closest to being done. Focus on what needs to happen to move the item towards completion. Everyone should provide an update because all work should be on the board, but a quick round robin “any other business” at the end ensures everyone gets to speak and flushes out any work being done that is not on the board.",
      alphas: [],
      activities: ["HoldADailyStandUp"],
      competencies: [],
      subpatternIds: []
    }
  ]
};
