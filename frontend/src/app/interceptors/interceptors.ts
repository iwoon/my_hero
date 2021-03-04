import { HTTP_INTERCEPTORS, } from '@angular/common/http';
import { MainInterceptor } from './main.interceptor';
import { LogInterceptor } from './log.interceptor';
// import { AuthInterceptor } from './auth.interceptor';

export const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MainInterceptor,
        multi: true
    },
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsureHttpsInterceptor,
      multi: true
    }, */
    //   {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: AuthInterceptor,
    //     multi: true
    //   },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LogInterceptor,
        multi: true
    }
]


/*
* Interceptor order
* Angular applies interceptors in the order that you provide
* them. If you provide interceptors A, then B, then C, requests
* flow in A->B->C and responses flow out C->B->A.
*
* You cannot change the order or remove interceptors later. If
* you need to enable and disable an interceptor dynamically,
* you'll have to build that capability into the interceptor
* itself.
 */