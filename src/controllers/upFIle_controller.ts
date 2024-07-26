import { navigateTo } from "../router";

export class UpFIleController {

    public listenFile(CSVFile:HTMLInputElement){
        CSVFile.addEventListener('change', (event) => {    
            const fileInt = event.target as HTMLInputElement | null;
            const fileInput = fileInt?.files as FileList;
            if (fileInput.length > 0) {
                const file = fileInput[0];
                const tipeFile = file.type;
                if (tipeFile !== 'text/csv') {
                    alert('El archivo debe ser .csv');
                    CSVFile.value = '';
                    return;
                }
                const reader = new FileReader();
    
                reader.onload = function (e) {
                    const text = e.target?.result as string;
                    const upfilecontroller = new UpFIleController();
                    upfilecontroller.processCSV(text);
                };
    
                reader.readAsText(file);
            }
        });
    }
    public processCSV(csvText: string){
        const lines = csvText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const headers = lines[0].split(',').map(header => header.trim().toLowerCase().replace(/\s+/g, ''));
        const result = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            const obj: { [key: string]: string } = {};
            headers.forEach((header, index) => {
                obj[header] = values[index];
            });
            return obj;
        });

        if(result.length > 0){
            alert('Se cargaron ' + result.length + ' registros');
            localStorage.setItem('data', JSON.stringify(result));
            navigateTo('/home');
        }
        else{
            alert('No se encontraron registros');
        }
    }
}