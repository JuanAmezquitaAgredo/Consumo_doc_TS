import { UpFIleController } from "../../controllers/upFIle_controller";

export function upFileView() {
    const $root = document.getElementById('root') as HTMLElement;
    $root.innerHTML = /*html*/`
    <h1>Lector de archivos .CSV</h1>
    <input type="file" id="file" accept=".csv">
    `;

    const csvFileInput = document.getElementById('file') as HTMLInputElement;
    const upFIleController = new UpFIleController();
    upFIleController.listenFile(csvFileInput);  
}