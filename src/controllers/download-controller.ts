
export class DownloadController {

    convertToCSV(data: any[]): string {
        if (!data.length) {
            return '';
        }
        
        
        const headers = Object.keys(data[0]);
        
        
        const rows = data.map(row => 
            headers.map(header => JSON.stringify(row[header] || '')).join(',')
        );
        
        
        return [headers.join(','), ...rows].join('\n');
    }
    
    
    downloadCSV() {
        
        const csvtext = localStorage.getItem('downloadData');
        
        if (csvtext) {
            
            const data = JSON.parse(csvtext);
            
            
            const csv = this.convertToCSV(data);
            
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            
            
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.href = url;
            link.setAttribute('download', 'dataFilter.csv'); 
            
            
            document.body.appendChild(link);
            link.click();
            
            
            document.body.removeChild(link);
        } else {
            console.error('No hay datos en localStorage.');
        }
    }
}