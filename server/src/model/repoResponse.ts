import type { Repo } from "./repo.model.js";

export type RepoResponse = {
    totalCount: number;
    repos: Repo[];
}