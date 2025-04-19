function updateProgress(percent) {
    document.querySelector('.progress-fill').style.width = `${percent}%`;
    document.querySelector('.progress-label').textContent = `${percent}%`;
  }
  