import { routes } from "./helpers/routes";

export function router() {
    
    const path = window.location.pathname;
    const publicRoute = routes.public.find(route => route.path === path);

    if(!publicRoute && path != '/'){
        navigateTo('/not-found');
        return;
    }

    if (path == '/'){
        navigateTo('/up-file');
        return;
    }

    const data = localStorage.getItem('data');
    if (publicRoute) {
        if((path == '/home' && !data)){
            navigateTo('/up-file');
            return;
        }else{
            publicRoute.component();
            return;
        }
    }
}

export function navigateTo(path: string):void {
    window.history.pushState({}, "", window.location.origin + path);
    router();
}