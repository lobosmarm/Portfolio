// Store files in localStorage for demo purposes
// In a real implementation, you would use a backend server
let files = {};

// Check if we have existing files in localStorage
document.addEventListener('DOMContentLoaded', function() {
    loadFiles();
    setupEventListeners();
});

// Load files from localStorage
function loadFiles() {
    const savedFiles = localStorage.getItem('portfolioFiles');
    if (savedFiles) {
        files = JSON.parse(savedFiles);
        renderFileList();
    } else {
        // Initialize with our default files if nothing exists
        if (Object.keys(files).length === 0) {
            // The contents should match the files you've uploaded
            files = {
                'index.md': `# [Project Title 1]

![Project Header Image](../../assets/images/placeholder-project-large.jpg)

## Overview

This project involved...

## Problem

The main challenge was...

## Solution

My approach involved...

## Impact

The impact of this project was...

## Key Skills

- Skill 1
- Skill 2
- Skill 3

[Link to live project (if applicable)]
[Link to GitHub repository (if applicable)]`,
                'main.css': `/* Basic CSS reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #F4F3EE; /* Off-White */
    color: #222222; /* Jet Black */
    line-height: 1.6;
}

header {
    background-color: #F4F3EE;
    padding: 20px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* More CSS content... */`
            };
            saveFiles();
            renderFileList();
        }
    }
}

// Save files to localStorage
function saveFiles() {
    localStorage.setItem('portfolioFiles', JSON.stringify(files));
}

// Setup event listeners
function setupEventListeners() {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');

    // Setup drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropArea.classList.add('highlight');
    }

    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    // Handle file drop
    dropArea.addEventListener('drop', handleDrop, false);
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const droppedFiles = dt.files;
        handleFiles(droppedFiles);
    }

    // Handle file input change
    dropArea.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
}

// Handle the files
function handleFiles(fileList) {
    for (let i = 0; i < fileList.length; i++) {
        uploadFile(fileList[i]);
    }
}

// "Upload" file (in this demo, read the file and store it)
function uploadFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const fileName = file.name;
        files[fileName] = e.target.result;
        saveFiles();
        renderFileList();
        showNotification(`File "${fileName}" uploaded successfully!`);
    };
    
    reader.readAsText(file);  // Read file as text
}

// Render the file list
function renderFileList() {
    const fileList = document.getElementById('fileList');
    
    // Keep the heading
    let content = '<h3>Your Files</h3>';
    
    // Add each file
    for (const fileName in files) {
        const fileIcon = getFileIcon(fileName);
        const fileType = getFileType(fileName);
        
        content += `
        <div class="file-item">
            <div class="file-info">
                <p><i class="${fileIcon}"></i> ${fileName}</p>
                <span class="file-type">${fileType}</span>
            </div>
            <div class="file-actions">
                <button class="edit-btn" onclick="editFile('${fileName}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-btn" onclick="deleteFile('${fileName}')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
        `;
    }
    
    fileList.innerHTML = content;
}

// Get appropriate icon based on file extension
function getFileIcon(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    
    const iconMap = {
        'html': 'fas fa-file-code',
        'css': 'fas fa-file-code',
        'js': 'fas fa-file-code',
        'md': 'fas fa-file-alt',
        'txt': 'fas fa-file-alt',
        'jpg': 'fas fa-file-image',
        'jpeg': 'fas fa-file-image',
        'png': 'fas fa-file-image',
        'gif': 'fas fa-file-image',
        'pdf': 'fas fa-file-pdf'
    };
    
    return iconMap[extension] || 'fas fa-file';
}

// Get file type based on extension
function getFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    
    const typeMap = {
        'html': 'HTML',
        'css': 'CSS',
        'js': 'JavaScript',
        'md': 'Markdown',
        'txt': 'Text',
        'jpg': 'Image',
        'jpeg': 'Image',
        'png': 'Image',
        'gif': 'Image',
        'pdf': 'PDF'
    };
    
    return typeMap[extension] || 'Unknown';
}

// Open file editor
function editFile(fileName) {
    const fileEditor = document.getElementById('fileEditor');
    const fileContent = document.getElementById('fileContent');
    const currentFile = document.getElementById('currentFile');
    
    currentFile.textContent = fileName;
    fileContent.value = files[fileName];
    fileEditor.style.display = 'block';
    
    // Scroll to editor
    fileEditor.scrollIntoView({ behavior: 'smooth' });
}

// Cancel editing
function cancelEdit() {
    document.getElementById('fileEditor').style.display = 'none';
}

// Save file changes
function saveFile() {
    const fileName = document.getElementById('currentFile').textContent;
    const fileContent = document.getElementById('fileContent').value;
    
    files[fileName] = fileContent;
    saveFiles();
    
    document.getElementById('fileEditor').style.display = 'none';
    showNotification(`File "${fileName}" saved successfully!`);
}

// Delete file
function deleteFile(fileName) {
    if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
        delete files[fileName];
        saveFiles();
        renderFileList();
        showNotification(`File "${fileName}" deleted successfully!`);
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#8FBC8F';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.transition = 'all 0.3s ease';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
