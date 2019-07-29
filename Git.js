class Git {

    constructor(reposCount, sortType) {
        this.clientId = "e6f1f6760e4dab3cdb2d";
        this.clientSecret = "ca059be2db29d87f6a3a5e2fa74b713862ad6a17";
        this.reposCount = reposCount;
        this.sortType = sortType;
    }

    async getUserData(username) {

        const userProfileResponse = await fetch(`https://api.github.com/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);
        const userReopsResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=${this.reposCount}&sort=${this.sortType}&client_id=${this.clientId}&client_secret=${this.clientSecret}`);

        const userProfile = await userProfileResponse.json();
        const userRepos = await userReopsResponse.json();

        const user = await this.parseUserJson(userProfile);
        const reposList = await this.parseReposJson(userRepos);

        return { user , reposList }
    }


    parseUserJson(response) {
        const user = new User(response.login, response.avatar_url, response.html_url, response.type, response.name, response.public_repos, response.company, response.public_gists, response.followers, response.following, response.blog, response.location, response.created_at);
        return user;
    }


    parseReposJson(response) {
        const repos = [];
        response.forEach(function(repo) {
            repos.push(new Repo(repo.name, repo.description, repo.html_url, repo.language, repo.watchers,repo.stargazers_count, repo.forks)); 
        });
        return repos;
    }
}