// functions to use in app

export function retornaDia(){
    let dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
    let dia = dias[new Date().getDay()];
    if (dia === 'sabado' || dia === 'domingo'){
        return dia
    }
    else {
        dia = 'dias_uteis'
        return dia
    }
}

export function retornaLinhasDisponiveis(){
  let linhas = [
    {
      linha: 'Capuan',
      pontoPartida: 'Capuan',
      arquivo: 'capuan-fortaleza'
    },
    {
      linha: 'Caucaia',
      pontoPartida: 'Sortidão',
      arquivo: 'caucaia-fortaleza'
    },
    {
      linha: 'Cumbuco',
      pontoPartida: 'Cumbuco',
      arquivo: 'cumbuco-fortaleza'
    },
    {
      linha: 'Planato BR-020',
      pontoPartida: 'Padre Júlio Maria',
      arquivo: 'planalto-br020'
    },
    {
      linha: 'Planalto Caucaia',
      pontoPartida: 'Planalto Caucaia',
      arquivo: 'planalto-fortaleza'
    },
  ]
  return linhas
}
