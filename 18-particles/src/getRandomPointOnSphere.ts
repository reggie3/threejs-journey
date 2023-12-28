function getRandomPointOnSphere(radius: number): [number, number, number] {
  const u: number = Math.random(); // Random value between 0 and 1
  const v: number = Math.random(); // Random value between 0 and 1
  const w: number = Math.random(); // Random value between 0 and 1

  const phi: number = 2 * Math.PI * u; // Azimuthal angle
  const costheta: number = 2 * v - 1; // Cosine of polar angle
  const sintheta: number = Math.sqrt(1 - costheta * costheta);

  const x: number = radius * sintheta * Math.cos(phi);
  const y: number = radius * sintheta * Math.sin(phi);
  const z: number = radius * costheta;

  return [x, y, z];
}

export default getRandomPointOnSphere;
