<template>
    <section id="login" class="container flex px-4 flex-col justify-center justify-items-center gap-10">
        <h2 class="text-5xl font-semibold">Вход</h2>
        <form @submit.prevent="handleLogin">
            <label class="input input-bordered flex items-center gap-2 px-6 py-6">
                <input type="email" v-model="formData.email" name="email" class="grow" placeholder="E-mail" required />
            </label>
            <label class="input input-bordered flex items-center gap-2 px-6 py-6">
                <input :type="passwordVisible ? 'text' : 'password'" v-model="formData.password" name="password" class="grow" placeholder="Пароль" required />
                <kbd class="cursor-pointer" @click="togglePasswordVisibility">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.06202 12.3481C1.97868 12.1236 1.97868 11.8766 2.06202 11.6521C2.87372 9.68397 4.25153 8.00116 6.02079 6.81701C7.79004 5.63287 9.87106 5.00073 12 5.00073C14.129 5.00073 16.21 5.63287 17.9792 6.81701C19.7485 8.00116 21.1263 9.68397 21.938 11.6521C22.0214 11.8766 22.0214 12.1236 21.938 12.3481C21.1263 14.3163 19.7485 15.9991 17.9792 17.1832C16.21 18.3674 14.129 18.9995 12 18.9995C9.87106 18.9995 7.79004 18.3674 6.02079 17.1832C4.25153 15.9991 2.87372 14.3163 2.06202 12.3481Z" stroke="#419FD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 15.0001C13.6569 15.0001 15 13.657 15 12.0001C15 10.3433 13.6569 9.00012 12 9.00012C10.3432 9.00012 9.00002 10.3433 9.00002 12.0001C9.00002 13.657 10.3432 15.0001 12 15.0001Z" stroke="#419FD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </kbd>
            </label>
            <button type="submit" class="btn-primary px-12 rounded-xl">Войти</button>
        </form>
        <p>Нет аккаунта? Пора его <RouterLink class="login-link" to="/register">создать</RouterLink>!</p>
    </section>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    name: "loginView",
    components: {
        RouterLink
    },
    data() {
        return {
            passwordVisible: false, // состояние видимости пароля
            formData: {
                email: '', // E-mail пользователя
                password: '' // Пароль пользователя
            }
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible; // переключение состояния
        },
        async handleLogin() {
            try {
                const params = new URLSearchParams();
                params.append('username', this.formData.email);
                params.append('password', this.formData.password);
                const response = await axios.post("https://checker.tg-service.pro/api/auth/jwt/login", params, {
                    withCredentials : true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                console.log(response);
                if (response.status === 204) {
                    alert('Вход выполнен успешно!');
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    if (error.response.data.detail === "LOGIN_BAD_CREDENTIALS") {
                        alert('Неверные учетные данные.');
                    } else {
                        alert('Ошибка входа: ' + error.response.data.detail);
                    }
                } else {
                    
                    
                    alert('Произошла ошибка при входе. Попробуйте еще раз.');
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #login{
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