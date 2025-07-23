import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { Article, ArticleList } from 'app/geek/interface/article';
import { ArticleService } from 'app/geek/service/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  constructor(private articleService: ArticleService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.getPage();
  }
  /**
   * 删除文章
   * @param id
   */
  deleteArticle(id: string) {
    this.articleService.delete(id).subscribe(() => {
      this.snack.open('删除成功', '确认', {
        duration: 2000,
      });
      this.getPage();
    });
  }
  /**
   * 调用页面请求数据
   */
  getPage() {
    this.articleService.findMany(this.page + 1, this.perPage).subscribe(list => {
      this.listData = list.data.results;
      this.listTotal = list.data.total_count;
    });
  }
  /**
   * 页面切换，当下一页，或者是改变每页数量
   * @param p
   */
  changePage(p: PageEvent) {
    this.page = p.pageIndex;
    this.perPage = p.pageSize;
    this.getPage();
  }

  page = 0;
  perPage = 10;
  listData: Article[] = [];
  listTotal = 0;
  listColumns: MtxGridColumn[] = [
    { header: '封面', field: 'cover', width: '120px' },
    { header: '文章标题', field: 'title', width: '220px' },
    { header: '状态', field: 'status' },
    { header: '评论数量', field: 'comment_count' },
    { header: '发布时间', field: 'pubdate' },
    { header: '阅读数量', field: 'read_count' },
    { header: '点赞数量', field: 'like_count' },
    {
      header: '操作',
      field: 'tool',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'edit',
          icon: 'edit',
          tooltip: '编辑',
          click: () => alert('没有实现哦'),
        },
        {
          type: 'icon',
          text: 'delete',
          icon: 'delete',
          tooltip: '删除',
          color: 'warn',
          pop: {
            title: '确认要删除吗？',
          },
          click: (rowData: Article) => this.deleteArticle(rowData.id),
        },
      ],
    },
  ];
}
