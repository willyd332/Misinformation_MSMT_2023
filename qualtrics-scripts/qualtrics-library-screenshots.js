// Naming Conventions
  // Level
    // agnostic
    // policy
  // Person
    // augusto
    // jordy
    // kicis
    // martins
    // melo
  // Number
    // 1-30 (for agnostic)
    // 1-3 (for policy)


    const this_base_url = "https://d2ir49bmk9o0n1.cloudfront.net/"

    const generate_agnostic_urls = (base_url) => {
        // Randomize the results
        const augusto_img_number = Math.ceil(Math.random() * 30);
        const jordy_img_number = Math.ceil(Math.random() * 30);
        const kicis_img_number = Math.ceil(Math.random() * 30);
        const melo_img_number = Math.ceil(Math.random() * 30);
        const martins_img_number = Math.ceil(Math.random() * 30);
        // Build the url
        let augusto_url = base_url + "agnostic-augusto" + "-" + augusto_img_number + ".png";
        let jordy_url = base_url + "agnostic-jordy" + "-" + jordy_img_number + ".png";
        let kicis_url = base_url + "agnostic-kicis" + "-" + kicis_img_number + ".png";
        let melo_url = base_url + "agnostic-melo" + "-" + melo_img_number + ".png";
        let martins_url = base_url + "agnostic-martins" + "-" + martins_img_number + ".png";
        // Save embedded data (make sure to update in Qualtrics too)
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_augusto_img_number", augusto_img_number) // MSMT 101
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_jordy_img_number", jordy_img_number) // MSMT 102
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_kicis_img_number", kicis_img_number) // MSMT 103
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_melo_img_number", melo_img_number) // MSMT 104
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_martins_img_number", martins_img_number) // MSMT 105

        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_augusto_url", augusto_url)
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_jordy_url", jordy_url)
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_kicis_url", kicis_url)
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_melo_url", melo_url)
        Qualtrics.SurveyEngine.setEmbeddedData("agnostic_martins_url", martins_url)

        console.log("${e://Field/agnostic_augusto_url}")
        console.log("${e://Field/agnostic_jordy_url}")
        console.log("${e://Field/agnostic_kicis_url}")
        console.log("${e://Field/agnostic_melo_url}")
        console.log("${e://Field/agnostic_martins_url}")

        // Create output
        return {
          augusto: augusto_url, 
          jordy: jordy_url, 
          kicis: kicis_url, 
          melo: melo_url,
          martins: martins_url
        }
    }

    // Generate the urls
    const urls = generate_agnostic_urls(this_base_url)

    // Set values on the image elements
    const img_1 = document.getElementById('img_1');
    const img_2 = document.getElementById('img_2');
    const img_3 = document.getElementById('img_3');
    const img_4 = document.getElementById('img_4');
    const img_5 = document.getElementById('img_5');
    img_1.src = urls.augusto
    img_2.src = urls.jordy
    img_3.src = urls.kicis
    img_4.src = urls.melo
    img_5.src = urls.martins





/// POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW 
/// POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW
/// POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW 
/// POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW 
/// POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW POLICY BELOW 




    // const this_base_url = "https://d2ir49bmk9o0n1.cloudfront.net/"

    // const generate_agnostic_urls = (base_url) => {
    //     // Randomize the results
    //     const augusto_img_number = Math.ceil(Math.random() * 2);
    //     const jordy_img_number = Math.ceil(Math.random() * 3);
    //     const kicis_img_number = Math.ceil(Math.random() * 3);
    //     const melo_img_number = Math.ceil(Math.random() * 2);
    //     const martins_img_number = Math.ceil(Math.random() * 2);
    //     // Build the url
    //     let augusto_url = base_url + "policy-augusto" + "-" + augusto_img_number + ".png";
    //     let jordy_url = base_url + "policy-jordy" + "-" + jordy_img_number + ".png";
    //     let kicis_url = base_url + "policy-kicis" + "-" + kicis_img_number + ".png";
    //     let melo_url = base_url + "policy-melo" + "-" + melo_img_number + ".png";
    //     let martins_url = base_url + "policy-martins" + "-" + martins_img_number + ".png";
    //     // Save embedded data (make sure to update in Qualtrics too)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_augusto_img_number", augusto_img_number)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_jordy_img_number", jordy_img_number)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_kicis_img_number", kicis_img_number)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_melo_img_number", melo_img_number)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_martins_img_number", martins_img_number)

    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_augusto_url", augusto_url)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_jordy_url", jordy_url)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_kicis_url", kicis_url)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_melo_url", melo_url)
    //     Qualtrics.SurveyEngine.setEmbeddedData("policy_martins_url", martins_url)

    //     console.log("${e://Field/policy_augusto_url}")
    //     console.log("${e://Field/policy_jordy_url}")
    //     console.log("${e://Field/policy_kicis_url}")
    //     console.log("${e://Field/policy_melo_url}")
    //     console.log("${e://Field/policy_martins_url}")

    //     // Create output
    //     return {
    //       augusto: augusto_url, 
    //       jordy: jordy_url, 
    //       kicis: kicis_url, 
    //       melo: melo_url,
    //       martins: martins_url
    //     }
    // }

    // // Generate the urls
    // const urls = generate_agnostic_urls(this_base_url)

    // // Set values on the image elements
    // const img_1 = document.getElementById('img_1');
    // const img_2 = document.getElementById('img_2');
    // const img_3 = document.getElementById('img_3');
    // const img_4 = document.getElementById('img_4');
    // const img_5 = document.getElementById('img_5');
    // img_1.src = urls.augusto
    // img_2.src = urls.jordy
    // img_3.src = urls.kicis
    // img_4.src = urls.melo
    // img_5.src = urls.martins