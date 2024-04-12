export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('login'); //login token

    if(!token.value) {
        if(to.path !== '/login') {
            return navigateTo('/login')
        }
    }
    else {
        if(to.path === '/login') {
            return navigateTo('/')
        }
        return;
    }
})