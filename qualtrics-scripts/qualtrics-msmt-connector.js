  // ?url1=&url2=&url3=&url4=&url5=
  // agnostic-augusto-1
  // agnostic-augusto-10
  // agnostic-augusto-11
  // agnostic-augusto-12
  // agnostic-augusto-13
  // Full auto URL
    // http://localhost:8080/{MSMTID}?url1=agnostic-augusto-1&url2=agnostic-augusto-10&url3=agnostic-augusto-11&url4=agnostic-augusto-12&url5=agnostic-augusto-13&userid=R_3e5p3N9HduTE88B
  // ?url1=agnostic-augusto-1&url2=agnostic-augusto-10&url3=agnostic-augusto-11&url4=agnostic-augusto-12&url5=agnostic-augusto-13&userid=123456
    // Also add qualtrics ID and inject it into the Auth-Box
  // Ultimately it all goes into DynamicMedia.jsx



// PSUEDO-CODE
  // Generate a link in Qualtics with
    // All five images urls in order
    // The Qulatrics ID
  
  // Use that link to create the iFrame


// Get the URL params

let augusto = "${e://Field/agnostic_augusto_url}".split("/")
let jordy = "${e://Field/agnostic_jordy_url}".split("/")
let kicis = "${e://Field/agnostic_kicis_url}".split("/")
let melo = "${e://Field/agnostic_melo_url}".split("/")
let martins = "${e://Field/agnostic_martins_url}".split("/")
augusto = augusto[3].split(".")[0]
jordy = jordy[3].split(".")[0]
kicis = kicis[3].split(".")[0]
melo = melo[3].split(".")[0]
martins = martins[3].split(".")[0]

// Example Response ID: R_3e5p3N9HduTE88B
