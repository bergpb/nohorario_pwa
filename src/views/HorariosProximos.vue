<template>
  <v-layout
    class="horarios"
    align-center
    justify-center
    fill-height
    row
    wrap>
    <v-flex xs12>
      <v-layout
        class="horarios"
        align-center
        justify-center
        wrap
        fill-height
        v-if="successInicio == true || successFim == true">
        <div v-if="successInicio == true">
            <h1>{{ horarioAtual }}</h1>
            <table width="100px">
                <tr style="margin-right:10px">
                    <td><strong>Caucaia</strong></td>
                    <td><strong>Fortaleza</strong></td>
                </tr>
                <tr style="margin-right:10px">
                    <td>{{ horarioAnteriorInicio }}</td>
                    <td>{{ horarioProximoInicio }}</td>
                </tr>
                <tr style="margin-right:10px">
                    <td>{{ horarioAnteriorFim }}</td>
                    <td>{{ horarioProximoFim }}</td>
                </tr>
            </table>
        </div>
        <div v-else-if="successFim == true">
          <h1>{{ horarioAtual }}</h1>
          <h3>Saindo de Fortaleza:</h3>
          <p>{{ horarioAnteriorFim }} / {{ horarioProximoFim }}</p>
        </div>
        <div v-else>
          <h1>{{ horarioAtual }}</h1>
          <p>Ops! Algo de errado aconteceu.</p>
        </div>
      </v-layout>
      <div v-else>
        <h1>{{ horarioAtual }}</h1>
        <br>
        <p><strong>Ops! <br> Sem horários disponíveis para a linha selecionada.<br>
        Tente selecionar outra linha.</strong></p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { retornaDia } from '../utils/utils.js'
const moment = require('moment')

export default {
  name: 'horariosproximos',
  data () {
      return {
          horarioAtual: null,
          horarioProximoInicio: null,
          horarioAnteriorInicio: null,
          horarioProximoFim: null,
          horarioAnteriorFim: null,
          successInicio: false,
          successFim: false,
          horarios: false,
          diaUtil: null,
          nomeLinha: null,
        }
    },
  mounted () {
    this.nomeLinha = this.$route.params.item
    this.diaUtil = retornaDia();
    this.getItem();
    this.horarioAtual = moment().format('HH:mm');
    this.compareTimeInicio(this.horarioAtual);
    this.compareTimeFim(this.horarioAtual);
  },
  methods: {
    getItem(linha){
      this.res = JSON.parse(localStorage.getItem(this.nomeLinha.arquivo));
      if (this.res != null){
        this.horarios = this.res[this.diaUtil];
      }
      else {
        //this.updateData();
        console.log('Atualizando Dados com diretamente com a api.');
      }
    },
    compareTimeInicio(horarioAtual){
      for(let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].inicio >= this.horarioAtual && this.horarios[i].inicio.length >= 4) {
          this.horarioProximoInicio = this.horarios[i].inicio
          this.horarioAnteriorInicio = this.horarios[i-1].inicio
          console.log('Início: ' + this.horarioAnteriorInicio + ' / ' + this.horarioProximoInicio)
          this.successInicio = true
          break;
        }
      }
    },
    compareTimeFim(horarioAtual){
      for(let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].fim >= this.horarioAtual && this.horarios[i].fim.length >= 4) {
          this.horarioProximoFim = this.horarios[i].fim
          this.horarioAnteriorFim = this.horarios[i-1].fim
          console.log('Fim: ' + this.horarioAnteriorFim + ' / ' + this.horarioProximoFim)
          this.successFim = true
          break;
        }
      }
    },
  }
}
</script>

<style scoped>
</style>
