exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", currentPage: "404" });
};









//flow -> mene form bhara jese hi submit kiya 
// 1. MVC architecture
// post req se routes se controller k pass and url se req.body se usko sab form detail object me->app.use(express.urlencoded()); iske wajah se object me  mil gayi destructure karliya usse and usse new instance create kiya constructor me home me object ban gaya fhir home.save() call kiya jo jaega model me yaha kaha hume ye object dalna hai file k andhr dalna hai but pehleka data bhi toh chahiye woh array me ye object push bhi toh karna hai isliye pehle fetchAll kiya ki woh existing array data mil jaye fhir fetch me humne likha hai file mili toh usme data parse karke dede and if nhimili toh muje bas empty array dedena -> save() me woh empty array me jo object hume mila usse push kardiya and "homes.json" file create karke usme stringify karke push kardiya so jab bhi data aaega ye cycle chalega fetch se existing data lo usse save() se file me push kardo ek baar file banegi next time se bas Wo existing file overwrite kar deta hai

//2 . Dynamic paths :
    // unique id banaya -> ek button me detail dalidya jo hume 
