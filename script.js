document
  .getElementById("savings-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form inputs
    const name = document.getElementById("name").value;
    const tier = parseInt(document.getElementById("tier").value);

    // Check if name exists in any other tier
    const savingsTableBody = document.getElementById("savings-table-body");
    const existingNames = Array.from(
      savingsTableBody.getElementsByClassName("student-name")
    ).map((element) => element.textContent.toLowerCase());
    if (existingNames.includes(name.toLowerCase())) {
      alert(
        "This name is already used in a different savings tier. Please use a different name."
      );
      return;
    }

    // Check if the total number of students exceeds 12
    const totalStudents =
      savingsTableBody.getElementsByClassName("student").length;
    if (totalStudents >= 12) {
      alert(
        "The maximum number of students has been reached. No further joinings are allowed."
      );
      return;
    }

    // Calculate interest and total
    let interest;
    let total;
    switch (tier) {
      case 1:
        interest = 0.05;
        total = 10000 + 10000 * interest;
        break;
      case 2:
        interest = 0.1;
        total = 20000 + 20000 * interest;
        break;
      case 3:
        interest = 0.2;
        total = 30000 + 30000 * interest;
        break;
    }

    // Create a new row for the student's details
    const newRow = document.createElement("tr");
    newRow.classList.add("student");

    const serialNumberCell = document.createElement("td");
    serialNumberCell.textContent = totalStudents + 1;
    newRow.appendChild(serialNumberCell);

    const nameCell = document.createElement("td");
    nameCell.classList.add("student-name");
    nameCell.textContent = name;
    newRow.appendChild(nameCell);

    const amountCell = document.createElement("td");
    amountCell.textContent = total.toFixed(2) + " Naira";
    newRow.appendChild(amountCell);

    const actionCell = document.createElement("td");
    const withdrawButton = document.createElement("button");
    withdrawButton.textContent = "Withdraw";
    withdrawButton.addEventListener("click", function () {
      newRow.remove();
      updateTotalAmount();
    });
    actionCell.appendChild(withdrawButton);
    newRow.appendChild(actionCell);

    // Add the new row to the savings table
    savingsTableBody.appendChild(newRow);

    // Update total amount
    updateTotalAmount();

    // Clear form inputs
    document.getElementById("name").value = "";
    document.getElementById("tier").value = 1;
  });

function updateTotalAmount() {
  const savingsTableBody = document.getElementById("savings-table-body");
  const amountCells = Array.from(
    savingsTableBody.getElementsByClassName("student")
  ).map((row) => parseFloat(row.children[2].textContent));

  const totalAmount = amountCells.reduce((acc, curr) => acc + curr, 0);

  const totalAmountCell = document.getElementById("total-amount");
  totalAmountCell.textContent = totalAmount.toFixed(2) + " Naira";
}
