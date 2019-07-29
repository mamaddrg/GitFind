class User {

    constructor(username, avatarURL, htmlURL, type, name, publicRepos, company, gists, followers, followings, webSite, location, memberSince) {
        this.username = username;
        this.avatarURL = avatarURL;
        this.htmlURL = htmlURL;
        this.type = type;
        this.name = name;
        this.publicRepos = publicRepos;
        this.company = company;
        this.gists = gists;
        this.followers = followers;
        this.followings = followings;
        this.webSite = webSite;
        this.location = location;
        this.memberSince = memberSince;
        this.reposList = []; // we set repos later in another request
    }

    setUserRepos(reposList) {
        
    }

}