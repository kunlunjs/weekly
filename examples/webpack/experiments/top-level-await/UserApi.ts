import { dbCall } from './db-connection'

export const createUser = async name => {
  const command = `CREATE USER ${name}`
  // This is a normal await, because it's in an async function
  await dbCall({ command })
}
