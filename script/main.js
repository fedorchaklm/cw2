const NameValuePairInput = document.getElementById('NameValuePair');
const addBtn = document.getElementById('addBtn');
const sortByNameBtn = document.getElementById('sortByNameBtn');
const sortByValueBtn = document.getElementById('sortByValueBtn');
const delBtn = document.getElementById('delBtn');
const listContainer = document.getElementById('listContainer');
const errorContainer = document.getElementById('error');

let list = JSON.parse(localStorage.getItem('list')) || [];

const writerList = () => {
    listContainer.innerText = '';
    list.forEach((item, i) => {
        const {name, value} = item;
        const element = document.createElement('li');
        element.setAttribute('data-index', i);
        element.innerText = `${name}=${value}`;
        element.addEventListener('click', (event) => {
            event.target.classList.toggle('active');
        });
        listContainer.appendChild(element);
    });
}

const saveListToLocalStorage = () => {
    localStorage.setItem('list', JSON.stringify(list));
}

// creating a function to compare objects by key
const compareObject = (key) => (a, b) => {
    if (a[key] < b[key]) {
        return -1;
    }
    if (a[key] > b[key]) {
        return 1;
    }
    return 0;
};

addBtn.addEventListener('click', () => {
    const inputValue = NameValuePairInput.value.trim();
    // RegExp for validation inputValue, that can contain only alphanumeric characters.
    // Format should be: name = value
    const regExp = /^[a-z0-9]+\s*=\s*[a-z0-9]+$/i;
    const isValid = regExp.test(inputValue);

    if (!isValid) {
        errorContainer.innerText = `Invalid NameValuePair. Names and Values can contain only alphanumeric characters. The Name/Value pair entry format should be: name = value`
    } else {
        errorContainer.innerText = '';
        const [name, value] = inputValue.replaceAll(' ', '').split('=');
        const item = {
            name,
            value
        };
        list.push(item);
        writerList();
        saveListToLocalStorage();
        NameValuePairInput.value = '';
    }
})

sortByNameBtn.addEventListener('click', () => {
    if (list.length > 1) {
        list = list.sort(compareObject('name'));
        writerList();
        saveListToLocalStorage();
    }
});

sortByValueBtn.addEventListener('click', () => {
    if (list.length > 1) {
        list = list.sort(compareObject('value'));
        writerList();
        saveListToLocalStorage();
    }
});

delBtn.addEventListener('click', () => {
    const activeElements = document.querySelectorAll('.active');
    if (activeElements.length > 0) {
        const indexesToDelete = [...activeElements].map((item) => Number(item.getAttribute('data-index')));
        list = list.filter((item, index) => !indexesToDelete.includes(index));
        writerList();
        saveListToLocalStorage();
    }
});

// initial rendering list
writerList();

