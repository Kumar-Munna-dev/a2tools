export function generateUUID(version: 1 | 4 = 4, uppercase: boolean = false): string {
  let uuid = '';
  
  if (version === 4) {
    // Generate v4 UUID (Random)
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  } else {
    // Generate pseudo-v1 UUID (Time-based)
    let d = new Date().getTime();
    let d2 = (typeof performance !== 'undefined' && performance.now && (performance.now() * 1000)) || 0;
    uuid = 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  return uppercase ? uuid.toUpperCase() : uuid;
}

export function generateMultipleUUIDs(count: number, version: 1 | 4 = 4, uppercase: boolean = false): string[] {
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    uuids.push(generateUUID(version, uppercase));
  }
  return uuids;
}
