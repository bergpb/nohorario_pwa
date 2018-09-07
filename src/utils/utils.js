// functions to use in app

export function retornaDia(){
    let dias = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
    let dia = dias[new Date().getDay()-1];
    if (dia == 'sabado'){
        return dia
    }
    else if (dia == 'domingo'){
        return dia
    }
    else{
        dia = 'dias_uteis'
        return dia
    }
}