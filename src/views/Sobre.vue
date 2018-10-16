<template>
  <v-layout
    align-center
    justify-center
    row
    wrap
    fill-height>
    <v-container>
      <div v-if="linhaPreferida != null">
        <h3>Linha Preferida:</h3>
        <br>
        <v-layout 
          row 
          align-center>
          <v-flex 
            align-center 
            xs12 
            sm12 
            md12 
            lg12 
            xl12>
            <v-btn
              color="success"
              dark >
              {{ linhaPreferida.linha }}
            </v-btn>
            <v-btn
              color="danger"
              dark
              @click="dialog = true">
              Remover Linha
            </v-btn>
          </v-flex>
        </v-layout>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="290">
          <v-card>
            <v-card-title class="headline">Tem certeza?</v-card-title>
            <v-card-text>Você pode selecionar uma nova linha no menu Início.</v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="green darken-1"
                flat
                @click.native="dialog = false">Não</v-btn>
              <v-btn
                color="red darken-1"
                flat
                @click.native="removeKey()">Sim</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div v-else>
        <h2>Aqui serão mostradas suas preferências.</h2>
      </div>
      <div>
        <br>
        <h4>Acompanhe os horários das linhas da Empresa Vitória sempre que precisar<br> mesmo sem *conexão com a internet.</h4>
        <br>
        <p>*Necessário acesso anterior com internet para que o app possa salvá-la para acesso offline(sem conexão com a internet).</p>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import { retornaLinhasDisponiveis, retornaLocalStorage } from '../utils/utils.js'

  export default {
    name: 'Sobre',
    data () {
    return {
      linhas: null,
      key: "preferedLine",
      linhaPreferida: null,
      dialog: null
    }
  },
  mounted () {
    this.linhas = retornaLinhasDisponiveis()
    this.returnData()
    this.interval = setInterval(() => {
      this.returnData()
    }, 500)
  },
  destroyed () {
    clearInterval(this.interval);
  },
  methods: {
    returnData: function(){
      this.linhaPreferida = retornaLocalStorage(this.key)
    },
    removeKey: function(){
      this.dialog = false
      localStorage.removeItem(this.key);
    }
  },
}
</script>

<style scoped>
</style>
