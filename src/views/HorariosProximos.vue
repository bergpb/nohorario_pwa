<template>
  <v-layout
    class="horarios"
    align-center
    justify-center
    fill-height
    row
    wrap>
    <v-flex xs12>
      <div v-if="successInicio == true || successFim == true">
        <h1>{{ horarioAtual }}</h1>
        <div v-if="successInicio == true">
          <p>Saindo de Caucaia: </p>
          <p>{{ horarioAnteriorInicio.inicio }} / {{ horarioProximoInicio.inicio }}</p>
          <p>Saindo de Fortaleza:</p>
          <p>{{ horarioAnteriorFim.fim }} / {{ horarioProximoFim.fim }}</p>
        </div>
        <div v-else-if="successFim == true">
          <p>Saindo de Fortaleza:</p>
          <p>{{ horarioAnteriorFim.fim }} / {{ horarioProximoFim.fim }}</p>
        </div>
        <div v-else>
          <p>Ops! Algo de errado aconteceu.</p>
        </div>
      </div>
      <div v-else>
        <h2>Ops!</h2>
        <p>Sem horários disponíveis para a linha selecionada.</p>
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
  methods: {
    getItem(){
      this.res = JSON.parse(localStorage.getItem(this.nomeLinha.arquivo));
      if (this.res != null){
        this.horarios = this.res[this.diaUtil]
        console.log(this.horarios)
      }
      else{
        //this.updateData()
        console.log('caiu no else')
      }
    },
    compareTimeInicio(horarioAtual){
      for(let i = 0; i < this.horarios.length; i++) {
          if (this.horarios[i].inicio >= this.horarioAtual) {
              this.horarioProximoInicio = this.linhas[i]
              this.horarioAnteriorInicio = this.linhas[i-1]
              this.successInicio = true
              break;
              }
          }
      },
    //erro aqui
    compareTimeFim(horarioAtual){
        for(let i = 0; i < this.horarios.length; i++) {
            if (this.horarios[i].fim >= this.horarioAtual) {
                this.horarioAnteriorFim = this.linhas[i-1]
                this.horarioProximoFim = this.linhas[i]
                this.successFim = true
                break;
                }
            }
        }
    },
  mounted () {
    this.nomeLinha = this.$route.params.item
    this.diaUtil = retornaDia();
    this.getItem();
    this.horarioAtual = moment().format('HH:mm');
    //this.compareTimeInicio(this.horarioAtual);
    //this.compareTimeFim(this.horarioAtual);
  },
}
</script>

<style scoped>

</style>
