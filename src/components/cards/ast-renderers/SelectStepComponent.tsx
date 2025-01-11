import { SelectStep, VariableDecl } from "../../../dsl/language/generated/ast.js";
import { ConditionComponent } from "./ConditionComponent.js";
import { Var } from "./VariableComponent.js";

type SelectStepComponentProps = {
    step: SelectStep;
    variables: { [key: string]: VariableDecl | undefined };
};

const sourceToName = (source: string) => {
    if(source === "thebattlefield"){
        return "entireBattlefield";
    }
    if (source === "yourbattlefield"){
        return "playerBattlefield";
    }
    if (source === "opponentsbattlefield"){
        return "opponentBattlefield";
    }
    if (source === "yourhand"){
        return "playerHand";
    }
    if (source === "opponentshand"){
        return "opponentHand";
    }
    if (source === "yourgraveyard"){
        return "playerGraveyard";
    }
    if (source === "opponentsgraveyard"){
        return "opponentGraveyard";
    }
    if (source === "yourdeck"){
        return "playerDeck";
    }
    if (source === "opponentsdeck"){
        return "opponentDeck";
    }
    return "?";
}


export const SelectStepComponent: React.FC<SelectStepComponentProps> = ({ step, variables }) => {
    // fill the variable map with the variables from the step
    variables["variable"] = step.variable;
    console.log(variables);

    const source = step.source;
    console.log(source);

    return (
        <div className="font-mono text-sm bg-green-50 rounded p-1.5 border border-slate-200 w-full p-1">
            <Var>{step.variable.name}</Var>
            <span className="text-slate-600 px-1">=</span>
            <span className="text-purple-600">{step.auto ? "findAllCards" : "selectDialog"}</span>
            <span className="text-slate-600">(</span>
            <span className="text-slate-500">source=</span>
            <Var>{sourceToName(source)}</Var>
            {step.condition != null && (
                <>
                    <span className="text-slate-600">,</span>
                    <span className="text-slate-500">condition=</span>
                    <ConditionComponent condition={step.condition} variables={variables} />
                </>
            )}
            <span className="text-slate-600">)</span>
        </div>
    );
};