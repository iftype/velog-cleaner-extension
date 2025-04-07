const input = document.getElementById("keywordInput");
const container = document.getElementById("tagContainer");

function updateKeywords(keywords) {
  chrome.storage.sync.set({ keywords }, () => renderKeywords(keywords));
}

function renderKeywords(keywords) {
  container.innerHTML = "";
  keywords.forEach((word, index) => {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerHTML = `${word} <button data-index="${index}">x</button>`;
    container.appendChild(tag);
  });
}

chrome.storage.sync.get(["keywords"], (result) => {
  let keywords = Array.isArray(result.keywords) ? result.keywords : [];
  if (keywords.length === 0) {
    keywords = ["티겟", "다방", "출장"];
  }
  updateKeywords(keywords);
});

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = parseInt(e.target.dataset.index);
    chrome.storage.sync.get(["keywords"], (result) => {
      const keywords = result.keywords || [];
      keywords.splice(index, 1);
      updateKeywords(keywords);
    });
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    const newWord = input.value.trim();
    chrome.storage.sync.get(["keywords"], (result) => {
      const keywords = result.keywords || [];
      if (!keywords.includes(newWord)) {
        keywords.push(newWord);
        updateKeywords(keywords);
      }
      input.value = "";
    });
  }
});
