import { DataItem } from "../interfaces/interfaces";

export class CountController {

    countMunicipiosByDepartment(data: DataItem[]): { [department: string]: number } {

        const departmentCount: { [department: string]: number } = {};
    
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