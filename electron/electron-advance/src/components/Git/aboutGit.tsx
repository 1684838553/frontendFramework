import React from 'react';
import { connect } from 'dva';

import { ISteps } from '@/components/Common/interface';
import { CommonComponent } from '@/components/Common/common';

function AboutGit(props: IAboutGitProps & { dispatch: any }): React.ReactElement {
  const { tips, steps, multiUserTips, multiUserSteps } = props;
  return (
    <div className="about-git">
      <div className="chal-background"> {tips} </div>
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
  const { tips, steps, multiUserTips, multiUserSteps } = state.aboutGit;

  return { tips, steps, multiUserTips, multiUserSteps };
};

export default connect(mapStateToProps)(AboutGit);
