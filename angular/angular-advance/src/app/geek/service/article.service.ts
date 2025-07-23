import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GEEK_PC_API } from '@core/interceptors/geek-pc-api.interceptor';
import { IResponse } from 'app/geek/interface/response';
import { ArticleList } from 'app/geek/interface/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(@Inject(GEEK_PC_API) private geekPcAPi: string, private httpClient: HttpClient) {}
  /**
   * 获取文章列表
   */
  findMany(page: number, perPage: number) {
    return this.httpClient.get<IResponse<ArticleList>>(`${this.geekPcAPi}/mp/articles`, {
      params: {
        per_page: perPage,
        page,
      },
    });
  }
  /**
   * 删除文章
   */
  delete(id: string) {
    return this.httpClient.delete(`${this.geekPcAPi}/mp/articles/${id}`);
  }
}
