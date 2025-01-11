import { hookstate } from "@hookstate/core";
import { BaseCard } from "../dsl/language/generated/ast";

export const globalCardState = hookstate<BaseCard[]>([]);