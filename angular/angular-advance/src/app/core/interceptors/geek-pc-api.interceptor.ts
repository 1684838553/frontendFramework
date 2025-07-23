import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { IResponse } from 'app/geek/interface/response';

export const GEEK_PC_API = new InjectionToken<string>('GEEK_PC_API');

@Injectable()
export class GeekPcApiInterceptor implements HttpInterceptor {
  // provider从app模块
  constructor(@Optional() @Inject(GEEK_PC_API) private geekPcApi?: string) {}
  // http请求是否是当前的api
  hasScheme = (url: string) => this.geekPcApi && new RegExp(this.geekPcApi, 'i').test(url);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.hasScheme(request.url)) {
      this.beforeRequestEach(request);

      return next // 复制请求并设置 withCredentials 为 false
        .handle(request.clone({ withCredentials: false }))
        .pipe(tap({ next: this.afterRequestEach }));
    }

    return next.handle(request);
  }
  // 请求前的钩子函数
  beforeRequestEach = (request: HttpRequest<unknown>) => {
    console.log('request is : ', request);
  };
  // 请求后的钩子函数，简化版，详细可以做成Axios那样
  afterRequestEach = (response: HttpEvent<IResponse<unknown>>) => {
    console.log('response is : ', response);

    return response;
  };
}
