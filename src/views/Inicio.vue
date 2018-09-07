<template>
    <v-layout class="horarios" align-center justify-center fill-height row wrap>
        <v-flex xs12>
            <div v-if="successInicio == true || successFim == true">
                <h1>{{horarioAtual}}</h1>
                <div v-if="successInicio == true">
                    <p>Saindo de Caucaia: </p>
                    <p>{{horarioAnteriorInicio.inicio}} / {{horarioProximoInicio.inicio}}</p>
                    <p>Saindo de Fortaleza:</p>
                    <p>{{horarioAnteriorFim.fim}} / {{horarioProximoFim.fim}}</p>
                </div>
                <div v-else-if="successFim == true">
                    <p>Saindo de Fortaleza:</p>
                    <p>{{horarioAnteriorFim.fim}} / {{horarioProximoFim.fim}}</p>
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
  name: 'inicio',
  data () {
      return {
          horarioAtual: null,
          horarioProximoInicio: null,
          horarioAnteriorInicio: null,
          horarioProximoFim: null,
          horarioAnteriorFim: null,
          successInicio: false,
          successFim: false,
          linhas: [
          {
              fim: '05:50',
              inicio: '05:05'
            },
            {
              fim: '06:10',
              inicio: '05:25'
            },
            {
              fim: '06:35',
              inicio: '05:50'
            },
            {
              fim: '07:10',
              inicio: '06:15'
            },
            {
              fim: '07:35',
              inicio: '06:40'
            },
            {
              fim: '07:55',
              inicio: '07:05'
            },
            {
              fim: '-',
              inicio: '07:30'
            },
            {
              fim: '08:55',
              inicio: '08:05'
            },
            {
              fim: '09:30',
              inicio: '08:40'
            },
            {
              fim: '10:20',
              inicio: '09:30'
            },
            {
              fim: '11:10',
              inicio: '10:20'
            },
            {
              fim: '12:00',
              inicio: '11:10'
            },
            {
              fim: '12:35',
              inicio: '11:45'
            },
            {
              fim: '13:10',
              inicio: '12:20'
            },
            {
              fim: '13:45',
              inicio: '12:55'
            },
            {
              fim: '14:30',
              inicio: '13:40'
            },
            {
              fim: '15:20',
              inicio: '14:30'
            },
            {
              fim: '16:00',
              inicio: '15:10'
            },
            {
              fim: '16:30',
              inicio: '15:40'
            },
            {
              fim: '17:00',
              inicio: '16:15'
            },
            {
              fim: '17:30',
              inicio: '16:40'
            },
            {
              fim: '18:00',
              inicio: '17:15'
            },
            {
              fim: '18:30',
              inicio: '17:45'
            },
            {
              fim: '19:00',
              inicio: '18:15'
            },
            {
              fim: '19:30',
              inicio: '18:45'
            },
            {
              fim: '20:00',
              inicio: '19:15'
            },
            {
              fim: '20:30',
              inicio: '19:45'
            },
            {
              fim: '21:15',
              inicio: '20:30'
            },
            {
              fim: '22:00',
              inicio: '21:15'
            },
        ]
      }
    },
  methods: {
        compareTimeInicio(horarioAtual){
            for(let i = 0; i < this.linhas.length; i++) {
                if (this.linhas[i].inicio >= this.horarioAtual) {
                    this.horarioProximoInicio = this.linhas[i]
                    this.horarioAnteriorInicio = this.linhas[i-1]
                    this.successInicio = true
                    break;
                }
            }
        },
        //erro aqui
        compareTimeFim(horarioAtual){
            for(let i = 0; i < this.linhas.length; i++) {
                if (this.linhas[i].fim >= this.horarioAtual) {
                    this.horarioAnteriorFim = this.linhas[i-1]
                    this.horarioProximoFim = this.linhas[i]
                    this.successFim = true
                    break;
                }
            }
        }
    },
  mounted () {
        // this.horarioAtual = moment().format('HH:mm');
        this.horarioAtual = "20:00"
        this.compareTimeInicio(this.horarioAtual)
        this.compareTimeFim(this.horarioAtual)
    }
}
</script>

<style scoped>

</style>
