<template>
    <div class="flex flex-col justify-center gap-4">
        <h1 class="text-5xl">Упс :(</h1>
        <p class="text-3x1">404 - Страница не найдена. Вы можете вернутся на <router-link class="login-link" to="/">главную</router-link></p>
    </div>
</template>

<script>
    export default {
        name: "errorView"
    }
</script>

<style lang="scss" scoped>
    .flex{
        align-items: center;
        text-align: center;
    }

    .login-link{
        color: #419FD9;

        &:hover{
            color: #317aab;
        }
      }
</style>