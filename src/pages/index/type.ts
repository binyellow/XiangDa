// 接口出参
export interface NewsRes {
  status: number;
  message: string;
  data: NewRecord[];
}

// 不同平台的热榜
export interface NewRecord {
  id: number;
  sort: number;
  name: string;
  source_key: string;
  icon_color: string;
  data: NewsEntity[];
  create_time: string;
}

// 具体的新闻
export interface NewsEntity {
  id: number;
  title: string;
  extra: string;
  link: string;
}
