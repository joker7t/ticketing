import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import buildClient from '../apis/build-client';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Head>
				<title>Ticketing app</title>
			</Head>
			<Header currentUser={currentUser} />
			<div className="container">
				<Component currentUser={currentUser} {...pageProps} />
			</div>
		</div>
	);
};

AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get(`/api/users/currentuser`);
	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			client,
			data.currentUser,
		);
	}
	return {
		pageProps,
		...data,
	};
};

export default AppComponent;
