window.addEventListener("DOMContentLoaded", (event) => {
  const learnbtn = document.querySelector(".section4__nav--button1");
  const managebtn = document.querySelector(".section4__nav--button2");
  const customizebtn = document.querySelector(".section4__nav--button3");
  const learnSection = document.querySelector(".section4__learn");
  const manageSection = document.querySelector(".section4__manage");
  const customizeSection = document.querySelector(".section4__customize");

  const cmbtn = document.querySelector(".section5__nav--cash-management");
  const sfbtn = document.querySelector(".section5__nav--stock-fund");
  const optionsbtn = document.querySelector(".section5__nav--options");
  const goldbtn = document.querySelector(".section5__nav--gold");
  const cryptobtn = document.querySelector(".section5__nav--crypto");

  const cmimage = document.querySelector(".section5__img1");
  const sfimage = document.querySelector(".section5__img2");
  const optionsimage = document.querySelector(".section5__img3");
  const goldimage = document.querySelector(".section5__img4");
  const cryptoimage = document.querySelector(".section5__img5");

  const cmtext = document.querySelector(".section5__nav--cm-text");
  const sftext = document.querySelector(".section5__nav--sf-text");
  const optionstext = document.querySelector(".section5__nav--o-text");
  const goldtext = document.querySelector(".section5__nav--g-text");
  const cryptotext = document.querySelector(".section5__nav--c-text ");

  managebtn.addEventListener("click", (event) => {
    learnSection.classList.add("section4__invisible");
    learnSection.classList.remove("section4__visible");
    customizeSection.classList.add("section4__invisible");
    customizeSection.classList.remove("section4__visible");
    manageSection.classList.remove("section4__invisible");
    manageSection.classList.add("section4__visible");
    learnbtn.classList.remove("section4__activebtn");
    customizebtn.classList.remove("section4__activebtn");
    managebtn.classList.add("section4__activebtn");
  });

  customizebtn.addEventListener("click", (event) => {
    manageSection.classList.add("section4__invisible");
    manageSection.classList.remove("section4__visible");
    learnSection.classList.add("section4__invisible");
    learnSection.classList.remove("section4__visible");
    customizeSection.classList.remove("section4__invisible");
    customizeSection.classList.add("section4__visible");
    learnbtn.classList.remove("section4__activebtn");
    managebtn.classList.remove("section4__activebtn");
    customizebtn.classList.add("section4__activebtn");
  });

  learnbtn.addEventListener("click", (event) => {
    learnSection.classList.remove("section4__invisible");
    learnSection.classList.add("section4__visible");
    customizeSection.classList.add("section4__invisible");
    customizeSection.classList.remove("section4__visible");
    manageSection.classList.add("section4__invisible");
    manageSection.classList.remove("section4__visible");
    customizebtn.classList.remove("section4__activebtn");
    managebtn.classList.remove("section4__activebtn");
    learnbtn.classList.add("section4__activebtn");
  });

  sfbtn.addEventListener("click", (event) => {
    cmimage.classList.remove("section5__visible");
    cmimage.classList.add("section5__invisible");
    cmtext.classList.add("section5__invisible");
    cmtext.classList.remove("section5__visible");
    sfimage.classList.remove("section5__invisible");
    sfimage.classList.add("section5__visible");
    sftext.classList.add("section5__visible");
    sftext.classList.remove("section5__invisible");
    optionsimage.classList.remove("section5__visible");
    optionsimage.classList.add("section5__invisible");
    optionstext.classList.add("section5__invisible");
    optionstext.classList.remove("section5__visible");
    goldimage.classList.remove("section5__visible");
    goldimage.classList.add("section5__invisible");
    goldtext.classList.add("section5__invisible");
    goldtext.classList.remove("section5__visible");
    cryptoimage.classList.remove("section5__visible");
    cryptoimage.classList.add("section5__invisible");
    cryptotext.classList.add("section5__invisible");
    cryptotext.classList.remove("section5__visible");
    cmbtn.classList.remove("section5__activebtn");
    sfbtn.classList.add("section5__activebtn");
    optionsbtn.classList.remove("section5__activebtn");
    goldbtn.classList.remove("section5__activebtn");
    cryptobtn.classList.remove("section5__activebtn");
  });

  optionsbtn.addEventListener("click", (event) => {
    optionsimage.classList.remove("section5__invisible");
    optionsimage.classList.add("section5__visible");
    cmimage.classList.remove("section5__visible");
    cmimage.classList.add("section5__invisible");
    sfimage.classList.remove("section5__visible");
    sfimage.classList.add("section5__invisible");
    goldimage.classList.remove("section5__visible");
    goldimage.classList.add("section5__invisible");
    cryptoimage.classList.remove("section5__visible");
    cryptoimage.classList.add("section5__invisible");
    cmtext.classList.add("section5__invisible");
    cmtext.classList.remove("section5__visible");
    sftext.classList.add("section5__invisible");
    sftext.classList.remove("section5__visible");
    optionstext.classList.add("section5__visible");
    optionstext.classList.remove("section5__invisible");
    goldtext.classList.add("section5__invisible");
    goldtext.classList.remove("section5__visible");
    cryptotext.classList.add("section5__invisible");
    cryptotext.classList.remove("section5__visible");
    cmbtn.classList.remove("section5__activebtn");
    sfbtn.classList.remove("section5__activebtn");
    optionsbtn.classList.add("section5__activebtn");
    goldbtn.classList.remove("section5__activebtn");
    cryptobtn.classList.remove("section5__activebtn");
  });

  goldbtn.addEventListener("click", (event) => {
    optionsimage.classList.remove("section5__visible");
    optionsimage.classList.add("section5__invisible");
    cmimage.classList.remove("section5__visible");
    cmimage.classList.add("section5__invisible");
    sfimage.classList.remove("section5__visible");
    sfimage.classList.add("section5__invisible");
    goldimage.classList.remove("section5__invisible");
    goldimage.classList.add("section5__visible");
    cryptoimage.classList.remove("section5__visible");
    cryptoimage.classList.add("section5__invisible");
    cmtext.classList.add("section5__invisible");
    cmtext.classList.remove("section5__visible");
    sftext.classList.add("section5__invisible");
    sftext.classList.remove("section5__visible");
    optionstext.classList.add("section5__invisible");
    optionstext.classList.remove("section5__visible");
    goldtext.classList.add("section5__visible");
    goldtext.classList.remove("section5__invisible");
    cryptotext.classList.add("section5__invisible");
    cryptotext.classList.remove("section5__visible");
    cmbtn.classList.remove("section5__activebtn");
    sfbtn.classList.remove("section5__activebtn");
    optionsbtn.classList.remove("section5__activebtn");
    goldbtn.classList.add("section5__activebtn");
    cryptobtn.classList.remove("section5__activebtn");
  });

  cryptobtn.addEventListener("click", (event) => {
    goldimage.classList.remove("section5__visible");
    goldimage.classList.add("section5__invisible");
    cryptoimage.classList.remove("section5__invisible");
    cryptoimage.classList.add("section5__visible");
    optionsimage.classList.remove("section5__visible");
    optionsimage.classList.add("section5__invisible");
    cmimage.classList.remove("section5__visible");
    cmimage.classList.add("section5__invisible");
    sfimage.classList.remove("section5__visible");
    sfimage.classList.add("section5__invisible");
    cmtext.classList.add("section5__invisible");
    cmtext.classList.remove("section5__visible");
    sftext.classList.add("section5__invisible");
    sftext.classList.remove("section5__visible");
    optionstext.classList.add("section5__invisible");
    optionstext.classList.remove("section5__visible");
    goldtext.classList.add("section5__invisible");
    goldtext.classList.remove("section5__visible");
    cryptotext.classList.add("section5__visible");
    cryptotext.classList.remove("section5__invisible");
    cmbtn.classList.remove("section5__activebtn");
    sfbtn.classList.remove("section5__activebtn");
    optionsbtn.classList.remove("section5__activebtn");
    goldbtn.classList.remove("section5__activebtn");
    cryptobtn.classList.add("section5__activebtn");
  });

  cmbtn.addEventListener("click", (event) => {
    cmimage.classList.remove("section5__invisible");
    cmimage.classList.add("section5__visible");
    sfimage.classList.remove("section5__visible");
    sfimage.classList.add("section5__invisible");
    optionsimage.classList.remove("section5__visible");
    optionsimage.classList.add("section5__invisible");
    goldimage.classList.remove("section5__visible");
    goldimage.classList.add("section5__invisible");
    cryptoimage.classList.remove("section5__visible");
    cryptoimage.classList.add("section5__invisible");
    cmtext.classList.add("section5__visible");
    cmtext.classList.remove("section5__invisible");
    sftext.classList.add("section5__invisible");
    sftext.classList.remove("section5__visible");
    optionstext.classList.add("section5__invisible");
    optionstext.classList.remove("section5__visible");
    goldtext.classList.add("section5__invisible");
    goldtext.classList.remove("section5__visible");
    cryptotext.classList.add("section5__invisible");
    cryptotext.classList.remove("section5__visible");
    cmbtn.classList.add("section5__activebtn");
    sfbtn.classList.remove("section5__activebtn");
    optionsbtn.classList.remove("section5__activebtn");
    goldbtn.classList.remove("section5__activebtn");
    cryptobtn.classList.remove("section5__activebtn");
  });
});
