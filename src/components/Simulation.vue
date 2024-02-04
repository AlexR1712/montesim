
<template>
  <div class="navbar bg-base-100">
    <a class="btn btn-ghost text-xl">MONTESIM</a>
  </div>
  <div role="tablist" class="tabs tabs-lifted">
    <input type="radio" name="tabs" role="tab" class="tab" aria-label="Tabla" checked />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">

      <div class="p-10 w-full">
    <div class="flex mb-9">
      <div class="mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

      </div>
      <div>
        <h2 class="text-2xl font-bold">Datos de Simulación</h2>
        <p class="text-slate-500 text-sm">Agrega las tareas para simular</p>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table
      class="table"
      >
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Tarea
            </th>
            <th>
              Tiempo min.
            </th>
            <th>
              Tiempo max.
            </th>
            <th>
              Confianza (%)
            </th>
            <th>
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <td>
              {{ index + 1 }}
            </td>
            <td>
              <input
                v-model="task.name"
                type="text"
                class="input input-bordered w-full max-w-xs"
              />
            </td>
            <td>
              <input
                v-model="task.min"
                type="number"
                min="0"
                class="input input-bordered w-full max-w-xs"
              />
            </td>
            <td>
              <input
                v-model="task.max"
                min="0"
                type="number"
                class="input input-bordered w-full max-w-xs"
              />
            </td>
            <td>
              <input
                v-model="task.confidence"
                min="0"
                type="number"
                class="input input-bordered w-full max-w-xs"
              />
            </td>
            <td>
              <button @click="handleDeleteTask(index)" class="btn btn-circle btn-outline btn-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="divider"></div> 
    <div class="flex flex-wrap items-center justify-center gap-2">
      <button @click="handleRunSimulation()" class="btn btn-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
</svg>

        Iniciar Simulación
      </button>
<!--       <button @click="handleAddTask()" class="btn btn-warning">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
</svg>

        Importar
      </button> -->
      <button @click="handleAddTask()" class="btn btn-success">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Agregar Tarea
      </button>
      <button @click="clearTasks()" class="btn btn-error">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Limpiar
      </button>

    </div>

    <Alert message="hola" type="alert-success"/>
