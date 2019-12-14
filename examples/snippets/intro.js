const result = await User
    // example mongoose query
    .find({ age: { $gte: 18 } })
    // turn the Promise into a Conglo AsyncIterable
    .toPipeline()
    // perform async mapping on it
    .map(async ({ id, age }) => ({
        age,
        // assume that an array of strings is returned, e.g. [ 'apple', 'pear' ]
        favoriteFruits: await fetchFromRestApi(`/user/${id}/favorite-fruits`)
    }))
    // filter out everybody who doesn't like orange
    .filter(({ favoriteFruits }) => favoriteFruits.includes('orange'))
    // calculate the rest's average age
    .average(({ age }) => age)

console.log('the average age of adult orange lovers is:', result)