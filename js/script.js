const container = document.querySelector('.container');
const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submit');
const downloadBtn = document.getElementById('download');
const sizeOption = document.querySelector('.sizeOptions');
const BGcolor = document.getElementById('BGcolor');
const FGcolor = document.getElementById('FGcolor');

let QR_Code;
let sizeChoice, BGColorChoice, FGColorChoice;


sizeOption.addEventListener('change', () => {
    sizeChoice = sizeOption.value;
});


BGcolor.addEventListener('input', () => {
    BGColorChoice = BGcolor.value;
});


FGcolor.addEventListener('input', () => {
    FGColorChoice = FGcolor.value;
});

const inputFormatter = (value) => {
    return value.trim().replace(/[^a-zA-Z0-9]+/g, "");
};


submitBtn.addEventListener('click', async () => {
    container.innerHTML = '';


    QR_Code = await new QRCode(container, {
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice,
    });


    const src = container.firstChild.toDataURL('image/png');
    downloadBtn.href = src;

    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname;
    } catch (_) {
        userValue = inputFormatter(userValue);
    }

    downloadBtn.download = `${userValue}.png`;
    downloadBtn.classList.remove('hide');
});


userInput.addEventListener('input', () => {
    if (userInput.value.trim().length < 1) {
        submitBtn.disabled = true;
        downloadBtn.href = '';
        downloadBtn.classList.add('hide');
    } else {
        submitBtn.disabled = false;
    }
});

const messageEl = document.getElementById('message');

function showMessage(text, duration = 3000) {
    messageEl.textContent = text;
    messageEl.classList.remove('hidden');
    void messageEl.offsetWidth; 
    messageEl.classList.add('show');

    setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => {
        messageEl.classList.add('hidden');
        }, 300); 
    }, duration);
}

downloadBtn.addEventListener('click', (e) => {
    if (!downloadBtn.href || downloadBtn.classList.contains('hide')) {
        e.preventDefault();
        showMessage('Please generate a QR code first before downloading.');
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
