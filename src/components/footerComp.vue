<template>
    <footer class="themefooter text-neutral-content items-center p-4">
        <aside class="grid-flow-col items-center">
          <p>© TG-Servise, {{ new Date().getFullYear() }}</p>
        </aside>
        <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a href="/policy">Политика обработки данных</a>
        </nav>
    </footer>
</template>

<script>
    export default {
        name: "footerComp"
    }
</script>

<style lang="scss" scoped>
    footer{
        width: 100%;
        padding: 1rem 0 1rem 0;
        gap: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: center;
        color: #999999;
        font-size: 15px;
        line-height: 24px;
        font-weight: 300;
    }
</style>