document.addEventListener("DOMContentLoaded", () => {
    const mainElement = document.querySelector("main");

    // Loads data from the web
    // fetch("https://api.npoint.io/5999fe351f23d84c7491")
    //     .then(response => response.json())
    //     .then(data => {
    //         renderPosts(data, mainElement);
    //     })
    //     .catch(error => console.error("Failed to load posts from online source:", error));

    // Loads data from a local file
    fetch("./res/json/posts.json")
        .then(response => response.json())
        .then(data => {
            renderPosts(data, mainElement);
        })
        .catch(error => console.error("Failed to load posts from local file:", error));
});

// Function that generates HTML posts based on JSON data
function renderPosts(posts, mainElement) {
    mainElement.innerHTML = ""; // Clear content before loading

    posts.forEach(post => {
        const article = document.createElement("article");
        article.classList.add("post");

        // Post header
        const header = document.createElement("header");
        header.classList.add("postheader");

        const profilePic = document.createElement("img");
        profilePic.classList.add("profile-picture");
        profilePic.src = post.profilePic;
        profilePic.alt = `${post.authorName} profile picture`;

        const postDate = document.createElement("span");
        postDate.classList.add("post-date");
        postDate.textContent = new Date(post.postDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        header.appendChild(profilePic);
        header.appendChild(postDate);
        article.appendChild(header);

        // Post body
        const body = document.createElement("div");
        body.classList.add("post-body");

        if (post.postImg) {
            const postImg = document.createElement("img");
            postImg.src = post.postImg;
            postImg.alt = "user photo";
            body.appendChild(postImg);
        }

        const postText = document.createElement("p");
        postText.textContent = post.postText;
        body.appendChild(postText);

        article.appendChild(body);

        // Post footer
        const footer = document.createElement("footer");
        footer.classList.add("post-footer");

        const likeButton = document.createElement("button");
        likeButton.classList.add("like");
        footer.appendChild(likeButton);

        article.appendChild(footer);

        mainElement.appendChild(article);
    });
}
