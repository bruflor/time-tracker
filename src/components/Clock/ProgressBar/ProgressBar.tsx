import { useState, useEffect, useRef } from "react";
import { MainContainer } from "./style";

interface ProgressBarProps {
  size: number;
  progress: number;
  strokeWidth: number;
  circleOneStroke: string;
  circleTwoStroke: string;
}
export const ProgressBar = (props: ProgressBarProps) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef<any>(null);

  const { size, progress, strokeWidth, circleOneStroke, circleTwoStroke } =
    props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);

    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
  }, [setOffset, progress, circumference, offset]);

  return (
    <MainContainer>
      <svg className="circular-chart" width={size} height={size}>
        <circle
          className="circular-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          className="circular-timer"
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          transform={`rotate(-90, ${center}, ${center})`}
          //probably will be this one I'll change for the value timer
          strokeDashoffset={offset}
        ></circle>
        <text x={center} y={center} className="percentage">
          {progress}
        </text>
      </svg>
    </MainContainer>
  );
};