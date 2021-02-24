const testProject = {
  name: "Test Project",
  provider: "company-a-ltd",
  description: "IS security chunks evaluation.",
  characteristics: [
    {
      id: "impact",
      rule: "maximum"
    },
    {
      id: "level-of-innovation",
      rule: "maximum"
    },
    {
      id: "expertise",
      rule: "minimum"
    },
    {
      id: "guidance",
      ref: "predefined taxonomy/heuristics/guidelines",
      rule: "preference_list",
      value: ["predefined taxonomy", "heuristics", "guidelines"]
    },
    {
      id: "approach",
      ref: "systemic/exploratory/explanatory",
      rule: "preference_list",
      value: ["systemic", "exploratory", "explanatory"]
    },
    {
      id: "formalism",
      ref: "formal/semi-formal/informal",
      rule: "preference_list",
      value: ["formal", "semi-formal", "informal"]
    }
  ]
};

const testProject2 = {
  name: "Test Project 2",
  description:
    "Add value to a product by incrementally extending it, ensuring it is usable, releasable and maintainable.",
  characteristics: [
    {
      id: "shortage-of-resources",
      ref: "human/means",
      rule: "exact",
      value: "human"
    },
    {
      id: "impact",
      ref: "default",
      rule: "preference_list",
      value: ["high", "low"]
    }
  ]
};
module.exports = { testProject, testProject2 };
