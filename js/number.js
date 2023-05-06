const min = 1
const max = 100

const rng = function() {
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const secretNumber = [rng()]

const spanMin = document.querySelector('[data-value="min"]')
spanMin.innerHTML = min

const spanMax = document.querySelector('[data-value="max"]')
spanMax.innerHTML = max
