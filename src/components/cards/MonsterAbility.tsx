import { Ability, VariableDecl } from "../../dsl/language/generated/ast";
import { TriggerComponent } from "./ast-renderers/trigger";

type MonsterAbilityComponentProps = {
    ability: Ability;
};


export const MonsterAbilityComponent: React.FC<MonsterAbilityComponentProps> = ({ ability }) => {
    // an initial variable map will be 
    // populated with the variables as we traverse the ability's AST
    const initialVarMap: { [key: string]: VariableDecl | undefined } = {};

    return (
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md border border-gray-200 mt-2">
            <div className="flex items-center gap-2 mb-2">
                <h5 className="text-sm font-bold text-gray-800">{ability.name}</h5>
                <span className={`px-2 py-1 text-sm font-medium text-gray-600 ${ability.type == "passive" ? "bg-red-100" : "bg-green-100"} rounded-full`}>
                    {ability.type}
                </span>
            </div>
            {(ability.type == "passive") && (ability.trigger != null) && (
                <div className="flex flex-col border-b-2 border-b-gray-600 pb-2">
                    <p className="text-gray-600">
                        Trigger Condition: 
                    </p>
                    <TriggerComponent trigger={ability.trigger.event} variables={initialVarMap} />
                </div>
            )}
            <p className="text-gray-600 leading-relaxed">
                {ability.description}
            </p>
        </div>
    );
};