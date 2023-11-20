export default defineNuxtRouteMiddleware(async () => {
    if(!process.server) {
        const {token, checkAuthState} = useAuth();
        await checkAuthState()
        if(!token.value) {
            return await navigateTo('/login', {replace: true})
        }
    }
});