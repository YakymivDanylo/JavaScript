document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
    const columns = document.querySelectorAll('.column');

    let draggedTask = null;

    // Add event listeners for drag start
    tasks.forEach(task => {
        task.addEventListener('dragstart', () => {
            draggedTask = task;
            setTimeout(() => {
                task.classList.add('dragging');
            }, 0);
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
            draggedTask = null;
        });
    });

    // Add event listeners for columns
    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            column.classList.add('dropzone');
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('dropzone');
        });

        column.addEventListener('drop', e => {
            e.preventDefault();
            column.classList.remove('dropzone');

            if (draggedTask) {
                // Check if we're dropping on another task
                const afterElement = getDragAfterElement(column, e.clientY);

                if (afterElement) {
                    column.insertBefore(draggedTask, afterElement);
                } else {
                    column.appendChild(draggedTask);
                }
            }
        });
    });

    // Helper function to determine where to place the dragged task
    function getDragAfterElement(column, y) {
        const draggableElements = [...column.querySelectorAll('.task:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});