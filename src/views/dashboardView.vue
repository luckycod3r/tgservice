<template>
    <section id="dashboard">
        <h2 class="text-5xl font-semibold">Аккаунт</h2>
        <p>{{ email }}</p>
        <div class="payment my-5 gap-5">
            <div class="balance">
                <p class="text-1xl font-thin">На балансе:</p>
                <h4 class="text-4xl font-bold">{{ balance }} ₽</h4>
            </div>
            <RouterLink to="/payment" class="btn-primary px-12 rounded-xl">Пополнить</RouterLink>
        </div>
        <form @submit.prevent="resetPassword">
            <label class="input input-bordered flex items-center gap-2 px-6 py-6">
                <input :type="passwordVisible ? 'text' : 'password'" v-model="oldPassword" name="passwordOld" class="grow" placeholder="Старый пароль" />
                <kbd class="cursor-pointer" @click="togglePasswordVisibility">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.06202 12.3481C1.97868 12.1236 1.97868 11.8766 2.06202 11.6521C2.87372 9.68397 4.25153 8.00116 6.02079 6.81701C7.79004 5.63287 9.87106 5.00073 12 5.00073C14.129 5.00073 16.21 5.63287 17.9792 6.81701C19.7485 8.00116 21.1263 9.68397 21.938 11.6521C22.0214 11.8766 22.0214 12.1236 21.938 12.3481C21.1263 14.3163 19.7485 15.9991 17.9792 17.1832C16.21 18.3674 14.129 18.9995 12 18.9995C9.87106 18.9995 7.79004 18.3674 6.02079 17.1832C4.25153 15.9991 2.87372 14.3163 2.06202 12.3481Z" stroke="#419FD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15.0001C13.6569 15.0001 15 13.657 15 12.0001C15 10.3433 13.6569 9.00012 12 9.00012C10.3432 9.00012 9.00002 10.3433 9.00002 12.0001C9.00002 13.657 10.3432 15.0001 12 15.0001Z" stroke="#419FD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </kbd>
            </label>
            <label class="input input-bordered flex items-center gap-2 px-6 py-6">
                <input :type="passwordVisible ? 'text' : 'password'" v-model="newPassword" name="password" class="grow" placeholder="Новый пароль" />
                <kbd class="cursor-pointer" @click="togglePasswordVisibility">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.06202 12.3481C1.97868 12.1236 1.97868 11.8766 2.06202 11.6521C2.87372 9.68397 4.25153 8.00116 6.02079 6.81701C7.79004 5.63287 9.87106 5.00073 12 5.00073C14.129 5.00073 16.21 5.63287 17.9792 6.81701C19.7485 8.00116 21.1263 9.68397 21.938 11.6521C22.0214 11.8766 22.0214 12.1236 21.938 12.3481C21.1263 14.3163 19.7485 15.9991 17.9792 17.1832C16.21 18.3674 14.129 18.9995 12 18.9995C9.87106 18.9995 7.79004 18.3674 6.02079 17.1832C4.25153 15.9991 2.87372 14.3163 2.06202 12.3481Z" stroke="#419FD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15.0001C13.6569 15.0001 15 13.657 15 12.0001C15 10.3433 13.6569 9.00012 12 9.00012C10.3432 9.00012 9.00002 10.3433 9.00002 12.0001C9.00002 13.657 10.3432 15.0001 12 15.0001Z" stroke="#419FD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </kbd>
            </label>
            <button type="submit" class="btn btn-primary px-12 rounded-xl">Сохранить</button>
            <button type="submit" class="btn btn-danger px-12 rounded-xl" @click="logout()">Выйти из аккаунта</button>
        </form>
    </section>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    name: "dashboardView",
    components: {
        RouterLink
    },
    data() {
        return {
            passwordVisible: false,
            email: '',
            oldPassword: '',
            newPassword: '',
            balance: 0,
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        },
        async validateToken() {
            try {
                const response = await axios.get('https://checker.tg-service.pro/api/me');
                if (response.status != 200) {
                    this.$router.push('/login');
                }
                else{
                    this.email = response.data.email;
                    this.balance = response.data.balance;
                    
                }

            } catch (error) {
                console.error('Ошибка проверки токена:', error);
                this.$router.push('/login');
                
            }
        },
        async logout(){
            await axios.post("https://checker.tg-service.pro/auth/jwt/logout");
            this.$router.push('/')
            this.$store.state.meActive = false;
            this.$event.emit("update-header");
        },
        async resetPassword() {
            const token = localStorage.getItem('token');

            if (!this.oldPassword || !this.newPassword) {
                console.error('Пожалуйста, заполните оба поля пароля.');
                return;
            }

            try {
                const response = await axios.post('https://checker.tg-service.pro/auth/reset-password', {
                    token: token,
                    password: this.newPassword
                });

                console.log('Пароль успешно изменен:', response.data);
                alert('Пароль успешно изменен!')
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.error('Ошибка сброса пароля:', error.response.data.detail);
                } else {
                    console.error('Ошибка сброса пароля:', error);
                }
            }
        }
    },
    mounted() {
        this.validateToken();
    }
}
</script>


<style lang="scss" scoped>
#dashboard{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px
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
    }
}

.payment{
    width: 100%;
    height: 70px;
    max-width: 500px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    .balance{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}

.btn-primary {
    background-color: #419FD9;
    color: white;
    transition: background-color 0.3s;
    font-size: smaller;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.btn{
        width: 100%;
        height: 70px;
        max-width: 500px;
    }
  
    &:hover {
      background-color: #317aab;
    }
}
.btn-danger {
    background-color: #d94141;
    color: white;
    transition: background-color 0.3s;
    font-size: smaller;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.btn{
        width: 100%;
        height: 70px;
        max-width: 500px;
    }
  
    &:hover {
      background-color: #ab3131;
    }
}

.login-link{
    color: #419FD9;

    &:hover{
        color: #317aab;
    }
  }
</style>