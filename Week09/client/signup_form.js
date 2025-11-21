const form = document.querySelector('#signup-form');
const resultEl = document.querySelector('#result');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "送出中...";

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  payload.password = payload.confirmPassword = 'demoPass88';
  payload.interests = ['後端入門'];
  payload.terms = true;

  try {
    const res = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || '失敗');
    }

    resultEl.textContent = JSON.stringify(data, null, 2);
    form.reset();
  } catch (error) {
    resultEl.textContent = `錯誤：${error.message}`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "送出";
  }
});
document.querySelector('#view-list').addEventListener('click', async () => {
  resultEl.textContent = "載入中...";
  try {
    const res = await fetch('http://localhost:3001/api/signup');
    const data = await res.json();
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultEl.textContent = `錯誤：${error.message}`;
  }
});
