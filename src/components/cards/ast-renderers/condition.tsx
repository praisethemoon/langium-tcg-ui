import { BinExpr, CardTypeConstant, ElementCategoryConstant, IntConstant, MonsterTraitConstant, ThisConstant, Variable, Condition, VariableDecl } from "../../../dsl/language/generated/ast";
import { Var } from "./variable";

interface ConditionComponentProps {
    condition: Condition;
    variables: { [key: string]: VariableDecl | undefined };
}

export const ConditionComponent: React.FC<ConditionComponentProps> = ({ condition, variables }) => {
    const renderExpr = (expr: Condition, idCounter: number): React.ReactNode => {
        if (!expr) return null;

        // Handle binary expressions
        if ("op" in expr) {
            const binExpr = expr as BinExpr;
            return (
                <span className="font-mono text-sm bg-slate-50 rounded p-1.5 border border-slate-200 flex items-center justify-center flex-wrap gap-1 mt-2">
                    {renderExpr(binExpr.left, idCounter+1)}
                    <span className="px-2 font-mono text-blue-600 bg-gray-300 rounded-md" id={`${idCounter}-op`}>{binExpr.op}</span>
                    {renderExpr(binExpr.right, idCounter+1)}
                </span>
            );
        }

        // Handle constants and variables
        let content: string;
        console.log("expr:", expr);
        if ("value" in expr) {
            if (expr.$type === "CardTypeConstant") {
                content = (expr as CardTypeConstant).value;
            } else if (expr.$type === "ElementCategoryConstant") {
                content = (expr as ElementCategoryConstant).value;
            } else if (expr.$type === "MonsterTraitConstant") {
                content = (expr as MonsterTraitConstant).value;
            } else if (expr.$type === "ThisConstant") {
                content = "this";
            } else if (expr.$type === "IntConstant") {
                content = String((expr as IntConstant).value);
            }
            else if (expr.$type === "Variable") {
                const variable = (expr.value) as Variable;
                
                // Shady ..
                const path: string = (variable as any).ref.$ref;
                const lastElement = path.split("/").pop();
                if(lastElement != null && variables[lastElement] != null){
                    content = variables[lastElement]?.name || "?";
                }
                else{
                    content = lastElement || "?";
                }

                if(variable.index != null){
                    content += `[${variable.index}]`;
                }
                if(variable.prop != null){
                    content += `.attack`;
                }
            }
            else {
                content = "unknown";
            }
            return <Var>{content}</Var>;
        }

        // Handle variables
        if (expr.$type === "Variable") {
            const variable = expr as Variable;
            let varContent = variable.ref?.ref?.name || "";
            if (variable.prop) {
                varContent += `.${variable.prop}`;
            }
            if (typeof variable.index === "number") {
                varContent += `[${variable.index}]`;
            }
            return <Var>{varContent}</Var>;
        }

        return null;279
    };

    return (
        <div className="font-mono text-sm bg-slate-50 rounded flex items-center flex-wrap gap-1 mt-2">
            {renderExpr(condition, 0)}
        </div>
    );
}; 