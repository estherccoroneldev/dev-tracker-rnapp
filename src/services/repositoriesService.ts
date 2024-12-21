import axios from 'axios';

export const fetchRepositories = async (reposUrl: string) => {
  try {
    // também pode ser implementado com a url e o login do usuário:
    // https://api.github.com/users/{username}/repos
    // mas por praticidade não fiz assim
    const response = await axios.get(`${reposUrl}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
