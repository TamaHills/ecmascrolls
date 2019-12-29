import { html } from 'htm/preact';
import { useEffect, useRef, Ref } from 'preact/hooks';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const createEnviroment = () => {
    //@ts-ignore
    self.MonacoEnvironment = {
        getWorkerUrl: (moduleId: any, label: string) => {
            console.log(moduleId);
            if (label === 'json') {
                return './json.worker.js';
            }
            if (label === 'css') {
                return './css.worker.js';
            }
            if (label === 'html') {
                return './html.worker.js';
            }
            if (label === 'typescript' || label === 'javascript') {
                return './ts.worker.js';
            }
            return './editor.worker.js';
        },
    };
};

const monacoInit = (editor: Ref<HTMLElement>) => {
    monaco.editor.create(editor.current, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
            '\n',
        ),
        language: 'javascript',
    });
};

export const Editor = () => {
    let initialState: any = undefined;
    let editor = useRef(initialState);

    let editorRef = (div: HTMLElement) => {
        editor.current = div;
    };

    useEffect(() => {
        if (editor) {
            createEnviroment();
            monacoInit(<Ref<HTMLElement>>editor);
        }
    }, [editor]);

    let style = { height: '100vh', maxWidth: '100vw' };

    return html`
        <div style=${style} ref=${editorRef} />
    `;
};
