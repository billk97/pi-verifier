export default {
    data() {
        return {
            config: {
                host: process.env.VUE_APP_HOST_DOMAIN,
                tokenHost: process.env.VUE_APP_HOST_TOKEN_DOMAIN,
                env: process.env.VUE_APP_ENV
            }
        }
    }
}
