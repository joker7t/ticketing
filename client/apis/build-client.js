import axios from 'axios';

const buildClient = ({ req }) => {
	if (typeof window === 'undefined') {
		return axios.create({
			baseURL: `http://${process.env.INGRESS_NGINX_NAMESPACE}.svc.cluster.local`,
			headers: req.headers,
		});
	} else {
		return axios.create({
			baseURL: `/`,
		});
	}
};

export default buildClient;
