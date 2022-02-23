const express = require('express')
const router = express.Router()
const fs = require("fs");
// const methodOverride = require("method-override");



// app.use(methodOverride("_method"));
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

  res.render("../views/dinosaurs/index.ejs", { myDinos: dinoData });
});

// //new route(render the new dino form)
router.get('/new',(req,res)=>{
  res.render('../views/dinosaurs/new.ejs')
})


router.get('/edit/:idx',(req, res) =>{
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //extract the dino corresponding to the idx param
  let dinoIndex = req.params.idx
  let targetDino = dinoData[dinoIndex]
  res.render('../views/dinosaurs/edit.ejs',{dino: targetDino, dinoId: dinoIndex})
})

//show ie show all infor about a single info
// : indicates that the following is a url param
router.get('/:idx', (req, res)=> {
  //read in the dinos from the db
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //extract the dino corresponding to the idx param
  let dinoIndex = req.params.idx
  let targetDino = dinoData[dinoIndex]
  res.render('../controllers/dinoController.js/show.ejs', {dino: targetDino})
  console.log(targetDino)
})

//put route
router.put('/:idx',(req,res)=>{
  // console.log(`you\'ve put the route for editing dino with index of ${req.params.idx}`)
  //read in our existing dino data
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //replace dino fields with field from form
  dinoData[req.params.idx].name= req.body.name
  dinoData[req.params.idx].type= req.body.type
  //write the updated array back to the jsonfile
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  //once the dinosaur has been edited, do a get request to the index route
  res.redirect('/dinosaurs')
})

router.post('/', (req,res)=>{
  //read in our dino data from the json file
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //add new dino to dinoData array
  dinoData.push(req.body)
  //save the dinosaurs to the json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
  //redirect back to the index route
  //res.redirect takes the rl patterm for the get route that you want to run next
  res.redirect('/dinosaurs')
})

router.delete("/:idx", (req, res) => {
  // console.log(`youre trying to delete dino #${req.params.idx}`)
  //read in our dinos from our json files
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  //remove deleted dino from dinoData
  dinoData.splice(req.params.idx, 1);
  //
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  res.redirect("/dinosaurs");
});

module.exports=router