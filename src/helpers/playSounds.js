export function playSounds(){
    const urlAudio = import.meta.env.VITE_AUDIO_SRC
    const audio = new Audio(urlAudio);
    audio.play();
    audio.volume = 0.5;
};
 