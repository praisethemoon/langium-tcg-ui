import { Effect, EffectStep, VariableDecl } from "../../../dsl/language/generated/ast";
import { ExpressionComponent, getVariableName } from "./ExpressionComponent";
import { Var } from "./VariableComponent";

type EffectStepComponentProps = {
    step: EffectStep;
    variables: { [key: string]: VariableDecl | undefined };
};

const TextOnlyEffect: React.FC<{ name: string }> = ({ name }) => {
    return <>
        <span className="text-purple-600">{name}</span>
        <span className="text-slate-600">(</span>
        <span className="text-slate-600">)</span>
    </>
}

const ChangeTargetEffect: React.FC<{ effect: Effect, variables: { [key: string]: VariableDecl | undefined } }> = ({ effect, variables }) => {
    const from = getVariableName(effect.target!, variables);
    const to = getVariableName(effect.newTarget!, variables);

    return <>
        <span className="text-purple-600">changeTargetTo</span>
        <span className="text-slate-600">(</span>
        <span className="text-slate-500">from=</span>
        <span className="text-purple-600"><Var>{from}</Var></span>
        <span className="text-slate-600">, </span>
        <span className="text-slate-500">to=</span>
        <span className="text-purple-600"><Var>{to}</Var></span>
        <span className="text-slate-600">)</span>
    </>
}

export const  BuffStatEffect: React.FC<{ effect: Effect, variables: { [key: string]: VariableDecl | undefined } }> = ({ effect, variables }) => {
    const target = getVariableName(effect.target!, variables);
    const stat = effect.stat;
    const amount = effect.amount;

    let name = ""
    if (effect.action == "increase"){
        name = "increase"
    } else if (effect.action == "decrease"){
        name = "decrease"
    }

    if (stat == "attack"){
        name += "Attack"
    } else if (stat == "hp"){
        name += "HP"
    }


    return <>
        <span className="text-purple-600">{name}</span>
        <span className="text-slate-600">(</span>
        <span className="text-slate-500">target=</span>
        <span className="text-purple-600"><Var>{target}</Var></span>
        <span className="text-slate-600">,</span>
        <span className="text-slate-500">amount=</span>
        <span className="text-purple-600">{
            typeof amount == "number" ? amount : <ExpressionComponent expr={amount!} idCounter={0} variables={variables} />
        }</span>
        <span className="text-slate-600">)</span>
    </>
}

export const EffectStepComponent: React.FC<EffectStepComponentProps> = ({ step, variables }) => {
    const effect: Effect = step.effect;
    console.log("effect", effect);

    return (
        <div className="text-sm bg-red-50 rounded p-1.5 border border-slate-200 w-full mt-2">
            {effect.action == "cancel" && effect.cancel == "attack" && <TextOnlyEffect name="cancelAttack" />}
            {effect.action == "cancel" && effect.cancel == "effect" && <TextOnlyEffect name="cancelEffect" />}
            {effect.action == "change" && <ChangeTargetEffect effect={effect} variables={variables} />}
            {((effect.action == "increase") || (effect.action == "decrease") )&& <BuffStatEffect effect={effect} variables={variables} />}
        </div>
    );
};