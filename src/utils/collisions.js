/**
 * This function finds intersection between given ray and segment
 *
 * @param {Object} ray
 * ray is an object, that describes direction and position of ray,
 * this ray may be a bullet trajectory for example
 *
 * @param {Object} segment
 * segment is an object of two points, that describes one line segment
 *
 * @returns a point (x, y) of the intersection or null if there's no intersection
 *
 * see http://ncase.me/sight-and-light/
 * */
export function findIntersectionBetweenRayAndSegment(ray, segment) {
  // RAY in parametric: Point + Direction * T1
  const rayPositionX = ray.a.x;
  const rayPositionY = ray.a.y;
  const rayDx = ray.b.x - ray.a.x;
  const rayDy = ray.b.y - ray.a.y;

  // SEGMENT in parametric: Point + Direction * T2
  const segmentPositionX = segment.a.x;
  const segmentPositionY = segment.a.y;
  const segmentDx = segment.b.x - segment.a.x;
  const segmentDy = segment.b.y - segment.a.y;

  // Are they parallel? If so, no intersect
  const rayHypotenuse = (rayDx ** 2 + rayDy ** 2) ** 0.5;
  const segmentHypotenuse = (segmentDx ** 2 + segmentDy ** 2) ** 0.5;
  const areParallel = (
    rayDx / rayHypotenuse === segmentDx / segmentHypotenuse &&
    rayDy / rayHypotenuse === segmentDy / segmentHypotenuse
  );

  if (areParallel) {
    return null;
  }

  /*
  * SOLVE FOR T1 & T2
  *
  * rayPositionX + rayDx * T1 = segmentPositionX + segmentDx * T2
  * rayPositionY + rayDy * T1 = segmentPositionY + segmentDy * T2
  */
  const T2 = (
    rayDx * (segmentPositionY - rayPositionY) + rayDy * (rayPositionX - segmentPositionX)
  ) / (segmentDx * rayDy - segmentDy * rayDx);

  const T1 = (segmentPositionX + segmentDx * T2 - rayPositionX) / rayDx;

  // Must be within parametic whatevers for RAY/SEGMENT
  if (T1 < 0) return null;
  if (T2 < 0 || T2 > 1) return null;

  // Return the POINT OF INTERSECTION
  return {
    x: rayPositionX + rayDx * T1,
    y: rayPositionY + rayDy * T1,
  };
}
