function removeSpamPosts(keywords) {
  const posts = document.querySelectorAll("li");
  posts.forEach((post) => {
    const text = post.innerText;
    if (keywords.some((word) => text.includes(word))) {
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