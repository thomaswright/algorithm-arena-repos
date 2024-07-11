import { Octokit } from "octokit";
import fetch from "node-fetch";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default async function handler(req) {
  return fetch("https://api.github.com/orgs/Algorithm-Arena/repos")
    .then((res) => res.json())
    .then((data) => {
      let challengeRepos = data
        .filter(({ name }) => {
          return name.includes("weekly-challenge");
        })
        .map(({ name }) => name);

      console.log(challengeRepos);

      return octokit.request("PATCH /gists/06e827401a84cd949997b56de8a0e345", {
        gist_id: "06e827401a84cd949997b56de8a0e345",
        description: "",
        files: {
          "algorithm-arena-repos.json": {
            content: JSON.stringify(challengeRepos),
          },
        },
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
    });
}

handler({});
