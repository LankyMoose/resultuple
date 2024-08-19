const fs = require("node:fs")
const path = require("node:path")

// node setup -p beepboop -g LankyMoose -e rausten93@gmail.com

const args = process.argv.slice(2)

function getArgValue(...argsToMatch) {
  for (const arg of argsToMatch) {
    const index = args.indexOf(arg)
    if (index === -1) {
      continue
    }
    return args[index + 1]
  }
}

// prompt user for package name
const packageName = getArgValue("--package", "-p") // MY-PACKAGE
if (!packageName) {
  console.error("Please provide a package name")
  process.exit(1)
}

const myGithub = getArgValue("--github", "-g") // MY-GITHUB
if (!myGithub) {
  console.error("Please provide the github name (eg. LankyMoose)")
  process.exit(1)
}

const email = getArgValue("--email", "-e") // MY-EMAIL
if (!email) {
  console.error("Please provide an email address")
  process.exit(1)
}

const cwd = process.cwd()
//build up list of every file in cwd containing the text "test"
const files = fs
  .readdirSync(cwd, { withFileTypes: true })
  .filter((dirent) => dirent.isFile() && dirent.name !== "setup.js")

for (const file of files) {
  const filePath = path.join(cwd, file.name)
  const content = fs.readFileSync(filePath, "utf8")
  const updatedContent = content
    .replace(/MY-PACKAGE/g, packageName)
    .replace(/MY-GITHUB/g, myGithub)
    .replace(/MY-EMAIL/g, email)
  fs.writeFileSync(filePath, updatedContent)
}
