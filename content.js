function removeSpamPosts(keywords) {
  const posts = document.querySelectorAll("li");
  posts.forEach((post) => {
    const h4 = post.querySelector("div a h4");
    if (!h4) return;

    const title = h4.textContent.trim();
    if (keywords.some((word) => title.includes(word))) {
      post.style.display = "none";
    }
  });
}

chrome.storage.sync.get(["keywords"], (result) => {
  const keywords = result.keywords || [];
  removeSpamPosts(keywords);

  const observer = new MutationObserver(() => removeSpamPosts(keywords));
  observer.observe(document.body, { childList: true, subtree: true });
});
