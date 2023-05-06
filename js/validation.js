function verify(guess, min, max) {
  const ret = {
    result: true,
    guess: guess.replace(' ', '')
  }

  if (guess.includes('menos')) {
    ret['guess'] = ret['guess'].replace('menos', '-')
  }

  if (guess.includes('negativo')) {
    ret['guess'] = ret['guess'].replace('negativo', '')
    ret['guess'] = '-' + ret['guess']
  }

  const number = +ret['guess']
  if (Number.isNaN(number)) {
    ret['result'] = false
  } else {
    if (number < min || number > max) {
      ret['result'] = false
    }
  }

  return ret
}