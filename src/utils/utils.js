export function retornaDia(){
    let dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
    let dia = dias[new Date().getDay()];
    if (dia === 'sabado' || dia === 'domingo'){
        return dia;
    }
    else {
        dia = 'dias_uteis';
        return dia;
    }
}

export function retornaTabAtiva(){
    let tab_ativa = null;
    let dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
    let dia = dias[new Date().getDay()];
    if (dia === 'sabado' || dia === 'domingo'){
        if (dia === 'sabado'){
          tab_ativa = 1;
        }
        else{
          tab_ativa = 2;
        }
    }
    else {
        tab_ativa = 0;
    }
    return tab_ativa;
}

export function retornaLinhasDisponiveis(){
  let linhas = [
    {
      linha: 'Capuan',
      pontoPartida: 'Capuan',
      arquivo: 'capuan-fortaleza',
      preco: 'R$ 3,40'
    },
    {
      linha: 'Caucaia',
      pontoPartida: 'Sortidão',
      arquivo: 'caucaia-fortaleza',
      preco: 'R$ 3,40'
    },
    {
      linha: 'Cumbuco',
      pontoPartida: 'Cumbuco',
      arquivo: 'cumbuco-fortaleza',
      preco: 'R$ 3,40'
    },
    {
      linha: 'Planalto BR-020',
      pontoPartida: 'Padre Júlio Maria',
      arquivo: 'planalto-br020',
      preco: 'R$ 3,40'
    },
    {
      linha: 'Planalto Caucaia',
      pontoPartida: 'Planalto Caucaia',
      arquivo: 'planalto-fortaleza',
      preco: 'R$ 3,40'
    },
    {
      linha: 'Metrópole 1',
      pontoPartida: 'Metrópole',
      arquivo: 'metropole1-fortaleza',
      preco: 'R$ 3,40'
    },
    {
      linha: 'Metrópole 2',
      pontoPartida: 'Metrópole',
      arquivo: 'metropole2-fortaleza',
      preco: 'R$ 3,40'
    },
  ];
  return linhas;
}

export function salvaLocalStorage(item, value){
  return localStorage.setItem(item, value);
}

export function retornaLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}
