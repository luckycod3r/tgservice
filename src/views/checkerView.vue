<template>
    <section id="checker" class="flex">
        <div class="container flex">
            <div class="info flex flex-col gap-4 px-4 py-3">
                <h2 class="text-5xl font-semibold">Чекер</h2>
                <p>
                    Чтобы добавить телефон в список поиска, используйте один из сценариев:
                </p>
                <ol class="flex flex-col gap-4 custom-list">
                    <li>Введите телефон абонента, а затем нажмите Enter. Повторите действие нужное количество раз.</li>
                    <li>Скопируйте несколько номеров и вставьте их в поле. Каждый номер должен находиться на отдельной строке.</li>
                </ol>
                <p>
                    Можно использовать различные форматы номеров, например: +79828430192, 89828430192, +7(982)843-01-92, +7 982 843 01 92
                </p>
                <img :src="getIllustrationSrc()" alt="illustration-about">
            </div>
            <div class="checker gap-4">
                <div class="textarea-container">
                    <div class="line-numbers" ref="lineNumbers">
                        <span v-for="n in lineNumbers" :key="n">{{ n }}</span>
                    </div>
                    <textarea
                        v-model="text"
                        @input="updateLineNumbers"
                        @scroll="syncScroll"
                        ref="textarea"
                    ></textarea>
                </div>
                <div class="list-container">
                    <ol class="list flex flex-col items-center justify-start custom-list font-thin">
                        <li v-for="(phone, index) in phoneNumbers" :key="index">{{ phone }}</li>
                    </ol>
                </div>
                <a href="/checker/finish" class="btn btn-primary px-10 rounded-xl" @click="startCheck">Начать проверку</a>
                <!-- <button class="btn btn-primary px-10 rounded-xl" @click="startCheck">Начать проверку</button> -->
                
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: "checkerView",
    data() {
        return {
            text: '',
            lineNumbers: [1],
            phoneNumbers: [], // Добавлен массив для хранения номеров
        };
    },
    computed: {
        ...mapState(['isDark']),
    },
    methods: {
        updateLineNumbers() {
            const lines = this.text.split('\n').length;
            this.lineNumbers = Array.from({ length: lines }, (_, i) => i + 1);
            // Обновляем массив phoneNumbers при изменении текста
            this.phoneNumbers = this.text.split('\n').filter(line => line.trim() !== '');
        },
        syncScroll() {
            this.$refs.lineNumbers.scrollTop = this.$refs.textarea.scrollTop;
        },
        getIllustrationSrc() {
            return this.isDark ? require('@/assets/illustrations/checker-dark.svg') : require('@/assets/illustrations/checker.svg');
        },
        async startCheck() {
           
            let request =  await axios.post('https://checket.tg-service.pro/api/start_check',{
                "define_gender" : true,
                "parse_bio" : true,
                "numbers" : this.phoneNumbers
            })
            let task = request.data.task_id;
            if(task){
                this.$store.state.taskID = task;
                let socket = new WebSocket("https://checket.tg-service.pro/task_ws?task_id=" + task);
                socket.onmessage((ev)=>{
                    let json = JSON.parse(ev);
                    if(json.progress >= 99){
                        this.$router.push('/checker/finish');
                    }
                })
            }
            
        }
    },
}
</script>


<style lang="scss" scoped>
#checker, .container{
    flex-direction: row;

    @media (max-width: 768px) {
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
}

.btn-primary {
    background-color: #419FD9;
    color: white;
    transition: background-color 0.3s;
    width: 100%;
    height: 70px;
    max-width: 400px;
    font-size: smaller;
  
    &:hover {
      background-color: #317aab;
    }
}

.info {
    flex: 1; 
    max-width: 600px;
    margin-top: -20px;
    margin-right: 20px;
    align-items: start;
    font-size: .85rem;

    @media (max-width: 768px) {
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
}

.illustration {
    flex: 1;
    max-width: 600px; 
}

.list-container {
    width: 80%;
    height: 100%;
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.list {
    height: 100%;
    width: 60%;
    overflow-y: auto;

    /* Стили для скроллбара */
    &::-webkit-scrollbar {
        width: 8px; /* Ширина скроллбара */
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1; /* Цвет фона скроллбара */
        border-radius: 10px; /* Скругленные углы */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ccc; /* Цвет полоски скроллбара */
        border-radius: 10px; /* Скругленные углы полоски */
        border: 2px solid #f1f1f1; /* Пространство вокруг полоски */
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #b3b3b3; /* Цвет полоски при наведении */
    }

    &::-webkit-scrollbar-button {
        display: none; /* Скрываем кнопки прокрутки */
    }

    /* Firefox specific styles */
    scrollbar-width: thin;
    scrollbar-color: #ffffff00;
}


.textarea-container {
    display: flex;
    background: rgba(207, 209, 212, 0.25);
    border-radius: 8px;
    padding: 10px;
    font-family: Arial, sans-serif;
    height: 135px; /* Фиксированная высота контейнера */
    width: 400px;
    overflow: hidden;
}

.line-numbers {
    text-align: right;
    padding-right: 10px;
    user-select: none;
    color: grey;
    overflow: hidden;
    height: 100%;
    display: flex;
    font-size: 14px;
    flex-direction: column;
    justify-content: flex-start;
}

textarea {
    border: none;
    outline: none;
    resize: none;
    width: 100%;
    background: none;
    font-family: inherit;
    font-size: 14px;
    overflow-y: auto; /* Вертикальная прокрутка */
    height: 100%; /* Занимает всю высоту контейнера */
}

.custom-list {
    list-style-type: none; 
    counter-reset: custom-counter; 

    &.list li {
        width: 150px;
        padding-left: 50px;

        &:before {
            font-weight: 500;
        }
    }

    li {
        counter-increment: custom-counter;
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

.checker {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden; /* Ограничиваем переполнение */
}
</style>
