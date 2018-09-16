<template>
  <v-layout
    class="horarios"
    align-center
    justify-center
    fill-height
    row
    wrap>
    <v-container>
      <div class="title">Selecione uma linha:</div>
    </br>
      <v-flex
        xs12
        sm12
        md12
        lg12
        xl12>
        <v-btn
          v-for="linha in linhas"
          block
          round
          large
          color="teal"
          @click="passValues(linha)">
          <strong>{{ linha.linha }}</strong>
        </v-btn>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
const moment = require('moment')
import { retornaDia, retornaLinhasDisponiveis } from '../utils/utils.js'

export default {
  name: 'inicio',
  data () {
    return {
      linhas: null,
    }
  },
  methods: {
    passValues: function(item) {
      this.$router.push({ name : 'horariosproximos', params: { item }})
    }
  },
  mounted () {
    this.linhas = retornaLinhasDisponiveis();
  },
}
</script>

<style scoped>

</style>
