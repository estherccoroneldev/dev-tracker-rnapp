import axios from 'axios';

/**
 * Função para buscar informações de um usuário do Github
 *
 * @param username - Nome de usuário do Github.
 * @returns Retorna uma Promise com os dados do usuário.
 */
export const fetchUserData = async (username: string) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * Error Message:
 * {
    message: "Not Found",
    documentation_url: "https://docs.github.com/rest",
    status: "404"
    }
 */
