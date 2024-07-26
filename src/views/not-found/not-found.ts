import { navigateTo } from "../../router";

export function notFoundView() {
    const $root = document.getElementById('root') as HTMLElement;
    $root.innerHTML = /*html*/`
    <h1>404 PAGINA NO ENCONTRADA</h1>
    <button id="back">Volver</button>
    `;

    const $back = document.getElementById('back') as HTMLButtonElement;
    $back.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/up-file');
    });
}