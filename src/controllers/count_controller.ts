import { DataItem } from "../interfaces/interfaces";

export class CountController {

    countMunicipiosByDepartment(data: DataItem[]): { [department: string]: number } {
        // Objeto para almacenar la cantidad de municipios por departamento
        const departmentCount: { [department: string]: number } = {};
    
        // Recorre los datos y cuenta los municipios por departamento
        data.forEach(item => {
            const departamento = item.departamento;
            if (departmentCount[departamento]) {
                departmentCount[departamento]++;
            } else {
                departmentCount[departamento] = 1;
            }
        });
    
        return departmentCount;
    }
}