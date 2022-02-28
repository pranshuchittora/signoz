import NotFound from 'components/NotFound';
import Spinner from 'components/Spinner';
import ROUTES from 'constants/routes';
import AppLayout from 'container/AppLayout';
import history from 'lib/history';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { AppState } from 'store/reducers';
import AppReducer from 'types/reducer/app';
import AnimatedLoader from 'components/AnimatedLoader';
import routes from './routes';


const App = (): JSX.Element => {
	const { isLoggedIn } = useSelector<AppState, AppReducer>((state) => state.app);
	const [hideLoader, setHideLoader] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setHideLoader(true)
		}, 6000)
	}, [])
	return (
		<Router history={history}>
			<AppLayout>
				<Suspense fallback={<AnimatedLoader />}>
					{!hideLoader ? <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}> <AnimatedLoader /> </div> : <Switch>
						{routes.map(({ path, component, exact }, index) => (
							<Route key={index} exact={exact} path={path} component={component} />
						))}
						<Route
							path="/"
							exact
							render={(): JSX.Element =>
								isLoggedIn ? (
									<Redirect to={ROUTES.APPLICATION} />
								) : (
									<Redirect to={ROUTES.SIGN_UP} />
								)
							}
						/>
						<Route path="*" component={NotFound} />
					</Switch>}

				</Suspense>
			</AppLayout>
		</Router>
	);
};


export default App;
