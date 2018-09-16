<template>
  <!-- Vai estar em todas as páginas -->
  <v-app>
    <v-toolbar
      app
      color="teal">
      <v-toolbar-side-icon
        class="teal"
        @click.stop="drawer = !drawer"/>
      <v-toolbar-title class="white--text title align-center">No Horário</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-navigation-drawer
      :mini-variant="false"
      :clipped="false"
      v-model="drawer"
      persistent
      width="180"
      disable-resize-watcher
      fixed
      app>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :value="item.active"
          :key="item.title"
          :to="item.link"
          :exact="item.exact"
          class="normal--text"
          active-class="blue--text">
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      clipped: false,
      items: [{
        icon: 'home',
        title: 'Início',
        link: '/',
        props: true
      },
      {
        icon : 'directions_bus',
        title: 'Linhas',
        link: '/linhas'
      },
      {
        icon : 'info',
        title: 'Sobre',
        link: '/sobre'
      }],
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

.title {
  font-weight: bold !important;
}

.navbar-burger.right {
	margin-right: auto;
	margin-left: 0;
}
</style>
