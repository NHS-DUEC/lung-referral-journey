const router = require('express').Router()

// sr02-name validation
router.post('/personal-details/sr02-name', function(req, res) {
  
  let forename = req.session.data['Forename']
  let surname = req.session.data['Surname']

  if (!forename && !surname) {
    res.redirect('sr02-name?error=both')
  } else if (!forename) {
    res.redirect('sr02-name?error=forename')
  } else if (!surname) {
    res.redirect('sr02-name?error=surname')
  } else {
    req.session.data['error'] = null
    res.redirect('sr03-dob')
  }
})

// sr03-dob validation
router.post('/personal-details/sr03-dob', function(req, res) {
  let day = req.session.data['dob-day']
  let month = req.session.data['dob-month']
  let year = req.session.data['dob-year']

  if (!day || !month || !year) {
    res.redirect('sr03-dob?error=missing')
    return
  }

  let dayNum = parseInt(day, 10)
  let monthNum = parseInt(month, 10)
  let yearNum = parseInt(year, 10)

  if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
    res.redirect('sr03-dob?error=invalid')
    return
  }

  if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) {
    res.redirect('sr03-dob?error=invalid')
    return
  }

  let currentYear = new Date().getFullYear()
  if (yearNum > currentYear || yearNum < 1900) {
    res.redirect('sr03-dob?error=invalid')
    return
  }

  let testDate = new Date(yearNum, monthNum - 1, dayNum)
  if (testDate.getFullYear() !== yearNum || 
      testDate.getMonth() !== monthNum - 1 || 
      testDate.getDate() !== dayNum) {
    res.redirect('sr03-dob?error=invalid')
    return
  }

  if (testDate > new Date()) {
    res.redirect('sr03-dob?error=future')
    return
  }

  req.session.data['error'] = null
  res.redirect('sr04-phone')
})

// sr04-phone validation (optional - only validate if provided)
router.post('/personal-details/sr04-phone', function(req, res) {
  let phone = req.session.data['TelephoneNumber']

  let cleanedPhone = phone ? phone.replace(/[\s\-\(\)]/g, '') : ''

  // If phone is empty, allow through (user can skip)
  if (!cleanedPhone) {
    req.session.data['error'] = null
    return res.redirect('sr05-email')
  }

  // If phone is provided, validate it
  let ukPhoneRegex = /^(?:(?:\+44|0044)[127]\d{8,9}|0[127]\d{8,9})$/

  if (!ukPhoneRegex.test(cleanedPhone)) {
    req.session.data['error'] = 'invalid'
    return res.redirect('sr04-phone')
  }

  req.session.data['error'] = null
  res.redirect('sr05-email')
})

// sr05-email (optional but validate format if provided)
router.post('/personal-details/sr05-email', function(req, res) {
  let email = req.session.data['EmailAddress']

  if (!email) {
    req.session.data['error'] = null
    res.redirect('sr06-home-postcode')
    return
  }

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    res.redirect('sr05-email?error=invalid')
    return
  }

  req.session.data['error'] = null
  res.redirect('sr06-home-postcode')
})

// sr06-home-postcode
router.post('/personal-details/sr06-home-postcode', function(req, res) {
  let isHomePostcode = req.session.data['is-home-postcode']
  let homePostcode = req.session.data['home-postcode']

  if (!isHomePostcode) {
    res.redirect('sr06-home-postcode?error=select')
    return
  }

  if (isHomePostcode === 'no') {
    if (!homePostcode) {
      res.redirect('sr06-home-postcode?error=postcode-missing')
      return
    }

    let postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i

    if (!postcodeRegex.test(homePostcode.trim())) {
      res.redirect('sr06-home-postcode?error=postcode-invalid')
      return
    }
  }

  req.session.data['error'] = null
  res.redirect('sr07-home-address')
})

// sr07-home-address
router.post('/personal-details/sr07-home-address', function(req, res) {
  req.session.data['error'] = null
  res.redirect('sr07a-smoker')
})

// sr07a-smoker
router.post('/personal-details/sr07a-smoker', function(req, res) {
  let smoker = req.session.data['smoker']

  if (!smoker) {
    req.session.data['error'] = 'smoker'
    return res.redirect('sr07a-smoker')
  }

  req.session.data['error'] = null
  res.redirect('sr07b-extra-help')
})

