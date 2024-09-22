<template>
  <header class="header">
    <router-link class="logo cursor-pointer text-white font-semibold" to="/">
      <h3 class="logo-link text-base-content">
        TG<span class="logo-link__point">•</span>Service
      </h3>
    </router-link>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li
          class="header__nav-list-item inline-block cursor-pointer rounded-md px-5 py-2.5 text-center text-sm text-grey transition duration-200 ease-in-out "
          v-for="(link, index) in links"
          :key="index"
        >
          <RouterLink class="header__nav-list-item-link" :to="link.href">{{ link.name }}</RouterLink>
        </li>
        <li class="header__nav-list-item theme">
          <label class="grid cursor-pointer place-items-center" style="position: relative;">
            <input
              type="checkbox"
              :checked="isDark"
              @change="toggleTheme"
              class="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            />
            <svg
              v-if="!isDark"
              class="stroke-base-100 fill-base-100 col-start-1 row-start-1"
              style="position: absolute; left: 4px;"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
              />
            </svg>
            <svg
              v-if="isDark"
              style="position: absolute; right: 4px;"
              class="stroke-base-100 fill-base-100 col-start-2 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </li>
      </ul>
    </nav>
    <div class="tab z-20">
      <label class="btn btn-circle swap swap-rotate">
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" @click="toggleDialog"/>
      
        <!-- hamburger icon -->
        <svg
          class="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      
        <!-- close icon -->
        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState, mapMutations } from 'vuex';

export default {
  name: "headerComp",
  components: {
    RouterLink
  },
  props: {
    links: Array
  },
  computed: {
    ...mapState(['isDark']), // Подключение глобального состояния для отслеживания текущей темы
  },
  methods: {
    ...mapMutations(['toggleTheme']),
    toggleDialog() {
      console.log('toggleDialog method called');
      this.$emit('toggle-dialog'); // Эмитим событие при клике
    }
  },
  created() {
    this.$store.dispatch('initTheme'); // Инициализация темы при создании компонента
  },
};
</script>

<style lang="scss" scoped>
.toggle{
  border: 1px solid rgba(0,0,0,0.5);
}
.header {
  width: 100%;
  padding: 1.5rem 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .logo {
    &-link {
      display: inline-flex;
      gap: 3px;
      font-size: 1.25rem;

      &__point {
        color: #419FD9;
        font-size: 1.25rem;
      }
    }
  }

  &__nav {
    width: auto;
    height: auto;

    &-list {
      display: inline-flex;
      align-items: center;
      gap: 20px;
      font-weight: 200;
      color: grey;
      
      &-item:hover:not(.theme){
        background: rgb(203,213,225, 0.1);
      }  
    }
  }

  .tab {
    display: none; // Скрыть гамбургер меню по умолчанию

    @media (max-width: 768px) {
      display: block; // Показать гамбургер меню на мобильных устройствах
    }
  }

  .header__nav {
    display: flex; // Показывать навигацию по умолчанию

    @media (max-width: 768px) {
      display: none; // Скрыть навигацию на мобильных устройствах
    }
  }
}
</style>
