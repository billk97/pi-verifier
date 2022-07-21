<template>
    <div class="container">
        <div v-if="!isVerified">
            <h1>Room is locked !</h1>
            <h2>To access the room please scan the bellow qr code and provide some credentials</h2>
            <img alt="Vue logo" src="@/assets/lock-rings.png" style="margin-botton: 5px">
            <qr-code v-if="invitationBase" :text="invitationBase" class="qr-code"></qr-code>
        </div>
        <div v-if="isVerified">
            <h1>Room is unlock</h1>
            <h2>Enjoi</h2>
            <img v-if="isVerified" alt="Vue logo" src="@/assets/green-unlock.png" style="margin-botton: 5px">
        </div>
    </div>
</template>

<script>


    export default {
        name: "AskCredentials",
        components: {
        },
        data() {
            return {
                invitationBase: "bcsdhvchbsdlajvvlsjdfvljdnvjafniujanvjbadvihbaeiuveaiubvaiubvuianvueanbruvnirvnaiv",
                isVerified: false,
            }
        },
        created () {
            this.changeToVerifed()
        },
        methods: {
            changeToVerifed() {
                setTimeout(() => {
                    this.isVerified = true;
                }, 5000)
            }
        }
    }
</script>

<style scoped>

    .container {
        color: #ffffff;
        font-weight: bold;
    }
    .qr-code {
        padding: 5px;
        background-color: #ffffff;
        border-radius: 10px;
        border: 3px #DF9342 solid;
        width: fit-content;
        margin: 0 auto;
    }

</style>
