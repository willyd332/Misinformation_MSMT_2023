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



// Get the URL params
let augusto = "${e://Field/agnostic_augusto_url}".split("/")
let jordy = "${e://Field/agnostic_jordy_url}".split("/")
let kicis = "${e://Field/agnostic_kicis_url}".split("/")
let melo = "${e://Field/agnostic_melo_url}".split("/")
let martins = "${e://Field/agnostic_martins_url}".split("/")
augusto = augusto[3].split(".")[0] + "-cropped"
jordy = jordy[3].split(".")[0] + "-cropped"
kicis = kicis[3].split(".")[0] + "-cropped"
melo = melo[3].split(".")[0] + "-cropped"
martins = martins[3].split(".")[0] + "-cropped"
let qualtricsId = "${e://Field/ResponseID}"
const server_name = "http://localhost:8080/"
const access_code = "466049"
const params = "?url1=" + augusto + "&url2=" + jordy + "&url3=" + kicis + "&url4=" + melo + "&url5=" + martins + "&userid=" + qualtricsId
const MSMT_url = server_name + access_code + params

console.log(MSMT_url)


const iframe = document.getElementById('msmt_iframe');
iframe.src = MSMT_url; 


// Example Response ID: R_3e5p3N9HduTE88B
