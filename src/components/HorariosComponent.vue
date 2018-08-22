<template>
  <div>
    <v-tabs slot="extension"
            v-model="model"
            centered
            grow
            color="transparent"
            slider-color="teal">
      <v-tab v-for="tab in tabs" @click="getTab(tab.valor)">{{tab.nome}}</v-tab>
    </v-tabs>
    
    <p></p>
    <v-layout align-center justify-center wrap fill-height>
      <v-flex xs6 sm6 md6 lg6 xl6>
        <v-flex v-for="horario in horarios">
          <div class="text-xs-center">
            <h2>{{horario.inicio}}</h2>
          </div>
        </v-flex>
      </v-flex>
      <v-flex xs6 sm6 md6 lg6 xl6>
        <v-flex v-for="horario in horarios">
          <div class="text-xs-center">
            <h2>{{horario.fim}}</h2>
          </div>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'HorariosComponent',
  data () {
    return{
      tabs: [
        {
          nome: 'Dias Úteis',
          valor: 'dias_uteis'
        },
        {
          nome: 'Sábado',
          valor: 'sabado'
        },
        {
          nome: 'Domingo',
          valor: 'domingo'
        },
      ],
      desc_dia: 'dias_uteis',
      horarios: null,
      nomeLinha: null,
    }
  },
  methods: {
      updateData() {
        this.nomeLinha = this.$route.params.linha
        fetch('http://localhost:5000/api/'+this.nomeLinha+'/'+this.desc_dia)
          .then(response => response.json())
          .then((res) => {
            this.horarios = res
          })
          .catch(err => {
            this.error = err
          })
          .finally(() => {

          })
        },
      getTab(tab_value) {
        this.desc_dia = tab_value
        this.updateData()
      }
    },
  mounted () {
    this.nomeLinha = this.$route.params.linha
    this.updateData()
  }
}
</script>

<style scoped>
</style>
