import jwtDecode from 'jwt-decode'
import moment from 'moment'

export default {
    isJwtExpired(jwtToken) {
        try {
            const decodedJwtToken = jwtDecode(jwtToken)
            const jwtTokenExpirationTime = decodedJwtToken.exp
            return moment().unix() > jwtTokenExpirationTime
        } catch {
            return true
        }
    },
    jwtExpiresInSeconds(jwtToken, seconds) {
        try {
            const decodedJwtToken = jwtDecode(jwtToken)
            const jwtTokenExpirationTime = decodedJwtToken.exp
            return moment().unix() > (jwtTokenExpirationTime - seconds)
        } catch {
            return true
        }
    },
    getPrivileges(jwtToken) {
        try {
            const decodedJwtToken = jwtDecode(jwtToken)
            return decodedJwtToken.scopes || []
        } catch {
            return []
        }
    },
    isHmac512(jwtToken) {
        let headers
        try {
            headers = jwtDecode(jwtToken, { header: true })
        } catch {
            return false
        }
        return headers.alg === 'HS512'
    },
    isValid(jwtToken) {
        if (!jwtToken) {
            return false
        }
        return !this.isJwtExpired(jwtToken) && this.isHmac512(jwtToken)
    },
    isValidFormat(jwtToken) {
        if (!jwtToken) {
            return false
        }
        return this.isHmac512(jwtToken)
    },
    parseToken(jwtToken) {
        return jwtDecode(jwtToken)
    }
}
