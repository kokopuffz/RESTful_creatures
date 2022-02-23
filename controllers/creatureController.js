const express = require('express')
const router = express.Router()
const fs = require('fs')


router.get('/', (req,res) =>{
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creaturesData = JSON.parse(creatures);

  let nameFilter=req.query.nameFilter
  if (nameFilter){
    creaturesData= creaturesData.filter((creature) => {
      return creature.type.toLowerCase() === nameFilter.toLowerCase()
    })
  }
  res.render('../views/creatures/indexC.ejs', {creatures: creaturesData})
})

router.get('/new', (req,res)=>{
  res.render('../views/creatures/newCreatures.ejs')
})

//!
router.get('/edit/:idx',(req,res)=>{
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creaturesData = JSON.parse(creatures);

  console.log(req.params)
  let creatureidx = req.params.idx;

  let targetCreature = creaturesData[creatureidx];

  console.log( creatureidx)
  res.render('../views/creatures/editC.ejs', {creature: targetCreature, creatureId: creatureidx})
})

router.get("/:idx", (req, res) => {
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creaturesData = JSON.parse(creatures);
  
  let creatureidx=req.params.idx
  let targetCreature = creaturesData[creatureidx]
  
  res.render('../views/creatures/showCreature.ejs', {tCreatures: targetCreature})
  // console.log(targetCreature)
  
});

router.put("/:idx", (req, res) => {
  console.log(
    `you\'ve put the route for editing creatures with index of ${req.params.idx}`
  );

  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creaturesData = JSON.parse(creatures);
  
  creaturesData[req.params.idx].type = req.body.type
  creaturesData[req.params.idx].img_url = req.body.img_url

  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(creaturesData)
  );
  res.redirect("/prehistoric_creatures");
});

router.post('/',(req, res)=>{
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creaturesData = JSON.parse(creatures);
// console.log(req.body)
  creaturesData.push(req.body)

  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
  res.redirect('/prehistoric_creatures')
})

router.delete('/:idx',(req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json");
    let creaturesData = JSON.parse(creatures);
    // console.log(req.body)
    creaturesData.splice(req.params.idx, 1);

    fs.writeFileSync(
      "./prehistoric_creatures.json",
      JSON.stringify(creaturesData)
    );
    res.redirect("/prehistoric_creatures");
})


module.exports=router