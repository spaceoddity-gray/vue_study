export default defineNuxtRouteMiddleware((to) => {
    const { value: token } = useCookie('blip_admin_test_session'); //login token

    if(!token) {
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