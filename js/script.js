const container = document.querySelector('.container');
const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submit');
const downloadBtn = document.getElementById('download');
const sizeOption = document.querySelector('.sizeOptions');
const BGcolor = document.getElementById('BGcolor');
const FGcolor = document.getElementById('FGcolor');

let QR_Code;
let sizeChoice, BGColorChoice, FGColorChoice;

// Set size
sizeOption.addEventListener('change', () => {
    sizeChoice = sizeOption.value;
});

// Set background color
BGcolor.addEventListener('input', () => {
    BGColorChoice = BGcolor.value;
});

// Set foreground color
FGcolor.addEventListener('input', () => {
    FGColorChoice = FGcolor.value;
});

// Format input
const inputFormatter = (value) => {
    return value.trim().replace(/[^a-zA-Z0-9]+/g, "");
};

// Handle submit click
submitBtn.addEventListener('click', async () => {
    container.innerHTML = '';

    // Generate QR code
    QR_Code = await new QRCode(container, {
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice,
    });

    // Set download URL for QR code image
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

// Handle input change to enable/disable submit button
userInput.addEventListener('input', () => {
    if (userInput.value.trim().length < 1) {
        submitBtn.disabled = true;
        downloadBtn.href = '';
        downloadBtn.classList.add('hide');
    } else {
        submitBtn.disabled = false;
    }
});

// Initialize default values on page load
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
