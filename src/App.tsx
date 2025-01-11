import { DocumentChange, Editor } from './components/Editor'
import { BaseCard } from './dsl/language/generated/ast';
import { useState } from 'react';
import { DocumentState } from 'langium';
import { QuestionableCard } from './components/cards/QuestionableCard';
import { Card } from './components/cards/Card';

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
            <div className="flex flex-col items-center justify-center h-[100%] w-[50%] border-r border-r-black-400">
                <Editor onLoad={(editor) => {
                    const lc = editor.getEditorWrapper()?.getLanguageClient();
                    if (!lc) throw new Error("Language client not found");
                    lc.onNotification("browser/DocumentChange", onChange);
                }} style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="flex flex-col items-center justify-center h-[100%] w-[50%]">
                {!validated && <QuestionableCard />}
                {validated && <Card card={cards[0]} />}
            </div>
        </div>
    )
}

export default App
