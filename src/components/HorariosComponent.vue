<template>
  <div>
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
    <div v-else-if="error">
      <v-layout
        row
        wrap>
        <v-dialog
          v-model="dialog_error"
          max-width="290"
        >
          <v-card>
            <v-card-title class="headline">Ops!</v-card-title>
            <v-card-text>{{ msg }}</v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="teal"
                flat="flat"
                @click="$router.go(-1)"
              >
                Ok!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
    <div v-else>
      <v-snackbar
        v-model="snackbar"
        :color="'success'"
        :timeout="6000"
      >
        {{ msg }}
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          OK
        </v-btn>
      </v-snackbar>
      <!-- <div v-if="dialog_success">
        <v-dialog
          v-model="dialog_success"
          max-width="290"
        >
          <v-card>
            <v-card-title class="headline">Horários salvos!</v-card-title>
            <v-card-text>{{ msg }}</v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="teal"
                flat="flat"
                @click.native="dialog_success = false">
                Ok!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div> -->
      <v-tabs
        slot="extension"
        v-model="tab_ativa"
        centered
        fixed-tabs
        grow
        color="blue-grey lighten-5"
        slider-color="teal">
        <v-tab
          v-for="tab in tabs"
          :key="tab.id"
          @click="getTab(tab.key)">
          {{ tab.name }}
        </v-tab>
      </v-tabs>
      <v-layout
        class="horarios"
        align-center
        justify-center
        wrap
        fill-height>
        <table>
          <thead>
            <tr>
              <th>
                  <v-chip
                    color="teal"
                    text-color="white">
                    <strong>{{ pontos.pontoPartida }}</strong>
                    <v-icon right >location_on</v-icon>
                  </v-chip>
              <th/>
              <th>
                  <v-chip
                    color="teal"
                    text-color="white">
                    <strong>Fortaleza</strong>
                    <v-icon right >location_on</v-icon>
                  </v-chip>
                </th>
            </tr>
          </thead>
          <tr
            v-for="horario in horarios">
            <td><h2>{{ horario.inicio }}</h2></td>
            <td/>
            <td><h2>{{ horario.fim }}</h2></td>
          </tr>
        </table>
      </v-layout>
      <v-layout>
        <v-container>
          <div
            v-show = "nomeLinha.arquivo === 'planalto-fortaleza'"
            style="text-align: left">
            <div
              style="text-align: left"
              class="title">Legendas:</div>
            <br>
            <p>(*) - Viagem atendendo ao Pe. Júlio Maria.<br>
              (#) - Viagem atendendo ao terminal de Caucaia.<br>
              (VA#) - Viagem atendendo ao Conj. Vicente Arruda e terminal de Caucaia.<br>
              (Cap) - Viagem Fortaleza/Planalto/Capuan.<br>
              Exp – Viagem feitas via EXPRESSO (só na bezerra de menezes).</p>
          </div>
          <div
            v-show = "nomeLinha.arquivo === 'caucaia-fortaleza'"
            style="text-align: left">
            <div
              style="text-align: left"
              class="title">Legendas:</div>
            <br>
            <p>(#) - Viagem Somente na segunda-feira.<br>
              (PS) - Viagem via Parque Soledade.<br>
              (§) - Viagem até a Cione.</p>
          </div>
          <div
            v-show = "nomeLinha.arquivo === 'capuan-fortaleza'"
            style="text-align: left">
            <div
              style="text-align: left"
              class="title">Legendas:</div>
            <br>
            <p>(B) - Atende ao Boqueirão(Posto Bandeira Branca).<br>
              (J) - Passa na Jandaiguaba.<br>
              (P) - Viagem atende a Pedreiras.<br>
              (@) Viagem Fortaleza/Planalto/Capuan.<br>
              (#) - Viagem parte da movelária/Paizinha.<br>pro
              (%) - Segue até a Entrada da Pyla.<br>
              Obs.: Na viagem de 05:30 o carro parte às 05:20 de Pedreira.s</p>
          </div>
          <div
            v-show = "nomeLinha.arquivo === 'metropole1-fortaleza'"
            style="text-align: left">
            <div
              style="text-align: left"
              class="title">Legendas:</div>
            <br>
            <p>(*) - Viagem atendendo a rota 2 e sai na rota 1.<br>
              (T) - Viagem atendendo a localidade de Tôco.</p>
          </div>
          <div
            v-show = "nomeLinha.arquivo === 'metropole2-fortaleza'"
            style="text-align: left">
            <div
              style="text-align: left"
              class="title">Legendas:</div>
            <br>
            <p>(*) - Viagem atendendo a rota 2 e sai na rota 1.<br>
              (T) - Viagem atendendo a localidade de Tôco.</p>
          </div>
        </v-container>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { retornaDia, retornaTabAtiva, retornaLocalStorage } from '../utils/utils.js'

export default {
  name: 'Horarioscomponent',
  data () {
    return {
      res: null,
      horarios: null,
      nomeLinha: null,
      linhaAtual: null,
      diaUtil: null,
      pontos: null,
      loading: true,
      error: null,
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      msg: '',
      dialog_success: false,
      dialog_error: false,
      tab_ativa: null,
      tabs: [
              { id: 0, name: 'Dias Úteis',key: 'dias_uteis' },
              { id: 1, name: 'Sábado', key: 'sabado' },
              { id: 2, name: 'Domingo', key: 'domingo' }
            ],
      }
  },
  mounted () {
    this.diaUtil = retornaDia()
    this.nomeLinha = this.$route.params.item
    this.tab_ativa = retornaTabAtiva()
    this.pontos = this.$route.params.item
    
    if (this.nomeLinha == null){
      this.$router.push({ name : 'linhas'})
    }
    else{
      this.getFromApi();
    }
  },
  methods: {
    getFromApi(){
      this.updateData()
    },
    updateData() {
      fetch('https://busintimeapi.herokuapp.com/api/'+this.nomeLinha.arquivo)
        .then(response => response.json())
        .then((res) => {
          this.res = res
          this.horarios = this.res[this.diaUtil]
          this.saveItem()
        })
        .catch(() => {
          this.res = JSON.parse(localStorage.getItem(this.nomeLinha.arquivo))
          if (this.res != null){
            this.res = JSON.parse(localStorage.getItem(this.nomeLinha.arquivo))
            this.horarios = this.res[this.diaUtil]
            this.loading = false
          }
          else{
            this.error = true
            this.msg = "Falha ao baixar os horários, conecte-se a internet e tente novamente."
            this.dialog_error = true
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getTab(tab_value) {
      this.horarios = this.res[tab_value]
    },
    saveItem() {
      localStorage.setItem(this.nomeLinha.arquivo, JSON.stringify(this.res))
      this.msg = 'Horários atualizados! Agora é possível visualizá-los mesmo sem internet.'
      this.snackbar = true
    }
  },
}
</script>

<style scoped>

.v-tabs {
  position: fixed;
  z-index: 2;
  width: 100%;
  left: 0;
}

.horarios {
  padding-top: 60px;
}

th {
  font-size: 1em;
}

td {
  padding-top: 5px;
  padding: 10px;
}

</style>
