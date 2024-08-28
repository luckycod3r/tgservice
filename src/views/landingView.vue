<template>
  <section id="about" class="container">
    <div class="info text-base-900 flex gap-6 flex-col">
      <h1 class="text-5xl font-semibold">О сервисе</h1>
      <p>
        Чекер номеров. Проверяет, зарегистрированы ли в Telegram номера из вашей базы. Выдаёт всю информацию о зарегистрированных пользователях.
      </p>
      <ol class="flex flex-col gap-6 custom-list">
        <li>Софт видит теневые ограничения Telegram и сам регулирует процесс чекинга.</li>
        <li>Результат можно сохранить в любом формате и с любым набором данных. Например, в Excel файле, где будет записан юзернейм, пол, номер телефона, время последнего онлайна, имя, фамилия и так далее.</li>
      </ol>
      <a href="/register" class="btn-primary mt-4 px-12 py-5 rounded-xl">Создать аккаунт</a>
    </div>
    <div class="illustration">
      <!-- Вызов метода с использованием скобок -->
      <img :src="getIllustrationSrc()" alt="illustration-about">
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "landingView",
  computed: {
    ...mapState(['isDark']),
  },
  methods: {
    getIllustrationSrc() {
      return this.isDark ? require('@/assets/illustrations/about-dark.svg') : require('@/assets/illustrations/about.svg');
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 40px 20px; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.info {
  flex: 1; 
  max-width: 600px;
  margin-top: -20px;
  margin-right: 20px;
  align-items: start;
}

.illustration {
  flex: 1;
  max-width: 600px; 
}

img {
  width: 100%;
  height: auto;
}

.custom-list {
  list-style-type: none; 
  counter-reset: custom-counter; 

  li {
    counter-increment: custom-counter; 
    margin-top: 1em;
    position: relative;
    padding-left: 30px; 

    &:before {
      content: counter(custom-counter) ". "; 
      position: absolute;
      left: 0;
      top: 0;
      font-weight: bold;
    }
  }
}
.btn-primary {
  background-color: #419FD9;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #317aab;
  }
}
</style>
