<template>
  <div>
    <div v-if="loading">
      <v-layout row wrap>
        <v-flex class="text-center">
          <p>Aguarde...</p>
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </v-flex>
      </v-layout>
    </div>
    <div v-else-if="error">
      <v-layout row wrap>
        <v-flex class="text-center">
          <p>Falha ao carregar informações!</p>
          </v-flex>
      </v-layout>
    </div>
    <div v-else>
      <v-tabs slot="extension"
              centered
              fixed-tabs
              grow
              color="transparent"
              slider-color="teal">
        <v-tab v-for="tab in tabs" @click="getTab(tab.key)">
          {{tab.name}}
        </v-tab>
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
  </div>
</template>

<script>
export default {
  name: 'HorariosComponent',
  data () {
    return {
      horarios: null,
      nomeLinha: null,
      loading: true,
      error: null,
      tabs: [
        {
          name: 'Dias Úteis',
          key: 'dias_uteis'
        },
        {
          name: 'Sábado',
          key: 'sabado'
        },
        {
          name: 'Domingo',
          key: 'domingo'
        },
      ],
    }
  },
  methods: {
    updateData(tab_value) {
      this.nomeLinha = this.$route.params.linha
      fetch('https://busintimeapi.herokuapp.com/api/'+this.nomeLinha)
        .then(response => response.json())
        .then((res) => {
          //passando uma propriedade como parâmetro
          this.horarios = res[tab_value]
        })
        .catch(err => {
          this.error = err
        })
        .finally(() => {
          this.loading = false
        })
      },
    getTab(tab_value) {
      this.updateData(tab_value)
    }
  },
  mounted () {
    this.nomeLinha = this.$route.params.linha
    let tab_value = 'dias_uteis'
    this.updateData(tab_value)
  }
}
</script>

<style scoped>
</style>
