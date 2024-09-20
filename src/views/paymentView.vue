<template>
    <section id="payment" class="container flex flex-col px-4 justify-center justify-items-center gap-10">
        <h2 class="text-5xl font-semibold">Оплата</h2>
        <p>Введите сумму пополнения и нажмите Оплатить</p>
        <form @submit.prevent>
            <label class="input input-bordered flex items-center gap-2 px-6 py-6">
                <input type="number" v-model="sum" name="payment" aria-describedby="helper-text-explanation" class="grow" placeholder="Сумма пополнения (руб)" title="Сумма пополнения (руб)" />
            </label>
            <button type="submit" class="btn-primary px-12 rounded-xl" @click="startPayment()">Оплатить</button>
        </form>
    </section>
</template>

<script>
import axios from 'axios';


    export default {
        name: "paymentView",
        data(){
            return {
                sum : ""
            }
        },
        methods : {
            async startPayment(){
                if(Number(this.sum) > 0){
                    if(this.sum > 9999){
                        this.sum = 9999;
                    }
                    let info = await axios.post("https://checker.tg-service.pro/api/billing",{
                    sum : this.sum
                        })
                        if(info.status == 200){
                            window.open(info.data.link)
                        }
                }
               
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    #payment{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        font-size: larger;

        label{
            width: 100%;
            height: 70px;
            max-width: 500px;
            color: white;
            background: rgb(203,213,225, 0.5);

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }
        }
    }

    .btn-primary {
        background-color: #419FD9;
        color: white;
        transition: background-color 0.3s;
        width: 100%;
        height: 70px;
        max-width: 500px;
        font-size: smaller;
      
        &:hover {
          background-color: #317aab;
        }
    }
    .login-link{
        color: #419FD9;

        &:hover{
            color: #317aab;
        }
      }

      p{
        font-size: 1rem;
        text-align: center
      }
</style>