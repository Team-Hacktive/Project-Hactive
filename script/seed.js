const db = require('../server/db')
const {User, Dialog, Problem} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const problems = await Promise.all([
    Problem.create({name: 'Make a linked list', prompt: 'Make a singly linked list. You should be able to add and remove nodes from it', level: 1, problemNumber: 1}),
    Problem.create({name: 'Remove the kth from last node', prompt: 'Oh no! The third node is corrupted. Remove it.', level: 1, problemNumber: 2})
  ])

  const dialogs = await Promise.all([
    Dialog.create({content: 'Yay! You Passed!', category: 'success'}).then(dialog => dialog.setProblem(problems[0])),
    Dialog.create({content: "That's not the right answer", category: 'failure'}).then(dialog => dialog.setProblem(problems[0])),
    Dialog.create({content: 'Try using some nodes and stuff', category: 'hint'}).then(dialog => dialog.setProblem(problems[0])),
    Dialog.create({content: "You're inside a computer and boy is everything scary", category: 'story'}).then(dialog => dialog.setProblem(problems[0]))
  ])

  const associations = await Promise.all([
    users[0].addProblem(problems[0])
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${problems.length} problems`)
  console.log(`seeded ${dialogs.length} dialogs`)
  console.log(`seeded ${associations.length} associations`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
