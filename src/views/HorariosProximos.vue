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
          fill-height>
          <div v-if="loading">
            <v-container fill-height>
              <v-layout
                row
                wrap>
                <v-flex class="text-xs-center">
                  <v-progress-circular
                    :size="70"
                    :width="7"
                    indeterminate
                    color="teal"/>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
          <div v-else-if="successInicio === true && successFim === true">
            <v-snackbar
              v-model="snackbar"
              :color="'success'"
              :timeout="6000">
              {{ msg }}
              <v-btn
                dark
                flat
                @click="snackbar = false">
                OK
              </v-btn>
            </v-snackbar>
            <!-- <v-dialog
              v-if="dialog === true"
              v-model="dialog"
              :persistent="true"
              max-width="290"
            >
              <v-card>
                <v-card-title class="headline">Horários atualizados!</v-card-title>
                <v-card-text>{{ msg }}</v-card-text>
                <v-btn
                  color="teal"
                  flat="flat"
                  @click="dialog = false">
                  Ok
                </v-btn>
                <v-card-actions/>
              </v-card>
            </v-dialog> -->
            <p style="font-size: 6em"><strong>{{ horarioAtual }}</strong></p>
            <h1>{{ item.linha }}</h1>
            <h3>Valor: {{ item.preco }}</h3>
            <br>
            <table width="200px">
              <tr>
                <td>
                  <v-chip
                    color="teal"
                    text-color="white">
                    <strong>{{ item.pontoPartida }}</strong>
                    <v-icon right >location_on</v-icon>
                  </v-chip>
                </td>
                <td style="padding: 10px"/>
                <td>
                  <v-chip
                    color="teal"
                    text-color="white">
                    <strong>Av. Imperador</strong>
                    <v-icon right>location_on</v-icon>
                  </v-chip>
                </td>
              </tr>
              <tr>
                <td class="time">
                  <strong>{{ horarioAnteriorInicio }}</strong>
                </td>
                <td style="padding: 10px"/>
                <td class="time">
                  <strong>{{ horarioAnteriorFim }}</strong>
                </td>
              </tr>
              <tr>
                <td class="time">
                  <strong>{{ horarioProximoInicio }}</strong>
                </td>
                <td style="padding: 10px"/>
                <td class="time">
                  <strong>{{ horarioProximoFim }}</strong>
                </td>
              </tr>
            </table>
          </div>
          <div v-else-if="selecione === true">
            <v-dialog
              v-model="dialog"
              :persistent="true"
              max-width="290">
              <v-card>
                <v-card-title class="headline">Ops!</v-card-title>
                <v-card-text>{{ msg }}</v-card-text>
                <v-btn
                  color="teal"
                  flat="flat"
                  @click="goToRoute('inicio')">
                  Selecionar uma linha agora!
                </v-btn>
                <v-card-actions/>
              </v-card>
            </v-dialog>
          </div>
          <div v-else-if="error">
            <v-dialog
              v-model="dialog"
              :persistent="true"
              max-width="290">
              <v-card>
                <v-card-title class="headline">Sem conexão!</v-card-title>
                <v-card-text>{{ msg }}</v-card-text>
                <v-btn
                  color="teal"
                  flat="flat"
                  @click="goToRoute('linhas')">
                  Ok
                </v-btn>
                <v-card-actions/>
              </v-card>
            </v-dialog>
          </div>
          <div v-else-if="successInicio === false || successFim === false">
            <v-dialog
              v-model="dialog"
              :persistent="true"
              max-width="290">
              <v-card>
                <v-card-title class="headline">Horários finalizados.</v-card-title>
                <v-card-text>Os horários para esta linha já foram finalizados,
                tente selecionar outra linha no menu Linhas Disponíveis.</v-card-text>
                <v-btn
                  color="teal"
                  flat="flat"
                  @click="goToRoute('horarioslinha')">
                  Ir para Linhas Disponíveis
                </v-btn>
                <v-btn
                  color="teal"
                  flat="flat"
                  @click="goToRoute('inicio')">
                  Ir para o Início
                </v-btn>
                <v-card-actions/>
              </v-card>
            </v-dialog>
          </div>
          <div v-else>
            <v-dialog
              :persistent="true"
              max-width="290">
              <v-card>
                <v-card-title class="headline">Ops!</v-card-title>
                <v-card-text>Algo de errado aconteceu, tente novamente.</v-card-text>
                <v-btn
                  color="teal"
                  flat="flat"
                  @click="goToRoute('inicio')">
                  Ir para o início.
                </v-btn>
                <v-card-actions/>
              </v-card>
            </v-dialog>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-fade-transition>
