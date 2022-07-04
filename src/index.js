import "./assets/styles.css";

const input = document.querySelector("#input");
const output = document.querySelector("#output");
const toTableButton = document.querySelector("#toTable");
const toRowsButton = document.querySelector("#toRows");
//const table = document.querySelector("#table");
const tbody = document.querySelector("#tbody");

toTableButton.addEventListener("click", (e) => {
  try {
    let raw = input.value;

    let string = raw.replace(/\,/gm, " ").replace(/\s{2,}/gm, " ");

    if (string == undefined) return;

    let names = string.match(
      /[А-ЯA-Z]{2,}\s[А-ЯA-Z]{2,}(\s*[А-Я]{2,})*(\s[А-Я]{2,})*/gim
    );

    let numbers = string.match(/([А-ЯA-Z]{1}[0-9]{3}[А-ЯA-Z]{2}[0-9]{0,3})/gim);
    if (!numbers) {
      numbers = [];
    }

    /* Phone numbers */

    let phones = string
      .replace(/\-|\(|\)|\s/gi, "")
      .match(
        /(\+7|7|8)*\d{3}(\s|\-|\()*\d{3}\s*\d{2}\s*\d{2}(?=($|\s|[А-Я]))/gim
      );
    console.log(phones);

    if (phones) {
      phones = phones.map((item) => {
        return item.replace(/(\s|\+)/gm, "");
      });
    } else {
      phones = [];
    }

    names.forEach((name, index) => {
      tbody.innerHTML += `<tr>
    <td class="col0">${index + 1}</td>
    <td class="col1">${numbers[index]}</td>
    <td class="col2"></td>
    <td class="col3">${name}</td>
    <td class="col4">${phones[index]}</td>
    </tr>`;
    });
  } catch (e) {
    console.error(e);
    output.value = "Error :(";
  }
});

toRowsButton.addEventListener("click", () => {
  try {
    let raw = input.value;
    let string = raw
      .replace(/\,/gm, " ")
      .replace(/\s{2,}/gm, " ")
      .replace(/\s/g, "\n")
      .replace(/^\s/, "");
    output.value = string;
  } catch (e) {
    console.error(e);
  }
});
