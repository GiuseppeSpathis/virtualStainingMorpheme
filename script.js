// Replace the filenames and answers below with your real PAS and IHC patches.
const tests = {
  pas: [
    { id: 1, file: "images/pas/PAS-1.jpg", answer: "generated" },
    { id: 2, file: "images/pas/PAS-2.jpg", answer: "real" },
    { id: 3, file: "images/pas/PAS-3.jpg", answer: "generated" },
    { id: 4, file: "images/pas/PAS-4.jpg", answer: "real" },
    { id: 5, file: "images/pas/PAS-5.jpg", answer: "real" },
    { id: 6, file: "images/pas/PAS-6.jpg", answer: "generated" },
    { id: 7, file: "images/pas/PAS-7.jpg", answer: "real" },
    { id: 8, file: "images/pas/PAS-8.jpg", answer: "generated" },
    { id: 9, file: "images/pas/PAS-9.jpg", answer: "generated" },
    { id: 10, file: "images/pas/PAS-10.jpg", answer: "generated" },
    { id: 11, file: "images/pas/PAS-11.jpg", answer: "generated" },
    { id: 12, file: "images/pas/PAS-12.jpg", answer: "real" },
    { id: 13, file: "images/pas/PAS-13.jpg", answer: "generated" },
    { id: 14, file: "images/pas/PAS-14.jpg", answer: "generated" },
    { id: 15, file: "images/pas/PAS-15.jpg", answer: "generated" },
    { id: 16, file: "images/pas/PAS-16.jpg", answer: "generated" },
    { id: 17, file: "images/pas/PAS-17.jpg", answer: "generated" },
    { id: 18, file: "images/pas/PAS-18.jpg", answer: "generated" },
    { id: 13, file: "images/pas/PAS-19.jpg", answer: "real" },
    { id: 14, file: "images/pas/PAS-20.jpg", answer: "real" },
    { id: 13, file: "images/pas/PAS-21.jpg", answer: "real" },
    { id: 14, file: "images/pas/PAS-22.jpg", answer: "real" },
    { id: 13, file: "images/pas/PAS-23.jpg", answer: "real" },
    { id: 14, file: "images/pas/PAS-24.jpg", answer: "real" },
    
    // Ajoutez toutes les images PAS ici
  ],

  ihc: [
    { id: 1, file: "images/ihc/ccRCCfake.png", answer: "generated" },
    { id: 2, file: "images/ihc/ccRCCtrue.png", answer: "real" },
    { id: 1, file: "images/ihc/chRCCfake.png", answer: "generated" },
    { id: 2, file: "images/ihc/chRCCtrue.png", answer: "real" },
    { id: 1, file: "images/ihc/oncofake.png", answer: "generated" },
    { id: 2, file: "images/ihc/oncotrue.png", answer: "real" },
    { id: 1, file: "images/ihc/pRCCfake.png", answer: "generated" },
    { id: 2, file: "images/ihc/pRCCtrue.png", answer: "real" },
    
  
    
    // Ajoutez toutes les images IHC ici
  ]
};
document.querySelectorAll(".quiz").forEach((section) => {
  const type = section.dataset.test,
    pool = tests[type];
  let items = pool.slice(0, 8),
    choices = {},
    submitted = false;
  const grid = section.querySelector(".grid"),
    counter = section.querySelector(".counter"),
    action = section.querySelector(".action");
  function render() {
    const done = Object.keys(choices).length;
    counter.innerHTML = `<strong>${done}</strong><span>/ 8 classified</span><i><b style="width:${(done / 8) * 100}%"></b></i>`;
    grid.innerHTML = items
      .map((item, i) => {
        const selected = choices[i],
          correct = submitted && selected === item.answer,
          wrong = submitted && selected !== item.answer;
        return `<article class="card ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}"><div class="micro has-image ${type}-${i + 1}" data-file="${item.file}" style="background-image: url('${item.file}')"><span>${type.toUpperCase()} ${String(i + 1).padStart(2, "0")}</span></div><div class="answers"><button data-i="${i}" data-choice="real" class="${selected === "real" ? "active" : ""}">Real</button><button data-i="${i}" data-choice="generated" class="${selected === "generated" ? "active" : ""}">Generated</button></div>${submitted ? `<p class="feedback">${correct ? "Correct" : `Answer: ${item.answer === "real" ? "Real" : "Generated"}`}</p>` : ""}</article>`;
      })
      .join("");
    if (submitted) {
      const score = items.filter((x, i) => choices[i] === x.answer).length;
      action.innerHTML = `<div class="result"><span>Your ${type.toUpperCase()} score</span><strong>${score}<small>/8</small></strong><p>${score >= 7 ? "Excellent eye!" : score >= 5 ? "Strong performance." : "Weak performance."}</p><button class="reset">Play another random round</button></div>`;
    } else
      action.innerHTML = `<button class="score" ${done < 8 ? "disabled" : ""}>Reveal my ${type.toUpperCase()} score</button>${done < 8 ? `<p>${8 - done} image${8 - done !== 1 ? "s" : ""} left to classify</p>` : ""}`;
  }
  section.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    if (button.classList.contains("reset")) {
      const previousIds = new Set(items.map((item) => item.id));
      items = [...pool].sort(() => Math.random() - 0.5).slice(0, 8);
      if (items.every((item) => previousIds.has(item.id))) {
        const unseen = pool.find((item) => !previousIds.has(item.id));
        if (unseen) items[0] = unseen;
      }
      choices = {};
      submitted = false;
      render();
    } else if (button.classList.contains("score")) {
      submitted = true;
      render();
    } else if (!submitted && button.dataset.choice) {
      choices[button.dataset.i] = button.dataset.choice;
      render();
    }
  });
  render();
});
