<template>
  <!-- Vai estar em todas as páginas -->
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="false"
      :clipped="false"
      v-model="drawer"
      width="200"
      disable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i" >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="item.link">
              {{item.title}}
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="teal" :clipped-left="true">
      <v-toolbar-side-icon class="teal" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text title align-center">BusInTime</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      items: [{
        icon: 'home',
        title: 'Início',
        link: '/'
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

.title{
  font-weight: bold !important;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.navbar-burger.right {
	margin-right: auto;
	margin-left: 0;
}
</style>
