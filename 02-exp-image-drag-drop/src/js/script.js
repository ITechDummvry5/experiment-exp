// ✅ Define only the true image drop zones
const imageSlots = [
  'profilePic',
  'profileLogo',
  'passiveSkill',
  'skill1',
  'skill2',
  'skill3',
  'skill4'
];

// ✅ Only attach events to image containers — not the whole skill row
imageSlots.forEach(id => {
  const container = document.getElementById(id);
  const imageBox = container.querySelector('.skill-image') || container; // support profile/logo

  // Click to upload
  imageBox.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = e => {
      const file = e.target.files[0];
      if (file) displayImage(file, container.id);
    };
    fileInput.click();
  });

  // Drag over only allowed on image box
  imageBox.addEventListener('dragover', e => {
    e.preventDefault();
    imageBox.classList.add('drag-hover');
  });
  imageBox.addEventListener('dragleave', () => {
    imageBox.classList.remove('drag-hover');
  });

  // Drop only works on image box
  imageBox.addEventListener('drop', e => {
    e.preventDefault();
    imageBox.classList.remove('drag-hover');
    const file = e.dataTransfer.files[0];
    if (file) displayImage(file, container.id);
  });
});


// ✅ Handles displaying the image in its correct box
function displayImage(file, targetId) {
  const reader = new FileReader();
  reader.onload = e => {
    const imgEl = document.querySelector(`#${targetId} img`);
    const textEl = document.querySelector(`#${targetId} p`);
    imgEl.src = e.target.result;
    imgEl.style.display = 'block';
    if (textEl) textEl.style.display = 'none';
  };
  reader.readAsDataURL(file);
}
