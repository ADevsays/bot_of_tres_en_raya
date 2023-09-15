<script>
import Audio_Icon from './SVG/Audio_Icon.vue'
import Audio_Mute from './SVG/Audio_Mute.vue'
import { useAudio } from '../store/controlAudio'
import { setLocalS } from '../helpers/saveInLocalStorage'
    export default{
        props:{},
        components: {
            Audio_Icon,
            Audio_Mute
        },
        data(){
            return{
                isMuted: false
            }
        },
        mounted(){
            this.$storeAudio = useAudio();
            this.isMuted = !this.$storeAudio.canUseAudio
        },
        methods:{
            changeIcon(){
                this.isMuted = !this.isMuted;
                this.$storeAudio.updateCanUseAudio();
                setLocalS('Audio State', this.$storeAudio.canUseAudio);
            }
        }
    }
</script>

<template>
    <div class="absolute top-12 right-5 cursor-pointer hover:opacity-60"
        @click="changeIcon">
        <Audio_Icon v-if="!isMuted"/>
        <Audio_Mute v-if="isMuted"/>
    </div>
</template>

