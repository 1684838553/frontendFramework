export const aboutGit =  {
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
    multiUserTips:
      '在某些场景下，需要在同一台电脑上面同时配置Git的工作账号和私人账号,在这个场景下，请按照以下步骤来配置。',
    multiUserSteps: [
      {
        type: 'h3',
        content: '同时配置多个Git账号',
      },
      {
        type: 'p',
        content: '创建一个目录，在这个目录里面创建一个.my-gitconfig文件：',
      },
      {
        type: 'p',
        content: '首先这个文件里面配置用户名和邮箱；',
      },
      {
        type: 'p',
        content: '其次，在全局配置的.gitconfig文件中，配置includeif：',
      },
      {
        type: 'code',
        content: "[includeif 'gitdir:~/project/personal']",
      },
      {
        type: 'code',
        content: 'path = ~/.my-gitconfig',
      },
      {
        type: 'p',
        content: '配置好之后，在/project/personal目录下提交代码时，commit用户名和邮箱是在.my-gitconfig文件中配置的。',
      },
    ],
  },
  subscriptions: {},
  effects: {},
  reducers: {},
};
