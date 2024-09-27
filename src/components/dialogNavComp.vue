<template>
    <div id="dialog" class="z-10">
        <nav class="header__nav">
            <ul class="header__nav-list flex flex-col justify-center content-center gap-4">
              <li
                class="header__nav-list-item inline-block cursor-pointer rounded-md px-5 py-2.5 text-center text-sm text-grey transition duration-200 ease-in-out hover:text-white hover:bg-slate-500"
                v-for="(link, index) in links"
                :key="index"
              >
                <a class="header__nav-list-item-link" :href="link.href">{{ link.name }}</a>
              </li>
              <li class="header__nav-list-item theme">
                <label class="grid cursor-pointer place-items-center">
                  <input
                    type="checkbox"
                    :checked="isDark"
                    @change="toggleTheme"
                    class="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                  />
                  <svg
                    v-if="!isDark"
                    class="stroke-base-100 fill-base-100 col-start-1 row-start-1"
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
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';


    export default {
        name: "dialogNavComp.vue",
        props: {
            links: Array
        },
        computed: {
            ...mapState(['isDark']), // Подключение глобального состояния для отслеживания текущей темы
        },
        methods: {
            ...mapMutations(['toggleTheme']), // Использование мутации для переключения темы
        },
        created() {
            this.$store.dispatch('initTheme'); // Инициализация темы при создании компонента
        },
    }
</script>

<style lang="scss" scoped>
.toggle{
  border: 1px solid rgba(0,0,0,0.5) !important;
}
    #dialog{
        width: 100%;
        height: 100dvh;
        position: absolute;
        background: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--fallback-b1, oklch(var(--b1) / 1));
        color: var(--fallback-bc, oklch(var(--bc) / 1));
    }
</style>