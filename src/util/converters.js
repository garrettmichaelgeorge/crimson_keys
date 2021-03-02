function mToF(midi) {
  return Math.pow(2, (midi - 69) / 12) * 440;
}

function fToM(f) {
  return 12 * Math.log(2, f / 440) + 69;
}

export { mToF, fToM };