<div v-if="output != null" class="flex flex-wrap items-center justify-center gap-2">
  <div class="divider"></div> 
  <div class="mt-5 w-full">
      <div class="flex mb-9">
      <div class="mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

      </div>
      <div>
        <h2 class="text-2xl font-bold">Resultados de la Simulación</h2>
        <p class="text-slate-500 text-sm">Ahora puedes usar esta información para determinar el costo y tiempo del proyecto.</p>
      </div>
    </div>
  </div>

    <div class="stats stats-vertical lg:stats-horizontal shadow">
  
      <div class="stat">
        <div class="stat-title">Tiempo medio</div>
        <div class="stat-value">{{ output.medianTime.toFixed(2) }}</div>
        <div class="stat-desc">{{ getUnitTime() }}</div>

      </div>
      
      <div class="stat">
        <div class="stat-title">Rango probable</div>
        <div class="stat-value">{{ output.likelyMinimumTime.toFixed(2) }} - {{ output.likelyMaximumTime.toFixed(2) }}</div>
        <div class="stat-desc">{{ getUnitTime() }}</div>
      </div>
      
      <div class="stat">
        <div class="stat-title">Tiempo minimo</div>
        <div class="stat-value">{{ output.minimumTime.toFixed(2) }}</div>
        <div class="stat-desc">{{ getUnitTime() }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Tiempo máximo</div>
        <div class="stat-value">{{ output.maximumTime.toFixed(2) }}</div>
        <div class="stat-desc">{{ getUnitTime() }}</div>
      </div>       

      <div class="stat">
        <div class="stat-title">Desviación estandar</div>
        <div class="stat-value">{{ output.standardDeviationTime.toFixed(2) }}</div>
        <div class="stat-desc">Dispersión del tiempo en cuando al tiempo medio.</div>
      </div>
      
      <div class="stat">
        <div class="stat-title">Costo Probable</div>
        <div class="stat-value">{{ (output.minimumTime*fixedCost).toFixed(2) }} a {{ (output.maximumTime*fixedCost).toFixed(2) }}</div>
        <div class="stat-desc">{{ getCurrencySymbol() }}</div>
      </div>       
      
    </div>

    <div class="w-full flex justify-center mt-5">
    <div class="mt-5">
      <p>
        Tiempo de computo de la simulación (ms):
        <template v-if="output != null"> {{ output.runningTime }}</template>
      </p>
    </div>
    </div>

  </div>

    <div class="w-full flex justify-center mt-5" v-show="output != null">
      <div ref="histogram"></div>
    </div>
  </div>

    </div>

    <input type="radio" name="tabs" role="tab" class="tab" aria-label="Configuración" />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">



      <div class="p-10 w-full">
      <div class="flex mb-9">
      <div class="mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

      </div>
      <div>
        <h2 class="text-2xl font-bold">Opciones de Simulador</h2>
        <p class="text-slate-500 text-sm">Seleccione las opciones de la simulación</p>
      </div>
    </div>
  </div>
  

    <label class="form-control w-full max-w-xs pl-10">
      <div class="label">
        <span class="label-text">Número de simulaciones</span>
      </div>
      <input v-model="numberSimulations" id="numberSimulations" type="number" placeholder="100" class="input input-bordered w-full max-w-xs" />
    </label>

    <label class="form-control w-full max-w-xs pl-10">
      <div class="label">
        <span class="label-text">Moneda</span>
      </div>
      <select v-model="currency" class="select select-bordered">
        <option disabled selected>Elegir</option>
        <option value="USD">Dólar $</option>
        <option value="VED">Bolivares Bs.</option>
      </select>
    </label>    

    <label class="form-control w-full max-w-xs pl-10">
      <div class="label">
        <span class="label-text">Costo por Unidad de Tiempo</span>
      </div>
      <input v-model="fixedCost" id="fixedCost" type="number" placeholder="5" class="input input-bordered w-full max-w-xs" />
    </label>  
    
    <label class="form-control w-full max-w-xs pl-10">
      <div class="label">
        <span class="label-text">Unidad de Tiempo</span>
      </div>
      <select v-model="timeUnit" class="select select-bordered">
        <option disabled selected>Elegir</option>
        <option value="sec">Segundos</option>
        <option value="min">Minutos</option>
        <option value="hour">Horas</option>
        <option value="day">Días</option>
        <option value="week">Semanas</option>
        <option value="month">Meses</option>
        <option value="year">Años</option>
      </select>
    </label>        

    </div>
</div>



</template>

<script type="module">
import * as d3 from "d3";
import { faker } from '@faker-js/faker';
import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)

