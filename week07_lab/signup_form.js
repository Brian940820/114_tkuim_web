
const form = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');
const submitSpinner = submitBtn.querySelector('.spinner-border');
const submitBtnText = submitBtn.querySelector('.btn-text');
const resetBtn = document.getElementById('resetBtn');
const formMessage = document.getElementById('formMessage');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const interestsContainer = document.getElementById('interestsContainer');
const termsCheckbox = document.getElementById('terms');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmPasswordError');
const interestsError = document.getElementById('interestsError');
const termsError = document.getElementById('termsError');

const strengthBar = document.getElementById('passwordStrength');
const strengthFill = strengthBar.querySelector('.strength-fill');
const strengthText = document.getElementById('passwordStrengthText');

const STORAGE_KEY = 'signup_draft_v1';

function setError(input, message, errorElem) {
  input.setCustomValidity(message ? message : '');
  if (errorElem) errorElem.textContent = message || '';
  if (message) {
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
  }
}

function clearError(input, errorElem) {
  setError(input, '', errorElem);
}

function validateName() {
  const val = nameInput.value.trim();
  if (!val) {
    setError(nameInput, '請輸入姓名。', nameError);
    return false;
  }
  clearError(nameInput, nameError);
  return true;
}

function validateEmail() {
  const val = emailInput.value.trim();
  if (!val) {
    setError(emailInput, '請輸入 Email。', emailError);
    return false;
  }
  if (!emailInput.checkValidity()) {
    setError(emailInput, 'Email 格式不正確（例如 name@gmail.com）。', emailError);
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}

function validatePhone() {
  const val = phoneInput.value.trim();
  const digitsOnly = /^\d{10}$/;
  if (!val) {
    setError(phoneInput, '請輸入手機號碼。', phoneError);
    return false;
  }
  if (!digitsOnly.test(val)) {
    setError(phoneInput, '手機需為 10 碼數字，例：0912345678。', phoneError);
    return false;
  }
  clearError(phoneInput, phoneError);
  return true;
}

function evaluatePasswordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++; 
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return Math.min(score, 4);
}

function updatePasswordStrength() {
  const pwd = passwordInput.value;
  const score = evaluatePasswordStrength(pwd);
  const percent = (score / 4) * 100;
  strengthFill.style.width = percent + '%';

  let text = '-';
  strengthFill.className = 'strength-fill'; 
  if (pwd.length === 0) {
    text = '-';
  } else if (score <= 1) {
    text = '弱';
    strengthFill.classList.add('weak');
  } else if (score === 2 || score === 3) {
    text = '中';
    strengthFill.classList.add('medium');
  } else {
    text = '強';
    strengthFill.classList.add('strong');
  }
  strengthText.textContent = `密碼強度：${text}`;
}

function validatePassword() {
  const pwd = passwordInput.value;
  if (!pwd) {
    setError(passwordInput, '請輸入密碼（至少 8 碼，英數混合）。', passwordError);
    updatePasswordStrength();
    return false;
  }
  if (pwd.length < 8) {
    setError(passwordInput, '密碼長度需至少 8 個字元。', passwordError);
    updatePasswordStrength();
    return false;
  }
  if (!/[A-Za-z]/.test(pwd) || !/\d/.test(pwd)) {
    setError(passwordInput, '密碼需包含英文與數字。', passwordError);
    updatePasswordStrength();
    return false;
  }
  clearError(passwordInput, passwordError);
  updatePasswordStrength();
  return true;
}

function validateConfirm() {
  if (!confirmInput.value) {
    setError(confirmInput, '請再次輸入密碼以確認。', confirmError);
    return false;
  }
  if (confirmInput.value !== passwordInput.value) {
    setError(confirmInput, '兩次密碼不一致。', confirmError);
    return false;
  }
  clearError(confirmInput, confirmError);
  return true;
}

function validateInterests() {
  const checked = interestsContainer.querySelectorAll('input[name="interests"]:checked').length;
 
  if (checked < 1) {
    interestsError.textContent = '請至少選擇一個興趣。';
    return false;
  }
  interestsError.textContent = '';
  return true;
}

function validateTerms() {
  if (!termsCheckbox.checked) {
    setError(termsCheckbox, '需同意服務條款才能註冊。', termsError);
    return false;
  }
  clearError(termsCheckbox, termsError);
  return true;
}

