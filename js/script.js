const prices = {
    'landing-page': {
        pm: 700,
        design: 600,
        developer: 1200,
        qa: 500
    },
    'online-store': {
        pm: 1200,
        design: 900,
        developer: 2500,
        qa: 800
    },
    'web-app': {
        pm: 2000,
        design:1100,
        developer:3000,
        qa: 1000
    },
    'mobile-app': {
        pm: 3000,
        design: 1500,
        developer: 4000,
        qa: 1300
    }
};

function getFormValues () {

    const projectTypeEl = document.querySelector('#project-type');
    const pmEl = document.querySelector('#pm');
    const designEl = document.querySelector('#design');
    const developerEl = document.querySelector('#developer');
    const qaEl = document.querySelector('#qa');
    
    return{
        projectType: projectTypeEl.value,
        pm: pmEl.checked,
        design: designEl.checked,
        developer: developerEl.checked,
        qa: qaEl.checked
    }

};

function calculate() {

    const values = getFormValues();

    let price = 0;

    const workTypes = prices [values.projectType]

    if (values.pm){
        price = price + workTypes.pm;
    }
    if (values.design){ 
        price = price + workTypes.design;
    }
    if (values.developer){
        price = price + workTypes.developer;
    }
    if (values.qa){
        price = price + workTypes.qa;
    }

    const totalPriceEl = document.querySelector('#total-price');

    totalPriceEl.textContent = price;

};
calculate();

const formEl = document.querySelector('#calculator_form');

const emailModal = document.querySelector('#modal-email');

const succModal = document.querySelector('#success-modal');

formEl.addEventListener('change', calculate);

formEl.addEventListener('submit', function(event) {

    event.preventDefault();

    emailModal.classList.add('modal-active');

});

const closeButtons = document.querySelectorAll('.close_button')
const closeButtons2 = document.querySelectorAll('.button-success')

const userEmail = document.querySelector('#email');

closeButtons.forEach( function(closeBtn) {

    closeBtn.addEventListener('click', function () {

        userEmail.classList.remove('modal_input-error');
        emailModal.classList.remove('modal-active');
        succModal.classList.remove('modal-active');

    })

});

closeButtons2.forEach( function(closeBtn) {

    closeBtn.addEventListener('click', function () {

        userEmail.classList.remove('modal_input-error');
        emailModal.classList.remove('modal-active');
        succModal.classList.remove('modal-active');

    })

});

const emailForm = document.querySelector('#modal-email_form');

emailForm.addEventListener('submit', function(event) {

    event.preventDefault();
    if (userEmail.value) {

        const formData = new FormData(formEl);
        formData.append('Email', userEmail.value)
        fetch('/', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        })
            .then(function() {
                emailModal.classList.remove('modal-active');
                succModal.classList.add('modal-active');
            })
            .catch((error) =>  alert('Не удалось отправить форму'))

        return;
    }

    userEmail.classList.add('modal_input-error');
});