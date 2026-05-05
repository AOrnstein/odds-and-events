// === State ===

const bank = [];
const evens = [];
const odds = [];

function bankNumber(num) {
  if (Number.isNaN(+num)) return;
  bank.push(+num);
  render();
}
function sortN(n) {
  for (let i = 0; i < n; i++) {
    const num = bank.shift();
    if (num % 2 == 0) {
      evens.push(num);
    } else {
      odds.push(num);
    }
  }
  render();
}

// === Components ===
function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="new-num" type="number" />
    </label>
    <button name="submit" action="submit">Add Number</button>
    <button name="sort-1">Sort 1</button>
    <button name="sort-all">Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.submitter.name;
    if (button === "sort-1") {
      sortN(1);
      return;
    }
    if (button === "sort-all") {
      sortN(bank.length);
      return;
    }
    const formData = new FormData($form);
    const num = Number(formData.get("new-num"));
    bankNumber(num);
  });
  return $form;
}

function NumberValue(num) {
  const $numberValue = document.createElement("span");
  $numberValue.textContent = String(num);
  return $numberValue;
}

function NumberList(numbers) {
  const $numberList = document.createElement("p");
  $numberList.classList.add("number-list");
  const $numbers = numbers.map(NumberValue);
  $numberList.replaceChildren(...$numbers);
  return $numberList;
}

/* NumberList
<article>
<h2>${label}</h2>
<p>${numbers}</p>
</article>
*/
function NumberCard(label, numbers) {
  const $numberCard = document.createElement("article");
  $numberCard.innerHTML = `
        <h2>${label}</h2>
  `;
  $numberCard.appendChild(NumberList(numbers));
  return $numberCard;
}

// === Render ===

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Odds and Events</h1>
      <NumberForm></NumberForm>
      <NumberCard id="bank"></NumberCard>
      <NumberCard id="odds"></NumberCard>
      <NumberCard id="evens"></NumberCard>
    `;
  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberCard#bank").replaceWith(NumberCard("Bank", bank));
  $app.querySelector("NumberCard#odds").replaceWith(NumberCard("Odds", odds));
  $app
    .querySelector("NumberCard#evens")
    .replaceWith(NumberCard("Evens", evens));
}
render();
