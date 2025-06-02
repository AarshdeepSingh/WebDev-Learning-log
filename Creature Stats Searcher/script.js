
const searchInput = document.getElementById('search-input');

const searchBtn = document.getElementById('search-button');

const creatureContainer = document.getElementById('creature-container');

const allCreaturesUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";

let creatureUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/"

let allCreatures = []
let creatureStats = {}

const fetchData = async () => {
  
  try {
    const res = await fetch(allCreaturesUrl);
    const data = await res.json();
    allCreatures = data
  } catch(err) {
      console.log(err)
  }
}

fetchData();


searchBtn.addEventListener("click", async () => {
  creatureUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";
  const creatureName = searchInput.value.trim().toLowerCase()
  
  const checkForName = allCreatures.find((creature) => creature.name.toLowerCase() === creatureName || creature.id.toString() === creatureName)


  if(!checkForName) {
    alert("Creature not Found.")
  }
  else { 
    
      creatureUrl += `${creatureName}`

      const getStats = async () => {
        try {
      const res = await fetch(creatureUrl)
      const data = await res.json()
      return data
      }
    catch (err) {
      console.log(err)
    }
  }
  const data = await getStats();
  creatureStats = data

  const showStats = (stat) => {
  const {id,
        name,
        weight,
        height,
        special,
        stats,
        types} = stat

  
  
  creatureContainer.innerHTML = `
  <div class = "creature-info">
    <h2>${name}</h2>
     <p><Strong>CreatureDex No:</strong> #${id}</p>
   
  </div>
  <div>
    <p><Strong>Weight:</strong> ${weight} kg's</p>
    <p><Strong>height:</strong> ${height} inch's</p>
    <p><p>
  ${types.map(t => `<span class="type-badge type-${t.name}">${t.name}</span>`).join(" ")}
</p>
</p>
  </div>
  <div>
    <h3>${special.name}</h3>
    <p>${special.description}</p>
  </div>

<table>
  <tr>
    <th><strong>Base</strong></th>
    <th><strong>Stats</strong></th>
  </tr>
 ${stats.map(stat => `
  <tr>
    <td>${stat.name}</td>
    <td>
      <div class="stat-bar">
        <div class="stat-bar-fill" style="width: ${stat.base_stat}%;"></div>
      </div>
    </td>
  </tr>
`).join("")}


</table>
  `
  }
  showStats(creatureStats);
}
});
