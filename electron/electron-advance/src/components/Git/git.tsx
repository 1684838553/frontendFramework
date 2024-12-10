import React from 'react';
import { connect } from 'dva';

import { ISteps } from '@/components/Common/interface';
import { CommonComponent } from '@/components/Common/common';

function AboutGit(props: IAboutGitProps & { dispatch: any }): React.ReactElement {
  const { tips, steps } = props;
  return (
    <div className="about-git">
      <div className="chal-background"> {tips} </div>
      <div className="chal-step">
        {steps.map((item, index) => {
          return <CommonComponent step={item} key={index} />;
        })}
      </div>
    </div>
  );
}

interface IAboutGitProps {
  tips: string;
  steps: ISteps;
}

const mapStateToProps = (state: { aboutGit: IAboutGitProps }) => {
  const { tips, steps } = state.aboutGit;

  return { tips, steps };
};

export default connect(mapStateToProps)(AboutGit);
