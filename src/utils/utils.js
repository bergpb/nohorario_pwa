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

export function retornaLinhasDisponiveis(){
  let linhas = [
    {
      linha: 'Capuan',
      arquivo: 'capuan-fortaleza'
    },
    {
      linha: 'Caucaia',
      arquivo: 'caucaia-fortaleza'
    },
    {
      linha: 'Cumbuco',
      arquivo: 'cumbuco-fortaleza'
    },
    {
      linha: 'Planato BR-020',
      arquivo: 'planalto-br020'
    },
    {
      linha: 'Planalto Caucaia',
      arquivo: 'planalto-fortaleza'
    },
  ]
  return linhas
}
