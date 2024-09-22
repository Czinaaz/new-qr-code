const container = document.querySelector('.container');

const userInput = document.getElementById('userInput');

const submitBtn = document.getElementById('submit');

const downloadBtn = document.getElementById('download');

const sizeOption = document.querySelector('.sizeOptions');

const BGcolor = document.getElementById('BGcolor');

const FGcolor = document.getElementById('FGcolor');

let QR_Code;

let sizeChoise,BGColorChoice,FGColorChoice;

// Set size

sizeOption.addEventListener('change', ()=> {
    sizeChoice = sizeOption.value;
});

// Set background color

BGcolor.addEventListener('input', ()=> {
    BGColorChoice = BGcolor.value;
})

// Set foreground color

FGcolor.addEventListener('input', ()=> {
    FGColorChoice = FGcolor.value;
})

// Format input

const inputFormatter = (value) => {
    // return value.trim().replace(/\s+/g, ' ');
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
    return value;
};

submitBtn.addEventListener('click', async() => {
    container.innerHTML = '';

    // QR code generator

    QR_Code = await new QRCode(container, {
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice,
    });

    // set url for download

    const src = container.firstChild.toDataURL('image/png');
    downloadBtn.href = src;
    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname;
    }
    catch(_) {
        userValue = inputFormatter(userValue);
        downloadBtn.download = `${userValue}`;
        downloadBtn.classList.remove('hide');
    }
});

userInput.addEventListener('input', () => {
    if (userInput.value.trim().length < 1) {
        submitBtn.disabled = true;
        downloadBtn.href = '';
        downloadBtn.classList.add('hide');
    }
    else {
        submitBtn.disabled = false;
    }
});

window.onload = () => {
    container.innerHTML = '';
    sizeChoice = 300;
    sizeOption.value = 300;
    userInput.value = '';
    BGcolor.value = BGColorChoice = '#ffffff';
    FGcolor.value = FGColorChoice = '#000000';
    downloadBtn.classList.add('hide');
    submitBtn.disabled = true;


};