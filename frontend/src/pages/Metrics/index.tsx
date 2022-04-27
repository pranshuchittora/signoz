import getLocalStorageKey from 'api/browser/localstorage/get';
import Spinner from 'components/Spinner';
import { SKIP_ONBOARDING } from 'constants/onboarding';
import ResourceAttributesFilter from 'container/MetricsApplication/ResourceAttributesFilter';
import MetricTable from 'container/MetricsTable';
import { convertRawQueriesToTraceSelectedTags } from 'lib/resourceAttributes';
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GetService, GetServiceProps } from 'store/actions/metrics';
import { AppState } from 'store/reducers';
import AppActions from 'types/actions';
import { GlobalReducer } from 'types/reducer/globalTime';
import MetricReducer from 'types/reducer/metrics';

function Metrics({ getService }: MetricsProps): JSX.Element {
	const { minTime, maxTime, loading, selectedTime } = useSelector<
		AppState,
		GlobalReducer
	>((state) => state.globalTime);
	const { services, resourceAttributeQueries } = useSelector<
		AppState,
		MetricReducer
	>((state) => state.metrics);

	const selectedTags: string = JSON.stringify(
		convertRawQueriesToTraceSelectedTags(resourceAttributeQueries) || [],
	);

	const isSkipped = getLocalStorageKey(SKIP_ONBOARDING) === 'true';

	useEffect(() => {
		if (loading === false) {
			getService({
				maxTime,
				minTime,
				selectedTags,
			});
		}
	}, [getService, loading, maxTime, minTime, selectedTags]);

	useEffect(() => {
		let timeInterval: NodeJS.Timeout;

		if (loading === false && !isSkipped && services.length === 0) {
			timeInterval = setInterval(() => {
				getService({
					maxTime,
					minTime,
					selectedTags,
				});
			}, 50000);
		}

		return (): void => {
			clearInterval(timeInterval);
		};
	}, [
		getService,
		isSkipped,
		loading,
		maxTime,
		minTime,
		services,
		selectedTime,
		selectedTags,
	]);

	if (loading) {
		return <Spinner tip="Loading..." />;
	}

	return (
		<>
			<ResourceAttributesFilter />
			<MetricTable />
		</>
	);
}

interface DispatchProps {
	getService: (
		props: GetServiceProps,
	) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => void;
}

const mapDispatchToProps = (
	dispatch: ThunkDispatch<unknown, unknown, AppActions>,
): DispatchProps => ({
	getService: bindActionCreators(GetService, dispatch),
});

type MetricsProps = DispatchProps;

export default connect(null, mapDispatchToProps)(Metrics);
