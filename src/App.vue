<template>
  <div id="app">
    <headerComp :links="links" @toggle-dialog="handleToggleDialog"/>
    <main>
      <router-view/>
    </main>
    <footerComp/>
    <dialogNavComp v-if="openDialog" :links="links"/>
  </div>
</template>

<script>
import HeaderComp from './components/headerComp.vue';
import FooterComp from './components/footerComp.vue';
import dialogNavComp from './components/dialogNavComp.vue';

export default {
  name: "mainApp",
  components: {
    HeaderComp,
    FooterComp,
    dialogNavComp
  },
  data() {
    return {
      openDialog: false,
      links: [
        { name: 'О сервисе', href: '/' },
        { name: 'Чекер', href: '/checker' },
        { name: 'Оплата', href: '/payment' },
        { name: 'Инструменты', href: '/tools' },
        { name: 'F.A.Q.', href: '/faq' },
        { name: 'Регистрация', href: '/register' },
        { name: 'Вход', href: '/login' },
      ],
    }
  },
  mounted(){
    this.openDialog = false
    console.log("Layout by Vkidik:", "https://t.me/young_vykqq")
  },
  methods: {
    handleToggleDialog() {
      this.openDialog = !this.openDialog;
    }
  }
}
</script>


<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
  }

  html, body, #app{
    width: 100%;
    height: 100dvh;
  }

  #app{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  main{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
