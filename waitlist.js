(() => {
  "use strict";
  document.getElementById("copyright-year").textContent = String(new Date().getFullYear());
  const form = document.getElementById("waitlist-form");
  const email = document.getElementById("waitlist-email");
  const button = form.querySelector("button");
  const label = document.getElementById("submit-label");
  const note = document.getElementById("signup-note");
  const endpoint = "https://submit-form.com/e7McG8nYk";
  let pending = false;

  email.addEventListener("input", () => { note.textContent = ""; note.classList.remove("error"); });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;

    pending = true;
    email.disabled = button.disabled = true;
    label.textContent = "Joining…";
    note.textContent = "";
    note.classList.remove("error");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          email: email.value.trim(),
          "_email.subject": "New Metrica waitlist signup",
          "_email.from": "Metrica Waitlist"
        }),
        signal: controller.signal
      });

      if (!response.ok) throw new Error(`Formspark returned ${response.status}`);

      form.hidden = true;
      note.textContent = "Thanks — you’re on the Metrica waitlist.";
    } catch {
      note.classList.add("error");
      note.textContent = "We couldn’t add you right now. Please try again.";
    } finally {
      clearTimeout(timeout);
      pending = false;
      email.disabled = button.disabled = false;
      label.textContent = "Join the waitlist";
    }
  });
})();
