import axios from 'axios';

export const fetchRepositories = async (reposUrl: string) => {
  try {
    // também pode ser implementado com a url e o login do usuário:
    // https://api.github.com/users/{username}/repos
    const response = await axios.get(`${reposUrl}`);
    console.log('response.data', response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
