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
            <v-dialog v-if="dialog === true"
              v-model="dialog"
              max-width="290"
              v-bind:persistent=true
            >
              <v-card>
                <v-card-title class="headline">Horários salvos!</v-card-title>
                <v-card-text>{{msg}}</v-card-text>
                <v-btn
                    color="teal"
                    flat="flat"
                    @click="dialog = false">
                    Ok
                  </v-btn>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <h1>{{ horarioAtual }}</h1>
            <h2>{{ item.linha }}</h2>
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
              max-width="290"
              v-bind:persistent=true
            >
              <v-card>
                <v-card-title class="headline">Ops!</v-card-title>
                <v-card-text>{{msg}}</v-card-text>
                <v-btn
                    color="teal"
                    flat="flat"
                    @click="goToRoute('inicio')">
                    Selecionar uma linha agora!
                  </v-btn>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div v-else-if="successInicio === false">
            <v-dialog
              v-model="dialog"
              max-width="290"
              v-bind:persistent=true
            >
              <v-card>
                <v-card-title class="headline">Horários finalizados.</v-card-title>
                <v-card-text>Os horários para esta linha já foram finalizados,
                tente selecionar outra linha no menu Linhas Disponíveis.</v-card-text>
                <v-btn
                    color="teal"
                    flat="flat"
                    @click="goToRoute('inicio')">
                    Ok
                  </v-btn>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div v-else-if="err === true">
            <v-dialog
              v-model="dialog"
              max-width="290"
              v-bind:persistent=true
            >
              <v-card>
                <v-card-title class="headline">Sem conexão!</v-card-title>
                <v-card-text>{{msg}}</v-card-text>
                <v-btn
                    color="teal"
                    flat="flat"
                    @click="goToRoute('linhas')">
                    Ok
                  </v-btn>
                <v-card-actions>
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
import { retornaDia, retornaLocalStorage, salvaLocalStorage } from '../utils/utils.js'
const moment = require('moment')

export default {
  name: 'Horariosproximos',
  data () {
      return {
          loading: null,
          dialog: null,
          horarioAtual: null,
          horarioProximoInicio: null,
          horarioAnteriorInicio: null,
          horarioProximoFim: null,
          horarioAnteriorFim: null,
          successInicio: null,
          successFim: null,
          horarios: false,
          selecione: false,
          diaUtil: null,
          item: null,
          msg: "",
          res: null,
          err: null
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
      let key = "preferedLine"
      this.diaUtil = retornaDia();
      this.item = retornaLocalStorage(key)
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
    getData: function(){
      this.res = JSON.parse(localStorage.getItem(this.item.arquivo))
      if (this.res != null){
        this.horarios = this.res[this.diaUtil]
        this.timeout = setTimeout( () => {
          this.loading = false;
        }, 2000);
      }
      else{
        fetch('https://busintimeapi.herokuapp.com/api/'+this.item.arquivo)
        .then(response => response.json())
        .then((res) => {
          this.res = res
          this.horarios = this.res[this.diaUtil]
          this.saveItem()
        })
        .catch(err => {
          this.err = true
          this.msg = 'Falha ao baixar os horários, conecte-se a internet e tente novamente.'
          this.dialog = true
          this.loading = false
        })
        }
    },
    saveItem() {
      salvaLocalStorage(this.item.arquivo, JSON.stringify(this.res))
      this.dialog = true
      this.msg = 'Agora é possível visualizá-los mesmo sem internet.'
      this.loading = false
    },
    updateTime: function() {
      this.horarioAtual = moment().format('HH:mm');
      let inicio = this.compareTimeInicio(this.horarioAtual);
      let fim = this.compareTimeFim(this.horarioAtual);
      if (inicio === false && fim === false){
          this.successInicio = false
          this.dialog = true
          clearInterval(this.interval);
      }
    },
    goToRoute: function(route){
      this.$router.push({ name : route})
    },
    compareTimeInicio: function(horarioAtual) {
      for(let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].inicio >= this.horarioAtual && this.horarios[i].inicio.length >= 4) {
          this.horarioProximoInicio = this.horarios[i].inicio
          this.horarioAnteriorInicio = this.horarios[i-1].inicio
          return this.successInicio = true
        }
      }
     return this.successInicio = false
    },
    compareTimeFim: function(horarioAtual) {
      for(let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].fim >= this.horarioAtual && this.horarios[i].fim.length >= 4) {
          this.horarioProximoFim = this.horarios[i].fim
          this.horarioAnteriorFim = this.horarios[i-1].fim
          return this.successFim = true
        }
      }
      return this.successInicio = false
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
