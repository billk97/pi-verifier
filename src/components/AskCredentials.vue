<template>
    <div class="custom-container verifier-background" :class="{'verifier-background-green': isVerified}">
        <div v-if="!isVerified">
            <h1>Room is locked !</h1>
            <h2>To access the room please scan the bellow qr code and provide some credentials</h2>
            <img alt="Vue logo" src="@/assets/lock-rings.png" style="margin-botton: 5px">
            <qr-code v-if="getBase64Invitation" :text="getBase64Invitation" class="qr-code"></qr-code>
        </div>
        <div v-if="isVerified">
            <h1>Room is unlock</h1>
            <h2>Enjoi</h2>
            <img v-if="isVerified" alt="Vue logo" src="@/assets/green-unlock.png" style="margin-botton: 5px">
        </div>
        <b-button @click="deleteAllCredRecords" variant="danger">
            Delete all credentials records
        </b-button>
        <b-button @click="askForCreds" variant="success">
            Ask for credentials
        </b-button>
    </div>
</template>

<script>
    import token from '@/services/token'
    import multitenancy from '@/services/multitenancy'
    import connections from '@/services/connections'
    import presentproof from '@/services/presentproof'

    export default {
        name: "AskCredentials",
        components: {
        },
        computed: {
            getInvitation() {
                return this.$store.getters.getInvitation
            },
            getBase64Invitation() {
                return this.$store.getters.getBase64Invitation
            },
            getConnectionId() {
                return this.$store.getters.getConnectionId
            },
            getPresExId() {
                return this.$store.getters.getPresExId
            }
        },
        watch: {
            connectionCompleted: {
                immediate: true,
                handler(value) {
                    if (value) {
                        this.askForCreds()
                    }
                }
            },
            proofRecived: {
                immediate: true,
                handler(value) {
                    if (value) {
                        this.verifyCredentials()
                    }
                }
            }
        },
        data() {
            return {
                isVerified: false,
                walletToken: null,
                currentConnectionId: null,
                acceptConnectionInterval: null,
                connectionCompleted: false,
                proofRecivedInerval: null,
                proofRecived: false,
            }
        },
        async created () {
            await this.checkIfHasWallet()
            await this.createInvitationIfNotExist()
            this.checkIfConnectionHasBeenAccepted()
            this.checkIfHolderHasSendCredentials()
        },
        methods: {
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
                localStorage.setItem("verifier-jwt", resp.data.token)
            },
            async createInvitationIfNotExist() {
                if (this.$store.getters.invitationExist) {
                    console.log("invitation already exist")
                    console.log(this.getBase64Invitation)
                    return
                }
                console.log("creating invitation")
                const resp = await connections.createInvitation()
                this.$store.dispatch('updateInvitation', resp.data)
            },
            async deleteOrphanConnections() {
                const resp = await connections.getConnections()
                const walletConnections = resp.data.results
                let connectionsToBeDeleted = []
                for (const con of walletConnections) {
                    if (con.rfc23_state === 'invitation-sent') {
                        connectionsToBeDeleted.push(con.connection_id)
                    }
                }
                console.log(this.currentConnectionId)
                connectionsToBeDeleted.filter(c => { return c === this.currentConnectionId})
                for (const con of connectionsToBeDeleted) {
                    console.log(con)
                    connections.deleteConnection(con)
                }
            },
            async checkIfConnectionHasBeenAccepted() {
                clearInterval(this.acceptConnectionInterval)
                this.acceptConnectionInterval = setInterval(async() => {
                    console.log("checkIfConnectionHasBeenAccepted runninng")
                    console.log(this.acceptConnectionInterval)
                    if (this.connectionCompleted) {
                        clearInterval(this.acceptConnectionInterval)
                        return
                    }
                    const resp = await connections.getConnectionsById(this.getConnectionId)
                    const con = resp.data
                    if (con.rfc23_state === 'request-received') {
                        console.log("state: ",con.rfc23_state, " connection: ", this.getConnectionId )
                        await connections.accept(con.connection_id)
                        this.connectionCompleted = true
                        clearInterval(this.acceptConnectionInterval)
                    } else if (con.rfc23_state === 'completed') {
                        console.log("state: ",con.rfc23_state, " connection: ", this.getConnectionId )
                        this.connectionCompleted = true
                        clearInterval(this.acceptConnectionInterval)
                    }
                }, 5000)
            },
            async askForCreds() {
                if (!this.connectionCompleted) {
                    setTimeout(() => {
                        console.log("waiting 2 seconds")
                    }, 2000)
                }
                if (this.getPresExId) {
                    console.log("PresExId already exist")
                    return
                }
                console.log("sending request")
                const resp = await presentproof.sendRequest(this.getConnectionId)
                this.$store.dispatch('updatePresExId', resp.data.pres_ex_id)
            },
            async checkIfHolderHasSendCredentials() {
                clearInterval(this.proofRecivedInerval)
                this.proofRecivedInerval = setInterval(async() => {
                    console.log("checkIf holder has send credentials", this.acceptConnectionInterval)
                    if (this.proofRecived) {
                        clearInterval(this.proofRecivedInerval)
                        return
                    }
                    if (!this.getConnectionId) {
                        // clearInterval(this.proofRecivedInerval)
                        return
                    }
                    if (!this.getPresExId) {
                        // clearInterval(this.proofRecivedInerval)
                        return
                    }
                    const resp = await presentproof.getRequestById(this.getPresExId)
                    const con = resp.data
                    console.log("check credentials state", con.state)
                    if (con.state === 'presentation-received') {
                        console.log("proof recived and state is presentation-received")
                        this.proofRecived = true
                        clearInterval(this.proofRecivedInerval)
                    } else if (con.sate === 'done') {
                        console.log("proof already recived and state is done")
                        this.proofRecived = true
                        clearInterval(this.proofRecivedInerval)
                    }
                }, 5000)
            },
            async verifyCredentials() {
                const resp = await presentproof.verify(this.getPresExId)
                console.log("verifing proof", resp.data)
                if (resp.data.verified) {
                    console.log("proof is valid")
                    this.isVerified = true
                }

            },
            async deleteAllCredRecords() {
                const resp =  await presentproof.getRequest()
                const results = resp.data.results
                for (const r of results) {
                    console.log("deleting: ", r.pres_ex_id)
                    presentproof.delete(r.pres_ex_id)
                }
            }
        }
    }
</script>

<style scoped>

    .custom-container {
        color: #ffffff;
        width: 100%;
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
    .verifier-background {
        background-image: url('~@/assets/background.png') ;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 100%;
    }

    .verifier-background-green {
        background-image: url('~@/assets/green-background.png') ;
    }
</style>
