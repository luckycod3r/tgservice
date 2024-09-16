<template>
    <section id="checker flex flex-col items-center justify-center" >
        <div class="container flex flex-col items-center justify-center gap-6 px-4">
            <h2 class="text-5xl font-semibold">Чекер</h2>

            <img :src="getIllustrationSrc()" alt="illustration-about">

            <div class="message">
                <p> Проверка успешно завершена!
                    Вы можете получить её результаты в формате . xlsx или .txt
                </p>
            </div>

            <div class="btns">
                <div class="row">
                    <a href="" class="btn" @click="download()">Скачать в .xlsx</a>
                    <a href="" class="btn" @click="download()">Скачать в .txt</a>
                </div>
                <button class="btn btn-primary" @click="$router.push('/checker/')">Новая проверка</button>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "checkerFinishView",
    computed: {
        ...mapState(['isDark']),
    },
    methods: {
        getIllustrationSrc() {
            return this.isDark ? require('@/assets/illustrations/land_checker-dark.svg') : require('@/assets/illustrations/land_checker.svg');
        },
        download(){
            
        }
    },
}
</script>


<style lang="scss" scoped>
    #checker, .container{
        height: 100%;
        width: 100%;
    }
</style>
