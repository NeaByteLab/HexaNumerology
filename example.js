/**
 * This is an example file showing how to use the HexaNumerology class.
 */
const HexaNumerology = require('./src/index')

// Example 1: Generate a report for a person in Indonesian language
const indoGenerator = new HexaNumerology('Budi Santoso', '18-04-1980', 'id')
console.log('--- Indonesian Report ---')
console.log(indoGenerator.generateDetailedReport())

// Example 2: Generate a report for a person in English language
const englishGenerator = new HexaNumerology('Olivia Chen', '25-10-1995', 'en')
console.log('\n--- English Report ---')
console.log(englishGenerator.generateDetailedReport())

// Example 3: Demonstrate a Master Number (Life Path 11)
const masterNumberGenerator = new HexaNumerology('Michael Jordan', '17-02-1963', 'en')
console.log('\n--- Master Number Report (17-02-1963) ---')
console.log(masterNumberGenerator.generateDetailedReport())

// Example 4: Demonstrate a Life Path 22
const pathTwentyTwoGenerator = new HexaNumerology('Bill Gates', '28-10-1955', 'en')
console.log('\n--- Life Path 22 Report (28-10-1955) ---')
console.log(pathTwentyTwoGenerator.generateDetailedReport())