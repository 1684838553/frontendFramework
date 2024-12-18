import React, { useState } from 'react';
import { connect } from 'dva';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { ISteps } from '@/components/Common/interface';
import { CommonComponent } from '@/components/Common/common';
import { process, IExecOptions } from '@/utils/process';

const electronRemote = window.require('@electron/remote');
const { dialog } = electronRemote;

interface IConfigUser {
  username: string;
  email: string;
  global: boolean;
  project: string;
}

function AboutGit(props: IAboutGitProps & { dispatch: any }): React.ReactElement {
  const [showForm, setShowForm] = useState(false);
  const [globalConfig, setGlobalConfig] = useState(true);
  const [form] = Form.useForm();
  const { tips, steps, multiUserTips, multiUserSteps } = props;

  const handlerClick = async () => {
    try {
      const result = await process.nodeExec('git --version');
      if (result.indexOf('git version') > -1) {
        setShowForm(!showForm);
      } else {
        message.error('检测到电脑上没有安装Git, 请先安装Git在配置用户名和邮箱');
      }
    } catch (err) {
      message.error('检测到电脑上没有安装Git, 请先安装Git在配置用户名和邮箱');
    }
  };

  const onFinish = async (user: IConfigUser) => {
    const { username, email, global, project } = user;
    if (!username && !email) {
      message.warning('请先输入用户名和密码');
    }

    let options: IExecOptions | undefined;
    const args = ['git', 'config'];
    if (global) {
      args.push('--global');
    } else {
      options = {
        cwd: project,
      };
    }

    const userNameCommand = username ? `${args.join(' ')} user.name ${username}` : '';
    const emailCommand = email ? `${args.join(' ')} user.email ${email}` : '';

    try {
      if (userNameCommand) {
        await process.nodeExec(userNameCommand, options);
      }
      if (emailCommand) {
        await process.nodeExec(emailCommand, options);
      }
      message.success('配置成功');
    } catch (err) {
      message.error(`配置失败: ${err.toString()}`);
    }
  };

  const openFolder = async () => {
    const defaultPath = localStorage.getItem('ProjectDefaultPath') || __dirname;
    const { filePaths } = await dialog.showOpenDialog({
      defaultPath,
      buttonLabel: '请选择',
      title: 'git-it',
      properties: ['openDirectory'],
    });

    if (!filePaths.length) {
      return;
    }

    const path = filePaths[0];
    localStorage.setItem('ProjectDefaultPath', path);
    form.setFieldValue('project', path);
  };

  return (
    <div className="about-git">
      <div className="chal-background"> {tips} </div>
      <Button className="config-btn" onClick={handlerClick}>
        配置用户名邮箱
      </Button>
      {showForm ? (
        <div className="chal-form">
          <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ global: true }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item label="用户名" name="username">
              <Input placeholder="使用git config user.name命令配置git用户名" />
            </Form.Item>

            <Form.Item label="邮箱" name="email">
              <Input placeholder="使用git config user.email命令配置git邮箱" />
            </Form.Item>

            <Form.Item name="global" valuePropName="checked" wrapperCol={{ span: 16, offset: 2 }}>
              <Checkbox onChange={e => setGlobalConfig(e.target.checked)}>是否全局配置</Checkbox>
            </Form.Item>

            {!globalConfig ? (
              <Form.Item label="项目" name="project">
                <Input placeholder="点击选择需要配置的项目地址" suffix={<FolderOutlined onClick={openFolder} />} />
              </Form.Item>
            ) : null}

            <Form.Item wrapperCol={{ span: 2, offset: 2 }}>
              <Button htmlType="submit">更新配置</Button>
            </Form.Item>
          </Form>
        </div>
      ) : null}
      <div className="chal-step">
        {steps.map((item, index) => {
          return <CommonComponent step={item} key={index} />;
        })}
      </div>
      <div className="chal-background"> {multiUserTips} </div>
      <div className="chal-step">
        {multiUserSteps.map((item, index) => {
          return <CommonComponent step={item} key={index} />;
        })}
      </div>
    </div>
  );
}

interface IAboutGitProps {
  tips: string;
  steps: ISteps;
  multiUserSteps: ISteps;
  multiUserTips: string;
}

const mapStateToProps = (state: { aboutGit: IAboutGitProps }) => {
  return state.aboutGit;
};

export default connect(mapStateToProps)(AboutGit);
