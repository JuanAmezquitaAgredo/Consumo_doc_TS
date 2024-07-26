
export class TableController {


    createtable(data: any[], pagina: number, itemsPorPagina: number): string {
        const startIndex = (pagina - 1) * itemsPorPagina;
        const pageData = data.slice(startIndex, startIndex + itemsPorPagina);
    
        let html = '<table border="1">';
        html += '<tr><th>Region</th><th>Municiopio</th><th>Departamento</th><th>Código DANE del Municipio</th><th>Código DANE del Departamento</th></tr>';
    
        pageData.forEach(object => {
            html += `<tr><td>${object.region}</td><td>${object.municipio}</td><td>${object.departamento}</td><td>${object.códigodanedelmunicipio}</td><td>${object.códigodanedeldepartamento}</td></tr>`;
        });
    
        html += '</table>';
    
        html += '<br/>';
        const btnant = document.getElementById('btnant') as HTMLButtonElement;
        const btnsig = document.getElementById('btnsig') as HTMLButtonElement;

        if(pagina === 1){
            btnant.disabled = true;
        }else{
            btnant.disabled = false;
        }

        if(startIndex + itemsPorPagina >= data.length){
            btnsig.disabled = true;
        }else{
            btnsig.disabled = false;
        }

        if (pagina > 1){
            btnant.addEventListener('click', () => {
                this.cambiarPagina((pagina - 1), data);
            });
        }
        if (startIndex + itemsPorPagina < data.length){
            btnsig.addEventListener('click', () => {
                this.cambiarPagina((pagina + 1), data);
            });
        }
        return html;
    }
    
    
    cambiarPagina(pagina: number, data: any[]) {
        const itemsPorPagina = 15; 
        const tabla = document.getElementById('tabla');
        if (tabla) {
            tabla.innerHTML = this.createtable(data, pagina, itemsPorPagina);
        }
    }
}