if (sessionStorage.getItem('username') == null || localStorage.getItem('username') == null){
    while (!username) {
        var username = prompt('Please enter your name');
    }

    sessionStorage.setItem('username', username);
    localStorage.setItem('username', username);
}

document.addEventListener('DOMContentLoaded', function() {

    username = localStorage.getItem('username');

    document.getElementById('name').innerText = username + '\'s Shopping list';

    if (localStorage.getItem('itemsList') != null) {
        let itemsList = JSON.parse(localStorage.getItem('itemsList'));
        updateTable(itemsList);
    }
}, false);


document.getElementById('submit').addEventListener('click', function() {
    let itemName = document.getElementById('item-name-input').value;
    let itemQuantity = document.getElementById('item-quantity-input').value;

    if(itemName === ""  || itemQuantity === "" || itemQuantity <= 0) {
        alert('Please provide right data');
    } else {
        let itemsList = {};

        if(localStorage.getItem('itemsList') == null) {
            itemsList[username] = [[itemName, itemQuantity]];
        } else {
            itemsList = JSON.parse(localStorage.getItem('itemsList'));

            itemsList[username].push([itemName, itemQuantity]);
        }

        updateTable(itemsList);

        localStorage.setItem('itemsList', JSON.stringify(itemsList));

        document.getElementById('item-name-input').value = "";
        document.getElementById('item-quantity-input').value = "";
    }
});

function deleteRow(id) {
    if (confirm('Are you sure you want to delete item under the number '+id+'?')) {
        let itemsList = JSON.parse(localStorage.getItem('itemsList'));

        itemsList[username].splice(id, 1);

        updateTable(itemsList)

        localStorage.setItem('itemsList', JSON.stringify(itemsList));
    }
}

function updateTable(itemsList) {
    document.getElementById('list-table').innerHTML = "<tr>\n" +
        "            <th class=\"id-column\">No.</th>\n" +
        "            <th class=\"product-column\">Product</th>\n" +
        "            <th class=\"quantity-column\">Quantity</th>\n" +
        "        </tr>";

    for (let i = 0; i < itemsList[username].length; i++) {
        let data = '<tr onclick="deleteRow('+i+')">\n' +
            '                <td class="id-column">'+ (i+1) +'</td>\n' +
            '                <td class="product-column">'+ itemsList[username][i][0] +'</td>\n' +
            '                <td class="quantity-column">'+ itemsList[username][i][1] +'</td>\n' +
            '            </tr>'
        document.getElementById('list-table').innerHTML += data;
    }
}