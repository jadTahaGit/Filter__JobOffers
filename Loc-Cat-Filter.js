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

// ################################################################################################
// ######################################### New Test #############################################
// ################################################################################################
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

let specialList = allElements;
let lastChoosenCatagory;
let lastChoosenLocation;

const isOtherFilterToached = (element) => {
  let secondFilterInnerText;
  if (CatagoryIsTheActualFilter) {
    secondFilterInnerText =
      element.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.children[2].children[0]
        .children[1].innerText;
  } else if (!CatagoryIsTheActualFilter) {
    secondFilterInnerText =
      element.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.children[1].children[0]
        .children[1].innerText;
  }
  return (
    secondFilterInnerText == "Standord wählen" ||
    secondFilterInnerText == "All" ||
    secondFilterInnerText == "Katagorie wählen"
  );
};

const isOtherFilterStillTheSame = (element) => {
  let secondFilterInnerText;
  if (CatagoryIsTheActualFilter) {
    secondFilterInnerText =
      element.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.children[2].children[0]
        .children[1].innerText;
    return secondFilterInnerText == lastChoosenLocation;
  } else if (!CatagoryIsTheActualFilter) {
    secondFilterInnerText =
      element.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.children[1].children[0]
        .children[1].innerText;
    return secondFilterInnerText == lastChoosenCatagory;
  }
};

const saveLastChoice = (textContent) => {
  if (CatagoryIsTheActualFilter) lastChoosenCatagory = textContent;
  else lastChoosenLocation = textContent;
};

const createSpecialList = (element) => {
  let textContent = conv(element.target.textContent);
  console.log(textContent);
  if (isOtherFilterToached(element)) {
    if (textContent !== null && textContent != "all") {
      saveLastChoice(textContent);
      specialList = document.querySelectorAll("." + textContent);
    } else if (textContent == "all") {
      saveLastChoice(textContent);
      specialList = [...allElements];
    }
  } else {
    if (!isOtherFilterStillTheSame(element)) {
      if (textContent !== null && textContent != "all") {
        saveLastChoice(textContent);
        specialList = Object.values(specialList).filter((div) =>
          div.classList.contains(textContent)
        );
      } else if (textContent == "all") {
        saveLastChoice(textContent);
        console.log(specialList);
      }
    }
  }
};

let CatagoryIsTheActualFilter;

const changeFilterFieldName = (element) => {
  let filterId =
    element.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.parentElement.firstChild.nextElementSibling
      .lastElementChild.id;

  if (filterId == "choosen__catagory") {
    CatagoryIsTheActualFilter = true;
    choosenCatagory.textContent = element.target.textContent;
  } else if (filterId == "choosen__location") {
    CatagoryIsTheActualFilter = false;
    choosenLocation.textContent = element.target.textContent;
  }
};

// ################################################################################################
// ################################################################################################

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

const showAllJobOffers = (event) => {
  changeFilterFieldName(event);
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
  showElements(specialList);
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

console.clear();
