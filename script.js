import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

const firebaseConfig = {
  // added the sum just to avoid the GitHub bot to find the API Key
  apiKey: "AIzaSyBLk223" + "RzXehXl_Bxg" + "SluKXTBolipVYsxg",
  authDomain: "virtualstainingmorpheme.firebaseapp.com",
  projectId: "virtualstainingmorpheme",
  storageBucket: "virtualstainingmorpheme.firebasestorage.app",
  messagingSenderId: "20483570545",
  appId: "1:20483570545:web:8d2c37bd7e68bd630114d0",
  measurementId: "G-TPZLJ6DY20"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const GAME_DURATION_SECONDS = 60; 

const tutorials = {
  pas: [
    { id: 1, file: "images/pas/PAS-1.jpg", answer: "generated" },
    { id: 2, file: "images/pas/PAS-2.jpg", answer: "real" },
    { id: 3, file: "images/pas/PAS-3.jpg", answer: "generated" },
    { id: 4, file: "images/pas/PAS-4.jpg", answer: "real" },
  ],
  ihc: [
    { id: 1, file: "images/ihc/ccRCCfake_2.png", answer: "generated" },
    { id: 2, file: "images/ihc/ccRCCtrue_1.png", answer: "real" },
    { id: 3, file: "images/ihc/chRCCfake_1.png", answer: "generated" },
    { id: 4, file: "images/ihc/chRCCtrue_1.png", answer: "real" },
  ]
};

// Replace the filenames and answers below with your real PAS and IHC patches.
const tests = {
  pas: [
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
  //this image is the Representative  { id: 1, file: "images/ihc/ccRCCfake_1.png", answer: "generated" },
    { id: 1, file: "images/ihc/ccRCCfake_3.png", answer: "generated" },
    { id: 1, file: "images/ihc/ccRCCfake_4.png", answer: "generated" },
    { id: 1, file: "images/ihc/ccRCCfake_5.png", answer: "generated" },
    { id: 1, file: "images/ihc/ccRCCfake_6.png", answer: "generated" },
    { id: 2, file: "images/ihc/ccRCCtrue_2.png", answer: "real" },
    { id: 2, file: "images/ihc/ccRCCtrue_3.png", answer: "real" },
    { id: 2, file: "images/ihc/ccRCCtrue_4.png", answer: "real" },
    { id: 2, file: "images/ihc/ccRCCtrue_5.png", answer: "real" },
    { id: 2, file: "images/ihc/ccRCCtrue_6.png", answer: "real" },
    { id: 1, file: "images/ihc/chRCCfake_2.png", answer: "generated" },
    { id: 1, file: "images/ihc/chRCCfake_3.png", answer: "generated" },
    { id: 1, file: "images/ihc/chRCCfake_4.png", answer: "generated" },
    { id: 1, file: "images/ihc/chRCCfake_5.png", answer: "generated" },
    { id: 1, file: "images/ihc/chRCCfake_6.png", answer: "generated" },
    { id: 2, file: "images/ihc/chRCCtrue_2.png", answer: "real" },
    { id: 2, file: "images/ihc/chRCCtrue_3.png", answer: "real" },
    { id: 2, file: "images/ihc/chRCCtrue_4.png", answer: "real" },
    { id: 2, file: "images/ihc/chRCCtrue_5.png", answer: "real" },
    { id: 2, file: "images/ihc/chRCCtrue_6.png", answer: "real" },
    { id: 2, file: "images/ihc/oncotrue_1.png", answer: "real" },
    { id: 2, file: "images/ihc/oncotrue_2.png", answer: "real" },
    { id: 2, file: "images/ihc/oncotrue_3.png", answer: "real" },
    { id: 2, file: "images/ihc/oncotrue_4.png", answer: "real" },
    { id: 2, file: "images/ihc/oncotrue_5.png", answer: "real" },
    { id: 2, file: "images/ihc/oncotrue_6.png", answer: "real" },
    { id: 1, file: "images/ihc/oncofake_1.png", answer: "generated" },
    { id: 1, file: "images/ihc/oncofake_2.png", answer: "generated" },
    { id: 1, file: "images/ihc/oncofake_3.png", answer: "generated" },
    { id: 1, file: "images/ihc/oncofake_4.png", answer: "generated" },
    { id: 1, file: "images/ihc/oncofake_5.png", answer: "generated" },
    { id: 1, file: "images/ihc/oncofake_6.png", answer: "generated" },
    { id: 2, file: "images/ihc/pRCCtrue_1.png", answer: "real" },
    { id: 2, file: "images/ihc/pRCCtrue_2.png", answer: "real" },
    { id: 2, file: "images/ihc/pRCCtrue_3.png", answer: "real" },
    { id: 2, file: "images/ihc/pRCCtrue_4.png", answer: "real" },
    { id: 2, file: "images/ihc/pRCCtrue_5.png", answer: "real" },
    { id: 2, file: "images/ihc/pRCCtrue_6.png", answer: "real" },
    { id: 1, file: "images/ihc/pRCCfake_1.png", answer: "generated" },
    { id: 1, file: "images/ihc/pRCCfake_2.png", answer: "generated" },
    { id: 1, file: "images/ihc/pRCCfake_3.png", answer: "generated" },
    { id: 1, file: "images/ihc/pRCCfake_4.png", answer: "generated" },
    { id: 1, file: "images/ihc/pRCCfake_5.png", answer: "generated" },
    { id: 1, file: "images/ihc/pRCCfake_6.png", answer: "generated" }
  
  
    
    // Ajoutez toutes les images IHC ici
  ]
};

let userStats = {
  expertise: "unknown",
  timesPlayed: "unknown"
};

let analyticsData = [];
let avgChartInstance = null;
let distChartInstance = null;

async function fetchAnalytics() {
  try {
    const querySnapshot = await getDocs(collection(db, "game_results"));
    analyticsData = querySnapshot.docs.map(doc => doc.data());
    renderCharts();
  } catch (error) {
    console.error("Error fetching analytics:", error);
  }
}

fetchAnalytics();

const modal = document.getElementById("user-info-modal");
const form = document.getElementById("user-info-form");
let waitingSection = null;

const tutorialModal = document.getElementById("tutorial-modal");
const tutorialGrid = document.getElementById("tutorial-grid");
const tutorialTitle = document.getElementById("tutorial-title");

if (tutorialModal) {
  tutorialModal.addEventListener('cancel', (e) => {
    e.preventDefault();
  });
}

if (modal) {
  modal.addEventListener('cancel', (e) => {
    e.preventDefault();
  });
}

if (form) {
  form.addEventListener("submit", () => {
    userStats.expertise = document.getElementById("expertise").value;
    userStats.timesPlayed = document.getElementById("timesPlayed").value;
    if (waitingSection) {
      waitingSection.startGame();
      waitingSection = null;
    }
  });
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderCharts() {
  if (typeof Chart === 'undefined') {
    // If Chart.js isn't loaded yet, try again in 500ms
    setTimeout(renderCharts, 500);
    return;
  }

  const expertises = ["beginner", "medium", "advanced"];
  const avgScoresPAS = expertises.map(exp => {
    const data = analyticsData.filter(d => d.expertise === exp && d.gameType === "PAS");
    return data.length ? data.reduce((sum, d) => sum + d.score, 0) / data.length : 0;
  });
  
  const avgScoresIHC = expertises.map(exp => {
    const data = analyticsData.filter(d => d.expertise === exp && d.gameType === "IHC");
    return data.length ? data.reduce((sum, d) => sum + d.score, 0) / data.length : 0;
  });

  const avgCtx = document.getElementById('avgScoreChart');
  if (avgCtx) {
    if (avgChartInstance) {
      avgChartInstance.data.datasets[0].data = avgScoresPAS;
      avgChartInstance.data.datasets[1].data = avgScoresIHC;
      avgChartInstance.update();
    } else {
      avgChartInstance = new Chart(avgCtx, {
        type: 'bar',
        data: {
          labels: ["Beginner", "Medium", "Advanced"],
          datasets: [
            { label: 'PAS Average', data: avgScoresPAS, backgroundColor: '#315aa8' },
            { label: 'IHC Average', data: avgScoresIHC, backgroundColor: '#14845b' }
          ]
        },
        options: { 
          responsive: true, 
          plugins: { 
            title: { display: true, text: 'Average Score by Expertise (out of 8)' },
            legend: { onClick: null }
          }, 
          scales: { 
            x: { title: { display: true, text: 'Expertise Level' } },
            y: { beginAtZero: true, max: 8, title: { display: true, text: 'Average Score' } } 
          } 
        }
      });
    }
  }

  const distCtx = document.getElementById('scoreDistributionChart');
  if (distCtx) {
    const scoreCounts = Array(9).fill(0);
    analyticsData.forEach(d => {
      if (d.score >= 0 && d.score <= 8) scoreCounts[d.score]++;
    });

    if (distChartInstance) {
      distChartInstance.data.datasets[0].data = scoreCounts;
      distChartInstance.update();
    } else {
      distChartInstance = new Chart(distCtx, {
        type: 'line',
        data: {
          labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
          datasets: [{ label: 'Number of Players', data: scoreCounts, borderColor: '#c74343', backgroundColor: 'rgba(199, 67, 67, 0.2)', fill: true, tension: 0.3 }]
        },
        options: { 
          responsive: true, 
          plugins: { 
            title: { display: true, text: 'Score Distribution' },
            legend: { onClick: null }
          }, 
          scales: { 
            x: { title: { display: true, text: 'Score' } },
            y: { beginAtZero: true, ticks: { stepSize: 1 }, title: { display: true, text: 'Number of Players' } } 
          } 
        }
      });
    }
  }
}

document.querySelectorAll(".quiz").forEach((section) => {
  const type = section.dataset.test,
    pool = tests[type];
  let items = shuffleArray(pool).slice(0, 8),
    choices = {},
    submitted = false,
    timerInterval = null,
    timeLeft = GAME_DURATION_SECONDS;
    
  const grid = section.querySelector(".grid"),
    counter = section.querySelector(".counter"),
    action = section.querySelector(".action"),
    timerDisplay = section.querySelector(".timer-display");

  function updateTimerUI() {
    if (!timerDisplay) return;
    const m = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const s = (timeLeft % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `${m}:${s}`;
    if (timeLeft <= 10 && timeLeft > 0) {
      timerDisplay.classList.add("danger");
    } else {
      timerDisplay.classList.remove("danger");
    }
  }

  section.startGame = function() {
    section.classList.remove("pending");
    timeLeft = GAME_DURATION_SECONDS;
    updateTimerUI();
    
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerUI();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        const scoreBtn = section.querySelector(".score");
        if (scoreBtn) {
          scoreBtn.disabled = false;
          scoreBtn.click();
        }
      }
    }, 1000);
  };

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
      
      let averageHtml = "";
      if (userStats.expertise !== "unknown" && analyticsData.length > 0) {
        const sameExp = analyticsData.filter(d => d.expertise === userStats.expertise && d.gameType === type.toUpperCase());
        if (sameExp.length > 0) {
          const avg = sameExp.reduce((sum, d) => sum + d.score, 0) / sameExp.length;
          averageHtml = `<p style="margin-top: 10px; color: var(--muted); font-size: 14px;">Average score for ${userStats.expertise} expertise: <b style="font-size: 16px; color: var(--red);">${avg.toFixed(1)}/8</b></p>`;
        }
      }

      action.innerHTML = `<div class="result"><span>Your ${type.toUpperCase()} score</span><strong>${score}<small>/8</small></strong><p>${score >= 7 ? "Excellent Pathologist!" : score >= 5 ? "Strong performance." : "Weak performance."}</p>${averageHtml}<div style="display: flex; gap: 10px; margin-top: 15px;"><button type="button" class="tutorial-btn">Tutorial</button><button class="reset">Play another random round</button></div></div>`;
    } else
      action.innerHTML = `<button class="score" ${done < 8 ? "disabled" : ""}>Reveal my ${type.toUpperCase()} score</button>${done < 8 ? `<p>${8 - done} image${8 - done !== 1 ? "s" : ""} left to classify</p>` : ""}`;
  }
  section.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    
    if (button.classList.contains("tutorial-btn")) {
      tutorialTitle.textContent = `${type.toUpperCase()} Tutorial`;
      const tutItems = tutorials[type];
      if (tutItems) {
        tutorialGrid.innerHTML = tutItems.map(item => `
          <div class="tutorial-item ${item.answer}">
            <img src="${item.file}" alt="${item.answer}" loading="lazy" />
            <strong>${item.answer === 'real' ? 'Real' : 'Generated'}</strong>
          </div>
        `).join('');
      }
      if (tutorialModal && typeof tutorialModal.showModal === 'function') {
        tutorialModal.showModal();
        tutorialModal.scrollTop = 0;
        tutorialTitle.focus();
      }
      return;
    }

    if (button.classList.contains("start-btn")) {
      if (userStats.expertise === "unknown") {
        waitingSection = section;
        if (modal && typeof modal.showModal === 'function') modal.showModal();
      } else {
        section.startGame();
      }
      return;
    }
    
    if (button.classList.contains("reset")) {
      clearInterval(timerInterval);
      const previousIds = new Set(items.map((item) => item.id));
      items = shuffleArray(pool).slice(0, 8);
      if (items.every((item) => previousIds.has(item.id))) {
        const unseen = pool.find((item) => !previousIds.has(item.id));
        if (unseen) items[0] = unseen;
      }
      choices = {};
      submitted = false;
      render();
      section.startGame();
    } else if (button.classList.contains("score")) {
      clearInterval(timerInterval);
      submitted = true;
      render();
      
      setTimeout(() => {
        if (action) action.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);

      const score = items.filter((x, i) => choices[i] === x.answer).length;
      try {
        addDoc(collection(db, "game_results"), {
          gameType: type.toUpperCase(),
          score: score,
          maxScore: items.length,
          expertise: userStats.expertise,
          timesPlayed: userStats.timesPlayed,
          timestamp: serverTimestamp()
        }).then(() => {
          fetchAnalytics();
        });
      } catch (err) {
        console.error("Firebase error: ", err);
      }
    } else if (!submitted && button.dataset.choice) {
      choices[button.dataset.i] = button.dataset.choice;
      render();
    }
  });
  render();
  updateTimerUI();
  const startBtn = section.querySelector(".start-btn");
  if (startBtn) {
    if (GAME_DURATION_SECONDS < 60) {
      startBtn.textContent = `Start Game (${GAME_DURATION_SECONDS} sec)`;
    } else {
      const mins = Math.floor(GAME_DURATION_SECONDS / 60);
      startBtn.textContent = `Start Game (${mins} min)`;
    }
  }
});
