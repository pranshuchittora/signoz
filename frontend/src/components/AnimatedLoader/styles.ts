import styled from 'styled-components';

export const AnimatedSvg = styled.svg`
	stroke-dasharray: 1000;
	stroke-dashoffset: 1000;
	pointer-events: none;
	animation: firstAnimation 3s ease-in-out alternate infinite;
	@keyframes firstAnimation {
		to {
			stroke-dashoffset: 0;
			fill: #f25733ff;
		}
	}
`;
