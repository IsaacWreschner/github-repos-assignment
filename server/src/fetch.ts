import axios from "axios";
import type { Repo } from "./model/repo.model.js";

export const fetchAllReposFromGitHub = async (orgName: string, token?: string):Promise<Repo[]> => {
    let page = 1;
    const perPage = 100;
    const allRepos: any[] = [];
  
    while (true) {
      const response = await axios.get(`https://api.github.com/orgs/${orgName}/repos`, {
        params: { per_page: perPage, page },
        headers: {
          Authorization: token ? `Bearer ${token}`: '',
          'User-Agent': 'express-app',
          Accept: 'application/vnd.github+json'
        }
      });
  
      const repos = response.data;``
      if (repos.length === 0) break;
  
      allRepos.push(...repos);
      console.log(`Fetched ${allRepos.length} repos`);
      page++;
    }
  
    return allRepos.map((repo: any) => ({
      name: repo.name,
      url: repo.html_url
    }));
}