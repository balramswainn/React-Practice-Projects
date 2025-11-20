exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", currentPage: "404" });
};



// ✅ MVC basically ek folder structure + code organization pattern hai.

// M (Model) → data & database logic
// V (View) → UI templates
// C (Controller) → request–response logic

// Bas is pattern me project ko organize karne se code clean, readable, aur maintainable hota hai.


// app.js -> server create hogi and isme sab routes rahange (store -> for user , host -> for admin) dono k liye alag 
// routes -> storeRoutes , hostRoutes -> yaha bas routing handle hogi
// controller -> storeController , hostController -> yaha middleware likhenge and view se pages kese link kare routes se and usse routes me bhej denge
// models -> main logic ki db se data fetch and send kese kare


//flow -> mene form bhara jese hi submit kiya 
// 1. MVC architecture
// post req se routes se controller k pass and url se req.body se usko sab form detail object me->app.use(express.urlencoded()); iske wajah se object me  mil gayi destructure karliya usse and usse new instance create kiya constructor me home me object ban gaya fhir home.save() call kiya jo jaega model me yaha kaha hume ye object dalna hai file k andhr dalna hai but pehleka data bhi toh chahiye woh array me ye object push bhi toh karna hai isliye pehle fetchAll kiya ki woh existing array data mil jaye fhir fetch me humne likha hai file mili toh usme data parse karke dede and if nhimili toh muje bas empty array dedena -> save() me woh empty array me jo object hume mila usse push kardiya and "homes.json" file create karke usme stringify karke push kardiya so jab bhi data aaega ye cycle chalega fetch se existing data lo usse save() se file me push kardo ek baar file banegi next time se bas Wo existing file overwrite kar deta hai

//2 . Dynamic paths :

    // 1. Add home -> pe click kiya get req pe render hua edit-home page ( editing : false diya cuz we wanted input empty )
    // 2. Add home me submit karega details toh - post req - pe jaega sab data url se lelenge and contructor -> object and  save()
    //     home.save()  me -> fetchAll call karke array leke aaya array me new object me  id deke push kardiya
    //     writeFile me data stringify karke dal diya
    //     redirect kardiya host-home-list pe

    // 1. Host homes -> pe click kiya get req pe render hua host-home-list pe
    // 2. Host home -> pe edit click kiya toh get req pe render karna hai but before that we need to check kis object pe hume changes karne hai so for that id liya url se and call kiya Home.findById() ye id leke match karke array me dhund ke woh object dega hume and fhir hum render karenge host/edit-home and usme home:home karke pura new object pass kar denge and editing : true hojaegi bcz url me value hai and iske true hone se hume input me value show hogi jise hum value edit kar paenge. isme hum ek extra input hai jo hide karke rakha hai woh hai id ka bcz jab hum value ko baadme update karenge toh woh id ki value bhi post req pe chali jaye jisse hum uss id se home.js me pure array value me object dhudn paye and replace kar ppaye 

    // 3. edit-home -> pe update home pe click karte hi post req - pe jaega sab data url se lelenge and contructor -> object and
    //     home._id =id  object me id dediya ye id aya hai post req k url pe aghe kaam aega dhudn k replace karne k 
    //     home.save()  me -> fetchAll call karke array leke aaya fhir usse array ko map kiya and usme jo id hai woh match kar rhi hai humare object ki id se toh pura object replace karde.
    //     redirect kardiya host-home-list pe

    //4 . edit-home -> delete pe click karte hi post req - pe jaega then id url se lelenge and  Home.deleteById() call karenge jo ki id leke pura object delete karta hai  Home.deleteById me usse filter karke uss id ko nikalna hoga and fhir new writeFile karke......... homes.json rewrite ho jaega 


//  3. MongoDB  
//  1. databaseUtils.js bana usme hum mongo package load karke hume atlas cluster k connection string se connect karna hai jisse hume db ka access milega _db but usse pehle hum mongoconnect ko callback pass karna jo hoga app.listen bcz Server tabhi start hota hai jab Mongo connection successfully ho chuka hota hai. server start hone se pehle call karte hai bcz nhi kiya toh error aaega and baadme call kare toh Server early requests ko handle nahi kar paayega 


// 1. so jab home.save() hoga sab db me insert ho jaengi and MongoDB khud hi automatically _id generate karta hai, aur woh ObjectId type ka hota hai. 
// 2. 
    

