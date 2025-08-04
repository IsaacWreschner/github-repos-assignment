import type { Repo } from "./model/repo.model.js";

  
  type OrgCache = {
    repos: Repo[];
  };
  
  export class CacheService {
    private cache: Map<string, OrgCache> = new Map();
  
    set(orgName: string, repos: Repo[]) {
      this.cache.set(orgName, { repos });
    }
  
    clear(orgName?: string) {
      if (orgName) {
        this.cache.delete(orgName);
      } else {
        this.cache.clear();
      }
    }
  
    isCached(orgName: string): boolean {
      return this.cache.has(orgName);
    }
  
    getTotalCount(orgName: string): number {
      return this.cache.get(orgName)?.repos.length ?? 0;
    }
  
    getPage(orgName: string, from: number, to: number): Repo[] {
        const repos = this.cache.get(orgName)?.repos ?? [];
        const safeFrom = Math.max(0, Math.min(from, repos.length));
        const safeTo = Math.min(to, repos.length);
        return repos.slice(safeFrom, safeTo);
      }
  
    getAllRepos(orgName: string): Repo[] {
      return this.cache.get(orgName)?.repos ?? [];
    }
  }
  