/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Dialog, Problem} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', level: '1'}),
    User.create({email: 'murphy@email.com', password: '123', level: '1'})
  ])

  const dialogs = await Promise.all([
    Dialog.create({content: 'Yay! You Passed!', category: 'success'}),
    Dialog.create({content: "That's not the right answer", category: 'failure'}),
    Dialog.create({content: "Try using some nodes and stuff"}),
    Dialog.create({content: "You're inside a computer and boy is everything scary", category: 'story'})
  ])

  const problems = await Promise.all([
    Problem.create({name: "Make a linked list", prompt: 'Make a singly linked list. You should be able to add and remove nodes from it', level: 11, progress: null})
    Problem.create({name: "Remove the kth from last node", prompt: 'Oh no! The third  node is corrupted. Remove it.', level: 12, progress: null})
  ])


  console.log(`seeded ${users.length} users`)
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
