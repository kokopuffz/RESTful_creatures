const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
  //read in the array from dinosaur.json
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  console.log(req.query);

  //grabbing query name from the url
  let nameFilter = req.query.nameFilter;
  //if there IS a query,
  if (nameFilter) {
    //filter out all dino who dont have the queried name
    dinoData = dinoData.filter((dino) => {
      return dino.name.toLowerCase() === nameFilter.toLowerCase();
    });
  }

  res.render("index.ejs", { myDinos: dinoData });
});

//new route(render the new dino form)
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.get("/edit/:idx", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //extract the dino corresponding to the idx param
  let dinoIndex = req.params.idx;
  let targetDino = dinoData[dinoIndex];
  res.render("edit.ejs", { dino: targetDino });
});

//show ie show all infor about a single info
// : indicates that the following is a url param
router.get("/:idx", (req, res) => {
  //read in the dinos from the db
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //extract the dino corresponding to the idx param
  let dinoIndex = req.params.idx;
  let targetDino = dinoData[dinoIndex];
  res.render("show.ejs", { dino: targetDino });
  console.log(targetDino);
});

router.post("/dinosaurs", (req, res) => {
  //read in our dino data from the json file
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //add new dino to dinoData array
  dinoData.push(req.body);
  //save the dinosaurs to the json file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  //redirect back to the index route
  //res.redirect takes the rl patterm for the get route that you want to run next
  res.redirect("/dinosaurs");
});

module.exports=router