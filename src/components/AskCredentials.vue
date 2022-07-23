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
    import token from '@/services/token'
    import multitenancy from '@/services/multitenancy'
    import connections from '@/services/connections'

    export default {
        name: "AskCredentials",
        components: {
        },
        data() {
            return {
                invitationBase: null,
                isVerified: false,
                walletToken: null
            }
        },
        created () {
            this.changeToVerifed()
            this.checkIfHasWallet()
            this.createInvitation()
            // check if wallet exists
            // if not exists, create
            // save bearer token
            // send bearer toeken to backend for safe kipping
            // create invitation
            // check if invitation status has changed
            // once changed do action
            // once status complited
            // initiate present-proof protocol
            // check periodically if status has changed
            // verify presentation
            // show responce
        },
        methods: {
            changeToVerifed() {
                setTimeout(() => {
                    this.isVerified = true;
                }, 5000)
            },
            async checkIfHasWallet() {
                let resp = null
                try {
                    resp = await token.checkIfTokenExist()
                    localStorage.setItem("verifier-jwt", resp.data.token)
                } catch (e) {
                    this.createWallet()
                }
                
            },
            async createWallet() {
                const resp = await multitenancy.createVerifierWallet()
                await token.saveToken(resp.data.token)
            },
            async createInvitation() {
                const resp = await connections.createInvitation()
                this.invitationBase =  btoa(JSON.stringify(resp.data.invitation))
                console.log(resp.data.invitation)
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
