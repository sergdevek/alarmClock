function serializeForm(formNode) {

    const { elements } = formNode;

    Array.from(elements)
        .forEach((element) => {
            const { name, value } = element
            localStorage.setItem(name, value);
        })
}

function handleFormSubmit(event) {
    event.preventDefault();
    localStorage.clear();
    serializeForm(applicantForm);
}

const applicantForm = document.getElementById('form');
applicantForm.addEventListener('submit', handleFormSubmit);