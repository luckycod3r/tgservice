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
                <div class="checks flex justify-between w-[79%]">
                    <label class="label flex gap-2 cursor-pointer">
                    <span class="label-text">Определять пол</span>
                    <input  v-model="parseGender" type="checkbox" checked="checked" class="checkbox" />
                </label>
                <label class="label flex gap-2 cursor-pointer">
                    <span class="label-text">Парсить био</span>
                    <input v-model="parseBio" type="checkbox" checked="checked" class="checkbox" />
                </label>
                </div>
                <button :disabled="progress != 100" class="btn btn-primary px-10 rounded-xl" @click="startCheck">
                    <span class="text">{{btnText}}</span>
                    <div class="btn-progress" :style="`--progress: ${progress}%`"></div>
                </button>
               
                
                
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
            parseBio : true,
            parseGender : true,
            btnText : 'Начать проверку',
            progress: 100,
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
            
            let request =  await axios.post('https://checker.tg-service.pro/api/start_check',{
                "define_gender" : this.parseGender,
                "parse_bio" : this.parseBio,
                "numbers" : this.phoneNumbers
            })
            let task = request.data.task_id;
            if(request.status == 200){
                this.progress = 0;
                this.btnText = "Идет проверка..."
                let socket = new WebSocket("wss://checker.tg-service.pro/api/task_ws?task_id=" + task);
                socket.onmessage = (ev)=>{
                    let json = JSON.parse(ev.data);
                    if(json.txt_file_id){
                        this.progress = 100;
                        this.$store.state.taskTXTID = json.txt_file_id;
                        this.$store.state.taskXLSXID = json.xlsx_file_id;
                        this.$router.push('/checker/finish');
                        this.btnText = 'Начать проверку'
                    }
                    else{
                        this.progress = json.progress;
                    }
                }
            }
            else if(request.status == 403){
                alert("На вашем счете недостаточно средств")
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
.text{
    position: relative;
    z-index: 2;
}
.btn-primary {
    
    background-size: 20px 20px;
    color: white;
    transition: background-color 0.3s;
    width: 100%;
    height: 70px;
    max-width: 400px;
    font-size: smaller;

    position: relative;
    overflow: hidden;
    &:hover {
      background-color: #317aab;
    }
}
[data-theme="dark"] .btn-primary{
    background-color: rgba(35, 44, 54, 1);
}
[data-theme="light"] .btn-primary{
    color: rgba(36, 36, 36, 1);
    background-color: rgba(242, 242, 242, 1);
}
.btn-progress{
    background-color: #419FD9;
    height: 100%;
    width: var(--progress);
    left: 0;
    position: absolute;
    z-index: 1;
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

input[type="checkbox"]{
    --chkbg: oklch(0.64 0.17 258.42);
    --chkfg: oklch(0.92 0 0);
    border: 2px solid rgba(0,0,0,0.2) !important;
}
</style>
