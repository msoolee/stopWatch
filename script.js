document.addEventListener('DOMContentLoaded', () => {
    let timer;
    let running = false;
    let frames = 0;
    let savedRecords = [];

    const timeDisplay = document.getElementById('time');
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const recordList = document.querySelector('.recordList');
    const selectAllBtn = document.getElementById('selectAll');
    const deleteAllBtn = document.querySelector('.deleteAll');

    startStopBtn.addEventListener('click', () => {
        if (running) {
            clearInterval(timer);
            startStopBtn.textContent = 'Start';
        } else {
            timer = setInterval(updateTime, 1000 / 60);
            startStopBtn.textContent = 'Stop';
        }
        running = !running;
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timer);
        running = false;
        frames = 0;
        timeDisplay.textContent = '00:00';
        startStopBtn.textContent = 'Start';
    });

    lapBtn.addEventListener('click', addRecord);

    selectAllBtn.addEventListener('click', () => {
        const allChecked = selectAllBtn.classList.toggle('checked');
        document.querySelectorAll('.individual .listButton').forEach(button => {
            button.classList.toggle('checked', allChecked);
        });
    });

    deleteAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.individual .listButton.checked').forEach(button => {
            const record = button.parentElement;
            record.remove();
            const recordTime = button.nextElementSibling.textContent;
            const index = savedRecords.indexOf(recordTime);
            if (index > -1) {
                savedRecords.splice(index, 1);
            }
        });
    });

    function updateTime() {
        frames++;
        const seconds = Math.floor(frames / 60);
        const fractional = frames % 60;
        timeDisplay.textContent = `${String(seconds).padStart(2, '0')}:${String(fractional).padStart(2, '0')}`;
    }

    function addRecord() {
        const record = document.createElement('li');
        record.className = 'individual';
        const recordTime = timeDisplay.textContent;
        savedRecords.push(recordTime);
        record.innerHTML = `
            <button class="listButton"></button>
            <h3>${recordTime}</h3>
        `;
        const listButton = record.querySelector('.listButton');
        listButton.addEventListener('click', () => {
            listButton.classList.toggle('checked');
        });
        recordList.appendChild(record);
    }
});
