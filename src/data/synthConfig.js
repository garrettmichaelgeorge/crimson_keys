const standard = {
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 30,
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
    attackCurve: "exponential",
  },
  portamento: 0,
  volume: -8,
};

const fatsawtooth = {
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 20,
  },
  envelope: {
    attack: 0.05,
    attackCurve: "exponential",
    decay: 1,
    sustain: 0.5,
    release: 0.5,
  },
  portamento: 0,
  volume: -8,
};

const wavy = {
  oscillator: {
    type: "fatsine",
    count: 3,
    spread: 30,
  },
  envelope: {
    attack: 0.75,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
    attackCurve: "exponential",
  },
};

const synthConfig = {
  standard,
  fatsawtooth,
  wavy,
};

export default synthConfig;
