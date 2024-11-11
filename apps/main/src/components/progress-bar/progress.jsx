import { useNProgress } from '@tanem/react-nprogress';
import { NContainer } from './container.jsx';
import { Bar } from './bar.jsx';
import { NSpinner } from './spinner.jsx';

// type Props = {
//   isAnimating?: boolean;
// };

export const NProgress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <NContainer animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      <NSpinner />
      {/*
              This example doesn't use a spinner component so the UI stays
              tidy. You're free to render whatever is appropriate for your
              use-case.
              */}
    </NContainer>
  );
};
