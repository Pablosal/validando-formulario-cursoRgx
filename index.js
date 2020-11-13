const DOMElements = (function () {
  const firstName = document.querySelector("#first_name");
  const password = document.querySelector("#password");
  const email = document.querySelector("#email");
  const contactForm = document.querySelector("#contact_form");
  const topic = document.querySelector("#topic");
  const formButton = document.querySelector("#form_button");
  const criterios = document.querySelectorAll(".criterios");
  return {
    firstName,
    password,
    email,
    contactForm,
    topic,
    formButton,
    criterios,
  };
})();
const {
  firstName,
  password,
  email,
  contactForm,
  topic,
  formButton,
  criterios,
} = DOMElements;
//! Condiciones
const validConditions = {
  isPasswordCorrect: false,
  isTopicCorrect: false,
  isNameCorrect: false,
  isEmailCorrect: false,
};
//! Expresiones
const validTopic = /^felicitaci(o|\W)n|queja$/gi;
const validName = /([A-Z][a-z]{1,}\s){3}/g;
const validEmail = /^[a-zA-Z0-9.!#$%++/=?^_{|}-~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)/g;
const validPassword = [
  { name: "crit-min5", condition: (value) => value.length > 5 },
  { name: "crit-mayus", condition: (value) => value.search(/[A-Z]/g) > -1 },
  {
    name: "crit-num",
    condition: (value) => value.search(/[0-9]+/g) > -1,
  },
  {
    name: "crit-symb",
    condition: (value) => value.search(/[!"#$%&/()=?¡¿]/g) > -1,
  },
];

//Funciones Utiles
const changeClassCriteria = (item, idx, value) => {
  if (item.condition(value) && item.name === criterios[idx].dataset.criterio) {
    if (criterios[idx].classList.contains("incorrecto")) {
      criterios[idx].classList.replace("incorrecto", "correcto");
    }
    criterios[idx].classList.add("correcto");
  } else {
    criterios[idx].classList.replace("correcto", "incorrecto");
  }
};
//! Verificar Datos
topic.onblur = () => {
  if (validTopic.test(topic.value)) {
    validConditions.isTopicCorrect = true;
  } else {
    validConditions.isTopicCorrect = false;
  }
};
firstName.onblur = () => {
  if (validName.test(firstName.value)) {
    validConditions.isNameCorrect = true;
  } else {
    validConditions.isNameCorrect = false;
  }
};
email.onblur = () => {
  if (validEmail.test(email.value)) {
    validConditions.isEmailCorrect = true;
  } else {
    validConditions.isEmailCorrect = false;
  }
};
password.oninput = () => {
  validPassword.forEach((item, idx) => {
    changeClassCriteria(item, idx, password.value);
  });
  if (validPassword.every((item) => item.condition(password.value) === true)) {
    validConditions.isPasswordCorrect = true;
  }
};

contactForm.onsubmit = (e) => {
  e.preventDefault();
  console.log(validConditions);
  console.log(
    Object.values(validConditions).every((condition) => condition === true)
  );
  if (Object.values(validConditions).every((condition) => condition === true)) {
    console.log("Enviando Formulario");
    return true;
  } else {
    console.log("completa todos los campos correctamente");
    return false;
  }
};
