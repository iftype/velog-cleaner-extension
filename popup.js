const input = document.getElementById("keywordInput");
const container = document.getElementById("tagContainer");

function saveKeywords(keywords) {
  chrome.storage.sync.set({ keywords });
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
  let keywords = result.keywords;
  if (!Array.isArray(keywords) || keywords.length === 0) {
    keywords = ["티겟", "다방", "출장"];
    saveKeywords(keywords);
    renderKeywords(keywords);
  } else {
    renderKeywords(keywords);
  }
});

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chrome.storage.sync.get(["keywords"], (result) => {
      const keywords = result.keywords || [];
      keywords.splice(e.target.dataset.index, 1);
      saveKeywords(keywords);
      renderKeywords(keywords);
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
        saveKeywords(keywords);
        renderKeywords(keywords);
      }
      input.value = "";
    });
  }
});
