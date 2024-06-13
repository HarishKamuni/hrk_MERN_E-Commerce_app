const backendDomain = 'http://localhost:8080';

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/auth/signup`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/api/auth/signin`,
    method: 'post',
  },

  signOut: {
    url: `${backendDomain}/api/auth/logout`,
    method: 'get',
  },
  currentUser: {
    url: `${backendDomain}/api/user/userdetails`,
    method: 'get',
  },
  allUsers: {
    url: `${backendDomain}/api/user/all-users`,
    method: 'get',
  },
  updateUser: {
    url: `${backendDomain}/api/user/update-user`,
    method: 'post',
  },
};
export default SummaryApi;
