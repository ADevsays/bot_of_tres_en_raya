<script>
export default {
    props: {
        condition: Boolean,
        winnerPlayer: String,
        content: String
    }
}
</script>

<template>
    <Transition name="modal">
        <div class="modal absolute border-2 mt-5 text-center w-96 p-3 h-auto bg-white rounded-xl font-bold text-3xl"
            v-if="condition">
            {{ content }}
            <span :class="winnerPlayer == 'Equis' ? 'text-red-400' : 'text-emerald-400'">
                {{ winnerPlayer }}
            </span>
        </div>
    </Transition>
</template>

<style scoped>
    .modal-leave-active{
        transition: opacity 0.3s;
        opacity: 0;
    }
</style>