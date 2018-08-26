<template>
  <div>
    <div v-if="loading">
      <v-layout row wrap>
        <v-flex xs6 sm6 md6 lg6 xl6>
          <div class="text-xs-center">
            <v-progress-circular :size="40" color="primary" indeterminate></v-progress-circular>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div v-else-if="error">
      <v-layout row wrap>
        <v-dialog
          v-model="dialog"
          max-width="290"
        >
      <v-card>
        <v-card-title class="headline">Ops!</v-card-title>
        <v-card-text>
          Algo de errado aconteceu, estamos trabalhando para corrigir o mais breve possível.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
        >
      {{ text }}
      <v-btn
        color="teal"
        flat
        @click="snackbar = false"
      >
        Ok
      </v-btn>
    </v-snackbar>
      <v-tabs slot="extension"
              centered
              fixed-tabs
              grow
              color="blue-grey lighten-5"
              slider-color="teal">
        <v-tab v-for="tab in tabs" @click="getTab(tab.key)">
          {{tab.name}}
        </v-tab>
      </v-tabs>
      <v-layout class="horarios" align-center justify-center wrap fill-height>
        <table class="example-table">
          <tr v-for="horario in horarios">
            <td><h2>{{ horario.inicio }}</h2></td>
            <td></td><td></td><td></td>
            <td><h2>{{ horario.fim }}</h2></td>
          </tr>
        </table>
      </v-layout>
      <v-layout>
        <v-container>
          <div style="text-align: left" v-show = "nomeLinha.arquivo === 'planalto-fortaleza'">
            <div style="text-align: left" class="title">Legendas:</div>
            </br>
            <p>(*) - Viagem atendendo ao Pe. Júlio Maria.</br>
            (#) - Viagem atendendo ao terminal de Caucaia </br>
            (VA#) - Viagem atendendo ao Conj. Vicente Arruda e terminal de Caucaia. </br>
            (Cap) - Viagem Fortaleza/Planalto/Capuan </br>
            Exp – Viagem feitas via EXPRESSO (só na bezerra de menezes)</p>
          </div>
          <div style="text-align: left" v-show = "nomeLinha.arquivo === 'caucaia-fortaleza'">
            <div style="text-align: left" class="title">Legendas:</div>
            </br>
            <p>(#) - Viagem Somente na segunda-feira</br>
            (PS) - Viagem via Parque Soledade</br>
            (§) - Viagem até a Cione</p>
          </div>
          <div style="text-align: left" v-show = "nomeLinha.arquivo === 'capuan-fortaleza'">
            <div style="text-align: left" class="title">Legendas:</div>
            </br>
            <p>(B) - Atende ao Boqueirão(Posto Bandeira Branca)</br>
            (J) - Passa na Jandaiguaba</br>
            (P) - Viagem atende a Pedreiras.</br>
            (@) Viagem Fortaleza/Planalto/Capuan</br>
            (#) - Viagem parte da movelária/Paizinha</br>
            (%) - Segue até a Entrada da Pyla</br>
            Obs.: Na viagem de 05:30 o carro parte às 05:20 de Pedreiras</p>
          </div>
        </v-container>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'horarioscomponent',
  data () {
    return {
      horarios: null,
      nomeLinha: null,
      linhaAtual: null,
      loading: true,
      error: null,
      res: null,
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: null,
      dialog: false,
      tabs: [{ name: 'Dias Úteis',key: 'dias_uteis' },
             { name: 'Sábado', key: 'sabado' },
             { name: 'Domingo', key: 'domingo' }
      ],
    }
  },
  methods: {
    checkLocalStorage(){
      this.getItem();
    },
    updateData() {
      fetch('https://busintimeapi.herokuapp.com/api/'+this.nomeLinha.arquivo)
      // fetch('http://localhost:5000/api/'+this.nomeLinha.arquivo)
        .then(response => response.json())
        .then((res) => {
          this.res = res
          this.horarios = this.res['dias_uteis']
          this.saveItem();
        })
        .catch(err => {
          this.error = err
          console.log(this.error)
          this.dialog = true;
        })
        .finally(() => {
          this.loading = false
        })
      },
    getTab(tab_value) {
      this.horarios = this.res[tab_value]
    },
    saveItem() {
      localStorage.setItem(this.nomeLinha.arquivo, JSON.stringify(this.res));
      this.showSnackbar('Horários salvos para consulta mesmo sem internet.')
    },
    getItem(){
      this.res = JSON.parse(localStorage.getItem(this.nomeLinha.arquivo));
      if (this.res != null){
        this.horarios = this.res['dias_uteis']
        this.loading = false
      }
      else{
        this.updateData()
      }
    },
    showSnackbar(msg){
      this.snackbar = true
      this.text = msg
    }
  },
  mounted () {
    this.nomeLinha = this.$route.params.item
    this.checkLocalStorage();
  }
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

td {
  padding-top: 10px;
  padding: 12px;
}

</style>
