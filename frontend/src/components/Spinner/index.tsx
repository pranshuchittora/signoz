import { LoadingOutlined } from '@ant-design/icons';
import { Spin, SpinProps } from 'antd';
import React from 'react';
import AnimatedLoader from 'components/AnimatedLoader';
import { SpinerStyle } from './styles';

const Spinner = ({ size, tip, height }: SpinnerProps): JSX.Element => (
	<SpinerStyle height={height}>
		<AnimatedLoader />
	</SpinerStyle>
);

interface SpinnerProps {
	size?: SpinProps['size'];
	tip?: SpinProps['tip'];
	height?: React.CSSProperties['height'];
}

export default Spinner;
