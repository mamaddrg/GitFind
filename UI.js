class UI {
    constructor() {
        this.profileUI = document.getElementById('profile');
        this.reposUI = document.getElementById('repositories');
        this.searchBox = document.getElementById('searchBox');
        this.git = new Git(10, 'created: asc');
    }

    /* Init Search Box Event Listener
     We Have To Get Everything User Types */
    initSearchListener() {
        searchBox.addEventListener('keyup', (event) => {
            // This Is What User Entered To Find
            const searchedText = event.target.value;
            if (searchedText != '') {
                /* Requset Git Class To Retrive Searched Text
                 (then) After Receiving User And Repos, Pass Them to 
                 ShowUserProfile And ShowUserRepos To Parse Data And Display In UI. */
                this.git.getUserData(searchedText)
                    .then( data => {
                        // Check If Response Is Null
                        if (data.user !== 'undefined') {
                            this.showUserProfile(data.user);
                            this.showUserRepos(data.reposList);
                        }
                    })
                    .catch( error => {
                        this.clearUI();
                        this.showUserNotFound();
                    });
            } else {
                // If Search Box Is Empty, We Have To Clear Profile And Repos UI
                this.clearUI();
            }
        });
    }


    // Display User Profile Content In UI
    showUserProfile(user) {
        this.profileUI.innerHTML = `
            <div class="card card-body mb-3">
            <div class="row">
            <div class="col-md-3">
                <img class="img-fluid mb-2" src="${user.avatarURL}">
                <a href="${user.htmlURL}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.publicRepos}</span>
                <span class="badge badge-secondary">User Type: ${user.type}</span>
                <span class="badge badge-success">Full Name: ${user.name}</span>
                <span class="badge badge-info">Username: ${user.username}</span>
                <br><br>
                <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/Blog: ${user.webSite}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.memberSince}</li>
                </ul>
            </div>
            </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>`;
    }


    // Display User Repositories In UI
    showUserRepos(reposList) {
        // We Have Multiple Repos, So We Loop Through Them
        let output = '';
        reposList.forEach(function(repo) {
            output += `
            <div class="card card-body mb-2">
              <div class="row">
                <div class="col-md-6">
                  <a href="${repo.url}" target="_blank">${repo.name}</a>
                </div>
                <div class="col-md-6">
                <span class="badge badge-primary">Stars: ${repo.stars}</span>
                <span class="badge badge-secondary">Watchers: ${repo.watchers}</span>
                <span class="badge badge-success">Forks: ${repo.forks}</span>
                <span class="badge badge-secondary">Language: ${repo.language}</span>
                <span class="badge badge-info mt-2">Description: ${repo.description}</span>
                </div>
              </div>
            </div>
          `
        });
        this.reposUI.innerHTML = output;
    }


    // If There Is NOT Somone By This Username
    showUserNotFound() {
        this.clearUI;
        this.profileUI.innerText = 'There is NOT any user by this username.';
    }


    // Clear UI Profile Data
    clearUI() {
        this.profileUI.innerHTML = ``;
        this.reposUI.innerHTML = ``;
    }
}