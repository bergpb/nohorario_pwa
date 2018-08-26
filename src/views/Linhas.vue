<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs10 sm12 md6 lg6 xl6>
      <div class="title">Linhas Metropolitanas</div>
      <v-btn
        v-for="linha in linhasDisp"
        block
        color="blue-grey"
        @click="passValues(linha)">
        {{linha.linha}}</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'linhas',
    linhasDisp: null,
    data() {
      return{
        linhasDisp: [
          {
            linha: 'Planato BR-020',
            linkLinha: 'planalto-br020'
          },
          {
            linha: 'Cumbuco / Fortaleza',
            linkLinha: 'cumbuco-fortaleza'
          },
          {
            linha: 'Planalto Caucaia',
            linkLinha: 'planalto-caucaia'
          },
          {
            linha: 'Capuan',
            linkLinha: 'capuan'
          },
        ]
      }
    },
  methods:{
    passValues: function(item) {
      this.$router.push({ name : 'horarioslinha', params: { item }})
    }
  }
}
</script>

<style scoped>
</style>
