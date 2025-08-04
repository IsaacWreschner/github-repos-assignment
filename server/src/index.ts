import express from 'express';
import axios from 'axios';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { CacheService } from './cache.service.js';
import { fetchAllReposFromGitHub } from './fetch.js';
import type { Repo } from './model/repo.model.js';
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const cacheService = new CacheService();

app.get('/org/:orgName/repos', async (req, res) => {
  const { orgName } = req.params;
  const from = parseInt(req.query.from as string) || 0;
  const to = parseInt(req.query.to as string);

  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'User-Agent': 'my-express-app',
    Accept: 'application/vnd.github+json'
  };

  try {
    let repos: Repo[] = [];
    if (!cacheService.isCached(orgName)) {
      repos = await fetchAllReposFromGitHub(orgName, process.env.GITHUB_TOKEN);
      cacheService.set(orgName, repos);
    }
  
    res.json({
      totalCount: cacheService.getTotalCount(orgName),
      repos: cacheService.getPage(orgName, from, to)
    });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});