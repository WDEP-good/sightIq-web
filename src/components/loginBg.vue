<template>
    <div class="loginbg">
        <vue-particles id="tsparticles" :options="optiones" />
    </div>
</template>
<script setup lang="ts">
import {reactive} from 'vue'
const optiones = reactive({
            background: {
                color: {
                    value: '#003366'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40
                    },
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: '#ffffff'
                },
                links: {
                    color: '#ffffff',
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: 'bounce',
                    random: false,
                    speed: 6,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80
                },
                opacity: {
                    value: 0.5
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 1, max: 5 }
                }
            },
            detectRetina: true
        } )

</script>

<style scoped></style>