// sr07b-extra-help
router.post('/personal-details/sr07b-extra-help', function(req, res) {
  let extraHelp = req.session.data['extra-help']

  if (!extraHelp) {
    req.session.data['error'] = 'extra-help'
    return res.redirect('sr07b-extra-help')
  }

  req.session.data['error'] = null
  res.redirect('sr07c-interpreter')
})

// sr07c-interpreter
router.post('/personal-details/sr07c-interpreter', function(req, res) {
  let interpreter = req.session.data['interpreter']

  if (!interpreter) {
    req.session.data['error'] = 'interpreter'
    return res.redirect('sr07c-interpreter')
  }

  req.session.data['error'] = null

  // If yes, go to language selection page
  if (interpreter === 'yes') {
    return res.redirect('language-selection')
  }

  // If no, go to confirmation preference page
  res.redirect('sr07d-confirmation-preference')
})

// language-selection
router.post('/personal-details/language-selection', function(req, res) {
  let language = req.session.data['language']

  if (!language) {
    req.session.data['error'] = 'language'
    return res.redirect('language-selection')
  }

  req.session.data['error'] = null
  res.redirect('sr07d-confirmation-preference')
})

// sr07d-confirmation-preference
router.post('/personal-details/sr07d-confirmation-preference', function(req, res) {
  let confirmationPreference = req.session.data['confirmation-preference']

  if (!confirmationPreference) {
    req.session.data['error'] = 'confirmation-preference'
    return res.redirect('sr07d-confirmation-preference')
  }

  req.session.data['error'] = null

  // If yes, go to confirmation method page
  if (confirmationPreference === 'yes') {
    return res.redirect('sr07e-confirmation-method')
  }

  // If no, skip to check details
  res.redirect('sr08-check-details')
})

// sr07e-confirmation-method
router.post('/personal-details/sr07e-confirmation-method', function(req, res) {
  let textSelected = req.session.data['confirmation-text']
  let emailSelected = req.session.data['confirmation-email-checkbox']
  let mobile = req.session.data['confirmation-mobile']
  let email = req.session.data['confirmation-email']

  // Check at least one option is selected
  if (!textSelected && !emailSelected) {
    req.session.data['error'] = 'confirmation-method'
    return res.redirect('sr07e-confirmation-method')
  }

  // If text selected, validate mobile number
  if (textSelected) {
    if (!mobile) {
      req.session.data['error'] = 'mobile-missing'
      return res.redirect('sr07e-confirmation-method')
    }

    let cleanedMobile = mobile.replace(/[\s\-\(\)]/g, '')
    let mobileRegex = /^(?:(?:\+44|0044)7\d{9}|07\d{9})$/

    if (!mobileRegex.test(cleanedMobile)) {
      req.session.data['error'] = 'mobile-invalid'
      return res.redirect('sr07e-confirmation-method')
    }
  }

  // If email selected, validate email address
  if (emailSelected) {
    if (!email) {
      req.session.data['error'] = 'email-missing'
      return res.redirect('sr07e-confirmation-method')
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      req.session.data['error'] = 'email-invalid'
      return res.redirect('sr07e-confirmation-method')
    }
  }

  req.session.data['error'] = null
  res.redirect('sr08-check-details')
})

// sr08-check-details - redirect to acknowledgement page
router.post('/personal-details/sr08-check-details', function(req, res) {
  req.session.data['error'] = null
  req.session.data['acknowledgement'] = null
  res.redirect('../confirmation/sr08b-acknowledge-gp-3')
})

// sr08b-acknowledge-gp-3 - validate checkbox and redirect to confirmation
router.post('/confirmation/sr08b-acknowledge-gp-3', function(req, res) {
  // Get the checkbox value from the form submission
  let acknowledgement = req.session.data['acknowledgement']
  
  // If checkbox is unchecked, it won't be in the POST data
  // The prototype kit sets unchecked checkboxes to empty array []
  if (!acknowledgement || acknowledgement === '' || (Array.isArray(acknowledgement) && acknowledgement.length === 0)) {
    req.session.data['acknowledgement'] = null
    req.session.data['error'] = 'acknowledgement'
    return res.redirect('sr08b-acknowledge-gp-3')
  }

  req.session.data['error'] = null
  res.redirect('sr09-confirmation')
})

// sr09-confirmation - redirect to receipt
router.post('/confirmation/sr09-confirmation', function(req, res) {
  res.redirect('sr09-receipt')
})

module.exports = router