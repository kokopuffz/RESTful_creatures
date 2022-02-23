//import packages
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride =require('method-override')

//create an instance of express
const app = express()

//middleware-------------------------------
//tell express to use ejs as the view engine
app.set('view engine', 'ejs')
//tell express that we're using ejs  layouts
app.use(ejsLayouts)

app.use(express.static('public'))
//method override configuration
app.use(methodOverride('_method'))
//body-parser middleware
//this allows us to access form data via req.body
app.use(express.urlencoded({extended: false}))


// app.use('/creatures',require('./controllers/creatureController.js'))

//routes
//home
app.get('/', (req,res)=>{
  res.send('yo, dinos')
})


app.use("/dinosaurs", require("./controllers/dinoController.js"));
app.use(
  "/prehistoric_creatures",
  require("./controllers/creatureController.js")
);

app.listen(8000, () => {
  console.log(`dino crud time 🦖`);
});

// app.use("/dinosaurs", require("./dinoController.js"));

// //index ie list of all the dinos!
// app.get('/dinosaurs', (req,res) =>{
  //   //read in the array from dinosaur.json
//   let dinosaurs = fs.readFileSync('./dinosaurs.json')
//   let dinoData = JSON.parse(dinosaurs)
//   console.log(req.query)

//grabbing query name from the url
//   let nameFilter=req.query.nameFilter
//   //if there IS a query,
//   if(nameFilter){
  //     //filter out all dino who dont have the queried name
  //     dinoData = dinoData.filter(dino=>{
    
    //       return dino.name.toLowerCase() === nameFilter.toLowerCase()
    //     })
    //   }

    //   res.render('index.ejs', {myDinos: dinoData})
// })

// //new route(render the new dino form)

//   res.render('new.ejs')
// })


// app.get('/dinosaurs/edit/:idx',(req, res) =>{
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   //extract the dino corresponding to the idx param
//   let dinoIndex = req.params.idx
//   let targetDino = dinoData[dinoIndex]
//   res.render('edit.ejs',{dino: targetDino, dinoId: dinoIndex})
// })

// //show ie show all infor about a single info
// // : indicates that the following is a url param
// app.get('/dinosaurs/:idx', (req, res)=> {
//   //read in the dinos from the db
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   //extract the dino corresponding to the idx param
//   let dinoIndex = req.params.idx
//   let targetDino = dinoData[dinoIndex]
//   res.render('show.ejs', {dino: targetDino})
//   console.log(targetDino)
// })

// //put route
// app.put('/dinosaurs/:idx',(req,res)=>{
//   // console.log(`you\'ve put the route for editing dino with index of ${req.params.idx}`)
//   //read in our existing dino data
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   //replace dino fields with field from form
//   dinoData[req.params.idx].name= req.body.name
//   dinoData[req.params.idx].type= req.body.type
//   //write the updated array back to the jsonfile
//   fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
//   //once the dinosaur has been edited, do a get request to the index route
//   res.redirect('/dinosaurs')
// })

// app.post('/dinosaurs', (req,res)=>{
//   //read in our dino data from the json file
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   //add new dino to dinoData array
//   dinoData.push(req.body)
//   //save the dinosaurs to the json file
//   fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//   //redirect back to the index route
//   //res.redirect takes the rl patterm for the get route that you want to run next
//   res.redirect('/dinosaurs')
// })

// app.get('/prehistoric_creatures', (req,res) =>{
//   let creatures = fs.readFileSync("./prehistoric_creatures.json");
//   let creaturesData = JSON.parse(creatures);
//   res.render('creatures.ejs', {creatures: creaturesData})
// })


// app.get('/prehistoric_creatures/new', (req,res)=>{
//   res.render('newCreatures')
// })

// app.post('/prehistoric_creatures',(req, res)=>{
//   let creatures = fs.readFileSync("./prehistoric_creatures.json");
//   let creaturesData = JSON.parse(creatures);

//   creaturesData.push(req.body)

//   fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
//   res.redirect('/prehistoric_creatures')
// })




// app.get("/prehistoric_creatures/:idx", (req, res) => {
//   let creatures = fs.readFileSync("./prehistoric_creatures.json");
//   let creaturesData = JSON.parse(creatures);
  
//   let creatureidx=req.params.idx
//   let targetCreature = creaturesData[creatureidx]

//   res.render('showCreature', {tCreatures: targetCreature})

// });

// app.delete('/dinosaurs/:idx', (req,res)=>{
//   // console.log(`youre trying to delete dino #${req.params.idx}`)
//   //read in our dinos from our json files
//   let dinosaurs = fs.readFileSync("./dinosaurs.json");
//   let dinoData = JSON.parse(dinosaurs);
//   //remove deleted dino from dinoData
//   dinoData.splice(req.params.idx, 1)
//   //
//   fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
//   res.redirect('/dinosaurs')
// })

// app.get('/dinosaurs/new',(req,res)=>{
