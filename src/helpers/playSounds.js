export function playSounds(){
    const urlAudio = './src/assets/audios/Sound_effect.mp3';
    const audio = new Audio(urlAudio);
    audio.play();
    audio.volume = 0.5;
};
