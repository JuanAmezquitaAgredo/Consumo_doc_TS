import { CountController } from "../../controllers/count_controller";
import { DownloadController } from "../../controllers/download-controller";
import { TableController } from "../../controllers/table_controller";
import { navigateTo } from "../../router";
import * as echarts from "echarts";

export function homeView() {
    const $root = document.getElementById('root') as HTMLElement;
    $root.innerHTML = /*html*/`
    <h1>DEPARTAMENTOS Y MUNICIPIOS <br> DE COLOMBIA</h1>
    <div id="home">
        <nav id="nav">
            <button id="logout">Salir</button>
            <input type="text" id="inputFilter" placeholder="Buscar...">
            <span id="NumData"></span>
        </nav>
        <div id="tabla"></div>
        <div id="btns">
            <div>
                <button id="btnant">Anterior</button>
                <button id="btnsig">Siguiente</button>
            </div>
            <div>
                <button id="btnCSV">Descargar CSV</button>
            </div>
        </div>
        <div id="chart" style="width: 100%; height: 400px;"></div>
    </div>
    
    `;

    const csvtext = localStorage.getItem('data');
    const NumData = document.getElementById('NumData') as HTMLSpanElement;
    const filterInt = document.getElementById('inputFilter') as HTMLInputElement;

    const logout = document.getElementById('logout') as HTMLButtonElement;
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
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
            localStorage.setItem('downloadData', JSON.stringify(datafilter));

            const countController = new CountController();
            const resultcount = countController.countMunicipiosByDepartment(datafilter);
            console.log(resultcount);

            function separateDepartmentCounts(departmentCount: { [department: string]: number }): { departments: string[], counts: number[] } {
                const departments = Object.keys(departmentCount);
                const counts = Object.values(departmentCount);
                return { departments, counts };
            }

            const departaments = JSON.stringify(separateDepartmentCounts(resultcount).departments);
            const counts = JSON.stringify(separateDepartmentCounts(resultcount).counts);
            localStorage.setItem('department', departaments);
            localStorage.setItem('counts', counts);

            const getOptionchart1 = () => {
                
                const departments = localStorage.getItem('department') ? JSON.parse(localStorage.getItem('department') || '[]') : [];
                const counts = localStorage.getItem('counts') ? JSON.parse(localStorage.getItem('counts') || '[]') : [];
                
                return {
                    xAxis: {
                        type: 'category',
                        data: departments 
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: counts, 
                            type: 'bar',
                            
                            tooltip: {
                                
                                formatter: function (params: any) {
                                    
                                    return `${params.name}<br>Municipios: ${params.value}`;
                                }
                            }
                        }
                    ],
                    
                    tooltip: {
                        trigger: 'axis', 
                        axisPointer: {
                            type: 'shadow' 
                        }
                    }
                };
            };
            
            const initchart = () => {
                const chart1 = echarts.init(document.querySelector("#chart") as HTMLElement);
                chart1.setOption(getOptionchart1());
            };
        
            initchart();

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

    //**Download CSV */

    const btnCSV = document.getElementById('btnCSV') as HTMLButtonElement;
    btnCSV.addEventListener('click', (e) => {
        const confirm = window.confirm('¿Desea descargar el archivo CSV?');
        if (!confirm) return;
        e.preventDefault();
        const downloadcsv = new DownloadController();
        downloadcsv.downloadCSV();
    });
    
    
}
