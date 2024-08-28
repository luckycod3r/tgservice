<template>
    <section id="faq" class="gap-8">
        <h2 class="text-5xl font-semibold py-4">F.A.Q.</h2>
        <div class="collapse collapse-arrow">
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div class="collapse-title text-xl font-semibold">Есть ли поддержка после покупки?</div>
            <div class="collapse-content">
              <p>Да. Вы можете в любое время обратиться к агенту поддержки (у нас их 5). Также вы можете задать вопрос в нашем закрытом чате, где часто отвечает разработчик софта.</p>
            </div>
          </div>
          <div class="collapse collapse-arrow">
            <input type="radio" name="my-accordion-2" />
            <div class="collapse-title text-xl font-semibold">Что нужно для начала работы?</div>
            <div class="collapse-content">
              <p>Да. Вы можете в любое время обратиться к агенту поддержки (у нас их 5). Также вы можете задать вопрос в нашем закрытом чате, где часто отвечает разработчик софта.</p>
            </div>
          </div>
          <div class="collapse collapse-arrow">
            <input type="radio" name="my-accordion-2" />
            <div class="collapse-title text-xl font-semibold">Какие аккаунты подойдут для работы?</div>
            <div class="collapse-content">
              <p>Да. Вы можете в любое время обратиться к агенту поддержки (у нас их 5). Также вы можете задать вопрос в нашем закрытом чате, где часто отвечает разработчик софта.</p>
            </div>
          </div>
          <div class="collapse collapse-arrow">
            <input type="radio" name="my-accordion-2" />
            <div class="collapse-title text-xl font-semibold">На каких устройствах запускается софт?</div>
            <div class="collapse-content">
              <p>Да. Вы можете в любое время обратиться к агенту поддержки (у нас их 5). Также вы можете задать вопрос в нашем закрытом чате, где часто отвечает разработчик софта.</p>
            </div>
          </div>
    </section>
</template>

<script>
    export default {
        name: "faqView"
    }
</script>

<style lang="scss" scoped>
    #faq{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }

    .collapse{
        max-width: 90%;
    }
</style>