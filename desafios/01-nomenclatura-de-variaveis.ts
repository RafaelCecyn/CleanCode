// Nomenclatura de variáveis

const listOfUsersCategoryByFollowers = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const responseOfGithubUsername = await fetch(`https://api.github.com/users/${github}`);

  if (responseOfGithubUsername.status === 404) {
    return res.status(400).json({
      message: `User with username "${responseOfGithubUsername}" not found`
    })
  }

  const dataOfGithubUsername = await responseOfGithubUsername.json()

  const orderList = listOfUsersCategoryByFollowers.sort((a, b) =>  b.followers - a.followers); 

  const categoryByFollowers = orderList.find(i => dataOfGithubUsername.followers > i.followers)

  const result = {
    responseOfGithubUsername,
    category: categoryByFollowers.title
  }

  return result
}

getData({ query: {
  username: 'josepholiveira'
}}, {})