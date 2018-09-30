<template>
  <v-layout
    align-center
    justify-center
    fill-height>
    <v-container>
      <div class="title">Linhas Metropolitanas:</div>
      <br>
      <v-flex
        xs12
        sm12
        md12
        lg12
        xl12>
        <v-btn
          v-for="linha in linhas"
          outline
          color="teal"
          @click="passValues(linha)">
          <strong>{{ linha.linha }}</strong>
        </v-btn>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import { retornaLinhasDisponiveis } from '../utils/utils.js'
export default {
  name: 'Linhas',
  data () {
    return {
      linhas: null,
    }
  },
  mounted () {
    this.linhas = retornaLinhasDisponiveis();
  },
  methods: {
    passValues: function(item) {
      this.$router.push({ name : 'horarioslinha', params: { item }})
    }
  }
}
</script>

<style scoped>
</style>
