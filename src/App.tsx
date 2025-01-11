import { DocumentChange, Editor } from './components/Editor'
import { useState } from 'react';
import { DocumentState } from 'langium';
import { QuestionableCard } from './components/cards/QuestionableCard';
import { Card } from './components/cards/Card';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { BaseCard } from './dsl/language/generated/ast';

function App() {
    const [cards, setCards] = useState<BaseCard[]>([]);
    const [validated, setValidated] = useState(false);

    const onChange = (change: DocumentChange) => {
        console.log("Editor content changed:", change);
        setCards([JSON.parse(change.content[0])]);

        const hasErrors = (change.diagnostics.some(d => d.severity === 1) && (change.diagnostics.length > 0));
        console.log("hasErrors:", hasErrors);
        console.log("state:", change.state);
        console.log("validated:", (change.state == DocumentState.Validated) && !hasErrors);
        setValidated(
            (change.state == DocumentState.Validated) && !hasErrors
        );
    };

    return (
        <div className="w-screen h-screen flex flex-row">
            <Allotment>
                <Editor onLoad={(editor) => {
                    const lc = editor.getEditorWrapper()?.getLanguageClient();
                    if (!lc) throw new Error("Language client not found");
                    lc.onNotification("browser/DocumentChange", onChange);
                }} style={{ width: "100%", height: "100%" }} />
                <Allotment vertical={true}>
                    <div className="h-full w-full overflow-y-auto p-4">
                        {!validated && <QuestionableCard />}
                        {validated && <Card card={cards[0]} />}
                    </div>
                </Allotment>
            </Allotment>
        </div>
    )
}

export default App
