import api from "@/utils/api"


export default {
    createVerifierWallet() {
        return api({
            url: `/multitenancy/wallet`,
            method: 'POST',
            data: {
                image_url: "https://aries.ca/images/sample.png",
                key_management_mode: "managed",
                label: "Verifier ",
                wallet_dispatch_type: "both",
                wallet_key: "ultra-secret-password",
                wallet_name: "verifier-wallet-5",
                wallet_type: "indy",
                wallet_webhook_urls: []
            }
        })
    }
}