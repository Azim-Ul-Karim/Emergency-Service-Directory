document.addEventListener("DOMContentLoaded", () => {
  
  const heartCountDisplay = document.getElementById("heartCount");
  const coinCountDisplay = document.getElementById("coinCount");
  const copyCountDisplay = document.getElementById("copyCount");

  let heartCount = 0;
  let coinCount = 100;
  let copyCount = 0;

  const historyList = document.getElementById("history-list");
  const clearBtn = document.querySelector(".history button");

  // Heart Count
  document.querySelectorAll(".card-top .fa-heart").forEach((heart) => {
    heart.addEventListener("click", () => {
      heartCount++;
      heartCountDisplay.innerText = heartCount;
    });
  });

  // Copy Count
  document.querySelectorAll(".card-operation button:first-child").forEach(
    (btn) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".space-y-4");
        const number = card.querySelector(".card-mid h3").innerText.trim();

        navigator.clipboard
          .writeText(number)
          .then(() => {
            alert(`Number ${number} is copied to the clipboard.`);
            copyCount++;
            copyCountDisplay.innerText = copyCount;
          })
          .catch((err) => {
            console.error("Copy failed:", err);
          });
      });
    }
  );

  // Coin Count
  document.querySelectorAll(".card-operation button:last-child").forEach(
    (btn) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".space-y-4");
        const serviceName = card.querySelector(".card-head h4").innerText.trim();
        const serviceNumber = card.querySelector(".card-mid h3").innerText.trim();

        if (coinCount < 20) {
          alert("Not enough coins to make a call!");
          return;
        }

        coinCount -= 20;
        coinCountDisplay.innerText = coinCount;

        alert(`Calling ${serviceName} : ${serviceNumber}`);

        addCallToHistory(serviceName, serviceNumber);
      });
    }
  );

  // Clear History
  clearBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
  });

  // Call History
  function addCallToHistory(serviceName, serviceNumber) {
    const currentTime = new Date().toLocaleTimeString();

    const li = document.createElement("div");
    li.className =
      "flex justify-between items-center bg-stone-100 p-3 rounded-lg";

    const left = document.createElement("div");
    left.innerHTML = `
      <p class="font-semibold">${serviceName}</p>
      <p class="text-gray-500 text-sm">${serviceNumber}</p>
    `;

    const right = document.createElement("span");
    right.className = "text-gray-500 text-sm";
    right.innerText = currentTime;

    li.appendChild(left);
    li.appendChild(right);

    historyList.prepend(li);
  }
});