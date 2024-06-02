const backendDomain = 'http://localhost:8080';

const SummeryApi = {
  signUp: {
    url: `${backendDomain}/api/auth/signup`,
    method: 'post',
  },
};
export default SummeryApi;
