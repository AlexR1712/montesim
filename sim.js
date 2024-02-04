// Import the necessary libraries.
const math = require('mathjs');

// Define the Monte Carlo simulation function.
const monteCarloSimulation = (tasks) => {
  // Initialize the results object.
  const results = {
    medianCost: 0,
    standardDeviationCost: 0,
    minimumCost: Infinity,
    maximumCost: -Infinity,
    medianTime: 0,
    standardDeviationTime: 0,
    minimumTime: Infinity,
    maximumTime: -Infinity,
    list: [],
  };

  // Run the simulation 10000 times.
  for (let i = 0; i < 10000; i++) {
    // Generate a random time for each task.
    const randomTimes = tasks.map((task) => {
      // Generate a random number between the minimum and maximum time.
      const randomTime = math.randomInt(task.min, task.max + 1);

      // Adjust the random time based on the confidence value.
      const adjustedTime = randomTime * task.confidence;

      // Return the adjusted time.
      return adjustedTime;
    });

    const costRandomTimes = randomTimes.map((time, index) => time * tasks[index].cost);

    // Calculate the total time and cost.
    const totalTime = math.sum(randomTimes);
    const totalCost = math.sum(randomTimes.map((time, index) => time * tasks[index].cost));

    // Update the results object.
    results.medianCost = math.median(costRandomTimes);
    results.standardDeviationCost = math.std(costRandomTimes);
    results.minimumCost = math.min(results.minimumCost, totalCost);
    results.maximumCost = math.max(results.maximumCost, totalCost);
    results.medianTime = math.median(randomTimes);
    results.standardDeviationTime = math.std(randomTimes);
    results.minimumTime = math.min(results.minimumTime, totalTime);
    results.maximumTime = math.max(results.maximumTime, totalTime);

    // Add the simulation run to the list.
    results.list.push({
      totalTime: totalTime,
      totalCost: totalCost,
      randomTimes: randomTimes,
    });
  }

  // Return the results object.
  return results;
};

  const tasks = [
    {
      name: 'Task 1',
      min: 10,
      max: 20,
      confidence: 0.8,
      cost: 0.5,
    },
    {
      name: 'Task 2',
      min: 15,
      max: 25,
      confidence: 0.9,
      cost: 0.6,
    }
  ]
// Run the simulation.
const results = monteCarloSimulation(tasks);

// Log the results.
console.log(results);