function validateAll() {
  const validators = [
    {fn: validateName, el: nameInput},
    {fn: validateEmail, el: emailInput},
    {fn: validatePhone, el: phoneInput},
    {fn: validatePassword, el: passwordInput},
    {fn: validateConfirm, el: confirmInput},
    {fn: validateInterests, el: interestsContainer},
    {fn: validateTerms, el: termsCheckbox}
  ];

  let firstInvalid = null;
  for (const v of validators) {
    const ok = v.fn();
    if (!ok && !firstInvalid) {
      firstInvalid = v.el;
    }
  }
  return firstInvalid;
}

nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', () => {
  if (nameInput.classList.contains('is-invalid')) validateName();
  saveDraft();
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', () => {
  if (emailInput.classList.contains('is-invalid')) validateEmail();
  saveDraft();
});

phoneInput.addEventListener('blur', validatePhone);
phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/[^\d]/g, '').slice(0, 10);
  if (phoneInput.classList.contains('is-invalid')) validatePhone();
  saveDraft();
});

passwordInput.addEventListener('input', () => {
  updatePasswordStrength();
  if (passwordInput.classList.contains('is-invalid')) validatePassword();
  if (confirmInput.value) {
    validateConfirm(); 
  }
  saveDraft();
});
passwordInput.addEventListener('blur', validatePassword);

confirmInput.addEventListener('input', () => {
  if (confirmInput.classList.contains('is-invalid')) validateConfirm();
  saveDraft();
});
confirmInput.addEventListener('blur', validateConfirm);

interestsContainer.addEventListener('click', (e) => {
  let label = e.target;
  if (!label.classList.contains('interest')) {
    label = e.target.closest('.interest');
  }
  if (!label) return;

  const input = label.querySelector('input[type="checkbox"]');
  if (!input) return;

  input.checked = !input.checked;
  label.classList.toggle('active', input.checked);

  validateInterests();
  saveDraft();
});

termsCheckbox.addEventListener('click', () => {
  if (!termsCheckbox.dataset.seen) {
    alert('這是服務條款。');
    termsCheckbox.dataset.seen = '1';
  }
  if (termsCheckbox.classList.contains('is-invalid')) validateTerms();
  saveDraft();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formMessage.textContent = '';
  const firstInvalid = validateAll();
  if (firstInvalid) {
    if (firstInvalid === interestsContainer) {
      const firstCheck = interestsContainer.querySelector('input[name="interests"]');
      if (firstCheck) firstCheck.focus();
    } else {
      firstInvalid.focus();
    }
    return;
  }

  submitBtn.disabled = true;
  submitSpinner.classList.remove('d-none');
  submitBtnText.textContent = '送出中...';

  setTimeout(() => {
    formMessage.textContent = '註冊成功！感謝您的註冊。';
    formMessage.className = 'text-success';

    localStorage.removeItem(STORAGE_KEY);

    form.reset();
    resetVisualState();

    submitBtn.disabled = false;
    submitSpinner.classList.add('d-none');
    submitBtnText.textContent = '註冊';
  }, 1000);
});

resetBtn.addEventListener('click', () => {
  form.reset();
  resetVisualState();
  localStorage.removeItem(STORAGE_KEY);
  formMessage.textContent = '';
});

function resetVisualState() {
  [nameInput, emailInput, phoneInput, passwordInput, confirmInput, termsCheckbox].forEach((el) => {
    el.classList.remove('is-invalid');
    el.setCustomValidity('');
  });
  [nameError, emailError, phoneError, passwordError, confirmError, interestsError, termsError].forEach(e => e.textContent = '');
  interestsContainer.querySelectorAll('label.interest').forEach(l => {
    const cb = l.querySelector('input[type="checkbox"]');
    if (cb) cb.checked = false;
    l.classList.remove('active');
  });
  strengthFill.style.width = '0%';
  strengthFill.className = 'strength-fill';
  strengthText.textContent = '密碼強度：-';
}

function saveDraft() {
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value,
    confirm: confirmInput.value,
    interests: Array.from(interestsContainer.querySelectorAll('input[name="interests"]:checked')).map(i => i.value),
    terms: termsCheckbox.checked
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
  }
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data) return;
    nameInput.value = data.name || '';
    emailInput.value = data.email || '';
    phoneInput.value = data.phone || '';
    passwordInput.value = data.password || '';
    confirmInput.value = data.confirm || '';
    if (Array.isArray(data.interests)) {
      interestsContainer.querySelectorAll('input[name="interests"]').forEach(cb => {
        cb.checked = data.interests.includes(cb.value);
        cb.closest('label.interest').classList.toggle('active', cb.checked);
      });
    }
    termsCheckbox.checked = !!data.terms;
    updatePasswordStrength();
  } catch (err) {
  }
}
restoreDraft();

