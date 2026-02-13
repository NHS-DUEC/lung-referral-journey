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

  // Check if all fields are filled
  if (!day || !month || !year) {
    res.redirect('sr03-dob?error=missing')
    return
  }

  // Convert to numbers
  let dayNum = parseInt(day, 10)
  let monthNum = parseInt(month, 10)
  let yearNum = parseInt(year, 10)

  // Check if they are valid numbers
  if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
    res.redirect('sr03-dob?error=invalid')
    return
  }

  // Check basic ranges
  if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12) {
    res.redirect('sr03-dob?error=invalid')
    return
  }

  // Check year is reasonable (not in future, not too old)
  let currentYear = new Date().getFullYear()
  if (yearNum > currentYear || yearNum < 1900) {
    res.redirect('sr03-dob?error=invalid')
    return
  }

  // Check if date actually exists (e.g. not 31 Feb)
  let testDate = new Date(yearNum, monthNum - 1, dayNum)
  if (testDate.getFullYear() !== yearNum || 
      testDate.getMonth() !== monthNum - 1 || 
      testDate.getDate() !== dayNum) {
    res.redirect('sr03-dob?error=invalid')
    return
  }

  // Check not in future
  if (testDate > new Date()) {
    res.redirect('sr03-dob?error=future')
    return
  }

  // All valid
  req.session.data['error'] = null
  res.redirect('sr04-phone')
})

// sr04-phone validation
router.post('/personal-details/sr04-phone', function(req, res) {
  let phone = req.session.data['TelephoneNumber']

  // Remove spaces, dashes, and brackets
  let cleanedPhone = phone ? phone.replace(/[\s\-\(\)]/g, '') : ''

  // Check if empty
  if (!cleanedPhone) {
    res.redirect('sr04-phone?error=missing')
    return
  }

  // UK phone number patterns:
  // Mobile: 07xxx xxxxxx (11 digits starting with 07)
  // Landline: 01xxx xxxxxx or 02x xxxx xxxx (10-11 digits starting with 01 or 02)
  // Also accept +44 or 0044 prefix
  
  let ukPhoneRegex = /^(?:(?:\+44|0044)[127]\d{8,9}|0[127]\d{8,9})$/

  if (!ukPhoneRegex.test(cleanedPhone)) {
    res.redirect('sr04-phone?error=invalid')
    return
  }

  req.session.data['error'] = null
  res.redirect('sr05-email')
})

// sr05-email (optional but validate format if provided)
router.post('/personal-details/sr05-email', function(req, res) {
  let email = req.session.data['EmailAddress']

  // If empty, that's fine - it's optional
  if (!email) {
    req.session.data['error'] = null
    res.redirect('sr06-home-postcode')
    return
  }

  // If provided, check it's a valid email format
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

  // Check if they selected an option
  if (!isHomePostcode) {
    res.redirect('sr06-home-postcode?error=select')
    return
  }

  // If they selected "No", validate the postcode
  if (isHomePostcode === 'no') {
    if (!homePostcode) {
      res.redirect('sr06-home-postcode?error=postcode-missing')
      return
    }

    // UK postcode regex
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
  // Clear any previous errors
  req.session.data['error'] = null
  
  // Redirect to smoker page
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
  
  if (interpreter === 'yes') {
    return res.redirect('language-selection')
  }
  
  res.redirect('sr08-check-details')
})

router.post('/personal-details/language-selection', function(req, res) {
  let language = req.session.data['language']

  if (!language) {
    req.session.data['error'] = 'language'
    return res.redirect('language-selection')
  }

  req.session.data['error'] = null
  res.redirect('sr08-check-details')
})

// sr08-check-details - redirect to acknowledgement page
router.post('/personal-details/sr08-check-details', function(req, res) {
  // Clear error AND reset acknowledgement checkbox for fresh start
  req.session.data['error'] = null
  req.session.data['acknowledgement'] = null
  res.redirect('../confirmation/sr08b-acknowledge-gp-3')
})

// sr08b-acknowledge-gp-3 - validate checkbox and redirect to confirmation
router.post('/confirmation/sr08b-acknowledge-gp-3', function(req, res) {
  let acknowledgement = req.session.data['acknowledgement']

  if (!acknowledgement) {
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