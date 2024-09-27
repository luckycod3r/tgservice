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
                    <button class="btn" @click="download('XLSX')">Скачать в .xlsx</button>
                    <button class="btn" @click="download('TXT')">Скачать в .txt</button>
                </div>
                <button class="btn btn-primary" @click="$router.push('/checker/')">Новая проверка</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
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
        download(format){
            let id = this.$store.state[`task${format.toUpperCase()}ID`];
            axios({
                url: 'https://tg-checker.com/api/get_file?file_id=' + id, //your url
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                // create file link in browser's memory
                const href = URL.createObjectURL(response.data);

                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', 'result.' + format.toLowerCase()); //or any other extension
                document.body.appendChild(link);
                link.click();

                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
            });
        }
    },
}
</script>


<style lang="scss" scoped>
    #checker, .container{
        height: 100%;
        width: 100%;
    }
    .btns{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
    }
    .btns .row{
        display: flex;
        gap: 10px;
    }
</style>
