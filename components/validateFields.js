let validated = true
const errorMessages = {}
let finalErrors = ''
let password = null

const ValidateFields = (field, newValue, prevState) => {
  // apply validation rules and get final result
  return checkValidationRule(prevState, newValue)
}

// validates fields with required property
const requiredValidation = (prevState, newValue) => {
  let thisValidation = true
  const { required } = prevState
  if (required && newValue) {
    if (newValue.length < 2) {
      thisValidation = false
    }
  }
  if (required && !newValue) {
    thisValidation = false
  }
  return thisValidation
}

// http://regexlib.com/Search.aspx?k=email&AspxAutoDetectCookieSupport=1
const emailValidation = (prevState, newValue) => {
  let thisValidation = true
  const { type } = prevState
  if (type === 'email') {
    thisValidation = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(newValue)
  }
  return thisValidation
}

// 212-666-1234 format
const phoneValidation = (prevState, newValue) => {
  let thisValidation = true
  const { type } = prevState
  if (type === 'phone') {
    thisValidation = /^[2-9]\d{2}-\d{3}-\d{4}$/.test(newValue)
  }
  return thisValidation
}

// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const passwordValidation = (prevState, newValue) => {
  // min 8 char, @ least 1 letter, @ least 1 number
  let thisValidation = true
  const { type } = prevState
  if (type === 'password') {
    password = newValue
    thisValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newValue)
  }
  return thisValidation
}

const passwordValidation2 = (prevState, newValue) => {
  // min 8 char, @ least 1 letter, @ least 1 number
  let thisValidation = true
  const { type } = prevState
  if (type === 'password2') {
    thisValidation = newValue === password
  }
  return thisValidation
}

// all rules and corresponding error messages
const validationRules = [
  {
    rule: requiredValidation,
    errMsg: 'Required Field (min 2 char)'
  },
  {
    rule: emailValidation,
    errMsg: 'Must be valid email'
  },
  {
    rule: phoneValidation,
    errMsg: 'Must be XXX-XXX-XXXX format'
  },
  {
    rule: passwordValidation,
    errMsg: 'Min 8 characters inc 1 lowercase 1 number'
  },
  {
    rule: passwordValidation2,
    errMsg: 'Does not match password'
  }
]

const checkValidationRule = (prevState, newValue) => {
  validationRules.forEach((r) => {
    const { rule, errMsg } = r
    const validation = rule(prevState, newValue)
    if (validation) {
      delete errorMessages[errMsg]
    } else {
      errorMessages[errMsg] = errMsg
    }
  })
  finalErrors = Object.values(errorMessages).join('/ ')
  validated = finalErrors === ''
  const validationResponse = {
    valid: validated,
    errMsg: finalErrors
  }
  return validationResponse
}
export default ValidateFields