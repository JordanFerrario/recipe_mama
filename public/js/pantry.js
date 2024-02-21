// Add item from input when clicking "Add" button
    var addItemBtn = document.getElementById('add-item-btn');
        addItemBtn.addEventListener('click', function() {
        var newItemInput = document.getElementById('new-item-input');
        var newItemText = newItemInput.value.trim();
        if (newItemText !== '') {
            var newListItem = document.createElement('li');
            newListItem.textContent = newItemText;
            newListItem.className = 'sortable-item';
            newListItem.id = 'sortable-item';

        // delete button
            var deleteButton = document.createElement('span');
            deleteButton.textContent = '×';
            deleteButton.className = 'delete-item';
            deleteButton.addEventListener('click', function() {
                newListItem.remove();
            });
            newListItem.appendChild(deleteButton);
            newListItem.draggable = true; // Make the new list item draggable
            newListItem.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', event.target.id);
            });
            document.getElementById('sortable-list').appendChild(newListItem);
            newItemInput.value = ''; // Clear input after adding item
        }
    });

// Make the list sortable
var sortableList = Sortable.create(document.getElementById('sortable-list'), {
    animation: 150
    });

// Create drag and drop event 
const dragList = document.getElementById('sortable-list');
const basketList = document.getElementById('box1');

function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const li = document.createElement('li');
    li.innerHTML = data;
    basketList.appendChild(li);
  }