</template>

<script>
import { retornaDia, retornaLocalStorage, salvaLocalStorage } from '../utils/utils.js'
const moment = require('moment')

export default {
  name: 'Horariosproximos',
  data () {
      return {
          snackbar: false,
          loading: false,
          dialog: false,
          horarioAtual: null,
          horarioProximoInicio: null,
          horarioAnteriorInicio: null,
          horarioProximoFim: null,
          horarioAnteriorFim: null,
          successInicio: false,
          successFim: false,
          horarios: false,
          selecione: false,
          diaUtil: null,
          item: null,
          msg: null,
          res: null,
          error: false
        }
    },
  mounted () {
    this.loading = true
    this.getItens();
    this.interval = setInterval( () => {
      this.updateTime();
    }, 1000)
  },
  destroyed () {
    clearInterval(this.interval);
  },
  methods: {
    getItens: function() {
      this.diaUtil = retornaDia();
      this.item = retornaLocalStorage("preferedLine")
      if (this.item != null){
        this.getData()
      }
      else{
        this.item = this.$route.params.item
        if (this.item != null){
          this.getData()
        }
        else{
          this.selecione = true
          this.dialog = true
          this.loading = false
          this.msg = 'Você ainda não selecionou sua linha preferida.'
        }
      }
    },
    getData: function() {
      fetch('https://busintimeapi.herokuapp.com/api/'+this.item.arquivo)
      .then(response => response.json())
      .then((res) => {
        this.res = res
        this.horarios = this.res[this.diaUtil]
        this.saveItem()
      })
      .catch(() => {
        this.res = JSON.parse(localStorage.getItem(this.item.arquivo))
        if (this.res != null){
          this.horarios = this.res[this.diaUtil]
          
          this.timeout = setTimeout(() => {
            this.loading = false;
            }, 1500);
        }
        else{
          this.error = true
          this.msg = 'Falha ao baixar os horários, conecte-se a internet e tente novamente.'
          this.dialog = true
          this.loading = false
        }
      })
    },
    saveItem() {
      salvaLocalStorage(this.item.arquivo, JSON.stringify(this.res))
      this.snackbar = true
      this.msg = 'Horários atualizados! Agora é possível visualizá-los mesmo sem internet.'
      this.timeout = setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    updateTime: function() {
      this.horarioAtual = moment().format('HH:mm');
      let inicio = this.compareTimeInicio();
      let fim = this.compareTimeFim();
      if (inicio === false && fim === false){
          clearInterval(this.interval);
          this.successInicio = false
          if (this.dialog === false){
              this.dialog = true
          }
      }
    },
    goToRoute: function(route){
      this.$router.push({ name : route })
    },
    compareTimeInicio: function() {
      for(let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].inicio >= this.horarioAtual && this.horarios[i].inicio.length >= 4) {
          try{
            this.horarioAnteriorInicio = this.horarios[i-1].inicio
            this.horarioProximoInicio = this.horarios[i].inicio
            return this.successInicio = true
            if (i >= 1) {
              break
            }
          }
          catch(err){
            clearInterval(this.interval);
            return this.successInicio = false
          }
        }
      }
    },
    compareTimeFim: function() {
      for(let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].fim >= this.horarioAtual && this.horarios[i].fim.length >= 4) {
          try{
            this.horarioAnteriorFim = this.horarios[i-1].fim
            this.horarioProximoFim = this.horarios[i].fim
            this.successFim = true
            if (i >= 1) {
              break
            }
          }
          catch(err){
            clearInterval(this.interval);
            return this.successFim = false
          }
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
