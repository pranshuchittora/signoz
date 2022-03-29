import { Typography } from 'antd';
import convertDateToAmAndPm from 'lib/convertDateToAmAndPm';
import getFormattedDate from 'lib/getFormatedDate';
import React from 'react';
import { relativeTimeString } from 'utils/timeUtils';

import { Data } from '..';

function Created(createdBy: Data['createdBy']): JSX.Element {
	const time = new Date(createdBy);

	const date = getFormattedDate(time);

	const timeString = `${date} ${convertDateToAmAndPm(time)}`;

	return (
		<Typography.Text title={timeString}>
			{relativeTimeString(createdBy)}
		</Typography.Text>
	);
}

export default Created;
