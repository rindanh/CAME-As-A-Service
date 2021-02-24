import { AcceptanceTestDrivenDevelopment } from "./AcceptanceTestDrivenDevelopment";
import { AgileDevelopment } from "./AgileDevelopment";
import { AgileRetrospective } from "./AgileRetrospective";
import { AgileTeaming } from "./AgileTeaming";
import { AgileTimeboxing } from "./AgileTimeboxing";
import { BehaviorDrivenDevelopment } from "./BehaviorDrivenDevelopment";
import { BigDesignUpFront } from "./BigDesignUpFront";
import { ContinuousDelivery } from "./ContinuousDelivery";
import { ContinuousIntegration } from "./ContinuousIntegration";
import { PairProgramming } from "./PairProgramming";
import { ProductBacklog } from "./ProductBacklog";
import { ProductOwnership } from "./ProductOwnership";
import { SpecificationByExample } from "./SpecificationByExample";
import { TestDrivenDevelopment } from "./TestDrivenDevelopment";

const baseUrl = "http://localhost:3001/";

const arr = [
  AcceptanceTestDrivenDevelopment,
  AgileDevelopment,
  AgileRetrospective,
  AgileTeaming,
  AgileTimeboxing,
  BehaviorDrivenDevelopment,
  BigDesignUpFront,
  ContinuousDelivery,
  ContinuousIntegration,
  PairProgramming,
  ProductBacklog,
  ProductOwnership,
  SpecificationByExample,
  TestDrivenDevelopment
];

const url = arr.map(e => ({ ...e, url: baseUrl + e.nameId }));

export const METHOD_CHUNKS = {
  AcceptanceTestDrivenDevelopment: url[0],
  AgileDevelopment: url[1],
  AgileRetrospective: url[2],
  AgileTeaming: url[3],
  AgileTimeboxing: url[4],
  BehaviorDrivenDevelopment: url[5],
  BigDesignUpFront: url[6],
  ContinuousDelivery: url[7],
  ContinuousIntegration: url[8],
  PairProgramming: url[9],
  ProductBacklog: url[10],
  ProductOwnership: url[11],
  SpecificationByExample: url[12],
  TestDrivenDevelopment: url[13],
  all: url.map(e => e.nameId)
};
