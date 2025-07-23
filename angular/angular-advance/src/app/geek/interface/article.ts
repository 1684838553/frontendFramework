export interface ArticleList {
  page: number;
  per_page: number;
  results: Article[];
  total_count: number;
}

export interface Article {
  id: string;
  title: string;
  status: string;
  comment_count: string;
  pubdate: string;
  cover: {
    type: string;
    images: string;
  };
  like_count: number;
  read_count: string;
}
