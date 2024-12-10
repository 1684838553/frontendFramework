export default {
  namespace: 'aboutGit',
  state: {
    tips: '安装Git到你的电脑，并且设置好Git内部的用户名和电子邮箱。',
    steps: [
      {
        type: 'h3',
        content: '设定Git',
      },
      {
        type: 'a',
        content: 'Git下载地址',
        href: 'https://git-scm.com/downloads',
      },
      {
        type: 'p',
        content: '安装Git后，在终端执行以下命令，查看安装的版本：',
      },
      {
        type: 'code',
        content: 'git --version',
      },
      {
        type: 'p',
        content: '设置Git的用户名和邮件：',
      },
      {
        type: 'p',
        content: '设置用户名：',
      },
      {
        type: 'code',
        content: 'git config --global user.name " "',
      },
      {
        type: 'p',
        content: '设置邮件：',
      },
      {
        type: 'code',
        content: 'git config --global user.email " "',
      },
    ],
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   // eslint-disable-line
    // },
  },
  effects: {
    // *fetch({ payload }, { call, put }) {
    //   // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
  },
  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // },
  },
};
