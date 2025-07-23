import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeekUser, Token, User } from './interface';
import { Menu } from '@core';
import { map } from 'rxjs/operators';
import { GEEK_PC_API } from '@core/interceptors/geek-pc-api.interceptor';
import { of } from 'rxjs';
import { IResponse } from 'app/geek/interface/response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient, @Inject(GEEK_PC_API) private geekPcApi: string) {}
  // 不转换数据的话，重命名interface.ts的access_token为token也行，但是TokenService记得也要改，这里索性直接转换了。
  login(mobile: string, code: string) {
    return this.http
      .post<IResponse<Pick<Token, 'refresh_token'> & { token: string }>>(
        `${this.geekPcApi}/authorizations`,
        {
          mobile,
          code,
        }
      )
      .pipe(
        map(res => res.data),
        map((token): Token => ({ access_token: token.token, refresh_token: token.refresh_token }))
      );
  }
  // 实际开发中，这个需要更改
  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }
  // 这里退出操作不需要调用后端api，索性直接返回观察者对象就好了
  logout() {
    return of(true);
  }
  // 实际开发应该统一User，这里是为了方便展示，所以索性新定义GeekUser，然后二次转换为User
  me() {
    return this.http.get<IResponse<GeekUser>>(`${this.geekPcApi}/user`).pipe(
      map(res => res.data),
      map(
        (geek): User => ({
          id: geek.id,
          avatar: geek.photo,
          email: 'demo@gmail.com',
          name: geek.name,
        })
      )
    );
  }
  // 实际开发中，不同权限应当对应不同目录，本api其实就一个角色，所以不用改
  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
