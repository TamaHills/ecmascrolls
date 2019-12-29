import { html, render } from 'htm/preact';
import { Editor } from './components/editor'
import '../scss/reset.scss';

const App = () => {
    return html`
        <${Editor}/>
    `
}

render(
    html`
        <${App} />
    `,
    document.getElementById('root') || document.body,
);
