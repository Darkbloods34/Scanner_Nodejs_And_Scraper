const fs = require('fs');
const readline = require('readline');

const searchEmail = 'lucas.beressi34@gmail.com';
const filePath = 'wordlist/157K FR COMBO.txt';

async function searchInFile() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    console: false
  });

  for await (const line of readInterface) {
    if (line.includes(searchEmail)) {
      console.log(`Adresse e-mail trouvée : ${searchEmail}`);
    }
  }

  console.log('Fin de la recherche.');
}

searchInFile();
