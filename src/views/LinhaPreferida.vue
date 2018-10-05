<template>
  <v-layout
    class="horarios"
    align-center
    justify-center
    fill-height
    row
    wrap>
    <v-container>
      <div class="title">Selecione uma linha de sua preferência:</div>
      <br>
      <v-flex>
        <v-btn
          v-for="linha in linhas"
          outline
          color="teal"
          @click="saveLine(linha)">
          <strong>{{ linha.linha }}</strong>
        </v-btn>
      </v-flex>
      <br>
      <p>Obs: Os horários da linha selecionada serão mostrados na opção do menu Horários Próximos.</p>
    </v-container>
  </v-layout>
</template>

<script>
import { retornaLinhasDisponiveis, salvaLocalStorage, retornaLocalStorage } from '../utils/utils.js'

export default {
  name: 'LinhaPreferida',
  data () {
    return {
      linhas: null,
      key: "preferedLine"
    }
  },
  mounted () {
    this.linhas = retornaLinhasDisponiveis();
  },
  methods: {
    saveLine: function(line){
      salvaLocalStorage(this.key, JSON.stringify(line))
      let item = retornaLocalStorage(this.key)
      this.$router.push({ name : 'horariosproximos', params: { item }})
    },
  },
}
</script>

<style scoped>

</style>