export default {
  data() {
    return {
      tasks: [
       {name: 'Ejemplo 1', min: 1, max: 10 , confidence: 90, cost: 0},
      ],
      numberSimulations: 100,
      fixedCost: 5,
      currency: 'USD',
      timeUnit: 'hour',
      output: null,
    };
  },
  mounted() {
    this.fakeTasks();
  },
  methods: {
    getUnitTime() {
      const unitMap = {
        sec: 'Segundos',
        min: 'Minutos',
        hour: 'Horas',
        day: 'Días',
        week: 'Semanas',
        month: 'Meses',
        year: 'Años',
      };

      return unitMap[this.timeUnit] || '';
    },
    getCurrencySymbol() {
      const currencyMap = {
        USD: 'Dólares ($)',
        VED: 'Bolívares (Bs.)',
      }
      return currencyMap[this.currency] || '';
    },
    fakeTasks() {
    const fakeData = [];
    for (let i = 0; i < 10; i++) {
      fakeData.push({
        name: faker.word.words(3),
        min: faker.number.int({ min: 0.5, max: 50 }),
        max: faker.number.int({ min: 51, max: 100 }),
        confidence: faker.number.int(100),
        cost: 0,
      });
    }
    this.tasks = fakeData;
    console.log(fakeData);
    },
    handleAddTask() {
      let i = this.tasks.length + 1;
      this.tasks.push({ name: `Actividad ${i}`, min: 1, max: 5, confidence: 90, cost: 5 });
    },
    clearTasks() {
      this.tasks = [];
      this.output = null;
      this.handleAddTask();
    },
    handleDeleteTask(index) {
      this.tasks = this.tasks.filter((task, ind) => index !== ind);
      if (this.tasks.length === 0) {
        this.handleAddTask();
      }
    },
    monteCarloSimulation(numberSimulations, tasks) {
      let startTime = Date.now()
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
        likelyMinimumTime: Infinity,
        likelyMaximumTime: -Infinity,
        likelyMinimumCost: Infinity,
        likelyMaximumCost: -Infinity,
        list: [],
        runningTime: 0
      };

      // Run the simulation numberSimulations times.
      for (let i = 0; i < numberSimulations; i++) {
        // Generate a random time for each task.
        const randomTimes = tasks.map((task) => {
          // Generate a random number between the minimum and maximum time.
          const randomTime = math.randomInt(task.min, task.max + 1);

          // Adjust the random time based on the confidence value.
          const adjustedTime = randomTime * task.confidence;

          // Return the adjusted time.
          return adjustedTime;
        });

        // Calculate the total time and cost.
        const totalTime = math.sum(randomTimes);
        const totalCost = math.sum(randomTimes.map((time, index) => time * tasks[index].cost));

        // Add the simulation run to the list.
        results.list.push({
          totalTime: totalTime,
          totalCost: totalCost
        });
      }

      // Calculate the median, standard deviation, minimum, and maximum values of the total cost and time.
      let simulationRunCost = results.list.map((simulationRun) => simulationRun.totalCost);
      let simulationRunTime = results.list.map((simulationRun) => simulationRun.totalTime);

      results.medianCost = math.median(...simulationRunCost);
      results.standardDeviationCost = math.std(...simulationRunCost);
      results.minimumCost = math.min(...simulationRunCost);
      results.maximumCost = math.max(...simulationRunCost);
      results.medianTime = math.median(...simulationRunTime);
      results.standardDeviationTime = math.std(...simulationRunTime);
      results.minimumTime = math.min(...simulationRunTime);
      results.maximumTime = math.max(...simulationRunTime);

      results.likelyMinimumTime = results.medianTime - results.standardDeviationTime;
      results.likelyMaximumTime = results.medianTime + results.standardDeviationTime;
      results.likelyMinimumCost = results.medianCost - results.standardDeviationCost;
      results.likelyMaximumCost = results.medianCost + results.standardDeviationCost;

      // Return the results object.
      let endTime = Date.now()
      results.runningTime = endTime - startTime
      return results;

    },
    handleRunSimulation() {
      let inputs = [];
      this.tasks.forEach((task) => {
        let obj = {};
        obj.min = parseInt(task.min, 10);
        obj.max = parseInt(task.max, 10);
        obj.confidence = parseInt(task.confidence) / 100;
        obj.cost = task.cost;
        inputs.push(obj);
      });

      if (this.tasks.length > 0) {
       let output = this.monteCarloSimulation(this.numberSimulations, inputs);
       
       let list = output.list.map((simulationRun) => simulationRun.totalTime);
       this.buildHistogram(this.$refs.histogram, list, output.minimumTime, output.maximumTime, output.medianTime, output.standardDeviationTime, 'Tiempo', true);
       this.output = output;
      } else {
        alert('Debes colocar tareas para usarlos de datos para la simulacion');
      }
    },
    buildHistogram(targetNode, list, min, max, median, stdDev, xLabel, limitGraph) {

      console.log(list, min, max, median, stdDev, xLabel, limitGraph);
      // Remove and existing graphs
      targetNode.innerHTML = '';

      // The number of points before it switches to using a line graph.
      const barCutoff = 600;

      // The width of the image
      const imageWidth = 800;
      const imageHeight = 500;

      // Image Margins
      const binMargin = 0.2;
      const margin = {
        top: 10,
        right: 30,
        bottom: 50,
        left: 60,
      };

      // Set outer bounds of graph.
      let minBin = min;
      let maxBin = max;

      // Trim the array to just hold cells in the range of results.
      // If limit graph is set, just show two standard deviations on the graph.
      if (limitGraph) {
        maxBin = median + stdDev * 2 < max ? median + stdDev * 2 : max;
        minBin = median - stdDev * 2 > min ? median - stdDev * 2 : min;
      }
      const data = list.filter((e, i) => e >= minBin && e <= maxBin);

      // We need to round the median and standard deviation and find the
      // index we expect for the bars.
      const medianIndex = Math.round(median - minBin);
      const stdDevOffset = Math.round(stdDev);
      const stdDevLowIndex = medianIndex - stdDevOffset;
      const stdDevHighIndex = medianIndex + stdDevOffset;

      // whitespace on either side of the bars
      const width = imageWidth - margin.left - margin.right;
      const height = imageHeight - margin.top - margin.bottom;

      // Set the limits of the x axis
      const xMin = minBin - 1;
      const xMax = maxBin + 1;

      // Determine if we should use a bar graph or scatter plot.
      const useBars = xMax - xMin < barCutoff;

      // Set the max range of the y axis.
      // The data array can be quite large so standard Math.Max approaches can fail.
      const sortedData = [...data].sort((a, b) => a - b);
      const yMax = sortedData[sortedData.length - 1];

      // This scale is for determining the widths of the histogram bars
      const x = d3
        .scaleLinear()
        .domain([0, xMax - xMin])
        .range([0, width]);

      // Scale for the placement of the bars
      const x2 = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);

      const y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

      const xAxis = d3.axisBottom().scale(x2);
      const yAxis = d3.axisLeft().scale(y).ticks(8);

      // Put the graph in the histogram div.
      const svg = d3
        .select(targetNode)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .style("fill", "#ffffff")
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add the x axis and x-label.
      svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);
      svg
        .append('text')
        .attr('class', 'xLabel')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom)
        .style("fill", "#ffffff")
        .text(xLabel);

      // Add the y axis and y-label.
      svg
        .append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(0,0)')
        .call(yAxis);
      svg
        .append('text')
        .attr('class', 'yLabel')
        .attr('y', 0 - margin.left) // x and y switched due to rotation.
        .attr('x', 0 - height / 2)
        .attr('dy', '1em')
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
        .style("fill", "#ffffff")
        .text('Frecuencia');

      // Set up the bars.
      if (useBars) {
        const bar = svg
          .selectAll('.bar')
          .data(data)
          .enter()
          .append('g')
          .attr('class', (d, i) => {
            if (i === medianIndex) {
              return 'bar median';
            }
            if (i > stdDevLowIndex && i < stdDevHighIndex) {
              return 'bar stdDev';
            }
            return 'bar';
          })
          .attr('transform', (d, i) => `translate(${x2(i + minBin)},${y(d)})`);

        // Add rectangles of correct size at correct location.
        bar
          .append('rect')
          .attr('x', x(binMargin))
          .attr('width', x(2 * binMargin))
          .attr('height', (d) => height - y(d));
      } else {
        // Use Scatter plot instead of bars
        svg
          .selectAll('dot')
          .data(data)
          .join('circle')
          .attr('cx', (d, i) => x(i))
          .attr('cy', (d) => y(d))
          .attr('r', (d, i) => {
            if (i === medianIndex) {
              return 3;
            }
            return 1;
          })
          .attr('class', (d, i) => {
            if (i === medianIndex) {
              return 'graphXY median';
            }
            if (i > stdDevLowIndex && i < stdDevHighIndex) {
              return 'graphXY stdDev';
            }
            return 'graphXY';
          });
      }
    },
  },
};
</script>
