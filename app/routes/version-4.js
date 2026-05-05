const router = require('express').Router()

// Categories page 1
router.get('/', function(req, res) {
  req.session.data = {}
  res.render('version-4-male-breast-journey/index')
})

// Categories page 2
router.get('/categories-2', function(req, res) {
  res.render('version-4-male-breast-journey/categories-2')
})

// Start page
router.get('/start', function(req, res) {
  res.render('version-4-male-breast-journey/start')
})

// Q1
router.get('/pathway-questions/q1', function(req, res) {
  res.render('version-4-male-breast-journey/pathway-questions/q1')
})

router.post('/pathway-questions/q1', function(req, res) {
  res.redirect('breast-male-interrupt')
})

// Breast male interrupt
router.get('/pathway-questions/breast-male-interrupt', function(req, res) {
  req.session.data = {}
  res.render('version-4-male-breast-journey/pathway-questions/breast-male-interrupt')
})

// Q2 - breast pain
router.get('/pathway-questions/q2', function(req, res) {
  res.render('version-4-male-breast-journey/pathway-questions/q2')
})

router.post('/pathway-questions/q2', function(req, res) {
  res.redirect('/version-4/pathway-questions/q3')
})

// Q3 - nipple discharge
router.get('/pathway-questions/q3', function(req, res) {
  res.render('version-4-male-breast-journey/pathway-questions/q3')
})

router.post('/pathway-questions/q3', function(req, res) {
  res.redirect('/version-4/pathway-questions/q4')
})

// Q4 - lumps
router.get('/pathway-questions/q4', function(req, res) {
  res.render('version-4-male-breast-journey/pathway-questions/q4')
})

router.post('/pathway-questions/q4', function(req, res) {
  res.redirect('/version-4/pathway-questions/check-eligibility')
})

// Check eligibility
router.get('/pathway-questions/check-eligibility', function(req, res) {
  res.render('version-4-male-breast-journey/pathway-questions/check-eligibility')
})

router.post('/pathway-questions/check-eligibility', function(req, res) {
  res.redirect('/version-4/outcome/get-appointment')
})

// Outcome - get appointment
router.get('/outcome/get-appointment', function(req, res) {
  res.render('version-4-male-breast-journey/outcome/get-appointment')
})

router.post('/outcome/get-appointment', function(req, res) {
  res.redirect('/version-4/personal-details/sr02-name')
})

// Personal details - name
router.get('/personal-details/sr02-name', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr02-name')
})

router.post('/personal-details/sr02-name', function(req, res) {
  res.redirect('sr03-dob')
})

// Personal details - DOB
router.get('/personal-details/sr03-dob', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr03-dob')
})

router.post('/personal-details/sr03-dob', function(req, res) {
  res.redirect('sr04-contact')
})

// Personal details - contact method
router.get('/personal-details/sr04-contact', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr04-contact')
})

router.post('/personal-details/sr04-contact', function(req, res) {
  let contactMethod = req.session.data['contact-method']
  if (contactMethod === 'cannot-speak') {
    res.redirect('sr05-email')
  } else {
    res.redirect('sr05-phone')
  }
})

// Personal details - phone
router.get('/personal-details/sr05-phone', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr05-phone')
})

router.post('/personal-details/sr05-phone', function(req, res) {
  res.redirect('sr06-discreet')
})

// Personal details - email
router.get('/personal-details/sr05-email', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr05-email')
})

router.post('/personal-details/sr05-email', function(req, res) {
  res.redirect('sr07-interpreter')
})

// Personal details - discreet
router.get('/personal-details/sr06-discreet', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr06-discreet')
})

router.post('/personal-details/sr06-discreet', function(req, res) {
  res.redirect('sr07-interpreter')
})

// Personal details - interpreter
router.get('/personal-details/sr07-interpreter', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr07-interpreter')
})

router.post('/personal-details/sr07-interpreter', function(req, res) {
  res.redirect('sr08-gp')
})

// Personal details - GP registered
router.get('/personal-details/sr08-gp', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr08-gp')
})

router.post('/personal-details/sr08-gp', function(req, res) {
  res.redirect('sr09-tell-us-more')
})

// Personal details - tell us more
router.get('/personal-details/sr09-tell-us-more', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr09-tell-us-more')
})

router.post('/personal-details/sr09-tell-us-more', function(req, res) {
  res.redirect('sr10-cancer')
})

// Personal details - cancer diagnosis
router.get('/personal-details/sr10-cancer', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr10-cancer')
})

router.post('/personal-details/sr10-cancer', function(req, res) {
  res.redirect('sr11-family-immediate')
})

// Personal details - family immediate
router.get('/personal-details/sr11-family-immediate', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr11-family-immediate')
})

router.post('/personal-details/sr11-family-immediate', function(req, res) {
  res.redirect('sr12-family-other')
})

// Personal details - family other
router.get('/personal-details/sr12-family-other', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr12-family-other')
})

router.post('/personal-details/sr12-family-other', function(req, res) {
  res.redirect('sr13-anaesthetic')
})

// Personal details - anaesthetic
router.get('/personal-details/sr13-anaesthetic', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr13-anaesthetic')
})

router.post('/personal-details/sr13-anaesthetic', function(req, res) {
  res.redirect('sr14-blood-thinning')
})

// Personal details - blood thinning
router.get('/personal-details/sr14-blood-thinning', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr14-blood-thinning')
})

router.post('/personal-details/sr14-blood-thinning', function(req, res) {
  res.redirect('sr15-mobility')
})

// Personal details - mobility
router.get('/personal-details/sr15-mobility', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr15-mobility')
})

router.post('/personal-details/sr15-mobility', function(req, res) {
  res.redirect('sr16-check-details')
})

// Personal details - check details
router.get('/personal-details/sr16-check-details', function(req, res) {
  res.render('version-4-male-breast-journey/personal-details/sr16-check-details')
})

router.post('/personal-details/sr16-check-details', function(req, res) {
  let date = new Date()
  let workingDays = 0
  while (workingDays < 5) {
    date.setDate(date.getDate() + 1)
    let day = date.getDay()
    if (day !== 0 && day !== 6) {
      workingDays++
    }
  }
  let options = { day: 'numeric', month: 'long', year: 'numeric' }
  req.session.data['fiveWorkingDays'] = date.toLocaleDateString('en-GB', options)
  res.redirect('/version-4/confirmation/sr17-confirmation')
})

// Confirmation
router.get('/confirmation/sr17-confirmation', function(req, res) {
  res.render('version-4-male-breast-journey/confirmation/sr17-confirmation')
})

// Confirmation receipt
router.get('/confirmation/sr17-receipt', function(req, res) {
  res.render('version-4-male-breast-journey/confirmation/sr17-receipt')
})

module.exports = router