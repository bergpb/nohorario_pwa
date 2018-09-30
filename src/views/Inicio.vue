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
        <h2>Bem vindo(a).</h2>
        <br>
        <h3>Para melhor funcionalidade do aplicativo escolha uma das opções abaixo:</h3>
        <br>
        <v-btn
          outline
          color="teal"
          @click="goToRoute('linha-preferida')">
          <strong>Selecionar uma linha preferida</strong></v-btn>
        <v-btn
          outline
          color="teal"
          @click="goToRoute('linhas')">
          <strong>Mostrar linhas disponíveis</strong></v-btn>
      </div>
      <div v-else>
        <h2>Olá, bem vindo(a) novamente.</h2>
        <br>
        <h3>Linha Preferida: {{ linhaPreferida.linha }}</h3>
        <br>
        <p>Para mostrar os horários da linha preferida selecione o menu Horários Próximos.</p>
        <p>Para selecionar uma nova linha, acesse o menu Sobre.</p>
        <br>
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
