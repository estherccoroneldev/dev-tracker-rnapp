import React, {useEffect, useMemo, useState} from 'react';
import {fetchRepositories} from '../services/repositoriesService';
import {User} from '../store/userReducer';

export interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count?: number;
  visibility?: string;
  following?: number;
  owner: User;
  url: string;
  html_url: string;
}

const useRepositories = ({
  reposUrl,
  order,
}: {
  reposUrl: User['repos_url'];
  order: 'asc' | 'desc';
}) => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getRepos = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchRepositories(reposUrl);
      setRepos(response);
    } catch (error) {
      setErrorMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [reposUrl]);

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  // principio da inmutabilidade, não modifica o array original e essa copia se ordena de forma ascendente
  const orderedAscRepos = [...(repos ?? [])].sort(
    (a, b) => (a?.stargazers_count ?? 0) - (b?.stargazers_count ?? 0),
  );

  // principio da inmutabilidade, não modifica o array original e essa copia se ordena de forma descendente
  const orderedDescRepos = [...(repos ?? [])].sort(
    (a, b) => (b?.stargazers_count ?? 0) - (a?.stargazers_count ?? 0),
  );

  const repositoriesByOrder = useMemo(
    () => ({
      default: repos,
      asc: orderedAscRepos,
      desc: orderedDescRepos,
    }),
    [orderedAscRepos, orderedDescRepos, repos],
  );

  return {
    loading,
    errorMessage,
    repos: repositoriesByOrder[order] ?? [],
    getRepos,
  };
};

export default useRepositories;
