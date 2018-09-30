<template>
  <v-layout
    class="horarios"
    align-center
    justify-center
    fill-height
    row
    wrap>
    <v-container>
      <div v-if="linhaPreferida == null">
        <h2>Bem vindo.</h2>
        <br>
        <h3>Para melhor funcinalidade do aplicativo escolha uma das opções abaixo:</h3>
        <br>
        <v-btn
          large
          outline
          color="teal"
          @click="goToRoute('linha-preferida')"><strong>Selecionar uma linha preferida</strong></v-btn>
        <v-btn
          large
          outline
          color="teal"
          @click="goToRoute('linhas')"><strong>Mostrar linhas disponíveis</strong></v-btn>
      </div>
      <div v-else>
        <h2>Olá, abaixo listamos suas preferências:</h2>
        <br>
        <h3>Linha Preferida: {{linhaPreferida.linha}}</h3>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-btn slot="activator" color="primary" dark>Remover Preferências</v-btn>
          <v-card>
            <v-card-title class="headline">Tem certeza?</v-card-title>
            <v-card-text>Você pode selecionar uma nova linha no menu Início.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="dialog = false">Não</v-btn>
              <v-btn color="green darken-1" flat @click.native="removeKey()">Sim</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import { retornaLinhasDisponiveis, retornaLocalStorage } from '../utils/utils.js'

export default {
  name: 'Inicio',
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
    this.interval = setInterval( () => {
      this.returnData()
    }, 500)
  },
  destroyed () {
    clearInterval(this.interval);
  },
  methods: {
    goToRoute: function(route){
      this.$router.push({ name : route})
    },
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
