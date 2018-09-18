<template>
    <v-fade-transition mode="out-in">
  <v-layout
    class="horarios"
    align-center
    justify-center
    fill-height
    row
    wrap>
    <v-flex>
      <v-layout
        class="horarios"
        align-center
        justify-center
        wrap
        fill-height
        >
        <div v-if="loading">
            <v-container fill-height>
              <v-layout row wrap>
                <v-flex class="text-xs-center">
                  <v-progress-circular :size="70" :width="7" indeterminate color="teal"></v-progress-circular>
                </v-flex>
              </v-layout>
            </v-container>
        </div>
        <div v-else-if="successInicio === true && successFim === true">
            <h1>{{ horarioAtual }}</h1>
            <h2>{{ nomeLinha.linha }}</h2>
            <table width="200px">
                <tr>
                    <td>
                        <v-chip color="primary" text-color="white">
                          <strong>{{ nomeLinha.pontoPartida }}</strong>
                          <v-icon right >location_on</v-icon>
                        </v-chip>
                    </td>
                    <td style="padding: 10px"></td>
                    <td>
                        <v-chip color="primary" text-color="white">
                          <strong>Av. Imperador</strong>
                          <v-icon right>location_on</v-icon>
                        </v-chip>
                    </td>
                </tr>
                <tr>
                    <td class="time">
                        <strong>{{ horarioAnteriorInicio }}</strong>
                    </td>
                    <td style="padding: 10px"></td>
                    <td class="time">
                        <strong>{{ horarioAnteriorFim }}</strong>
                    </td>
                </tr>
                <tr>
                    <td class="time">
                        <strong>{{ horarioProximoInicio }}</strong>
                    </td>
                    <td style="padding: 10px"></td>
                    <td class="time">
                        <strong>{{ horarioProximoFim }}</strong>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else-if="successInicio === false && successFim === false">
          <v-dialog
            v-model="dialog"
            max-width="300"
            >
            <v-card>
              <v-card-title class="headline">Ops! Sem horários disponíveis.</v-card-title>
              <v-card-text>
                Parece que a linha que você selecionou não tem horários disponíveis.<br>
                Tente selecionar uma nova linha.
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="cyan"
                  flat="flat"
                  @click="$router.go(-1)">
                  Ok!
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div v-else>
          <v-dialog
            v-model="dialog"
            max-width="290"
            >
            <v-card>
              <v-card-title class="headline">Ops! Algo de errado aconteceu</v-card-title>
              <v-card-text>
                Estamos verificando o ocorrido.
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="cyan"
                  flat="flat"
                  @click="$router.go(-1)">
                  Ok!
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
  </v-fade-transition>
</template>

<script>
import { retornaDia } from '../utils/utils.js'
const moment = require('moment')

export default {
  name: 'horariosproximos',
  data () {
      return {
          loading: true,
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
          dialog: false
        }
    },
  mounted () {
    this.getItens();
    this.interval = setInterval( () => {
      this.updateTime();
    }, 1000)
    this.timeout = setTimeout( () => {
      this.loading = false;
    }, 1000);
  },
  destroyed () {
    clearInterval(this.interval);
  },
  methods: {
    getItens (linha) {
      this.nomeLinha = this.$route.params.item
      this.diaUtil = retornaDia();
      this.res = JSON.parse(localStorage.getItem(this.nomeLinha.arquivo));
      if (this.res != null){
        this.horarios = this.res[this.diaUtil];
      }
      else if (this.res === null) {
        console.log('sem dados nos horarios')
        this.dialog = true
        // this.updateData();
      }
      else{
          this.dialog = true
      }
      this.updateTime();
    },
    updateTime () {
      this.horarioAtual = moment().format('HH:mm');
      this.compareTimeInicio(this.horarioAtual);
      this.compareTimeFim(this.horarioAtual);
    },
    compareTimeInicio (horarioAtual) {
      for(let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].inicio >= this.horarioAtual && this.horarios[i].inicio.length >= 4) {
          this.horarioProximoInicio = this.horarios[i].inicio
          this.horarioAnteriorInicio = this.horarios[i-1].inicio
          //console.log('Início: ' + this.horarioAnteriorInicio + ' / ' + this.horarioProximoInicio)
          this.successInicio = true
          break;
        }
        else {
          this.dialog = true;
        }
      }
    },
    compareTimeFim (horarioAtual) {
      for(let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].fim >= this.horarioAtual && this.horarios[i].fim.length >= 4) {
          this.horarioProximoFim = this.horarios[i].fim
          this.horarioAnteriorFim = this.horarios[i-1].fim
          //console.log('Fim: ' + this.horarioAnteriorFim + ' / ' + this.horarioProximoFim)
          this.successFim = true
          break;
        }
        else {
          this.dialog = true;
        }
      }
    },
  }
}
</script>

<style scoped>
.time{
    font-size: 140%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>
