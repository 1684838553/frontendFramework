export interface GeekUser {
  id: string; //	必须		用户id
  name: string; //	必须		用户名
  photo: string; //	必须		用户头像
  is_media: string; //必须		是否是自媒体，0-否，1-是
  intro: string; //必须		简介
  certi: string; //必须		自媒体认证说明
  art_count: string; //必须		发布文章数
  follow_count: string; //必须		关注的数目
  fans_count: string; //必须		fans_count
  like_count: string; //必须		被点赞数
}

export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}

export interface Token {
  [prop: string]: any;

  access_token: string;
  token_type?: string;
  expires_in?: number;
  exp?: number;
  refresh_token?: string;
}
