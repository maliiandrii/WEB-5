function swapContentText(selector1, selector2) {
    const blockX = document.querySelector(selector1);
    const blockY = document.querySelector(selector2);

    if (blockX && blockY) {
        // Зберігаємо поточний текстовий вміст обох блоків
        const blockXContent = blockX.innerHTML;
        const blockYContent = blockY.innerHTML;

        // Міняємо їх місцями
        blockX.innerHTML = blockYContent;
        blockY.innerHTML = blockXContent;
    }
}

document.getElementById('swapTextBtn').addEventListener('click', () => {
    swapContentText('.block1', '.block6');
});

function calculateRectangleArea() {
    const width = 7;
    const height = 3;
    const area = width * height;

    const block4 = document.querySelector('.block4');
    if (block4) {
        block4.innerHTML += `<p>Площа прямокутника: ${area}</p>`;
    }
}

document.getElementById('calcAreaBtn').addEventListener('click', () => {
    calculateRectangleArea();
});

function handleMinMax() {
    const input = document.getElementById('numbers').value.trim();
    if (!input) {
        alert('Будь ласка, введіть 10 чисел через кому.');
        return;
    }

    const numbers = input.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));

    if (numbers.length !== 10) {
        alert('Будь ласка, введіть рівно 10 чисел.');
        return;
    }

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    document.cookie = `min=${min}; path=/;`;
    document.cookie = `max=${max}; path=/;`;

    alert(`Мінімум: ${min}, Максимум: ${max}`);
}

function checkCookies() {
    const cookies = document.cookie
        .split(';')
        .reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {});

    if (cookies.min && cookies.max) {
        const confirmKeep = confirm(`Збережені значення:\nМінімум: ${cookies.min}, Максимум: ${cookies.max}\nБажаєте залишити ці дані?`);

        if (confirmKeep) {
            alert('Cookies залишені. Будь ласка, перезавантажте сторінку.');
        } else {
            document.cookie = 'min=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'max=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            location.reload();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkCookies();

    const findButton = document.getElementById('findButton');
    if (findButton) {
        findButton.addEventListener('click', handleMinMax);
    }
});

function toggleBoldTextFromCheckbox() {
    const checkbox = document.getElementById('boldCheckbox');
    const block5 = document.querySelector('.block5');
    const isBold = checkbox.checked;

    if (block5) {
        block5.style.fontWeight = isBold ? 'bold' : 'normal';
    }

    localStorage.setItem('isBold', isBold);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedBold = localStorage.getItem('isBold') === 'true';
    const checkbox = document.getElementById('boldCheckbox');
    const block5 = document.querySelector('.block5');

    if (checkbox) {
        checkbox.checked = savedBold;
    }

    if (block5) {
        block5.style.fontWeight = savedBold ? 'bold' : 'normal';
    }

    document.getElementById('boldCheckbox').addEventListener('change', toggleBoldTextFromCheckbox);
});

function createTableInBlock(blockSelector) {
    const block = document.querySelector(blockSelector);
    if (!block) return;

    const table = document.createElement('table');
    const rowInput = document.createElement('input');
    rowInput.type = 'text';
    rowInput.placeholder = 'Додати рядок';
    const addButton = document.createElement('button');
    addButton.textContent = 'Додати';
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Зберегти';

    addButton.addEventListener('click', () => {
        const row = table.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = rowInput.value;
        rowInput.value = '';
    });

    saveButton.addEventListener('click', () => {
        const tableData = [];
        for (let row of table.rows) {
            tableData.push(row.cells[0].textContent);
        }
        localStorage.setItem('tableData', JSON.stringify(tableData));
        //block.innerHTML = '';
        block.appendChild(table);
    });

    //block.innerHTML = '';
    block.append(rowInput, addButton, saveButton, table);

    const savedData = localStorage.getItem('tableData');
    if (savedData) {
        JSON.parse(savedData).forEach(data => {
            const row = table.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = data;
        });
    }
}

document.getElementById('createTableBtn').addEventListener('click', () => {
    createTableInBlock('.block4');
});
