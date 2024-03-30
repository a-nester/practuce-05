import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Якщо імейл і пароль користувача збігаються, зберігай дані з форми при сабміті
// у локальне сховище і змінюй кнопку login на logout і роби поля введення
// недоступними для змін.
// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.
// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};

const form = document.querySelector('.login-form');
const button = document.querySelector('.login-btn');
const LOCAL_STORAGE_KEY = 'login-form';

const userEmail = form.elements.email;
const userPassword = form.elements.password;

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  if (button.textContent === 'Logout') {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    form.reset();
    userEmail.removeAttribute("readonly");
    userPassword.removeAttribute("readonly");
    button.textContent = "Login";
    return;
  }

  const userEmailValue = userEmail.value.trim();
  const userPasswordValue = userPassword.value.trim();

  if (!userEmailValue || !userPasswordValue) {
    iziToast.warning({
      title: 'Caution',
      message: 'You need to fill all fields',
      position: 'topRight',
    });
    return;
  }
  if (
    userEmailValue !== USER_DATA.email ||
    userPasswordValue !== USER_DATA.password
  ) {
    iziToast.error({
      title: 'Error',
      message: 'Wrong login or password',
    });
    return;
  }
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ email: userEmailValue, password: userPasswordValue })
  );
    updateForm();
}

const saveData = localStorage.getItem(LOCAL_STORAGE_KEY)

if (saveData) {
  const parsedData = JSON.parse(saveData);
  userEmail.value = parsedData.email ?? "";
  userPassword.value = parsedData.password ?? "";
  updateForm();
}


function updateForm () {
  button.textContent = 'Logout';
  userEmail.setAttribute('readonly', true);
  userPassword.setAttribute('readonly', true);
};