<template>
  <div>
    <v-layout align-center justify-center wrap fill-height>
      <div class="title">Linhas Metropolitanas</div>
    </v-layout>
    <v-layout align-center justify-center wrap fill-height>
      <v-flex xs10 sm12 md6 lg6 xl6 pt-2>
        <v-btn
          v-for="linha in linhasDisponiveis"
          block
          color="blue-grey"
          @click="passValues(linha.linkLinha)">
          {{linha.linha}}</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'linhas',
    linhasDisponiveis: null,
    data() {
      return{
        linhasDisponiveis: [
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
      this.$router.push({ name : 'horarioslinha', params: { linha: item }})
    }
  }
}
</script>

<style scoped>
</style>
