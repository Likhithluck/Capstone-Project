const fileInput = document.getElementById('file');
const fileNameSpan = document.querySelector('.file-name');
const steps = document.querySelectorAll('.step-container');
const uploadForm = document.getElementById('upload-form');

const completionMessage = document.createElement('div');
completionMessage.textContent = '✅ Process Completed';
completionMessage.style.marginTop = '20px';
completionMessage.style.fontWeight = 'bold';
completionMessage.style.fontSize = '18px';
completionMessage.style.color = '#10b981';
completionMessage.style.textAlign = 'center';

let isProcessing = false;

fileInput.addEventListener('change', () => {
  const name = fileInput.files.length
    ? fileInput.files[0].name
    : 'No file chosen';
  fileNameSpan.textContent = name;
});

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (isProcessing || !fileInput.files.length) return;

  isProcessing = true;
  resetSteps();
  processSteps();
});

function resetSteps() {
  steps.forEach(step => {
    step.style.backgroundColor = '#ffffff';
    step.querySelector('.step-icon').style.color = '#1de9b6';
  });
  if (completionMessage.parentNode) {
    completionMessage.parentNode.removeChild(completionMessage);
  }
}

function highlightStep(step) {
  step.style.backgroundColor = '#e2f7f2';
  step.querySelector('.step-icon').style.color = '#10b981';
}

function processSteps() {
  let current = 0;

  const interval = setInterval(() => {
    if (current > 0) {
      steps[current - 1].style.backgroundColor = '#ffffff';
      steps[current - 1].querySelector('.step-icon').style.color = '#1de9b6';
    }

    if (current < steps.length) {
      highlightStep(steps[current]);
      current++;
    } else {
      clearInterval(interval);
      showCompletionMessage();
      setTimeout(() => {
        resetSteps();
        isProcessing = false;
      }, 3000);
    }
  }, 1000);
}

function showCompletionMessage() {
  document.querySelector('.steps-wrapper').appendChild(completionMessage);
}
