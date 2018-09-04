<template>
    <v-layout class="horarios" align-center justify-center fill-height row wrap>
        <v-flex xs12>
            <h1>{{horarioAtual}}</h1>
            <div v-if="horarioAnterior && horarioProximo != null">
                <p>Aqui devo mostrar o saindo de caucaia (anterior e proximo - inicio) - {{horarioAnterior.inicio}} / {{horarioAnterior.fim}}</p>
                <p>Aqui devo mostrar o saindo de fortaleza (anterior e proximo - fim) - {{horarioProximo.inicio}} / {{horarioProximo.fim}}</p>
            </div>
            <div v-else>
                <p>Buscando...</p>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
const moment = require('moment')

export default {
  name: 'inicio',
  data () {
      return {
          horarioAtual: null,
          horarioProximo: null,
          horarioAnterior: null,
          linhas: [
          {
            inicio: '16:20',
            fim: '17:20'
          },
          {
            inicio: '17:20',
            fim: '18:20'
          },
          {
            inicio: '18:20',
            fim: '19:20'
          },
          {
            inicio: '19:20',
            fim: '20:20'
          },
          {
            inicio: '20:20',
            fim: '21:20'
          },
          {
            inicio: '22:20',
            fim: '23:20'
          },
          {
            inicio: '23:20',
            fim: '01:20'
          },
        ]
      }
    },
  methods: {
        compareTime(horarioAtual){
            for(let i = 0; i < this.linhas.length; i++) {
                if (this.linhas[i].inicio >= this.horarioAtual) {
                    //para achar o mais próximo basta ser >, e -1 para achar o anterior aquele horário
                    this.horarioProximo = this.linhas[i]
                    this.horarioAnterior = this.linhas[i-1]
                    break;
                }
          }
        }
    },
  mounted () {
        this.horarioAtual = moment().format('HH:mm');
        this.compareTime(this.horarioAtual)
        // pensar em uma forma, de como armazenar de uma for mais simples esses horários.
    }
}
</script>

<style scoped>

</style>
