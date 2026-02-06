
export interface DeviceData {
  phoneNumber: string;
  country: string;
  region: string;
  city: string;
  street: string;
  build: string;
  location: string;
  routes: string;
  latitude: number;
  longitude: number;
}

export enum TrackerStatus {
  IDLE = 'IDLE',
  TRACKING = 'TRACKING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

export interface TransformState {
  rotation: number; // 0, 90, 180, 270
  flipH: boolean;
  flipV: boolean;
  scale: number;
}

export interface ImageData {
  url: string;
  name: string;
  type: string;
  width: number;
  height: number;
}



export type WatermarkPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'tiled' | 'custom';

export interface WatermarkConfig {
  type: 'text' | 'image';
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  opacity: number;
  position: WatermarkPosition;
  padding: number;
  rotation: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

export interface ImageFile {
  file: File;
  preview: string;
  width: number;
  height: number;
}
