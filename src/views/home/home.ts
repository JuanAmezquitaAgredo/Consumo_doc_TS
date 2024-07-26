import { TableController } from "../../controllers/table_controller";
import { navigateTo } from "../../router";

export function homeView() {
    const $root = document.getElementById('root') as HTMLElement;
    $root.innerHTML = /*html*/`
    <h1>HOME</h1>
    <button id="logout">Salir</button>
    <input type="text" id="inputFilter">
    <span id="NumData"></span>
    <div id="tabla"></div>
    <button id="btnant">Anterior</button>
    <button id="btnsig">Siguiente</button>
    `;

    const csvtext = localStorage.getItem('data');
    const NumData = document.getElementById('NumData') as HTMLSpanElement;
    const filterInt = document.getElementById('inputFilter') as HTMLInputElement;


    const logout = document.getElementById('logout') as HTMLButtonElement;
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('data');
        navigateTo('/up-file');
    });

    if (csvtext) {
        const data = JSON.parse(csvtext);
        
        
        function updateTable(filteredData: any[]) {
            NumData.innerHTML = 'Se encontraron ' + filteredData.length + ' registros';
            const Table_Controller = new TableController();
            Table_Controller.cambiarPagina(1, filteredData);
            const table = document.getElementById('tabla') as HTMLElement;
            table.innerHTML = Table_Controller.createtable(filteredData, 1, 15);
        }

        
        updateTable(data);

        
        filterInt.addEventListener('input', (e) => {
            e.preventDefault();
            const datafilter = dataFilter(data);
            updateTable(datafilter);
        });  
    };

    function dataFilter(data: any[]) {
        const filterinput = document.getElementById('inputFilter') as HTMLInputElement;
        const filter = filterinput.value.toLowerCase();
        
        const datafilter = data.filter((item: any) => {
            const filt = item.municipio.toLowerCase().includes(filter) || 
            item.departamento.toLowerCase().includes(filter) || 
            item.region.toLowerCase().includes(filter) || 
            item.códigodanedeldepartamento.toLowerCase().includes(filter) || 
            item.códigodanedelmunicipio.toLowerCase().includes(filter);
            return filt;
        });
    
        return datafilter;
    }
}
