var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiUrl).then(function(responce) {
        //request sucessful
        if (responce.ok) {
            responce.json().then(function(data) {
                //pass responce data to a dom function
                displayIssues(data);
            });
        }
        else { 
            alert ("coco says none shall pass");
        }
    });
};

var displayIssues = function(issue) {
    if (issuesEl.length ===0) {
        issueContainerEl.textContent = "this repo has no open issues!";
        return;
    }


    for (var i=0; i <issue.length; i++) {
        //create a link element to take ussers to the issue in github
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issue[i].html_url);
        issuesEl.setAttribute("target", "_blank");
        //create span to hold issue title 
        var titleEl = document.createElement("span");
        titleEl.textContent = issue[i].title;

        //append to container
        issuesEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or pull request
        if (issue[i].pull_request) {
            typeEl.textContent = "(pull request)";
        } else{
            typeEl.textContent = "(issue)";
        }

        //append to container
        issuesEl.appendChild(typeEl);

        issueContainerEl.appendChild(issuesEl);
    }

};

getRepoIssues("facebook/react");