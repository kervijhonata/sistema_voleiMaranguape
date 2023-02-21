const DataHelpers = {

    // Convert long date to short : DD/MM/YYYY
    longDateToShort: function(longDate) {
                
        try {

            let dia = longDate.getDate()
            let mes = longDate.getMonth()
            let ano = longDate.getFullYear()
        
            dia < 9 ? dia = '0' + dia : dia
            mes < 9 ? mes = '0' + mes : mes
            
            return `${dia}/${mes}/${ano}`
        }
        catch(err) {

            return `00/00/0000`
        }
        
    }
}

module.exports = DataHelpers