const form = document.getElementById("js-cw-catch");

const showForm = () => {
  form.classList.remove("hide");
};

const hideForm = () => {
  form.classList.add("hide");
};

const conv = function (str) {
  if (!str) {
    str = "empty";
  }
  return str
    .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
    .replace(/ /g, "-")
    .toLowerCase()
    .trim();
};

const catArray = document.querySelectorAll(".w-dyn-item .filter-category"); // Department Text Box
catArray.forEach(function (elem) {
  let text = elem.innerText || elem.innerContent;
  let className = conv(text);
  elem.parentElement.parentElement.parentElement.classList.add(className);
});

const locArray = document.querySelectorAll(".w-dyn-item .filter-location"); // Department Text Box
locArray.forEach(function (elem) {
  let text = elem.innerText || elem.innerContent;
  let className = conv(text);
  elem.parentElement.parentElement.parentElement.parentElement.classList.add(
    className
  );
});

const choosenCatagory = document.getElementById("choosen__catagory");
const choosenLocation = document.getElementById("choosen__location");
const allElements = document.querySelectorAll(".mix.w-dyn-item.w-col.w-col-4"); // The whole list

const showElements = (elements) => {
  elements.forEach((element) => {
    element.style.display = "block";
  });
};

const hideElments = (elements) => {
  elements.forEach((element) => {
    element.style.display = "none";
  });
};

const isOtherFilterToached = (element) => {
  let secondFilterInnerText;
  if (catagoryIsTheActualFilter) {
    secondFilterInnerText =
      element.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.children[2].children[0]
        .children[1].innerText;
  } else if (!catagoryIsTheActualFilter) {
    secondFilterInnerText =
      element.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.children[1].children[0]
        .children[1].innerText;
  }
  return (
    secondFilterInnerText != "Standord wählen" &&
    secondFilterInnerText != "All" &&
    secondFilterInnerText != "Katagorie wählen"
  );
};

const getSecondFilterChoice = (element) => {
  let secondFilterInnerText;
  if (catagoryIsTheActualFilter) {
    secondFilterInnerText =
      element.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.children[2].children[0]
        .children[1].innerText;
  } else if (!catagoryIsTheActualFilter) {
    secondFilterInnerText =
      element.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.children[1].children[0]
        .children[1].innerText;
  }
  secondFilterInnerText = conv(secondFilterInnerText);
  return secondFilterInnerText;
};

let secondFilterChoice;
let specialList;
const createSpecialList = (element) => {
  let firstFilterChoice = conv(element.target.innerText);
  specialList = allElements;
  secondFilterChoice = getSecondFilterChoice(element);

  if (!isOtherFilterToached(element)) {
    if (firstFilterChoice != "all")
      specialList = Object.values(specialList).filter((div) =>
        div.classList.contains(firstFilterChoice)
      );
    else specialList = allElements;
  } else {
    if (firstFilterChoice != "all") {
      specialList = allElements;
      specialList = Object.values(specialList).filter(
        (div) =>
          div.classList.contains(firstFilterChoice) &&
          div.classList.contains(secondFilterChoice)
      );
    } else {
      specialList = allElements;
      specialList = Object.values(specialList).filter((div) =>
        div.classList.contains(secondFilterChoice)
      );
    }
  }
};

let catagoryIsTheActualFilter;
const changeFilterFieldName = (element) => {
  console.log("Elment from ChangeFilterFieldName: " + element);

  let filterId =
    element.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.parentElement.firstChild.lastElementChild.id;

  console.log(filterId);

  if (filterId == "choosen__catagory") {
    catagoryIsTheActualFilter = true;
    choosenCatagory.textContent = element.target.textContent;
  } else if (filterId == "choosen__location") {
    catagoryIsTheActualFilter = false;
    choosenLocation.textContent = element.target.textContent;
  }
};

const options = document.querySelectorAll(".html-embed-6 ");
const hideTheSelectedOption = (element) => {
  options.forEach((option) => {
    if (option.children[0].innerText == element.target.innerText)
      option.style.display = "none";
  });
};

const showAllexceptSelected = (element) => {
  Object.values(
    element.target.parentElement.parentElement.parentElement.children
  ).forEach((child) => {
    if (child.children[0].children[0].innerText !== element.target.innerText)
      child.children[0].style.display = "block";
  });
};

const hideTheAllOption = () => {
  options.forEach((option) => {
    if (option.children[0].innerText == "All") option.style.display = "none";
  });
};

const jobOffers = document.querySelectorAll(".mix"); // Alle Collection Kachelen
jobOffers.forEach(function (elem, index) {
  elem.classList.add("item-" + index);
});

// Hide all elements after the 9th
for (var i = 9; i < 100; i++) {
  var item = document.querySelector(".item-" + i);
  if (item === null) {
    break;
  }
  item.classList.add("hide");
  if (item.style.display != "none") item.style.display = "none";
}

const showJobOffer = (index) => {
  var item = document.querySelector(".item-" + index);
  if (item === null) {
    return false;
  }
  if (item.classList.contains("hide")) {
    item.classList.remove("hide");
    if (item.style.display == "none") item.style.display = "block";
  }
  return true;
};

hideTheAllOption();
const showAllJobOffers = (event) => {
  changeFilterFieldName(event);
  hideTheSelectedOption(event);
  showAllexceptSelected(event);
  createSpecialList(event);
  hideNextJobOfferButton();
  for (var i = 0; i < 1000; i++) {
    if (!showJobOffer(i)) {
      break;
    }
  }
  // hide everythingelse
  hideElments(jobOffers);
  // Show the Clicked
  if (specialList.length != 0) {
    hideForm();
    showElements(specialList);
  } else showForm();
};

const lastShownJobOfferIndex = 9;
const JobOfferBatchSize = 9;

const showJobOfferBatch = () => {
  for (
    var i = lastShownJobOfferIndex;
    i <= lastShownJobOfferIndex + JobOfferBatchSize;
    i++
  ) {
    if (!showJobOffer(i)) {
      hideNextJobOfferButton();
      break;
    }
  }

  lastShownJobOfferIndex += JobOfferBatchSize;
};

const hideNextJobOfferButton = () => {
  var button = document.getElementById("next-job-offer-button");
  var button = button.parentElement;
  button.classList.add("hide");
};
