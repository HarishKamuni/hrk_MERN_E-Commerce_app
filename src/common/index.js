const backendDomain = 'http://localhost:8080';

const SummeryApi = {
  signUp: {
    url: `${backendDomain}/api/auth/signup`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/api/auth/signin`,
    method: 'post',
  },
};
export default SummeryApi;
