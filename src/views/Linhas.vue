<template>
  <v-container>
    <v-layout align-center justify-center wrap fill-height>
      <div class="title">Linhas Metropolitanas</div>
      <v-flex pt-2>
        <v-btn
          v-for="linha in linhasDisponiveis"
          block
          color="blue-grey"
          @click="passValues(linha.linkLinha)">
          {{linha.linha}}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
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
      console.log("passing props: " + item)
      this.$router.push({ name : 'horarioslinha', params: { linha: item }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
