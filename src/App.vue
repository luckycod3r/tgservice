<template>
  <div id="app">
    <headerComp :links="allowLinks" @toggle-dialog="handleToggleDialog"/>
    <main>
      <router-view/>
    </main>
    <footerComp/>
    <dialogNavComp v-if="openDialog" :links="allowLinks"/>
  </div>
</template>

<script>
import HeaderComp from './components/headerComp.vue';
import FooterComp from './components/footerComp.vue';
import dialogNavComp from './components/dialogNavComp.vue';
import axios from 'axios';

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
      token : false,
      allowLinks : [],
      links: [
        { name: 'О сервисе', href: '/' },
        { name: 'Чекер', href: '/checker' },
        { name: 'Оплата', href: '/payment' },
        { name: 'Инструменты', href: '/tools' },
        { name: 'F.A.Q.', href: '/faq' },
        { name: 'Регистрация', href: '/register' },
        { name: 'Вход', href: '/login' },
        { name: 'Аккаунт', href: '/dashboard' }
      ],
    }
  },
  watch: {
    '$route'() {
      this.updateLinks();
    }
  },
  async mounted() {
    try{
        let user = await axios.get('https://checker.tg-service.pro/api/me')
      if(user.status == 200){
        if(user.data.email){
          this.token = true;
          this.$store.state.meActive = true;
          this.updateLinks();
        }
        else{
          this.token = false;
        }
      }
      this.updateLinks(); 
      this.openDialog = false;
    }
    catch(e){
      this.updateLinks(); 
    }
    const token = this.token;
      
    this.allowLinks =  this.links.filter(link => {
        if (token) {
          return !(link.href === '/register' || link.href === '/login');
        } else {
          return !(link.href === '/dashboard' || link.href == '/payment'  || link.href == '/checker');
        }
      });
    console.log(this.allowLinks);
    
    this.$event.on('update-header',()=>{
      console.log("update links");
      
      this.allowLinks =  this.links.filter(link => {
        if (this.$store.state.meActive) {
          return !(link.href === '/register' || link.href === '/login');
        } else {
          return !(link.href === '/dashboard' || link.href == '/payment'  || link.href == '/checker');
        }
      });
    })
    
  },
  methods: {
    handleToggleDialog() {
      this.openDialog = !this.openDialog;
    },
    updateLinks() {
      let token = this.token;
      this.allowLinks =  this.links.filter(link => {
        if (token) {
          return !(link.href === '/register' || link.href === '/login');
        } else {
          return !(link.href === '/dashboard' || link.href == '/payment' || link.href == '/checker');
        }
      });
      // this.$forceUpdate(); 
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
